<script lang="ts">
	// Modules
	import { onMount } from "svelte";
	import page from 'page';

	// Pages
	import Home from "./pages/Home/index.svelte";
	import Explore from "./pages/Explore/index.svelte";

	// Components
	import Header from "./components/Header/index.svelte";
	import LeftMenu from "./components/Menu/index.svelte";
	import FixedRightPanel from "./components/Right/index.svelte";

	// Stores
	import { user, rank } from './stores.ts';

	// Config
	import Config from "./config.ts";

	let current = Home;

	page('/', () => (current = Home));
	page('/explore', () => (current = Explore));

	page.start();

	onMount(async () => {
		fetch(`${Config.API_URL}/api/@me/client`)
				.then(response => response.json())
				.then(data => {
					user.update(n => data);
				}).catch(error => {
			console.log(error);
			return [];
		});

		fetch(`${Config.API_URL}/api/@me/client/level`)
				.then(response => response.json())
				.then(data => {
					rank.update(n => data);
				}).catch(error => {
			console.log(error);
			return [];
		});
	});
</script>

<svelte:head>
	<title>Glynet</title>
	<link rel="shortcut icon" href="./static/images/g-logo-200x200.png" type="image/x-icon">
</svelte:head>

<main>
	<!---
	<div class="where">
		<span>{$tab}</span>
	</div>
	--->

	<div class="app">
		<div class="left">
			<LeftMenu />
		</div>
		<div class="center">
			<div class="content">
				<Header />

				<div class="dynamic">
					<svelte:component this={current} />
				</div>
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