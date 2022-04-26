import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
		paddingTop: 25
	},
	profile: {
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15,
		marginTop: 5,
		height: 20
	},
	name: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	photo: {
		height: 35,
		width: 35,
		borderRadius: 20
	},
	search: {
		flexDirection: 'row',
		borderColor: '#c6c6c6',
		borderWidth: 1,
		borderRadius: 7,
		paddingHorizontal: 10,
		paddingVertical: 7,
		// marginBottom: 5,
		backgroundColor: 'white'
	},
	window: {
		flexDirection: 'row',
		justifyContent: 'space-between'
		// marginVertical: 10,
	},
	carousel: {
		height: 100
	},
	card: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: 125,
		backgroundColor: 'white',
		elevation: 10,
		padding: 10,
		borderRadius: 10,
		marginBottom: 7,
		marginLeft: 0,
		marginRight: 0,
		alignContent: 'center'

		// shadowColor: 'white',
		// shadowOffset: {
		//     width: 0,
		//     height: 100
		// },
		// shadowOpacity: 0.7,
		// shadowRadius: 10,
		// elevation: 10,
	},
	image: {
		// justifyContent: 'center',
		alignItems: 'center',
		width: 105,
		height: 105,
		borderRadius: 7
	},
	cardText: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	shadow: {
		shadowColor: 'black',
		shadowOffset: {
			width: 100,
			height: 0
		},
		shadowOpacity: 0.7,
		shadowRadius: 10,
		elevation: 10
	},
	titleWrapper: {
		marginTop: 2.5,
		marginLeft: 15
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	subtitle: {
		marginLeft: 15,
		marginVertical: 10
	},
	subtitleText: {
		fontSize: 13,
		fontWeight: 'bold',
		// fontFamily: '',
		color: 'grey'
	},
	textWrapper: {
		flexDirection: 'row',
		marginTop: 2,
		marginLeft: 17,
		marginBottom: -2
	},
	text: {
		color: 'gray',
		fontSize: 12
		// marginRight: 10
	},
	info: {
		color: '#de4300',
		fontSize: 10,
		fontWeight: 'bold'
		// marginRight: 10
	},
	ratingWrapper: {
		marginBottom: 2.5,
		marginLeft: 15
	},
	starRating: {
		marginTop: -10
	},
	detailWrapper: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 0,
		marginLeft: 15
	},
	detail: {
		marginTop: 7.5,
		marginBottom: 2.5,
		marginRight: 5,
		borderRadius: 2.5,
		// width: 110,
		// height: 17,
		padding: 2.5,
		paddingHorizontal: 5,
		backgroundColor: '#ffd694',
		justifyContent: 'center',
		alignContent: 'center'
	},
	iconWrapper: {
		marginTop: 6,
		marginRight: 10,
		flexDirection: 'row'
	},
	icon: {
		marginLeft: 10,
		marginRight: 5,
		flexDirection: 'row'
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 20,
		marginRight: 20
	},
	button1: {
		height: 30,
		width: 150,

		backgroundColor: '#f7f7f7',
		borderRadius: 7,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	buttonText1: {
		color: 'black',
		fontSize: 13,
		fontWeight: 'bold'
	},
	button2: {
		height: 30,
		width: 160,

		backgroundColor: '#007aff',
		borderRadius: 7,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	buttonText2: {
		color: 'white',
		fontSize: 13,
		fontWeight: 'bold'
	}
})

export default styles
