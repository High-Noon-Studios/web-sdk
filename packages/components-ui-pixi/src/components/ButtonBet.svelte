<script lang="ts">
	import { Container, Circle, Sprite } from 'pixi-svelte';
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
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Button {...props} {sizes} {onpress} {disabled}>
			{#snippet children({ center })}
				<Container {...center}>
					<Circle diameter={sizes.height * 1.15} anchor={0.5} backgroundColor={BLACK} alpha={0.9} />
					<Sprite
						anchor={0.5}
						width={sizes.width * 0.8}
						height={sizes.height * 0.8}
						key={['spin_default', 'spin_disabled'].includes(key) ? 'bet.png' : 'bet_stop.png'}
						{...disabled
							? {
									alpha: 0.25,
								}
							: {}}
					/>
				</Container>
			{/snippet}
		</Button>
	{/snippet}
</ButtonBetProvider>
