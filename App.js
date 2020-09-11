import React from 'react';
import { Image } from 'react-native';
import NewsList from './src/components/news/NewsList';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NewsDetail } from './src/components/newsDetail/NewsDetail';
import { enableScreens } from 'react-native-screens';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import newsReducer from './src/redux/reducers/NewsReducer';

enableScreens();
const Stack = createSharedElementStackNavigator();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(newsReducer);
export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Newslist">
					<Stack.Screen
						name="NewsList"
						component={NewsList}
						options={{
							headerLeftContainerStyle: {
								paddingLeft: 10,
								flex: 1,
								width: '100%',
								alignItems: 'center'
							},
							headerLeft: () => (
								<Image
									source={require('./src/assets/nytimestimeline.jpg')}
									style={{
										width: 200,
										height: 40
									}}
								/>
							),
							headerTitle: ''
						}}
					/>
					<Stack.Screen
						name="NewsDetail"
						component={NewsDetail}
						options={{
							headerTitle: '',
							gestureEnabled: false,

							transitionSpec: {
								open: { animation: 'timing', config: { duration: 250 } },
								close: { animation: 'timing', config: { duration: 250 } }
							},
							cardStyleInterpolator: ({ current: { progress } }) => {
								return {
									cardStyle: {
										opacity: progress
									}
								};
							}
						}}
						sharedElementsConfig={(route) => {
							const { item } = route.params;
							return [ `itemPhoto.${route.params._id}`, `itemTitle.${route.params._id}` ];
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
