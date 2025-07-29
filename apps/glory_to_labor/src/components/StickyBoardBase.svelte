<script lang="ts">
	import { Container } from 'pixi-svelte';

	import { getSymbolX, getSymbolY } from '../game/utils';
	import { getContext } from '../game/context';
	import Symbol from './Symbol.svelte';

	const context = getContext();
</script>

{#each context.stateGame.stickySymbols as stickySymbol}
	<Container
		x={getSymbolX(stickySymbol.stickySymbol.reel)}
		y={getSymbolY(stickySymbol.stickySymbol.row - 1)}
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
