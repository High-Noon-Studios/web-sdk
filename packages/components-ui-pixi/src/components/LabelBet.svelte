<script lang="ts">
	import { Container } from 'pixi-svelte';
	import { stateBetDerived, stateModal } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import UiLabel from './UiLabel.svelte';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';

	type Props = {
		stacked?: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	const label = $derived(stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet());
	const value = $derived(numberToCurrencyString(stateBetDerived.betCost()));
	const disabled = $derived(!context.stateXstateDerived.isIdle());

	const onpress = () => {
		if (disabled) return;
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'betAmountMenu' };
	};
</script>

<Container eventMode="static" cursor={disabled ? 'not-allowed' : 'pointer'} onpointerup={onpress}>
	<UiLabel {label} {value} stacked={props.stacked} align="right" />
</Container>
