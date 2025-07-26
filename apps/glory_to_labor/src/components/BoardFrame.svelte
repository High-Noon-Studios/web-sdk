<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import { Sprite, SpineProvider, SpineTrack, Filters, Container } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const context = getContext();
	const SPINE_SCALE = { width: 0.62, height: 0.66 };
	const SPRITE_SCALE = { width: 1, height: 0.6933203125 };
	const POSITION_ADJUSTMENT = 1;
	const BOARD_SIZE_ADJUSTMENT_X = 1.1;
  const BOARD_SIZE_ADJUSTMENT_Y = 1.13;

	type AnimationName = 'reelhouse_glow_start' | 'reelhouse_glow_idle' | 'reelhouse_glow_exit';

	let animationName = $state<AnimationName | undefined>(undefined);
	let loop = $state(false);

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => {
			animationName = 'reelhouse_glow_start';
			loop = false;
		},
		boardFrameGlowHide: () => {
			if (animationName) animationName = 'reelhouse_glow_exit';
		},
	});

	const oldFilmFilter = new Filters.OldFilmFilter({
		noise: 0.1,
		noiseSize: 0.5,
		scratch: 0.1,
		scratchDensity: 1,
		scratchWidth: 0.5,
		seed: 1,
		sepia: 0,
		vignetting: 0.2,
		vignettingAlpha: 0.5,
		vignettingBlur: 0.6,
	});
</script>

{#if animationName}
	<SpineProvider
		zIndex={-1}
		key="reelhouse"
		x={context.stateGameDerived.boardLayout().x * POSITION_ADJUSTMENT}
		y={context.stateGameDerived.boardLayout().y * POSITION_ADJUSTMENT}
		width={context.stateGameDerived.boardLayout().width * 0.55}
		height={context.stateGameDerived.boardLayout().height * 0.65}
	>
		<SpineTrack
			trackIndex={0}
			{animationName}
			{loop}
			listener={{
				complete: (entry) => {
					if (entry.animation) {
						if (entry.animation.name === 'reelhouse_glow_start') {
							animationName = 'reelhouse_glow_idle';
							loop = true;
						}

						if (entry.animation.name === 'reelhouse_glow_exit') {
							animationName = undefined;
							loop = false;
						}
					}
				},
			}}
		/>
	</SpineProvider>
{/if}

<Container filters={[oldFilmFilter]}>
	<Sprite
		key="reelsFrame"
		anchor={0.5}
		x={context.stateGameDerived.boardLayout().x * POSITION_ADJUSTMENT}
		y={context.stateGameDerived.boardLayout().y * POSITION_ADJUSTMENT}
		width={context.stateGameDerived.boardLayout().width * BOARD_SIZE_ADJUSTMENT_X}
		height={context.stateGameDerived.boardLayout().height * BOARD_SIZE_ADJUSTMENT_Y}
	/>
</Container>
