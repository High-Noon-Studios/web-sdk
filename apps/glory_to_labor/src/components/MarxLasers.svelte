<script lang="ts">
	import { Sprite, Graphics, getContextSpine, SpineBone, Text, ParticleEmitter, Container} from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { onMount } from 'svelte';
	import { Spine, Bone } from '@esotericsoftware/spine-pixi-v8';
	import { Tween } from 'svelte/motion';
	import { backIn, cubicInOut, cubicOut, linear } from 'svelte/easing';
	import type { EasingFunction } from 'svelte/transition';
	import { getSymbolX } from '../game/utils';
	import { fountain, trailCircle } from 'constants-shared/particleConfig';

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
	const rightEye = marxSpine.skeleton.findBone('right_eye')!;
	const leftEye = marxSpine.skeleton.findBone('left_eye')!;

	const rightEyePosition = $state({ x: 0, y: 0 });
	const leftEyePosition = $state({ x: 0, y: 0 });

	let leftLaserLength = $state(0);
	let leftLaserRotation = $state(0);
	let rightLaserLength = $state(0);
	let rightLaserRotation = $state(0);
	let emitParticles = $state(false);

	let lookAtTargetTween = new Tween(symbolPositions[0]);
	let leftLaserTargetTween = new Tween({ x: 0, y: 0 });
	let rightLaserTargetTween = new Tween({ x: 0, y: 0 });
	let leftLaserLengthTween = new Tween(0);
	let rightLaserLengthTween = new Tween(0);
	let leftLaserAnchorX = $state(0);
	let rightLaserAnchorX = $state(0);

	let currentTarget = $state(symbolPositions[0]);

	const laserTargetParticleConfig = {
		...trailCircle,
		lifetime: {
			min: 0.8,
			max: 1.2
		}
	};
	const getDistance = (start: { x: number, y: number }, end: { x: number, y: number }) => {
		const offsetX = end.x - start.x;
		const offsetY = end.y - start.y;
		return Math.sqrt(offsetX * offsetX + offsetY * offsetY);
	}

	const lookAtTarget = ({
		duration = 250,
		easing = cubicInOut,
		strength = 1
	}: {
		duration?: number,
		easing?: EasingFunction,
		strength?: number
	}) => {
		let dx = currentTarget.x;
		let dy = currentTarget.y;

		lookAtTargetTween.set({ x: dx + ((marxSpine.worldTransform.tx - dx) * (1 - strength)), y: dy + ((marxSpine.worldTransform.ty - dy) * (1 - strength)) }, { duration, easing });
		leftLaserTargetTween.set({ x: dx, y: dy }, { duration, easing });
		rightLaserTargetTween.set({ x: dx, y: dy }, { duration, easing });

		return new Promise(resolve => setTimeout(resolve, duration));
	}

	const resetLookAtTarget = async ({ duration = 250 }: { duration?: number }) => {
		lookAtTargetTween.set({ x: marxSpine.worldTransform.tx, y: marxSpine.worldTransform.ty }, { duration, easing: cubicOut });
		await new Promise(resolve => setTimeout(resolve, duration));
	}

	// const chargeLasers = async ({ duration = 1000 }: { duration?: number }) => {
	// 	// Move the lookAtTargetTween a few pixels in a straight line from its current position toward the marxSpine in an easeOut timing function
	// 	const currentPosition = lookAtTargetTween.current;
	// 	const marxPosition = { x: marxSpine.x, y: marxSpine.y };

	// 	// Calculate direction vector from current position toward marxSpine
	// 	const directionX = marxPosition.x - currentPosition.x;
	// 	const directionY = marxPosition.y - currentPosition.y;

	// 	// Calculate distance and normalize
	// 	const distance = Math.sqrt(directionX * directionX + directionY * directionY);
	// 	const normalizedX = directionX / distance;
	// 	const normalizedY = directionY / distance;

	// 	const moveDistance = distance * 0.5;
	// 	const targetX = currentPosition.x + normalizedX * moveDistance;
	// 	const targetY = currentPosition.y + normalizedY * moveDistance;

	// 	// Animate to the new position with easeOut timing
	// 	lookAtTargetTween.set({ x: targetX, y: targetY }, { duration, easing: cubicOut });

	// 	await new Promise(resolve => setTimeout(resolve, duration));
	// }

	const fireLasers = async ({ duration = 1000 }: { duration?: number }) => {
		// turn head toward target
		lookAtTarget({ duration: 500, easing: cubicOut, strength: 0.5 });
		await new Promise(resolve => setTimeout(resolve, 1000));

		// wind back, charge lasers
		lookAtTarget({ duration: 1000, easing: cubicOut, strength: -0.1})
		await new Promise(resolve => setTimeout(resolve, 1000));

		// fire lasers - inital
		lookAtTarget({ duration: 500, easing: cubicOut, strength: 0.8});
		leftLaserLengthTween.set(leftLaserLength, { duration: 500, easing: cubicOut });
		rightLaserLengthTween.set(rightLaserLength, { duration: 500, easing: cubicOut });
		await new Promise(resolve => setTimeout(resolve, 500));

		// once they connect to the target, emit particles and press head through
		emitParticles = true;
		lookAtTarget({ duration, strength: 1, easing: linear });
		await new Promise(resolve => setTimeout(resolve, duration));


		// When anchor is 1, position the sprite at the target location
		// This makes the laser shrink from eyes to target
		leftLaserAnchorX = 1;
		rightLaserAnchorX = 1;

		resetLookAtTarget({ duration: 500 });
		leftLaserLengthTween.set(0, { duration: 500, easing: cubicOut });
		rightLaserLengthTween.set(0, { duration: 500, easing: cubicOut });

		await new Promise(resolve => setTimeout(resolve, 500));

		emitParticles = false;
		leftLaserAnchorX = 0;
		rightLaserAnchorX = 0;
	}

	const calculateLaserRotation = (start: { x: number, y: number }, end: { x: number, y: number }) => {
		const offsetX = end.x - start.x;
		const offsetY = end.y - start.y;
		return Math.atan2(offsetY, offsetX);
	}

	const fireLasersAtTargets = async (targets: { x: number, y: number }[]) => {
		// 1. eyes begin to glow

		// 2. fire at each target
		let i = 0;
		while (true) {
			await fireLasersAtTarget(targets[i]);
			await new Promise(resolve => setTimeout(resolve, 3000));
			i++;
			if (i >= targets.length) {
				i = 0;
			}
		}
		// 3.a. head returns to normal position
		// 3.b. eyes stop glowing
	}

	const fireLasersAtTarget = async ({ x, y }: { x: number, y: number }) => {
		currentTarget = { x, y };
		await fireLasers({ duration: 1000 });
	}

	onMount(() => {
		app.ticker.add(() => {
			// Get the bone's world coordinates in the spine's coordinate system
			const rightEyeWorldX = rightEye.worldX;
			const rightEyeWorldY = rightEye.worldY;
			const leftEyeWorldX = leftEye.worldX;
			const leftEyeWorldY = leftEye.worldY;

			// Convert to global screen coordinates by applying the spine's world transform
			rightEyePosition.x = marxSpine.x + rightEyeWorldX * marxSpine.scale.x;
			rightEyePosition.y = marxSpine.y + rightEyeWorldY * marxSpine.scale.y;
			leftEyePosition.x = marxSpine.x + leftEyeWorldX * marxSpine.scale.x;
			leftEyePosition.y = marxSpine.y + leftEyeWorldY * marxSpine.scale.y;

			leftLaserLength = getDistance(leftEyePosition, leftLaserTargetTween.current);
			leftLaserRotation = calculateLaserRotation(leftEyePosition, leftLaserTargetTween.current);
			rightLaserLength = getDistance(rightEyePosition, rightLaserTargetTween.current);
			rightLaserRotation = calculateLaserRotation(rightEyePosition, rightLaserTargetTween.current);
		})

		fireLasersAtTargets(symbolPositions);
	})
