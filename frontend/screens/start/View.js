import { StackActions } from '@react-navigation/native'
import React, { useEffect, useState, useMemo } from 'react'
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Logo from '../../assets/images/logo.svg'

const Start = (props) => {

	const handleItemClick = () => {
		props.navigation.navigate('Report')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.title}>
					<Text style={styles.text}>Covid Venues</Text>
				</View>
				<View style={styles.content}>
					<Logo height={175} width={175} />
				</View>
			<TouchableOpacity style={styles.button} onPress={handleItemClick}>
				<Text style={styles.buttonText}>Enter !</Text>
				<MaterialIcons name="arrow-forward-ios" size={25} color="#ffffff" />
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export default Start

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
	content: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center'
	},
	text: {
		fontSize: 30,
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
		fontStyle: 'italic',
		fontSize: 20,
		color: 'white'
	},
	image: {
		width: 300,
		height: 300
	}
})
