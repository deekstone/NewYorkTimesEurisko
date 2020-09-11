import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import {
	FETCHING_NEWS_REQUEST,
	FETCHING_NEWS_FAILURE,
	FETCHING_NEWS_SUCCESS,
	LOAD_MORE_NEWS_SUCCESS
} from '../actions/Types';

const initialState = {
	data: [],
	page: 1,
	loading: false,
	isRefreshing: false,
	errorMessage: ''
};

const newsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_NEWS_REQUEST:
			return { ...state, isRefreshing: true };
		case FETCHING_NEWS_FAILURE:
			return { ...state, isRefreshing: false, errorMessage: action.payload };
		case FETCHING_NEWS_SUCCESS:
			return { ...state, isRefreshing: false, data: action.payload, page: 2 };
		case LOAD_MORE_NEWS_SUCCESS:
			const v_page = state.page + 1;
			return { ...state, isRefreshing: false, page: v_page, data: state.data.concat(action.payload) };
		default:
			return state;
	}
};

export default newsReducer;
