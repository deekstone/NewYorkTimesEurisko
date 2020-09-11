import React, { useEffect, useState, useRef } from 'react';
import { Text, View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NewsRow from './NewsRow';
import { fetchNews, loadMoreNews } from '../../redux/actions/NewsActions';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
class NewsList extends React.Component {
	constructor() {
		super();

		this.state = {
			searchText: ''
		};
	}

	componentDidMount() {
		this.props.fetchNews(1);
	}

	renderFooter = () => {
		return !this.props.newsData.isRefreshing ? (
			<ActivityIndicator style={{ color: '#000', marginTop: 20 }} />
		) : null;
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<SearchBar
					placeholder="Search news..."
					round
					lightTheme
					value={this.state.searchText}
					onChangeText={(e) => {
						this.setState({ searchText: e });
					}}
					onClear={(e) => {
						this.props.fetchNews(1, '');
					}}
					onSubmitEditing={() => this.props.fetchNews(1, this.state.searchText)}
				/>
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
						if (!this.props.newsData.isRefreshing)
							this.props.loadMoreNews(this.props.newsData.page, this.state.searchText);
					}}
					onEndReachedThreshold={0.1}
					ListFooterComponent={this.renderFooter}
				/>
			</View>
		);
	}
}

const mapStateToProps = (p_state) => {
	console.log(p_state.page);
	return {
		newsData: p_state
	};
};
export default connect(mapStateToProps, { fetchNews, loadMoreNews })(NewsList);
