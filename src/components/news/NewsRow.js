import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from '../../styles/NewsRowStyle';
import { SharedElement } from 'react-navigation-shared-element';
export default function NewsRow({ rowItem }) {
	return (
		<View style={styles.cardContainer}>
			{rowItem.multimedia.length > 0 ? (
				<View>
					<View style={styles.upperSectionWrapper}>
						<SharedElement id={`itemPhoto.${rowItem._id}`}>
							<Image
								source={{ uri: `https://www.nytimes.com/${rowItem.multimedia[0].url}` }}
								style={{ height: 180, flex: 1, resizeMode: 'cover' }}
							/>
						</SharedElement>

						<Text style={styles.titleWithImage}>{rowItem.headline.main}</Text>
					</View>

					<Text style={styles.newsDescription}>{rowItem.abstract}</Text>
				</View>
			) : (
				<View>
					<Text style={styles.titleWrapper}>{rowItem.headline.main}</Text>
					<Text style={styles.newsDescription}>{rowItem.abstract}</Text>
				</View>
			)}
		</View>
	);
}
