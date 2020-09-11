import { createStore, combineReducers } from "redux";
import NewsReducers from "./reducers/NewsReducers";

const roorReducer = combineReducers({
  newsReducer: NewsReducers,
});

const store = () => createStore(roorReducer);
export default store;
