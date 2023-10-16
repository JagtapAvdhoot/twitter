<script setup lang="ts">
	import Button from '../../../../components/Button/Button.svelte';

	import { signInWithGitHub, signInWithGoogle } from '../../../../services/auth.service';

	import GoogleIcon from './Google.svg';
	import TwitterIcon from './Twitter.svg';
	import GithubIcon from './Github.svg';

	const handleGithubSignIn = async () => {
		console.log('+page.svelte:LINE', 'shit');
		await signInWithGitHub();
	};
	const handleGoogleSignIn = async () => {
		await signInWithGoogle();
	};

	export let action: 'In' | 'Up';
</script>

<div>
	<Button onClick={handleGoogleSignIn} class="auth-white-btn border-1 text-sm">
		<span slot="name">Sign {action} with Google</span>
		<span slot="right-icon">
			<img src={GoogleIcon} alt="google icon" class="w-5" />
		</span>
	</Button>
	<Button onClick={handleGithubSignIn} class="auth-btn bg-slate-700 text-white text-sm mt-2">
		<span slot="name">Sign {action} with Github</span>
		<span slot="right-icon">
			<img src={GithubIcon} alt="google icon" class="w-5" />
		</span>
	</Button>
	<Button class="auth-btn bg-theme-blue text-sm mt-2">
		<span slot="name">Sign {action} with Twitter</span>
		<span slot="right-icon">
			<img src={TwitterIcon} alt="google icon" class="w-5" />
		</span>
	</Button>
</div>
