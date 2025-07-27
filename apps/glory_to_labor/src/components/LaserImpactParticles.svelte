<script lang="ts">
	import { trailCircle } from 'constants-shared/particleConfig';
	import { Container, ParticleEmitter } from 'pixi-svelte';

	const { x, y } = $props<{
		x: number;
		y: number;
	}>();

	const laserTargetParticleConfig = {
		...trailCircle,
		lifetime: {
			min: 0.8,
			max: 1.2
		}
	};
</script>

<Container {x} {y} pivot={{x: 0.5, y: 0.5}}>
	<ParticleEmitter
		key="particle"
		config={{
			...laserTargetParticleConfig,
			pos: {
				x: 0,
				y: 0,
			}
		}}
		emit
	/>
</Container>