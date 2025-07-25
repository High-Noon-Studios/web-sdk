import H1 from './h1.json';
import H2 from './h2.json';
import H3 from './h3.json';
import H4 from './h4.json';
import { createAsset } from 'pixi-svelte';
import img from './main.webp';
import rawAtlas from './main.atlas?raw';

export default createAsset({
	img,
	rawAtlas,
	spines: {
		H1,
		H2,
		H3,
		H4,
	},
});