<script lang="ts">
	import { Tween } from 'svelte/motion';

	import { stateBet } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import UiLabel from './UiLabel.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	type Props = {
		stacked?: boolean;
	};

	const props: Props = $props();
	const balanceTween = new Tween(stateBet.balanceAmount);
	const label = $derived(i18nDerived.balance());
	const value = $derived(numberToCurrencyString(balanceTween.current));

	$effect(() => {
		balanceTween.set(stateBet.balanceAmount);
	});
</script>

<UiLabel tiled={false} {label} {value} stacked={props.stacked} />
