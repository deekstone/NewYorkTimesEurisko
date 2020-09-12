import React, { useEffect, useState, useRef, createRef } from 'react';
import { Text, View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NewsRow from './NewsRow';
import { fetchNews, loadMoreNews } from '../../redux/actions/NewsActions';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';

/**
 * This is the main view 
 * this view will display the news list with a search input 
 */
class NewsList extends React.Component {
	//Creating a reference )
	flatListRef = createRef();

	constructor() {
		super();
		//this is the initial state
		this.state = {
			searchText: ''
		};
	}

	/**
	 * when first opening the view this function will be triggered in order to fetch the news 
	 */
	componentDidMount() {
		this.props.fetchNews(1);
	}

	/**
	 * This is the list footer 
	 * In caset the user scrolls to the bottom of the list we will display a small activity indicator 
	 */
	renderFooter = () => {
		//this activity indicator will be displayed only when fetching data
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
						this.flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
					}}
					onSubmitEditing={() => {
						//After pressing done on the keyboard after searching for a text
						//return in case the text is empty
						if (this.state.searchText.length == 0) return;

						//scroll to the to of the list before searching for new data
						this.flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

						//in case the text is not empty search for news
						this.props.fetchNews(1, this.state.searchText);
					}}
				/>
				<FlatList
					ref={this.flatListRef}
					data={this.props.newsData.data}
					refreshing={this.props.newsData.isRefreshing}
					onRefresh={() => {
						this.props.fetchNews(1);
					}}
					renderItem={(item) => {
						return (
							<TouchableOpacity
								onPress={() => {
									//Go to the news detail view after selecting a news
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
						/**
						 * This function will be trigered after scrolling to the bottom of the page 
						 * on End reached the app will fetch more news 
						 * in order to prevent an endless loop, we wont call the api that gets more news if it is already loading 
						 */

						if (!this.props.newsData.isLoading)
							this.props.loadMoreNews(this.props.newsData.page, this.state.searchText);
					}}
					onEndReachedThreshold={0.5}
					ListFooterComponent={this.renderFooter}
				/>
			</View>
		);
	}
}

//We will receive all the data dispatched in order to take actions later on in our layout
const mapStateToProps = (p_state) => {
	return {
		newsData: p_state
	};
};

//Connecting new lists  component to a Redux store.
export default connect(mapStateToProps, { fetchNews, loadMoreNews })(NewsList);
