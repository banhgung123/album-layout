import axiosClient from './axiosClient';

const giphyApi = {
	get(params) {
		const url = process.env.REACT_APP_GIPHY_URL;
		return axiosClient.get(url, { params });
	},
};

export default giphyApi;
