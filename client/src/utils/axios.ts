import axios from 'axios';

const cancelToken = axios.CancelToken.source();

const requestService = axios.create({
	baseURL: 'http://localhost:5000/api',
	cancelToken: cancelToken.token,
	headers: {
		'Access-Control-Allow-Origin': 'http://localhost:5173'
	}
});

export default requestService;