</script>

<SpineBone
  boneName="look_at"
	x={lookAtTargetTween.current.x - marxSpine.worldTransform.tx}
	y={lookAtTargetTween.current.y - marxSpine.worldTransform.ty}
	/>

<!-- <Graphics draw={(g) => {
	g.circle(0, 0, 10);
	g.fill({ color: 0x00ff00 });
}} {...rightEyePosition} />

<Graphics draw={(g) => {
	g.circle(0, 0, 10);
	g.fill({ color: 0x0000ff });
}} {...leftEyePosition} />

<Graphics draw={(g) => {
	g.circle(0, 0, 15);
	g.fill({ color: 0x0000ff });
}} {...lookAtTargetTween.current} /> -->

<!-- <Text text={Math.round(leftEyePosition.x) + ' ' + Math.round(leftEyePosition.y)} x={marxSpine.x + 16} y={marxSpine.y + 16} style={{ fontSize: 32, fill: 0xffffff }} /> -->

<!-- {#each symbolPositions as symbolPosition}
	<Graphics
		draw={(g) => {
			g.circle(symbolPosition.x, symbolPosition.y, 10);
			g.fill({ color: 0xffff00 });
		}}
	/>
{/each} -->

<Sprite
	key="laser"
	x={leftLaserAnchorX === 1 ? leftLaserTargetTween.current.x : leftEyePosition.x}
	y={leftLaserAnchorX === 1 ? leftLaserTargetTween.current.y : leftEyePosition.y}
	width={leftLaserLengthTween.current}
	anchor={{x: leftLaserAnchorX, y: 0.5}}
	rotation={leftLaserRotation}
	zIndex={10}
/>

<Sprite
	key="laser"
	x={rightLaserAnchorX === 1 ? rightLaserTargetTween.current.x : rightEyePosition.x}
	y={rightLaserAnchorX === 1 ? rightLaserTargetTween.current.y : rightEyePosition.y}
	width={rightLaserLengthTween.current}
	anchor={{x: rightLaserAnchorX, y: 0.5}}
	rotation={rightLaserRotation}
	zIndex={10}
/>

<!-- Laser target particle effect -->
<Container x={leftLaserTargetTween.current.x - board.x} y={leftLaserTargetTween.current.y - board.y} pivot={{x: 0.5, y: 0.5}}>
	<ParticleEmitter
		key="particle"
		config={{
			...laserTargetParticleConfig,
			pos: {
				x: marxSpine.x,
				y: marxSpine.y,
			}
		}}
		emit={emitParticles}
	/>
</Container>