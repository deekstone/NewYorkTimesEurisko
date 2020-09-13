import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: '#FFFFFF',
		elevation: 5,
		marginBottom: 10,
		borderRadius: 5,
		overflow: 'hidden'
	},
	upperSectionWrapper: {
		position: 'relative'
	},
	titleWrapper: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 10,
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		color: '#FFFFFF'
	},
	titleWithImage: {
		position: 'absolute',
		fontWeight: 'bold',
		color: '#FFFFFF',
		padding: 10,
		bottom: 0,
		fontSize: 18,
		width: '100%',
		backgroundColor: 'rgba(52, 52, 52, 0.8)'
	},
	newsDescription: {
		padding: 10,
		paddingTop: 8,
		fontSize: 16,
		color: '#545454',
		lineHeight: 22
	}
});
