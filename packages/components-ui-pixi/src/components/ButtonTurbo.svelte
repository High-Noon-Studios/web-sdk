<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived } from 'state-shared';

	import { UI_BASE_SIZE } from '../constants';
	import { getContext } from '../context';
	import UiIconButton from './UiIconButton.svelte';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: UI_BASE_SIZE * 0.4, height: UI_BASE_SIZE * 0.4 };
	const active = $derived(stateBet.isTurbo);
	const disabled = $derived(stateBet.isSpaceHold);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
	};

	context.eventEmitter.subscribeOnMount({
		stopButtonClick: () => stateBetDerived.updateIsTurbo(true, { persistent: false }),
		stopButtonEnable: () => stateBetDerived.updateIsTurbo(false, { persistent: false }),
	});

	let icon = $state('turbo_off.png');
	$effect(() => {
		if (!active && !disabled) {
			icon = 'turbo_off.png';
		}

		if (active) {
			icon = 'turbo_active.png';
		}

		if (disabled) {
			icon = 'turbo_disabled.png';
		}
	});
</script>

<UiIconButton {...props} {sizes} {active} {onpress} {disabled} {icon} />
