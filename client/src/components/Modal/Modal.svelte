<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	// export let isOpen: boolean;
	export let overlay: boolean;
	export let onClose: MouseEventHandler<HTMLDivElement>;
</script>

<div class="fixed w-full h-full z-10 top-0 left-0 flex items-center justify-center">
	<!-- overlay -->
	{#if overlay}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={onClose}
			class="absolute top-0 left-0 w-full h-full z-10 bg-theme-light_hover dark:bg-theme-dark_hover"
		/>
	{/if}

	<div class="theme flex flex-col p-5">
		<div class="flex-1 flex items-center justify-between border ">
            <!-- TODO:add styles to these icons and buttons -->
			<div class="" >
				<slot name="left" />
			</div>
			<div class="" >
				<slot name="heading" />
			</div>
			<div class="" >
				<slot name="right" />
			</div>
		</div>
		<div class="flex-1">
			<slot name="body" />
		</div>
	</div>
</div>
