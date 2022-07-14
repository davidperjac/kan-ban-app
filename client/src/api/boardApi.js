import axiosClient from './axiosClient';

const boardApi = {
	create: () => axiosClient.post('boards'),
	getAll: () => axiosClient.get('boards'),
};

export default boardApi;
