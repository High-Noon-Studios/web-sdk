<script lang="ts">
	import { stateBet } from 'state-shared';
	import { getContext } from '../game/context';
	import { onMount } from 'svelte';

	const context = getContext();

	onMount(() => {
		console.log(JSON.stringify(stateBet.lastBet, null, 2))
		if (stateBet.lastBet?.active && stateBet.lastBet.mode) {
			stateBet.activeBetModeKey = stateBet.lastBet.mode;
		}
		console.log(stateBet.activeBetModeKey)
		context.eventEmitter.broadcast({ type: 'resumeBet' });
	});
</script>
