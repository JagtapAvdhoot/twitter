<script>
	import Logo from '../../../components/Logo/Logo.svelte';
	import AuthFooter from './components/AuthFooter.svelte';
	import Button from '../../../components/Button/Button.svelte';
	import Divider from '../../../components/Divider/Divider.svelte';

	import GoogleIcon from './components/Google.svg';
	import Modal from '../../../components/Modal/Modal.svelte';

	let isCreateModelOpen = false;

	function toggleModel() {
		isCreateModelOpen = !isCreateModelOpen;
		console.log('+page.svelte:LINE', isCreateModelOpen);
	}
</script>

<div class="bg-black w-full flex flex-col h-auto min-h-full">
	<div class="flex flex-col flex-1 lg:flex-row px-14">
		<div class="block lg:flex flex-1 min-h-full items-center justify-center py-5">
			<Logo class="fill-theme-light_bg h-11 lg:h-80" />
		</div>
		<div class="flex-1 flex justify-center flex-col text-theme-dark_text mt-7">
			<h1 class="font-extrabold text-5xl mb-16">Happening now</h1>
			<h3 class="font-bold text-2xl">Join today.</h3>

			<div class="max-w-[300px] mt-8">
				<Button class="auth-white-btn text-sm">
					<span slot="name">Sign In with Google</span>
					<span slot="right-icon">
						<img src={GoogleIcon} alt="google icon" class="w-5" />
					</span>
				</Button>
				<Button class="auth-white-btn mt-3 text-sm">
					<span slot="name">Sign In with Apple</span>
				</Button>

				<div class="flex h-[5px] mt-5 items-center justify-center">
					<div class="bg-theme-dark_border flex-[2]">
						<Divider />
					</div>
					<div
						class="self-center text-center align-middle flex-1 text-xs text-theme-dark_text_secondary"
					>
						or
					</div>
					<div class="bg-theme-dark_border flex-[2]">
						<Divider />
					</div>
				</div>

				<Button class="auth-btn bg-theme-blue mt-3 mb-2 text-sm">
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span
						on:click={toggleModel}
						slot="name">Create account</span
					>
				</Button>

				<span class="w-full leading-3 text-theme-dark_text_secondary text-[9px]">
					<p>
						By signing up, you agree to the <a href="#none" class="text-theme-blue"
							>Terms of Service</a
						>
						and <a href="#none" class="text-theme-blue">Privacy Policy</a>, including
						<a href="#none" class="text-theme-blue">Cookie Use</a>.
					</p>
				</span>

				<h3 class="font-bold text-xl mt-16">Already have an account.</h3>
				<Button
					class="auth-btn border border-theme-dark_border text-sm hover:bg-theme-dark_hover text-theme-blue mt-3 mb-2"
				>
					<span slot="name">Sign in</span>
				</Button>
			</div>
		</div>
	</div>
	<div class="h-auto">
		<AuthFooter />
	</div>
</div>

{#if isCreateModelOpen}
	<Modal overlay={true} onClose={toggleModel} />
{/if}
