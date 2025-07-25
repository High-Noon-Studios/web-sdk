import type { RawSymbol, SymbolState } from './types';

import _ from 'lodash';

export const COLORS = {
	white: 0xf2f2f2,
	red: 0xbe2424,
	orange: 0xf29a2e,
	yellow: 0xf1c22d,
	rust: 0xbe5c2e,
	soot: 0x5b5147,
	cream: 0xe5d6ab,
}
export const SYMBOL_SIZE = 150;

export const REEL_PADDING = 0.5;

// initial board (padded top and bottom)
export const INITIAL_BOARD: RawSymbol[][] = [
	[
		{
			name: 'S',
		},
		{
			name: 'S',
		},
		{
			name: 'L2',
		},
		{
			name: 'L1',
		},
		{
			name: 'L4',
		},
	],
	[
		{
			name: 'L2',
		},
		{
			name: 'L1',
		},
		{
			name: 'H2',
		},
		{
			name: 'L1',
		},
		{
			name: 'H2',
		},
	],
	[
		{
			name: 'L2',
		},
		{
			name: 'L1',
		},
		{
			name: 'H1',
		},
		{
			name: 'L5',
		},
		{
			name: 'L2',
		}
	],
	[
		{
			name: 'L2',
		},
		{
			name: 'L1',
		},
		{
			name: 'H3',
		},
		{
			name: 'L4',
		},
		{
			name: 'H1',
		}
	],
	[
		{
			name: 'L2',
		},
		{
			name: 'L1',
		},
		{
			name: 'L3',
		},
		{
			name: 'L5',
		},
		{
			name: 'L3',
		},
	],
];

export const BOARD_DIMENSIONS = { x: INITIAL_BOARD.length, y: INITIAL_BOARD[0].length - 2 };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const BACKGROUND_RATIO = 2039 / 1000;
export const PORTRAIT_BACKGROUND_RATIO = 1242 / 2208;
const PORTRAIT_RATIO = 800 / 1422;
const LANDSCAPE_RATIO = 1600 / 900;
const DESKTOP_RATIO = 1422 / 800;

const DESKTOP_HEIGHT = 800;
const LANDSCAPE_HEIGHT = 900;
const PORTRAIT_HEIGHT = 1422;
export const DESKTOP_MAIN_SIZES = { width: DESKTOP_HEIGHT * DESKTOP_RATIO, height: DESKTOP_HEIGHT };
export const LANDSCAPE_MAIN_SIZES = {
	width: LANDSCAPE_HEIGHT * LANDSCAPE_RATIO,
	height: LANDSCAPE_HEIGHT,
};
export const PORTRAIT_MAIN_SIZES = {
	width: PORTRAIT_HEIGHT * PORTRAIT_RATIO,
	height: PORTRAIT_HEIGHT,
};

export const HIGH_SYMBOLS = ['H1', 'H2', 'H3', 'H4'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const HIGH_SYMBOL_SIZE = 1.1;
const SCATTER_SYMBOL_SIZE = 1.5;

const SPIN_OPTIONS_SHARED = {
	reelBounceBackSpeed: 0.1,
	reelSpinSpeedBeforeBounce: 6,
	reelPaddingMultiplierNormal: 2,
	reelPaddingMultiplierAnticipated: 12,
	reelSpinDelay: 1,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 6,
	reelSpinSpeed: 6,
	reelBounceSizeMulti: 0.15,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 10,
	reelSpinSpeed: 10,
	reelBounceSizeMulti: 0.1,
};

export const MOTION_BLUR_VELOCITY = 31;

export const zIndexes = {
	background: {
		backdrop: -3,
		normal: -2,
		feature: -1,
	},
};

const explosion = {
	type: 'spine',
	assetKey: 'explosion',
	animationName: 'explosion',
	sizeRatios: { width: 1, height: 1 },
};

const scatterLand = {
	type: 'spine',
	assetKey: 'scatter',
	animationName: 'land',
	sizeRatios: { width: 1, height: 1 },
}

const h1Land = { type: 'spine', assetKey: 'H1', animationName: 'land', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE }, timeScale: 2 };
const h2Land = { type: 'spine', assetKey: 'H2', animationName: 'land', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE }, timeScale: 2 };
const h3Land = { type: 'spine', assetKey: 'H3', animationName: 'land', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE }, timeScale: 2 };
const h4Land = { type: 'spine', assetKey: 'H4', animationName: 'land', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE }, timeScale: 2 };

