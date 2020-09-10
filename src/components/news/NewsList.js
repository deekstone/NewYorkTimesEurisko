import React, { useEffect, useState, useRef } from 'react';
import { Text, View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import Axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import NewsRow from './NewsRow';
import { SearchBar, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getNews, loadMoreNews } from '../../actions/NewsActions';
import { connect } from 'react-redux';

class NewsList extends React.Component {
	constructor() {
		super();

		this.state = {
			data: [],
			page: 5,
			loading: false,
			isRefreshing: false
		};
	}

	componentDidMount() {
		this.refreshNews();
	}

	fetchNews = (concat) => {
		this.setState({ isRefreshing: true });

		Axios.get(
			`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&sort=newest&page=${this
				.state.page}`
		).then(
			(res) => {
				this.setState({
					data: concat ? this.state.data.concat(res.data.response.docs) : res.data.response.docs,
					isRefreshing: false,
					loading: false
				});
			},
			(error) => {
				this.setState({
					isRefreshing: false,
					loading: false
				});
			}
		);
	};

	handleLoadMore = () => {
		if (this.state.loading) return;
		this.setState({ page: this.state.page + 1, loading: true }, () => {
			this.fetchNews(true);
		});
	};

	refreshNews = () => {
		this.setState({ page: 1, loading: true }, () => {
			this.props.getNews(this.state.pag, false);
		});
	};

	renderFooter = () => {
		return this.state.page > 1 ? <ActivityIndicator style={{ color: '#000', marginTop: 20 }} /> : null;
	};

	render() {
		return (
			<FlatList
				data={this.props.foods}
				refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.refreshNews} />}
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
				onEndReached={this.handleLoadMore}
				onEndReachedThreshold={0}
				ListFooterComponent={this.renderFooter}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		foods: state.newsReducer
	};
};

export default connect(mapStateToProps, { getNews, loadMoreNews })(NewsList);
