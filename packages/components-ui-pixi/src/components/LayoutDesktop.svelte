<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, Circle, anchorToPivot } from 'pixi-svelte';

	import {
		DESKTOP_BASE_SIZE,
		DESKTOP_BACKGROUND_WIDTH_LIST,
		UI_BASE_SIZE,
		UI_BASE_FONT_SIZE,
	} from '../constants';
	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';

	const props: LayoutUiProps = $props();
	const context = getContext();

	const height = UI_BASE_SIZE;
	const width = DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0) * 0.6;
</script>

<Container x={20}>
	{@render props.gameName()}
</Container>

<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
	{@render props.logo()}
</Container>

<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 50}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height,
				width,
			},
		})}
	>
		<!-- background -->
		<Container>
			<Circle
				diameter={height * 1.2}
				x={width * 0.5}
				y={height * 0.5}
				anchor={0.5}
				isMask
				inverseMask
			/>

			<Rectangle height={height * 0.8} y={height * 0.1} {width} backgroundColor={BLACK} alpha={0.9} />
		</Container>

		<Container x={-4} y={0} pivot={anchorToPivot({
			anchor: { x: 1, y: 0 },
			sizes: {
				height: UI_BASE_FONT_SIZE * 2,
				width: UI_BASE_SIZE * 0.5,
			},
		})}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>

		<Container
			x={32}
			y={height * 0.5}
			pivot={anchorToPivot({
				anchor: { x: 0, y: 0.5 },
				sizes: {
					height: UI_BASE_FONT_SIZE * 2,
					width: 0,
				},
			})}
		>
			{@render props.amountBalance({ stacked: true })}
		</Container>

		<Container x={width * 0.5 - 160} y={height * 0.5}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
		</Container>

		<Container x={width * 0.5} y={height * 0.5}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container x={width * 0.5 + 160} y={height * 0.5}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container
			x={width}
			y={height * 0.5}
			pivot={anchorToPivot({
				anchor: { x: 1, y: 0.5 },
				sizes: {
					height: UI_BASE_FONT_SIZE * 2,
					width: 80,
				},
			})}
		>
			{@render props.amountBet({ stacked: true })}
		</Container>

		<Container x={width - UI_BASE_SIZE * 0.125 - 32} y={height * 0.5}>
			{@render props.buttonIncrease({ anchor: 0.5, y: -height * 0.15 })}
			{@render props.buttonDecrease({ anchor: 0.5, y: height * 0.15 })}
		</Container>

		<Container
			x={width + UI_BASE_SIZE * 0.25 + 4}
			y={height * 0.5}
			pivot={anchorToPivot({
				anchor: { x: 0, y: 0 },
				sizes: {
					height: UI_BASE_FONT_SIZE,
					width: UI_BASE_FONT_SIZE,
				},
			})}
		>
			{@render props.buttonMenu({ anchor: 0.5, height: height * 0.8 })}
		</Container>

		<Container
			x={200}
			y={height * 0.5}
			pivot={anchorToPivot({
				anchor: { x: 0, y: 0.5 },
				sizes: {
					height: UI_BASE_FONT_SIZE * 2,
					width: 0,
				},
			})}
		>
			{@render props.amountWin({ stacked: true })}
		</Container>

		<!-- <Container y={0} x={UI_BASE_SIZE * 0.5 + 16}>
			{@render props.amountBalance({ stacked: true })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5 - 160} x={900} scale={0.8}>
			{@render props.amountWin({ stacked: true })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5 - 160} x={900 + 500} scale={0.8}>
			{@render props.amountBet({ stacked: true })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={220} scale={0.8}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={220 + 150} scale={0.8}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 4} scale={0.8}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 5} scale={0.8}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 6} scale={0.8}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={1440} scale={0.8}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={1440 + 150} scale={0.8}>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container> -->
	</Container>
</MainContainer>

{#if stateUi.menuOpen}
	<Rectangle
		eventMode="static"
		cursor="pointer"
		alpha={0.5}
		anchor={0.5}
		backgroundColor={BLACK}
		width={context.stateLayoutDerived.canvasSizes().width}
		height={context.stateLayoutDerived.canvasSizes().height}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		onpointerup={() => (stateUi.menuOpen = false)}
	/>

	<MainContainer standard alignVertical="bottom">
		<Container
			x={298}
			y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10}
		>
			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
