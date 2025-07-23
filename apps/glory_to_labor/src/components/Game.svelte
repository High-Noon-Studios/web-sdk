<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM, Sprite, Filters, Container } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import StickyBoard from './StickyBoard.svelte';
	import Banner from './Banner.svelte';

	const context = getContext();

	onMount(() => (context.stateLayout.showLoadingScreen = true));

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});

	const crtFilter = new Filters.CRTFilter({
		noise: 0.1,
		noiseSize: 0.5,
		lineWidth: 1,
		curvature: 0,
		lineContrast: 0.01,
		seed: 1,
		vignetting: 0.4,
		vignettingAlpha: 1,
		vignettingBlur: 0.3,
	});
</script>

<App>
	<EnableSound />
	<EnableHotkey />
	<EnableGameActor />
	<EnablePixiExtension />

	<Container filters={[crtFilter]}>
		<Background  />
	</Container>

		{#if context.stateLayout.showLoadingScreen}
			<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
		{:else}
			<ResumeBet />
			<!--
				The reason why <Sound /> is rendered after clicking the loading screen:
				"Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
				Ref: https://developer.chrome.com/blog/autoplay
			-->
			<Sound />

			<MainContainer>
				<BoardFrame />
			</MainContainer>

			<MainContainer>
				<Board />
				<Anticipations />
					<Banner />
				<StickyBoard />
			</MainContainer>

			<UI>
				{#snippet gameName()}
					<UiGameName name="Glory to Labor!" />
				{/snippet}
				{#snippet logo()}
					<Text
						anchor={{ x: 1, y: 0 }}
						text="Glory to Labor!"
						style={{
							fontFamily: 'Funnel Sans',
							fontSize: REM * 1.5,
							fontWeight: '600',
							lineHeight: REM * 2,
							fill: 0xffffff,
						}}
					/>
				{/snippet}
			</UI>
			<Win />
			<FreeSpinIntro />
			{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
				<FreeSpinCounter />
			{/if}
			<FreeSpinOutro />
			<Transition />

			<!-- <I18nTest /> -->
		{/if}
</App>

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>
