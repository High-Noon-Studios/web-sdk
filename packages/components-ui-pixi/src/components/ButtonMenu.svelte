<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateUi } from 'state-shared';

	import { UI_BASE_SIZE } from '../constants';
	import { getContext } from '../context';
	import UiIconButton from './UiIconButton.svelte';
	import { Rectangle } from 'pixi-svelte';
	import { BLACK } from 'constants-shared/colors';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: UI_BASE_SIZE * 0.3, height: UI_BASE_SIZE * 0.3 };

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = true;
	};
</script>

<UiIconButton {...props} {sizes} {onpress} icon="menu.png">
	<Rectangle height={props.height ?? 0} width={UI_BASE_SIZE * 0.5} backgroundColor={BLACK} alpha={0.9} x={sizes.width / 2} y={sizes.height / 2} anchor={0.5}/>
</UiIconButton>
