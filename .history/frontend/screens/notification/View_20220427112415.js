import { StackActions } from '@react-navigation/native'
import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	TouchableOpacity
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import CovidImage from '../../assets/images/covid.svg'

import io from 'socket.io-client'

const socket = io('http://18.221.189.134:8000/')

var message = [{
	"description": "test",
	"name": "test",
}]

socket.on('connect', () => {
	console.log('connected')
	// socket.emit('NewVenue', 'test')
})

socket.on('NewVenue', (data) => {
	// console.log(data)
	message = [...message, data]
	console.log(message)
})

export default class Start extends Component {
	render () {
		console.log('Start')
		

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.title}>
					{
						message.map((item, index) => {
							return (
								<View key={index} style={styles.item}>
									<Text style={styles.itemText}>{item.name}</Text>
									<Text style={styles.itemText}>{item.description}</Text>
								</View>
							)
						})
					}
				</View>
			</SafeAreaView>
		)
	}

	handleItemClick () {
		this.props.navigation.navigate('Home')
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},
	title: {
		marginTop: 20
	},
	item:	{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		marginHorizontal: 10
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center'
	},
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#20315f'
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#AD40AF',
		padding: 20,
		width: '85%',
		borderRadius: 10,
		marginBottom: 50
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'white'
	},
	image: {
		width: 300,
		height: 300
	}
})
