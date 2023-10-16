<script setup lang="ts">
	import Logo from '../../../components/Logo/Logo.svelte';
	import AuthFooter from './components/AuthFooter.svelte';
	import Button from '../../../components/Button/Button.svelte';
	import Divider from '../../../components/Divider/Divider.svelte';
	import LoginModal from './components/LoginModal.svelte';
	import SignupModal from './components/SignupModal.svelte';

	import GoogleIcon from './components/Google.svg';
	import TwitterIcon from './components/Twitter.svg';
	import GithubIcon from './components/Github.svg';

	import Modal from '../../../components/Modal/Modal.svelte';

	let isCreateModelOpen = true;

	function toggleModel(state: 'sign-up' | 'log-in') {
		setModalState(state);
		isCreateModelOpen = !isCreateModelOpen;
	}

	let modalState: 'sign-up' | 'log-in' = 'sign-up';

	const setModalState = (value: 'sign-up' | 'log-in') => {
		modalState = value;
	};
</script>

<div class="bg w-full flex flex-col h-auto min-h-full">
	<div class="flex flex-col flex-1 lg:flex-row px-14">
		<div class="block lg:flex flex-1 min-h-full items-center justify-center py-5">
			<Logo class="theme h-11 lg:h-80" />
		</div>
		<div class="flex-1 flex justify-center flex-col text mt-7">
			<h1 class="font-extrabold text-5xl mb-16">Happening now</h1>
			<h3 class="font-bold text-2xl">Join today.</h3>

			<div class="max-w-[300px] mt-8">
				<Button class="auth-white-btn border-1 text-sm">
					<span slot="name">Sign In with Google</span>
					<span slot="right-icon">
						<img src={GoogleIcon} alt="google icon" class="w-5" />
					</span>
				</Button>
				<Button class="auth-btn bg-slate-700 text-white text-sm mt-2">
					<span slot="name">Sign In with Github</span>
					<span slot="right-icon">
						<img src={GithubIcon} alt="google icon" class="w-5" />
					</span>
				</Button>
				<Button class="auth-btn bg-theme-blue text-sm mt-2">
					<span slot="name">Sign In with Twitter</span>
					<span slot="right-icon">
						<img src={TwitterIcon} alt="google icon" class="w-5" />
					</span>
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

				<Button
					onClick={() => toggleModel('sign-up')}
					class="auth-btn bg-theme-blue mt-3 mb-2 text-sm"
				>
					<div slot="name">Create account</div>
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
					onClick={() => toggleModel('log-in')}
					class="auth-btn border border-theme-dark_border text-sm hover:bg-theme-dark_hover text-theme-blue mt-3 mb-2"
				>
					<div slot="name">Sign in</div>
				</Button>
			</div>
		</div>
	</div>
	<div class="h-auto">
		<AuthFooter />
	</div>
</div>

{#if isCreateModelOpen}
	<Modal overlay={true} onClose={() => toggleModel('log-in')} closeButton={true}>
		<p slot="heading" class="truncate text-xl font-bold">
			<Logo class="h-10" />
		</p>
		<div slot="body">
			{#if modalState === 'log-in'}
				<LoginModal {toggleModel} {setModalState} />
			{:else}
				<SignupModal {toggleModel} {setModalState} />
			{/if}
		</div>
	</Modal>
{/if}
