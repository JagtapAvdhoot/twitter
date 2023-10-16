<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { appStore } from '../composites/store';
	import { browser } from '$app/environment';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<main class={`${$appStore.theme} h-[100dvh] w-[100dvw] overflow-x-hidden`}>
		<slot />
	</main>
</QueryClientProvider>
