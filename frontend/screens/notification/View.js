import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
} from 'react-native'

import socket from '../../socket/socket'

export default function Start(props) {
	const [messages, setMessages] = useState([
		{
			description: 'test',
			name: 'test'
		}
	])

	socket.on('connect', () => {
		console.log('connected')
		// socket.emit('NewVenue', 'test')
	})

	socket.on('NewVenue', (data) => {
		// console.log(data)
		new_messages = [...messages, data]
		setMessages(new_messages)
		console.log(messages)
	})

	socket.on('NewCheckin', (data) => {
		// console.log(data)
		new_messages = [...messages, data]
		setMessages(new_messages)
		console.log(messages)
	})

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.title}>
				{messages.map((item, index) => {
					return (
						<View key={index} style={styles.item} >
							<Text style={styles.itemText}>A confirmed case (user_id: {item.description})</Text>
							<Text style={styles.itemText}>checked in your liked venue (venue_id: {item.name}).</Text>
						</View>
					)
				})}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#f5f5f5'
	},
	title: {
		marginTop: 20
	},
	item: {
		// flexDirection: 'column',
		// justifyContent: 'space-between',
		// // alignItems: 'center',
		// marginBottom: 20
		paddingVertical: 20,
		paddingHorizontal: 20,
		marginBottom: 5,
		justifyContent: 'space-between',
		alignContent: 'center',
		flexDirection: 'column',
		backgroundColor: '#fff',
		width: '95%',
		height: 95,
		alignSelf: 'center',
		borderRadius: 10,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
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
