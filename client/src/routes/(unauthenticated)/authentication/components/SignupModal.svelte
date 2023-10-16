<script lang="ts">
	import Button from '../../../../components/Button/Button.svelte';
	import Divider from '../../../../components/Divider/Divider.svelte';

	import Input from '../../../../components/Input/Input.svelte';
	import AuthButtons from './AuthButtons.svelte';

	let email: string, username: string, fullName: string, password: string;

	function submit() {
		console.log(email, fullName, username, password);
	}
</script>

<div class="max-w-[350px] mt-8 flex flex-col">
	<AuthButtons action="Up" />
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
		type="email"
		bind:value={email}
		placeholder="Enter email"
		class="h-10 bg-theme-light_hover dark:bg-theme-dark_hover input mt-3 border-1 px-3"
	/>
	<input
		type="text"
		bind:value={fullName}
		placeholder="Enter full name"
		class="h-10 bg-theme-light_hover dark:bg-theme-dark_hover input outline-none mt-3 border-1 px-3"
	/>
	<input
		type="text"
		bind:value={username}
		placeholder="Enter username"
		class="h-10 bg-theme-light_hover dark:bg-theme-dark_hover input outline-none mt-3 border-1 px-3"
	/>
	<input
		type="text"
		bind:value={password}
		placeholder="Enter password"
		class="h-10 bg-theme-light_hover dark:bg-theme-dark_hover input outline-none mt-3 border-1 px-3"
	/>

	<Button onClick={submit} class="auth-btn mt-5 bg-theme-blue mb-2 text-sm">
		<span slot="name">Create account</span>
	</Button>

	<p
		class="text-xs text-center mt-5 text-theme-light_text_secondary dark:text-theme-dark_text_secondary"
	>
		Already have an account? <span
			><button
				on:click={() => $$props.setModalState('log-in')}
				class="text-theme-blue cursor-pointer">Sign in</button
			></span
		>
	</p>
</div>
