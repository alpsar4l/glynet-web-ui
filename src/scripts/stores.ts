import { writable } from 'svelte/store';

export let language = writable('tr');
export let activeModal = writable('tr');
export let user = writable({});
export let tab = writable('feed');
export let rank = writable({});
export let color = writable({
    'app-color': '#2dc6ce',
    'app-color-x1': '#14adb5',
    'app-color-s1': '#acffff',
    'app-color-trans': 'rgba(45,198,206,0.5)',
});