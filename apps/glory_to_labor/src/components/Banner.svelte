<script lang="ts">
	import { Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const SCALE_ADJUSTMENT = 1.4;
</script>

<FadeContainer show={true} duration={SECOND} zIndex={1}>
	<Sprite
		anchor={0.5}
		pivot={0.5}
		key="banner"
		x={context.stateGameDerived.boardLayout().x}
		y={context.stateGameDerived.boardLayout().y -
			context.stateGameDerived.boardLayout().height / 1.7}
		scale={SCALE_ADJUSTMENT}
	/>
</FadeContainer>
