<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';

	import type { Snippet } from 'svelte';

	type Props = Omit<ButtonProps, 'children'> & {
		icon: string;
		sizes: { width: number; height: number };
		active?: boolean;
		children?: Snippet;
		variant?: 'dark' | 'light';
	};

	const {
		icon,
		active,
		variant = 'dark',
		children: childrenFromParent,
		...buttonProps
	}: Props = $props();
</script>

<Button {...buttonProps}>
	{#snippet children({ center, hovered, pressed })}
	  {@render childrenFromParent?.()}

		<Sprite
			{...center}
			anchor={0.5}
			width={buttonProps.sizes.width}
			height={buttonProps.sizes.height}
			key={icon}
		/>
	{/snippet}
</Button>
