import { writable } from 'svelte/store';

export const user = writable({});
export let tab = writable('feed');