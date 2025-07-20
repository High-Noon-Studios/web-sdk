<script lang="ts">
	import { Container } from 'pixi-svelte';

	import { getSymbolX } from '../game/utils';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import Symbol from './Symbol.svelte';

	const context = getContext();
</script>

{#each context.stateGame.stickySymbols as stickySymbol}
	<Container
		x={getSymbolX(stickySymbol.stickySymbol.reel)}
		y={stickySymbol.stickySymbol.row * SYMBOL_SIZE + SYMBOL_SIZE * 0.5}
	>
		<Symbol
			rawSymbol={{
				name: 'W',
				multiplier: stickySymbol.stickySymbol.multiplier,
			}}
			state={stickySymbol.state}
		/>
	</Container>
{/each}
