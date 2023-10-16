<script lang="ts" setup>
	export let value: string | number;
</script>

<input class="w-full h-full outline-none border-none" bind:value {...$$props} />
