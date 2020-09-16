import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import React from 'react';
import NewsList from '../components/news/NewsList';

import { NewsDetail } from '../components/newsDetail/NewsDetail';
import { Image } from 'react-native';

/**
 * Render the stack views
 */
export function StackViewsApp() {
	const Stack = createSharedElementStackNavigator();
	return (
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
						//App logo added in the nav bar
						<Image
							source={require('../assets/nytimestimeline.jpg')}
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
					//customizing the animation
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
				//Sharing the news Photo and item title in order to have a small animation when navigating from the news to the news detail
				sharedElementsConfig={(route) => {
					const { item } = route.params;
					return [ `itemPhoto.${route.params._id}`, `itemTitle.${route.params._id}` ];
				}}
			/>
		</Stack.Navigator>
	);
}
