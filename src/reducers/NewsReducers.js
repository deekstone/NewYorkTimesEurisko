import { FETCH_NEWS, LOAD_MORE_NEWS } from '../actions/Types';

const initialState = {
	newsList: []
};

const NewsReducers = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEWS:
			return {};
		case LOAD_MORE_NEWS:
			return {
				...state,
				newsList: {}
			};
		default:
			return state;
	}
};

export default NewsReducers;
