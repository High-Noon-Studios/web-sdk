<script lang="ts">
	import { Sprite, Graphics, getContextSpine, SpineBone, Text} from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { onMount } from 'svelte';
	import { Spine, Bone } from '@esotericsoftware/spine-pixi-v8';
	import { Tween } from 'svelte/motion';
	import { backIn } from 'svelte/easing';
	import type { EasingFunction } from 'svelte/transition';
	import { getSymbolX } from '../game/utils';

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

	let lookAtTargetTween = new Tween(symbolPositions[0]);
	let leftLaserTargetTween = new Tween({ x: 0, y: 0 });
	let rightLaserTargetTween = new Tween({ x: 0, y: 0 });

	const getDistance = (start: { x: number, y: number }, end: { x: number, y: number }) => {
		const offsetX = end.x - start.x;
		const offsetY = end.y - start.y;
		return Math.sqrt(offsetX * offsetX + offsetY * offsetY);
	}

	const lookAtTarget = ({
		target,
		duration = 250,
		easing = backIn
	}: {
		target: { x: number, y: number },
		duration?: number,
		easing?: EasingFunction
	}) => {
		let dx = target.x;
		let dy = target.y;
		// const distance = getDistance({ x: marxSpine.x, y: marxSpine.y }, target);
		// const maxDistance = 100;
		// if (distance > maxDistance) {
		// 	const scale = maxDistance / distance;
		// 	dx *= scale;
		// 	dy *= scale;
		// }
		lookAtTargetTween.set({ x: dx, y: dy }, { duration, easing });
		leftLaserTargetTween.set({ x: target.x, y: target.y }, { duration, easing });
		rightLaserTargetTween.set({ x: target.x, y: target.y }, { duration, easing });

		return new Promise(resolve => setTimeout(resolve, duration));
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
			i++;
			if (i >= targets.length) {
				i = 0;
			}
		}
		// 3.a. head returns to normal position
		// 3.b. eyes stop glowing
	}

	const fireLasersAtTarget = async ({ x, y }: { x: number, y: number }) => {
		// 1. head moves to look at target
		await lookAtTarget({ target: { x, y }, duration: 250 });

		// 2. lasers fire

		// 3. laser stops firing
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
	y={lookAtTargetTween.current.y - marxSpine.worldTransform.ty} />

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
	{...leftEyePosition}
	width={leftLaserLength}
	anchor={{x: 0, y: 0.5}}
	rotation={leftLaserRotation}
	zIndex={10}
/>

<Sprite
	key="laser"
	{...rightEyePosition}
	width={rightLaserLength}
	anchor={{x: 0, y: 0.5}}
	rotation={rightLaserRotation}
	zIndex={10}
/>
