import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import {
	FETCHING_NEWS_REQUEST,
	FETCHING_NEWS_FAILURE,
	FETCHING_NEWS_SUCCESS,
	LOAD_MORE_NEWS_SUCCESS
} from '../actions/Types';

/**
 * This is the initial reducer state
 */
const initialState = {
	data: [],
	page: 1,
	loading: false,
	isRefreshing: false,
	errorMessage: '',
	isLoading: false
};

/**
 * Reducer will be called each time we dispatch data from our actions
 * @param {*} state state will be defaulted to the initialState in case it is not yet defined 
 * @param {*} action SUCCESS , Failure...
 */
const newsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_NEWS_REQUEST:
			return { ...state, isRefreshing: true, isLoading: true };
		case FETCHING_NEWS_FAILURE:
			return { ...state, isRefreshing: false, isLoading: false, errorMessage: action.payload };
		case FETCHING_NEWS_SUCCESS:
			return { ...state, isRefreshing: false, isLoading: false, data: action.payload, page: 3 };
		case LOAD_MORE_NEWS_SUCCESS:
			//Increasing the number of pages by 2 each time since we are getting 20 news each time (10 News a page)
			const v_page = state.page + 2;

			//Concatenation the new news received with the old news
			//setting all the loaders as false
			return {
				...state,
				isRefreshing: false,
				page: v_page,
				data: state.data.concat(action.payload),
				isLoading: false
			};
		default:
			return state;
	}
};

export default newsReducer;
