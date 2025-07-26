import books from './base_books';

const reveal = books.find(book => book.payoutMultiplier === 0)!.events.find(event => event.type === 'reveal')!;
const setTotalWin = books.find(book => book.payoutMultiplier > 0)!.events.find(event => event.type === 'setTotalWin')!;
const winInfo = books.find(book => book.payoutMultiplier > 0)!.events.find(event => event.type === 'winInfo')!;
console.log(winInfo)
export default {
	reveal,
	setTotalWin,
	finalWin: {
		type: 'finalWin',
		amount: 0,
	},
	freeSpinTrigger: {
		type: 'freeSpinTrigger',
		totalFs: 12,
		positions: [
			{
				reel: 0,
				row: 3,
			},
			{
				reel: 1,
				row: 1,
			},
			{
				reel: 2,
				row: 3,
			},
			{
				reel: 4,
				row: 3,
			},
		],
	},
	updateFreeSpin: {
		type: 'updateFreeSpin',
		amount: 1,
		total: 12,
	},
	winInfo,
	setWin: {
		type: 'setWin',
		amount: 400,
		winLevel: 4,
	},
	freeSpinEnd: {
		type: 'freeSpinEnd',
		amount: 400,
		winLevel: 2,
	},
};
