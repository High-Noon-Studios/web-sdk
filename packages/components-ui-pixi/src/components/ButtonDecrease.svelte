<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived, stateConfig } from 'state-shared';

	import { getContext } from '../context';
	import { UI_BASE_SIZE } from '../constants';
	import UiIconButton from './UiIconButton.svelte';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: UI_BASE_SIZE * 0.4, height: UI_BASE_SIZE * 0.4 };
	const smallest = $derived(stateConfig.betAmountOptions[0]);
	const disabled = $derived(
		!context.stateXstateDerived.isIdle() || stateBet.betAmount === smallest,
	);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

		const nextSmaller = [...stateConfig.betAmountOptions]
			.sort((a, b) => b - a)
			.find((option) => option < stateBet.betAmount);

		stateBetDerived.setBetAmount(nextSmaller || smallest);
	};

	let icon = $state('decrease_bet.png');
	$effect(() => {
		if (disabled) icon = 'decrease_bet_disabled.png';
		else icon = 'decrease_bet.png';
	});
</script>

<UiIconButton {...props} {sizes} {onpress} {disabled} {icon} />
