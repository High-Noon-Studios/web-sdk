import { createAsset } from 'pixi-svelte';
import img from './vignette.png';
import rawAtlas from './vignette.atlas?raw';
import spine from './vignette.json';

export default createAsset({ img, rawAtlas, spine, preload: true });