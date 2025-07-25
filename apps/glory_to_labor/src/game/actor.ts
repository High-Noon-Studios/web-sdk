import { convertTorResumableBet, playBet } from './utils';
import { createGameActor, createIntermediateMachines, createPrimaryMachines } from 'utils-xstate';
import { stateGame, stateGameDerived } from './stateGame.svelte';

import type { Bet } from './typesBookEvent';
import _ from 'lodash';
import { checkIsMultipleRevealEvents } from 'utils-book';
import config from './config';
import { stateBet } from 'state-shared';
import { stateXstateDerived } from './stateXstate';

const primaryMachines = createPrimaryMachines<Bet>({
	onResumeGameActive: (lastBetData) => convertTorResumableBet(lastBetData),
	onResumeGameInactive: (lastBetData) => {
		const lastRevealEvent = _.findLast(
			lastBetData.state,
			(bookEvent) => bookEvent?.type === 'reveal',
		);

		if (lastRevealEvent) stateGameDerived.enhancedBoard.settle(lastRevealEvent.board);
	},
	onNewGameStart: async () => {
		if ((stateBet.isTurbo && stateXstateDerived.isAutoBetting()) || stateBet.isSpaceHold) return;
		stateBet.winBookEventAmount = 0;
		await stateGameDerived.enhancedBoard.preSpin({
			paddingBoard: config.paddingReels[stateGame.gameType],
		});
	},
	onNewGameError: () => stateGameDerived.enhancedBoard.settle(),
	onPlayGame: async (bet) => await playBet(bet),
	checkIsBonusGame: (bet) => checkIsMultipleRevealEvents({ bookEvents: bet.state }),
});

const intermediateMachines = createIntermediateMachines(primaryMachines);

export const gameActor = createGameActor(intermediateMachines);
