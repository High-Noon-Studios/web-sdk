<script lang="ts" module>
	export type EmitterEventStickyBoard =
		| { type: 'stickyBoardShow' }
		| { type: 'stickyBoardHide' }
		| { type: 'stickyBoardNew'; stickySymbols: StickySymbolWin[] }
		| {
				type: 'stickyBoardAnimateSymbols';
				symbols: StickySymbolWin[];
		  }
		| { type: 'stickyBoardClear' };
</script>

<script lang="ts">
	import _ from 'lodash';

	import { waitForResolve } from 'utils-shared/wait';
	import { BoardContext } from 'components-shared';

	import BoardMask from './BoardMask.svelte';
	import BoardContainer from './BoardContainer.svelte';
	import StickyBoardBase from './StickyBoardBase.svelte';
	import { getContext } from '../game/context';
	import type { StickySymbolWin, SymbolState } from '../game/types';

	const context = getContext();

	let show = $state(true);

	context.eventEmitter.subscribeOnMount({
		stickyBoardShow: () => (show = true),
		stickyBoardHide: () => (show = false),
		stickyBoardNew: async (emitterEvent) => {
			context.stateGame.stickySymbols = [
				...context.stateGame.stickySymbols,
				...emitterEvent.stickySymbols.map((stickySymbol) => ({
					stickySymbol,
					isOpen: false,
					state: 'land' as SymbolState,
					oncomplete: () => {},
				})),
			];
		},
		stickyBoardAnimateSymbols: async ({ symbols }) => {},
		stickyBoardClear: () => {
			context.stateGame.stickySymbols = [];
		},
	});
</script>

{#if show}
	<BoardContext animate={false}>
		<BoardContainer>
			<BoardMask />
			<StickyBoardBase />
		</BoardContainer>
	</BoardContext>

	<BoardContext animate={true}>
		<BoardContainer>
			<StickyBoardBase />
		</BoardContainer>
	</BoardContext>
{/if}
