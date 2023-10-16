<!-- TODO: create this close button for models -->
<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let closeAction: MouseEventHandler<HTMLDivElement>;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={closeAction} class="cursor-pointer">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
        width="25"
        {...$$props}
		viewBox="0 0 24 24"
	>
		<path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)" /><path
			d="M0.7 11H23.3V13H0.7z"
			transform="rotate(-45.001 12 12)"
		/>
	</svg>
</div>
