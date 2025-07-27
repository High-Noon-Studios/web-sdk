<script lang="ts">
	import { Sprite } from "pixi-svelte";

	const props = $props<{
		key: string;
		origin: { x: number, y: number };
		target: { x: number, y: number };
		/**
		 * The normalized length of the laser, between 0 and 1.
		 * 0 = no length, 1 = full length from origin to target.
		 */
		length: number; // 0 <= length <= 1
	}>();

	const getDistance = (start: { x: number, y: number }, end: { x: number, y: number }) => {
		const offsetX = end.x - start.x;
		const offsetY = end.y - start.y;
		return Math.sqrt(offsetX * offsetX + offsetY * offsetY);
	}

	const calculateRotation = (start: { x: number, y: number }, end: { x: number, y: number }) => {
		const offsetX = end.x - start.x;
		const offsetY = end.y - start.y;
		return Math.atan2(offsetY, offsetX);
	}

	const rotation = $derived(calculateRotation(props.origin, props.target));
	const length = $derived(getDistance(props.origin, props.target) * props.length);
</script>

<Sprite
	key="laser"
	x={props.origin.x}
	y={props.origin.y}
	width={length}
	anchor={{x: 0, y: 0.5}}
	rotation={rotation}
	zIndex={10}
/>