import reducer from '../src/redux/reducers/NewsReducer';
import * as types from '../src/redux/actions/Types';

describe('Testing the reducer', () => {
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

	it('Make sure the loader are equal to true before triggering an api call', () => {
		expect(
			reducer([], {
				type: types.FETCHING_NEWS_REQUEST,
				payload: {
					data: [],
					page: 1,
					loading: false,
					isRefreshing: false,
					errorMessage: '',
					isLoading: false
				}
			})
		).toEqual({
			isLoading: true,
			isRefreshing: true
		});
	});
});

/**
 * After a force refresh the page 1 and 2 must be fetched and then we must set the page to 3
 */
it('Make sure the loader are equal to false after api call is done and the page is set to 3 ', () => {
	expect(
		reducer(
			{
				data: [],
				isRefreshing: false,
				isLoading: false
			},
			{
				type: types.FETCHING_NEWS_SUCCESS,
				payload: {}
			}
		)
	).toEqual({ data: {}, isLoading: false, isRefreshing: false, page: 3 });
});

it('After loading more news the page must be increased by 2 and the loaders set to false ', () => {
	expect(
		reducer(
			{
				data: [],
				isRefreshing: false,
				isLoading: false,
				page: 5
			},
			{
				type: types.LOAD_MORE_NEWS_SUCCESS,
				payload: {}
			}
		)
	).toEqual({ data: [ {} ], isLoading: false, isRefreshing: false, page: 7 });
});
