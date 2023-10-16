<script setup lang="ts">
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import Button from '../../../../components/Button/Button.svelte';
	import Divider from '../../../../components/Divider/Divider.svelte';
	import Input from '../../../../components/Input/Input.svelte';
	import AuthButtons from './AuthButtons.svelte';

	let email,password;

	const {} = createMutation({
		mutationKey:["shit"],
		mutationFn: () => fetch("/"),
	})
</script>

<div class="max-w-[350px] mt-8 flex flex-col">
	<AuthButtons action="In" />
	<div class="flex h-[5px] mt-5 items-center justify-center">
		<div class="bg-theme-dark_border flex-[2]">
			<Divider />
		</div>
		<div class="self-center text-center align-middle flex-1 text-xs text-theme-dark_text_secondary">
			or
		</div>
		<div class="bg-theme-dark_border flex-[2]">
			<Divider />
		</div>
	</div>

	<input
		type="text"
		placeholder="Enter email or mobile number"
		class="h-10 input bg-theme-light_hover dark:bg-theme-dark_hover outline-none mt-5 border-b px-3"
	/>

	<Button onClick={$$props.toggleModel} class="auth-btn bg-theme-blue mt-3 mb-2 text-sm">
		<span slot="name">Next</span>
	</Button>

	<Button
		class="auth-btn border-theme-light_border text-sm border-2 mt-7 dark:border-theme-dark_border bg-transparent"
	>
		<span slot="name"> Forgot Password? </span>
	</Button>

	<p
		class="text-xs text-center mt-5 text-theme-light_text_secondary dark:text-theme-dark_text_secondary"
	>
		Don’t have an account? <span
			><button
				on:click={() => $$props.setModalState('sign-up')}
				class="text-theme-blue cursor-pointer">Sign up</button
			></span
		>
	</p>
</div>
