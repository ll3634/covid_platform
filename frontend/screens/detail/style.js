import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
	item: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: '#ffffff',
		borderRadius: 10,

		shadowColor: 'gray',
		shadowOffset: {
			width: 5,
			height: 5
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 10
	},
	shadow: {
		shadowColor: 'gray',
		shadowOffset: {
			width: 5,
			height: 5
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 10
	},
	subitem: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10
		// backgroundColor: '#ffffff'
	},
	icon: {
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		width: 50,
		height: 50
	},
	info: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginTop: 15,
		marginLeft: 10,
		marginBottom: 10
	},
	name: {
		lineHeight: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	review: {
		lineHeight: 20,
		marginLeft: 2.5,
		fontFamily: 'Verdana',
		fontSize: 12,
		marginBottom: 10
	},
	rating: {
		fontSize: 14,
		fontWeight: '400',
		textAlign: 'center',
		color: '#ff9933'
	},
	mainContainer: {
		// flex: 1,
		backgroundColor: '#f7f7f7'
	},
	backgroudImage: {
		// top: -200,
		width: '100%'
	},

	navbar: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginTop: 55,
		marginLeft: 25,
		justifyContent: 'space-between'
	},
	navbarText: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold'
	},
	titleWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 35,
		marginTop: 20
	},
	description: {
		color: 'white',
		fontSize: 15
	},
	title: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
		borderRadius: 20
	},
	badge: {
		zIndex: 2,
		backgroundColor: 'white',
		padding: 20,
		width: Dimensions.get('window').width * 0.975,
		alignSelf: 'center',
		margin: 5,
		borderRadius: 10,
		marginHorizontal: 5,

		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	},
	reviewWrapper: {
		// height: Dimensions.get('window').height * 0.625,
		marginTop: Dimensions.get('window').height * 0.2
		// padding: 10,
	},
	socialIcon: {
		alignSelf: 'center'
	},
	infoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	infoText: {
		fontSize: 15
	},
	infoTitle: {
		fontSize: 15,
		fontWeight: 'bold'
	},
	descText: {
		fontSize: 12.5,
		color: 'gray',
		marginTop: 5
	},
	descTitle: {
		fontSize: 12,
		fontWeight: 'bold'
	},
	locationIcon: {
		backgroundColor: '#007aff',
		position: 'absolute',
		bottom: -25,
		left: '48%',
		borderRadius: 25,
		width: 45,
		height: 45,
		justifyContent: 'center',

		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	},
	buttonWrapper: {
		zIndex: 3,
		position: 'absolute',
		top: Dimensions.get('window').height - 75,
		left: 30,
		right: 30
	},
	backButton: {
		position: 'absolute',
		top: -105,
		left: 20,
		backgroundColor: 'rgba(0,0,0,0.4)',
		height: 35,
		width: 35,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	line: {
		width: Dimensions.get('window').width * 0.5 - 20,
		height: 1,
		backgroundColor: '#d1d1d1',
		alignSelf: 'center',
		marginVertical: 2.5,
		borderRadius: 2
	},
	categories: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap'
	},
	categoryContainer: {
		flexDirection: 'row',
		backgroundColor: '#ffdb4d',
		borderRadius: 15,
		margin: 10,
		marginBottom: 0,
		padding: 7.5,
		paddingHorizontal: 10
	},
	category: {
		fontSize: 13,
		color: '#fff',
		marginLeft: 10
	},
	section: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc',
		backgroundColor: 'white'
	},
	button: {
		height: 50,
		marginHorizontal: 20,
		backgroundColor: '#007aff',
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',

		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	},
	buttonText: {
		color: 'white',
		fontSize: 15,
		fontWeight: 'bold'
	}
})

export default styles
