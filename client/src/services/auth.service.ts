import requestService from '../utils/axios';

export const signInWithGoogle = async () => {
	const response = await requestService.get('/authentication/sign-in/oauth/google');
	console.log(response);
	return response.data;
};
export const signInWithGitHub = async () => {
	const response = await requestService.get('/authentication/sign-in/oauth/github');
	console.log(response);
	return response.data;
};
