import { FETCHING_NEWS_REQUEST, FETCHING_NEWS_FAILURE, FETCHING_NEWS_SUCCESS, LOAD_MORE_NEWS_SUCCESS } from './Types';
import Axios from 'axios';
import { GLOBAL_VAR } from '../../GLOBAL_VAR';
export const fetchingNewsRequest = () => ({ type: FETCHING_NEWS_REQUEST });

export const fetchingNewsSuccess = (json) => ({
	type: FETCHING_NEWS_SUCCESS,
	payload: json
});

export const fetchingNewsFailure = (error) => ({
	type: FETCHING_NEWS_FAILURE,
	payload: error
});

export const fetchNews = (page, query) => {
	return async (dispatch) => {
		dispatch(fetchingNewsRequest());
		try {
			let res = await Axios.get(
				GLOBAL_VAR.API_URL +
					`articlesearch.json?api-key=${GLOBAL_VAR.API_KEY}&sort=newest&page=${page}&q=${query}`
			);

			dispatch(fetchingNewsSuccess(res.data.response.docs));
		} catch (error) {
			dispatch(fetchingNewsFailure(error));
		}
	};
};

export const loadMoreNewsSuccess = (json) => ({
	type: LOAD_MORE_NEWS_SUCCESS,
	payload: json
});

export const loadMoreNews = (page) => {
	return async (dispatch) => {
		dispatch(fetchingNewsRequest());
		try {
			let res = await Axios.get(
				GLOBAL_VAR.API_URL + `articlesearch.json?api-key=${GLOBAL_VAR.API_KEY}&sort=newest&page=${page}`
			);

			dispatch(loadMoreNewsSuccess(res.data.response.docs));
		} catch (error) {
			dispatch(fetchingNewsFailure(error));
		}
	};
};
