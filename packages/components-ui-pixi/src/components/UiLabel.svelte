<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = {
		label: string;
		value: string;
		align?: 'left' | 'right';
		tiled?: boolean;
		stacked?: boolean;
	};

	const props: Props = $props();
	const align = props.align ?? 'left';

	const labelStyle = {
		fontFamily: 'Arial',
		fontSize: UI_BASE_FONT_SIZE * 0.6,
		// fontWeight: '900',
		fill: WHITE,
	} as const;

	const valueStyle = {
		fontFamily: 'Arial',
		fontSize: UI_BASE_FONT_SIZE,
		fontWeight: '900',
		fill: WHITE,
	} as const;
</script>

{#if props.stacked}
	<Text anchor={{ x: align === 'left' ? 0 : 1, y: -0.3 }} text={props.label} style={labelStyle} />
	<Text anchor={{ x: align === 'left' ? 0 : 1, y: -0.3 }} text={props.value} style={valueStyle} y={UI_BASE_FONT_SIZE * 0.6} />
{:else}
	<Text anchor={{ x: 0, y: 0.5 }} text={props.label} style={labelStyle} />
	<Text
		anchor={{ x: 0, y: 0.5 }}
		text={props.value}
		style={valueStyle}
		x={UI_BASE_FONT_SIZE * 10}
	/>
{/if}
