import axios from 'axios';
import queryString from 'query-string';

const baseURL = import.meta.env.VITE_SERVER;
const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
	baseURL: baseURL || 'http://127.0.0.1:3001/api/v1/',
	paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
	return {
		...config,
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${getToken()}`,
		},
	};
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(err) => {
		if (!err.response) {
			return alert(err);
		}
		throw err.response;
	}
);

export default axiosClient;
