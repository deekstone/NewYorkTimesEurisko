import React, { useEffect, useState, useRef } from 'react';
import { Text, View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import NewsRow from './NewsRow';
import { SearchBar, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { fetchNews, loadMoreNews } from '../../redux/actions/NewsActions';
import { getNews } from '../../Api/Helpers/NewsApi';
import { connect } from 'react-redux';
class NewsList extends React.Component {
	constructor() {
		super();

		this.state = {
			isRefreshing: false
		};
	}

	componentDidMount() {
		this.props.fetchNews(1);
		// this.refreshNews();
	}

	// fetchNews = (concat) => {
	// 	if (!concat) this.setState({ isRefreshing: true });

	// 	getNews(this.state.page)
	// 		.then((res) => {
	// 			this.setState({
	// 				data: concat ? this.state.data.concat(res) : res,
	// 				isRefreshing: false,
	// 				loading: false
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			alert(error);
	// 			this.setState({
	// 				isRefreshing: false,
	// 				loading: false
	// 			});
	// 		});
	// };

	// handleLoadMore = () => {
	// 	if (this.state.loading) return;
	// 	this.setState({ page: this.state.page + 1, loading: true }, () => {
	// 		this.fetchNews(true);
	// 	});
	// };

	// refreshNews = () => {
	// 	this.setState({ page: 1, loading: true }, () => {
	// 		this.fetchNews(false);
	// 	});
	// };

	renderFooter = () => {
		return !this.props.newsData.isRefreshing ? (
			<ActivityIndicator style={{ color: '#000', marginTop: 20 }} />
		) : null;
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.props.newsData.data}
					refreshing={this.props.newsData.isRefreshing}
					onRefresh={() => {
						this.props.fetchNews(1);
					}}
					renderItem={(item) => {
						return (
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate('NewsDetail', item.item);
								}}
							>
								{<NewsRow rowItem={item.item} />}
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item, index) => {
						return index.toString();
					}}
					onEndReached={() => {
						this.props.loadMoreNews(this.props.newsData.page);
					}}
					onEndReachedThreshold={0.1}
					ListFooterComponent={this.renderFooter}
				/>
			</View>
		);
	}
}

const mapStateToProps = (p_state) => {
	return {
		newsData: p_state
	};
};
export default connect(mapStateToProps, { fetchNews, loadMoreNews })(NewsList);
