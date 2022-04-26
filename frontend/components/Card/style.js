import { StyleSheet, Dimensions } from 'react-native'
import { windowHeight, windowWidth } from '../../assets/constants/Dimensions'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = windowHeight - 200
const CARD_WIDTH = width * 0.8
const CARD_SPACING = width * 0.1 - 10

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#ffffff',
		borderRadius: 15,
		height: CARD_HEIGHT,
		width: windowWidth * 0.975,
		marginRight: -windowWidth * 0.9875,
		marginLeft: windowWidth * 0.0125,
		// overflow: "hidden",
	},
	cardImage: {
		flex: 10,
		width: '100%',
		height: '100%',
		alignSelf: 'center'
	},
	textContent: {
		borderRadius: 10,
		padding: 10
	},
	cardtitle: {
		fontSize: 19,
		fontWeight: 'bold',
		height: 24,
		marginTop: 10,
		marginBottom: 5,
		marginLeft: 10
	},
	rating: {
		marginLeft: 10
	},
	iconWrapper: {
		flexDirection: 'row',
		marginLeft: 20,
		marginTop: 5
	},
	icon: {
		height: 25,
		// width: 90,
		borderRadius: 15,
		marginRight: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'black'
	},
	iconText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 11
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 20
	},
	button: {
		width: '47.5%',
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10
		// borderWidth: 2,
	},
	signIn: {
		width: '100%',
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3
	},
	text: {
		fontSize: 14,
		fontWeight: 'bold'
	}
})

export default styles
