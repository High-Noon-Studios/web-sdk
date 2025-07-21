import { createAsset } from 'pixi-svelte';
import img from './scatter.png';
import rawAtlas from './scatter.atlas?raw';
import spine from './scatter.json';

export default createAsset({ img, rawAtlas, spine });