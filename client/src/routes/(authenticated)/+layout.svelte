<script>
	import '../app.css';
	import { redirect } from '@sveltejs/kit';
	import { isTokenExpired } from '../../utils/functions';
	import { authStore } from '../../composites/store';
	
	if (isTokenExpired($authStore.token)) {
		throw redirect(308, '/authentication');
	}
</script>

<section>
	<h1>nigger</h1>
	<slot />
</section>
