<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { stateModal, stateBet, stateBetDerived } from 'state-shared';

	import { UI_BASE_SIZE } from '../constants';
	import { getContext } from '../context';
	import { Container, Rectangle } from 'pixi-svelte';
	import { GREEN } from 'constants-shared/colors';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const { stateXstateDerived, eventEmitter } = getContext();
	const sizes = { width: UI_BASE_SIZE * 0.5, height: UI_BASE_SIZE };
	const disabled = $derived(!stateXstateDerived.isIdle());
	const active = $derived(stateBetDerived.activeBetMode()?.type === 'activate');

	const openModal = () => (stateModal.modal = { name: 'buyBonus' });
	const disableActiveBetMode = () => (stateBet.activeBetModeKey = 'base');
	const onpress = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });

		if (active) {
			disableActiveBetMode();
		} else {
			openModal();
		}
	};

	const getState = (value: {
		active: boolean;
		disabled: boolean;
		hovered: boolean;
		pressed: boolean;
	}) => {
		if (value.disabled) return 'disabled' as const;
		if (value.pressed) return 'pressed' as const;
		if (value.hovered) return 'hovered' as const;
		if (value.active) return 'active' as const;
		return 'default' as const;
	};

	// const gradientTexture = createGradientTexture([
	// 	{ offset: 0, color: '#93EBD4' },
	// 	{ offset: 0.5, color: '#6E96D5' },
	// 	{ offset: 1, color: '#65B1E6' },
	// ]);
</script>

<Button {...props} {sizes} {disabled} {onpress}>
	{#snippet children({ center, hovered, pressed })}
		{@const state = getState({
			active,
			disabled,
			hovered,
			pressed,
		})}

		<Container {...center}>
			<!-- <BaseSprite
				width={sizes.height}
				height={sizes.width}
				texture={gradientTexture}
				rotation={Math.PI * 0.5}
				pivot={{ x: 0.5, y: 1 }}
			/> -->
			<Rectangle
				width={sizes.width}
				height={sizes.height * 0.8}
				y={sizes.height * 0.1}
				backgroundColor={GREEN}
			/>
			<Text
				anchor={{ x: 0.5, y: 0.5 }}
				text="FEATURE"
				rotation={Math.PI * -0.5}
				style={{
					fill: 0xffffff,
					fontFamily: 'Arial Black',
					fontSize: UI_BASE_SIZE * 0.12,
					fontWeight: 'bolder',
				}}
				{...center}
			/>
		</Container>
		<!-- <UiSprite
			key="buyBonus"
			{...center}
			anchor={0.5}
			width={sizes.width}
			height={sizes.height}
			{...disabled
				? {
						backgroundColor: 0xaaaaaa,
					}
				: {}}
			{...active
				? {
						borderWidth: 10,
						borderColor: 0xffffff,
					}
				: {}}
		/>

		<Text
			{...center}
			anchor={0.5}
			text={state === 'active' ? i18nDerived.disable() : i18nDerived.buyBonus()}
			style={{
				align: 'center',
				wordWrap: true,
				wordWrapWidth: 200,
				fontFamily: 'Funnel Sans',
				fontWeight: '600',
				fontSize: UI_BASE_FONT_SIZE * 0.9,
				fill: 0xffffff,
			}}
		/> -->
	{/snippet}
</Button>
