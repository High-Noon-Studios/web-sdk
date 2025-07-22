<script lang="ts">
	import { Container, Circle } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { UI_BASE_SIZE } from '../constants';
	import { BLACK } from 'constants-shared/colors';
	import UiIconButton from './UiIconButton.svelte';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

	let icon = $state('bet.png');
	$effect(() => {
		if (disabled) {
			icon = 'bet_disabled.png';
		} else {
			icon = 'bet.png';
		}
	});
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Button {...props} {sizes} {onpress} {disabled}>
			{#snippet children({ center, hovered })}
				<Container {...center}>
					<Circle diameter={sizes.height * 1.3} anchor={0.5} backgroundColor={BLACK} />
					<UiIconButton
						{icon}
						sizes={{ height: sizes.height, width: sizes.width }}
						anchor={0.5}
						{onpress}
						{disabled}
					/>
				</Container>
			{/snippet}
		</Button>
	{/snippet}
</ButtonBetProvider>
