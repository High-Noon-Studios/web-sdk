<script lang="ts">
	import { getContextSpine, Graphics, SpineTrack } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { onMount } from 'svelte';
	import {  } from '@esotericsoftware/spine-pixi-v8';
	import { Tween } from 'svelte/motion';
	import { cubicIn, cubicInOut, cubicOut, linear } from 'svelte/easing';
	import type { EasingFunction } from 'svelte/transition';
	import { getSymbolX } from '../game/utils';
	import Laser from './Laser.svelte';
	import LaserImpactParticles from './LaserImpactParticles.svelte';
	import { FadeContainer } from 'components-pixi';

	const SPEED_SCALE = 0.6;
	const context = getContext();

	const app = context.stateApp.pixiApplication!;

	const board = context.stateGameDerived.boardLayout();
	const boardLeft = board.x - board.width / 2;
	const boardTop = board.y - board.height / 2;

	const symbolPositions = context.stateGame.board.slice(1, 4).flatMap(reel => reel.reelState.symbols.slice(1, 4).map(symbol => ({
		x: boardLeft + getSymbolX(reel.reelIndex) ,
		y: boardTop + symbol.symbolY()
	})));

	const marxSpine = getContextSpine();

	const lookAt = marxSpine.skeleton.findBone('look_at')!;

	const rightEye = marxSpine.skeleton.findBone('right_eye')!;
	const leftEye = marxSpine.skeleton.findBone('left_eye')!;

	const rightEyePosition = $state({ x: 0, y: 0 });
	const leftEyePosition = $state({ x: 0, y: 0 });

	let emitParticles = $state(false);
	let isLaserShrinking = $state(false);
	let currentTarget = $state(symbolPositions[0]);
	let lookAtTween = new Tween({x: 0, y: 0, rotation: 0});
	let laserLengthTween = new Tween(0);

	const calculateLookAtTargetSpineCoordinates = (target: { x: number, y: number }, strength: number) => {
		const dx = (target.x - lookAtBonePositionPixi.x);
		const dy = (lookAtBonePositionPixi.y - target.y);

		// Calculate distance and angle
		const distance = Math.sqrt(dx * dx + dy * dy);
		const angle = Math.atan2(dy, dx);

		// Scale distance by strength, with max distance of 200 * strength
		const maxDistance = 150 * Math.abs(strength);
		const scaledDistance = Math.min(distance, maxDistance);

		// Convert back to x,y coordinates
		const scaledDx = Math.cos(angle) * scaledDistance * Math.sign(strength);
		const scaledDy = Math.sin(angle) * scaledDistance * Math.sign(strength);

		return {
			x: scaledDx + lookAtBoneCenterSpine.x,
			y: scaledDy + lookAtBoneCenterSpine.y
		}
	}

	const lookAtTarget = ({
		target: { x, y },
		rotation = 0,
		duration = 250,
		easing = cubicInOut,
		strength = 1
	}: {
		target: { x: number, y: number },
		duration?: number,
		rotation?: number,
		easing?: EasingFunction,
		strength?: number
	}) => {
		const lookAtTargetSpineCoordinates = calculateLookAtTargetSpineCoordinates({ x: x, y: y }, strength);
		return lookAtTween.set({ x: lookAtTargetSpineCoordinates.x, y: lookAtTargetSpineCoordinates.y, rotation }, { duration: duration * SPEED_SCALE, easing });
	}

	const resetLookAtTarget = async ({ duration = 250 }: { duration?: number }) => {
		await lookAtTween.set({ x: lookAtBoneCenterSpine.x, y: lookAtBoneCenterSpine.y, rotation: 0 }, { duration: duration * SPEED_SCALE, easing: cubicOut });
	}

	const fireLasers = async ({ target }: { target: { x: number, y: number } }) => {
		// wind back, charge lasers
		await lookAtTarget({ target, duration: 3000 * SPEED_SCALE, easing: cubicInOut, strength: -0.5, rotation: 1})

		// fire lasers - inital
		lookAtTarget({ target, duration: 500 * SPEED_SCALE, easing: cubicIn, strength: 0.6, rotation: -2.5}),
		await laserLengthTween.set(1, { duration: 200 * SPEED_SCALE, easing: cubicIn }),

		// once they connect to the target, emit particles and press head through
		emitParticles = true;
		await lookAtTarget({ target, duration: 3000 * SPEED_SCALE, strength: 1, easing: cubicOut, rotation: -5 });

		isLaserShrinking = true;
		emitParticles = false;

		// When anchor is 1, position the sprite at the target location
		// This makes the laser shrink from eyes to target
		await laserLengthTween.set(0, { duration: 200 * SPEED_SCALE, easing: cubicOut });

		isLaserShrinking = false;
	}

	const fireLasersAtTargets = async (targets: { x: number, y: number }[]) => {
		for (const target of targets) {
			currentTarget = target;
			await fireLasers({ target: currentTarget });
		}

		await resetLookAtTarget({ duration: 1000 * SPEED_SCALE });
	}

	const updateEyePositions = () => {
		const rightEyeWorldX = rightEye.worldX;
		const rightEyeWorldY = rightEye.worldY;
		const leftEyeWorldX = leftEye.worldX;
		const leftEyeWorldY = leftEye.worldY;

		rightEyePosition.x = marxSpine.x + rightEyeWorldX * marxSpine.scale.x;
		rightEyePosition.y = marxSpine.y + rightEyeWorldY * marxSpine.scale.y;
		leftEyePosition.x = marxSpine.x + leftEyeWorldX * marxSpine.scale.x;
		leftEyePosition.y = marxSpine.y + leftEyeWorldY * marxSpine.scale.y;
	}

	const updateLookAt = () => {
		lookAt.x = lookAtTween.current.x;
		lookAt.y = lookAtTween.current.y;
		lookAt.rotation = lookAtTween.current.rotation;
	}

	let lookAtBoneCenterSpine = { x: 0, y: 0 };
	let lookAtBonePositionPixi = $state({ x: 0, y: 0 });
	let marxX = $state(marxSpine.x);
	let marxY = $state(marxSpine.y);

	onMount(() => {
		app.ticker.addOnce(() => {
			lookAtBoneCenterSpine = { x: lookAt.x, y: lookAt.y };
			marxX = marxSpine.x;
			marxY = marxSpine.y;
			lookAtBonePositionPixi = {
				x: marxX + lookAt.x * marxSpine.scale.x,
				y: marxY - lookAt.y * marxSpine.scale.y
			}
			resetLookAtTarget({ duration: 0 });
		});

		app.ticker.add(() => {
			updateEyePositions();
			updateLookAt();
		});

		app.stage.eventMode = 'dynamic';
		app.stage.addEventListener('click', (e) => {
			fireLasersAtTargets(symbolPositions.slice(0, 1));
		});
	})
</script>

<!-- <Graphics
	draw={(g) => {
		g.circle(0, 0, 10);
		g.fill({ color: 0x00ff00 });
	}}
	{...lookAtBonePositionPixi}
	zIndex={100}
/> -->

<Laser
	key="laser"
	origin={isLaserShrinking ? currentTarget : leftEyePosition}
	target={isLaserShrinking ? leftEyePosition : currentTarget}
	length={laserLengthTween.current}
/>

<Laser
	key="laser"
	origin={isLaserShrinking ? currentTarget : rightEyePosition}
	target={isLaserShrinking ? rightEyePosition : currentTarget}
	length={laserLengthTween.current}
/>

<FadeContainer show={emitParticles} duration={200 * SPEED_SCALE}>
	<LaserImpactParticles
		{...currentTarget}
	/>
</FadeContainer>