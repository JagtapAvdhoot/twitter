<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { appStore } from '../composites/store';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<main class={`${$appStore.theme} h-[100dvh] w-[100dvw] overflow-x-hidden`}>
		<slot />
	</main>
</QueryClientProvider>
