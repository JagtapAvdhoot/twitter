<script lang="ts">
</script>

<button {...$$props} on:click={$$props.onClick}>
	<div class="flex items-center relative w-full min-w-[200px]">
		<div class="absolute left-0">
			<slot name="left-icon" />
		</div>
		<div class="text-center flex-1 w-full justify-self-center">
			<slot name="name" />
		</div>
		<div class="absolute right-5">
			<slot name="right-icon" />
		</div>
	</div>
</button>
