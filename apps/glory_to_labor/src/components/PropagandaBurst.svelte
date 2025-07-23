<!-- function makePropagandaBurst(
  wedges = 48,
  innerR = 0,
  outerR = 900,
  color = 0xD40000,
) {
  const g = new Graphics();
  const step = (Math.PI * 2) / wedges;

  for (let i = 0; i < wedges; i += 2) {          // every second wedge → red
    const a0 = i * step;
    const a1 = a0 + step;

    g.beginFill(color);
    g.moveTo(0, 0);
    g.lineTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    g.lineTo(Math.cos(a0) * outerR, Math.sin(a0) * outerR);
    g.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
    g.lineTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
    g.closePath();
    g.endFill();
  }

  return g;
} -->

<script lang="ts">
	import { Graphics, Rectangle } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { COLORS } from '../game/constants';

  type Props = {
		wedges: number;
		innerR: number;
		outerR: number;
		color: number;
	};

	const {wedges, innerR, outerR, color}: Props = $props();

	const context = getContext();
	const { width, height } = context.stateLayoutDerived.canvasSizes();
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={COLORS.cream} zIndex={-3} />


<Graphics draw={(g) => {
  const step = (Math.PI * 2) / wedges;

  for (let i = 0; i < wedges; i += 2) {          // every second wedge → red
    const a0 = i * step;
    const a1 = a0 + step;

    g.moveTo(0, 0);
    g.lineTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    g.lineTo(Math.cos(a0) * outerR, Math.sin(a0) * outerR);
    g.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
    g.lineTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
    g.closePath();
    g.fill(color);
  }
}} />
