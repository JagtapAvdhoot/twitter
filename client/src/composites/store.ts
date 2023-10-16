import { writable, readable } from 'svelte/store';
import { browser } from '$app/environment';
import {
	twitter_clone_accent_name,
	twitter_clone_theme_name,
	twitter_clone_token_name
} from '../utils/constants';

export const authStore = writable({
	token: browser ? localStorage.getItem(twitter_clone_token_name) : null,
	signedUser: null
});

export const appStore = writable({
	theme:
		browser && localStorage.getItem(twitter_clone_theme_name)
			? localStorage.getItem(twitter_clone_theme_name)
			: 'dark',
	accent:
		browser && localStorage.getItem(twitter_clone_accent_name)
			? localStorage.getItem(twitter_clone_accent_name)
			: 'blue'
});
