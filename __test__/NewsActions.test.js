import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import * as actions from '../src/redux/actions/NewsActions';
import * as types from '../src/redux/actions/Types';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('async actions ', () => {
	beforeEach(() => {
		store.clearActions();
	});

	const request = (ms) =>
		new Promise((resolve) => {
			setTimeout(() => resolve('success response'), ms);
		});

	test('After fetching data successfully the result must be the same as in the parameter passed fetching news success function ', async () => {
		store.dispatch(actions.fetchingNewsSuccess('test'));
		const expectedAction = [
			{
				type: types.FETCHING_NEWS_SUCCESS,
				payload: 'test'
			}
		];

		expect(store.getActions()).toEqual(expectedAction);
	});

	test('After fetching data successfully the result must be the same as in the parameter passed to the fetching news failure function ', async () => {
		store.dispatch(actions.fetchingNewsFailure('test'));
		const expectedAction = [
			{
				type: types.FETCHING_NEWS_FAILURE,
				payload: 'test'
			}
		];

		expect(store.getActions()).toEqual(expectedAction);
	});

	test('Testing the fetching news request', async () => {
		store.dispatch(actions.fetchingNewsRequest());
		const expectedAction = [
			{
				type: types.FETCHING_NEWS_REQUEST
			}
		];

		expect(store.getActions()).toEqual(expectedAction);
	});

	test('Dispatches the correct action and payload', async () => {
		store.dispatch(actions.fetchNews(1, ''));
		await request(10000);
		expect(store.getActions().length()).toBe(2);
	});
});