const h1Static = { type: 'spine', assetKey: 'H1', animationName: 'static', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE } };
const h2Static = { type: 'spine', assetKey: 'H2', animationName: 'static', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE } };
const h3Static = { type: 'spine', assetKey: 'H3', animationName: 'static', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE } };
const h4Static = { type: 'spine', assetKey: 'H4', animationName: 'static', sizeRatios: { width: HIGH_SYMBOL_SIZE * 0.6933203125, height: HIGH_SYMBOL_SIZE } };

const l1Static = { type: 'sprite', assetKey: 'L1.png', sizeRatios: { width: 1.37 / 2.15, height: 2.15 / 2.15 } };
const l2Static = { type: 'sprite', assetKey: 'L2.png', sizeRatios: { width: 1.37 / 2.15, height: 2.15 / 2.15 } };
const l3Static = { type: 'sprite', assetKey: 'L3.png', sizeRatios: { width: 1.37 / 2.15, height: 2.15 / 2.15 } };
const l4Static = { type: 'sprite', assetKey: 'L4.png', sizeRatios: { width: 1.37 / 2.15, height: 2.15 / 2.15 } };
const l5Static = { type: 'sprite', assetKey: 'L5.png', sizeRatios: { width: 1.37 / 2.15, height: 2.15 / 2.15 } };

const sStatic = { type: 'spine', assetKey: 'scatter', animationName: 'idle', sizeRatios: { width: 1, height: 1 } };
const wStatic = { type: 'sprite', assetKey: 'Wild.png', sizeRatios: { width: 1.1 * 1.37 / 2.15, height: 1.1 * 2.15 / 2.15 } };

export const SYMBOL_INFO_MAP = {
	H1: {
		explosion,
		win: h1Static,
		postWinStatic: h1Static,
		static: h1Static,
		spin: h1Static,
		land: h1Land,
	},
	H2: {
		explosion,
		win: h2Static,
		postWinStatic: h2Static,
		static: h2Static,
		spin: h2Static,
		land: h2Land,
	},
	H3: {
		explosion,
		win: h3Static,
		postWinStatic: h3Static,
		static: h3Static,
		spin: h3Static,
		land: h3Land,
	},
	H4: {
		explosion,
		win: h4Static,
		postWinStatic: h4Static,
		static: h4Static,
		spin: h4Static,
		land: h4Land,
	},
	L1: {
		explosion,
		win: l1Static,
		postWinStatic: l1Static,
		static: l1Static,
		spin: l1Static,
		land: l1Static,
	},
	L2: {
		explosion,
		win: l2Static,
		postWinStatic: l2Static,
		static: l2Static,
		spin: l2Static,
		land: l2Static,
	},
	L3: {
		explosion,
		win: l3Static,
		postWinStatic: l3Static,
		static: l3Static,
		spin: l3Static,
		land: l3Static,
	},
	L4: {
		explosion,
		win: l4Static,
		postWinStatic: l4Static,
		static: l4Static,
		spin: l4Static,
		land: l4Static,
	},
	L5: {
		explosion,
		win: l5Static,
		postWinStatic: l5Static,
		static: l5Static,
		spin: l5Static,
		land: l5Static,
	},
	W: {
		explosion,
		postWinStatic: wStatic,
		static: wStatic,
		spin: wStatic,
		win: wStatic,
		land: wStatic,
	},
	S: {
		explosion,
		postWinStatic: sStatic,
		static: sStatic,
		spin: sStatic,
		win: sStatic,
		land: scatterLand,
	},
} as const;

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
	4: 'sfx_scatter_stop_4',
	5: 'sfx_scatter_stop_5',
	6: 'sfx_scatter_stop_5',
} as const;
