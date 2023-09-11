export function isTokenExpired(token: string | null | undefined) {
	if (!token) {
		return true;
	}

	const tokenParts = token.split('.');
	if (tokenParts.length !== 3) {
		return true;
	}

	const payload = JSON.parse(atob(tokenParts[1]));
	if (!payload.exp || typeof payload.exp !== 'number') {
		return true;
	}

	const currentTimestamp = Math.floor(Date.now() / 1000);
	return payload.exp < currentTimestamp;
}
