<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CloseButton from '../CloseButton/CloseButton.svelte';

	// export let isOpen: boolean;
	export let overlay: boolean;
	export let closeButton: boolean;
	export let onClose: MouseEventHandler<HTMLDivElement>;
</script>

<div class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
	<!-- overlay -->
	{#if overlay}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={onClose}
			class="absolute top-0 left-0 backdrop-blur-sm w-full h-full z-10 bg-theme-light_hover dark:bg-theme-dark_hover"
		/>
	{/if}
	<div
		class="theme rounded-lg z-20 flex flex-col min-w-[380px] p-8 bg-theme-light_bg dark:bg-black"
	>
		<div class="flex-1 relative h-16 flex max-h-[60px] items-center justify-between">
			<div class="max-w-[12%] w-full">
				{#if closeButton}
					<CloseButton closeAction={onClose} class="absolute top-0 left-0" />
				{:else}
					<slot name="left" />
				{/if}
			</div>
			<div class="flex max-w-[75%] justify-center pointer-events-none whitespace-nowrap">
				<slot name="heading" />
			</div>
			<div class="max-w-[12%] w-full">
				<slot name="right" />
			</div>
		</div>
		<div class="flex-1 min-h-[350px] p-1">
			<slot name="body" />
		</div>
	</div>
</div>
