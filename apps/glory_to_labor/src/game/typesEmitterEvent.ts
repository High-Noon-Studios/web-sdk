import type { EmitterEventBoard } from '../components/Board.svelte';
import type { EmitterEventBoardFrame } from '../components/BoardFrame.svelte';
import type { EmitterEventFreeSpinCounter } from '../components/FreeSpinCounter.svelte';
import type { EmitterEventFreeSpinIntro } from '../components/FreeSpinIntro.svelte';
import type { EmitterEventFreeSpinOutro } from '../components/FreeSpinOutro.svelte';
import type { EmitterEventMarxLasers } from '../components/MarxLasers.svelte';
import type { EmitterEventSound } from '../components/Sound.svelte';
import type { EmitterEventStickyBoard } from '../components/StickyBoard.svelte';
import type { EmitterEventTransition } from '../components/Transition.svelte';
import type { EmitterEventWin } from '../components/Win.svelte';

export type EmitterEventGame =
	| EmitterEventBoard
	| EmitterEventBoardFrame
	| EmitterEventWin
	| EmitterEventFreeSpinIntro
	| EmitterEventFreeSpinCounter
	| EmitterEventFreeSpinOutro
	| EmitterEventSound
	| EmitterEventTransition
	| EmitterEventStickyBoard
	| EmitterEventMarxLasers;
