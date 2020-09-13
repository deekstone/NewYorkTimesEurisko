import reducer from '../src/redux/reducers/NewsReducer';
import * as types from '../src/redux/actions/Types';

describe('todos reducers', () => {
	it('should return the initial state ', () => {
		expect(reducer(undefined, {})).toEqual({
			data: [],
			page: 1,
			loading: false,
			isRefreshing: false,
			errorMessage: '',
			isLoading: false
		});
	});
	it('it should return page equals to 3', () => {
		expect(
			reducer(types.LOAD_MORE_NEWS_SUCCESS, {
				data: [],
				page: 1,
				loading: true,
				isRefreshing: true,
				errorMessage: '',
				isLoading: true
			})
		).toEqual({
			errorMessage: '',
			loading: false,
			isRefreshing: false,
			page: 3,
			data: [],
			isLoading: false
		});
	});
});
