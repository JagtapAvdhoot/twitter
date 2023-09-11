<script>
	const footerLinks = [
		'About',
		'Help Centre',
		'Terms of Service',
		'Privacy Policy',
		'Cookie Policy',
		'Accessibility',
		'Ads info',
		'Blog',
		'Status',
		'Careers',
		'Brand Resources',
		'Advertising',
		'Marketing',
		'X for Business',
		'Developers',
		'Directory',
		'Settings',
		'© 2023 X Corp.'
	];
</script>

<div class="w-full text-center p-3">
	{#each footerLinks as link}
		<span class="text-theme-dark_text_secondary tracking-wide text-[10px] ml-3 first:ml-0">
			<a href={`/${link}`}> {link}</a>
		</span>
	{/each}
</div>
