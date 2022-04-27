import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity
} from 'react-native'

import io from 'socket.io-client'

const socket = io('ws://18.221.189.134:8000/')

export default function Start (props) {
	const [messages, setMessages] = useState([{
		"description": "test",
		"name": "test",
	}])

	socket.on('NewVenue', (data) => {
		// console.log(data)
		new_messages = [...messages, data]
		setMessages(new_messages)
		console.log(messages)
	})

		console.log('Start')
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.title}>
					{
						messages.map((item, index) => {
							return (
								<View key={index} style={styles.item}>
									<Text style={styles.itemText}>{item.name}</Text>
									<Text style={styles.itemText}>{item.description}</Text>
								</View>
							)
						})
					}
				</View>
				<TouchableOpacity
					style={styles.button}
					// onPress={() => {setMessages(message)}}
				>
				<Text>Refresh</Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
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

	},
	itemText: {
		fontSize: 16,
		color: '#000000',
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
