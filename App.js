import React from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { enableScreens } from "react-native-screens";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import newsReducer from "./src/redux/reducers/NewsReducer";
import { StackViewsApp } from "./src/nav/StackScreens";
enableScreens();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as
 * expressing asynchronous actions in a concise manner, or logging every
 * action payload.
 *
 **/
const store = createStoreWithMiddleware(newsReducer);
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackViewsApp />
      </NavigationContainer>
    </Provider>
  );
}
