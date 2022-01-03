import { writable } from 'svelte/store';

export let user = writable({});
export let tab = writable('feed');
export let rank = writable({});