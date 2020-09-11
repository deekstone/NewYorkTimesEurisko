import React, { useEffect } from 'react';
import { View, Image, Share } from 'react-native';
import { Text } from 'react-native-elements';
import { SharedElement } from 'react-navigation-shared-element';
import { styles } from '../../styles/NewsDetailStyle';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
export function NewsDetail(props) {
	const news = props.route.params;
	const nav = useNavigation();

	nav.setOptions({
		headerRight: () => (
			<TouchableOpacity
				onPress={async () => {
					try {
						const result = await Share.share({
							message: news.web_url
						});
					} catch (error) {
						alert(error.message);
					}
				}}
			>
				<FontAwesomeIcon icon={faShare} size={20} color="#5c5c5c" style={{ marginEnd: 15, padding: 10 }} />
			</TouchableOpacity>
		)
	});

	return (
		<ScrollView>
			<View style={styles.headerSection}>
				<Text style={styles.headerSectionCat}>{news.section_name}</Text>
				<Text style={styles.headerSectionHeadline}>{news.headline.main}</Text>
				<Text style={styles.headerSectionDate}>{moment(news.pub_date).format('DD-MM-YYYY hh:MM')}</Text>
			</View>
			{news.multimedia.length > 0 ? (
				<SharedElement id={`itemPhoto.${news._id}`}>
					<Image
						source={{ uri: `https://www.nytimes.com/${news.multimedia[0].url}` }}
						style={{
							height: 300,
							resizeMode: 'cover'
						}}
					/>
				</SharedElement>
			) : (
				<View />
			)}

			<View style={styles.lowerSectionWrapper}>
				<Text style={styles.authorSection}>{news.byline.original}</Text>
				<Text style={styles.newAbstract}>{news.abstract}</Text>
				<Text style={styles.newsDescription}>{news.lead_paragraph}</Text>
			</View>
		</ScrollView>
	);
}
