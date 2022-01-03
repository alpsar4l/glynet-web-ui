<script lang="ts">
	// Modules
	import page from 'page';

	// Pages
	import Home from "./pages/Home/index.svelte";
	import About from "./pages/About/index.svelte";

	// Components
	import Header from "./components/Header/index.svelte";
	import LeftMenu from "./components/Menu/index.svelte";
	import FixedRightPanel from "./components/Right/index.svelte";

	// Stores
	import { user, tab } from './stores.ts';

	let current = Home;
	let current_tab: string;

	page('/', () => (current = Home));
	page('/about', () => (current = About));

	page.start();

	tab.subscribe(value => {
		current_tab = value;
	});
</script>

<svelte:head>
	<title>Glynet</title>
	<link rel="shortcut icon" href="./static/images/g-logo-200x200.png" type="image/x-icon">
</svelte:head>

<main>
	<div class="app">
		<div class="left">
			<LeftMenu />
		</div>
		<div class="center">
			<div class="content">
				<Header />
			</div>
		</div>
		<div class="right">
			<FixedRightPanel />
		</div>
	</div>
</main>

<style lang="scss">
	@import "style/style";
</style>