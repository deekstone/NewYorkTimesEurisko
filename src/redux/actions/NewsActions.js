import { FETCHING_NEWS_REQUEST, FETCHING_NEWS_FAILURE, FETCHING_NEWS_SUCCESS, LOAD_MORE_NEWS_SUCCESS } from './Types';
import Axios from 'axios';
import { GLOBAL_VAR } from '../../GLOBAL_VAR';
export const fetchingNewsRequest = () => ({ type: FETCHING_NEWS_REQUEST });

/**
 * Retuns the data with a success FLAG 
 * @param {*} json Is the data returned from the API after successfully calling the API 
 */
export const fetchingNewsSuccess = (json) => ({
	type: FETCHING_NEWS_SUCCESS,
	payload: json
});

/**
 * Returns the error from the api with a FLAG 
 * @param {*} error error returned after calling the API
 */
export const fetchingNewsFailure = (error) => ({
	type: FETCHING_NEWS_FAILURE,
	payload: error
});

/**
 * Getting news from the New York Times Api 
 * This is used when performing a swipe to refresh and when searching for a text 
 * @param {Intrger} page Page number
 * @param {String} query search text 
 */
export const fetchNews = (page, query = '') => {
	return async (dispatch) => {
		dispatch(fetchingNewsRequest());
		try {
			let res_1 = await Axios.get(
				GLOBAL_VAR.API_URL +
					`articlesearch.json?api-key=${GLOBAL_VAR.API_KEY}&sort=newest&page=${page}&q=${query}`
			);

			let res_2 = await Axios.get(
				GLOBAL_VAR.API_URL +
					`articlesearch.json?api-key=${GLOBAL_VAR.API_KEY}&sort=newest&page=${page + 1}&q=${query}`
			);

			dispatch(fetchingNewsSuccess([ ...res_1.data.response.docs, ...res_2.data.response.docs ]));
		} catch (error) {
			dispatch(fetchingNewsFailure(error));
		}
	};
};

/**
 * THis is called after successfully loading more news  
 * @param {*} json data retuned after loading more news 
 */
export const loadMoreNewsSuccess = (json) => ({
	type: LOAD_MORE_NEWS_SUCCESS,
	payload: json
});

/**
 * This function loads more news.
 * Here we are performing 2 API calls in order to get a total of 20 news 
 * Async Await is used in order to wait for each API call to finish before dispatching the Total data received
 * @param {*} page Page number
 * @param {*} query Search Text 
 */
export const loadMoreNews = (page, query) => {
	return async (dispatch) => {
		dispatch(fetchingNewsRequest());
		try {
			let res_1 = await Axios.get(
				GLOBAL_VAR.API_URL +
					`articlesearch.json?api-key=${GLOBAL_VAR.API_KEY}&sort=newest&page=${page}&q=${query}`
			);
			//we are increasing the number of page by 1 each time to get the next page
			let res_2 = await Axios.get(
				GLOBAL_VAR.API_URL +
					`articlesearch.json?api-key=${GLOBAL_VAR.API_KEY}&sort=newest&page=${page + 1}&q=${query}`
			);

			//Here the data from the first and the second api call are being concatenated and then dispatched
			dispatch(loadMoreNewsSuccess([ ...res_1.data.response.docs, ...res_2.data.response.docs ]));
		} catch (error) {
			//In case of an error.
			//the error will be dispatched
			dispatch(fetchingNewsFailure(error));
		}
	};
};
