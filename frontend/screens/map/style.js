import { StyleSheet, Dimensions } from 'react-native'
import { windowHeight, windowWidth } from '../../assets/constants/Dimensions'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const styles = StyleSheet.create({
	container: {
		height: height,
		width: width
	},
	searchBox: {
		position: 'absolute',
		marginTop: 50,
		paddingLeft: 40,
		paddingRight: 20,
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '90%',
		alignSelf: 'center',
		borderRadius: 20,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	},
	icon: {
		zIndex: 2,
		position: 'absolute',
		marginTop: 105,
		height: 35,
		width: 100,
		marginHorizontal: (windowWidth - 100) * 0.5,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	},
	clickWrapper: {
		position: 'absolute',
		// left: 0,
		right: 0,
		top: 490,
		marginHorizontal: '2.5%'
		// alignItems: 'flex-end',
	},
	click: {
		height: 50,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: {
			height: 6,
			width: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 5
	},
	clickMargin: {
		marginBottom: 15
	},
	markerWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50
	},
	marker: {
		top: 14.75,
		width: 30.5,
		height: 30.5
	},
	markerImage: {
		top: -15,
		width: 15,
		height: 15
	},
	scrollView: {
		position: 'absolute',
		top: height - 250,
		left: 0,
		right: 0,
		paddingVertical: 0
	},
	card: {
		elevation: 2,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		marginHorizontal: 10,
		height: CARD_HEIGHT,
		width: CARD_WIDTH,
		overflow: 'hidden'
	},
	cardImage: {
		flex: 10,
		width: '100%',
		height: '100%',
		alignSelf: 'center'
	},
	iconText: {
		color: 'grey',
		fontWeight: 'bold',
		fontSize: 14
	},
	textContent: {
		flex: 2,
		padding: 10,
		marginBottom: 5
	},
	cardtitle: {
		fontSize: 15,
		fontWeight: 'bold',
		height: 25
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row'
	},
	button: {
		width: '45%',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 5
	},
	signIn: {
		width: '100%',
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3
	},
	textSign: {
		fontSize: 14,
		fontWeight: 'bold'
	}
})

export default styles
