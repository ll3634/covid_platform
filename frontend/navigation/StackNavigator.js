import React, { useEffect, useState, useMemo } from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context'

import Start from '../screens/start/View'
import List from '../screens/detail/View'
import Detail from '../screens/checkin/View'
import Form from '../screens/form/View'
import Uploader from '../screens/upload/View'
import Notification from '../screens/notification/View'
import Home from './TabNavigator'
import Report from '../screens/report-user/View'

const Stack = createNativeStackNavigator()

function RouteApp() {

	const initialLoginState = {
		isLoading: true,
		phone: null,
		userToken: null
	}

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return {
					...prevState,
					userToken: action.token,
					isLoading: false,
				}
			case 'LOGIN':
				return {
					...prevState,
					isLoading: false,
					phone: action.id,
					userToken: action.token
				}
			case 'LOGOUT':
				return {
					...prevState,
					isLoading: false,
					phone: null,
					userToken: null
				}
			case 'RESET':
				return {
					...prevState,
					isLoading: false,
					phone: action.id,
					userToken: action.token
				}
		}
	}

	const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

	const authContext = useMemo(
		() => ({
			signIn: async(phone, password) => {
				let userToken = null
				if (phone === '123' && password === '123') {
					userToken = 'test'
					try {
						await AsyncStorage.setItem('userToken', userToken)
					} catch(e) {
						console.log(e)
					}
				}
				dispatch({ type: 'LOGIN', id: phone, token: userToken })
			},
			signOut: async() => {
				try {
					await AsyncStorage.removeItem('userToken')
				} catch(e) {
					console.log(e)
				}
				dispatch({ type: 'LOGOUT' })
			},
			signUp: () => {
			},
		}),
		[]
	)

	useEffect(() => {
		setTimeout(async() => {
			// setIsLoading(false)
			let getToken = null
			try {
				getToken = await AsyncStorage.getItem('userToken')
			} catch(e) {
				console.log(e)
			}
			dispatch({ type: 'RETRIEVE_TOKEN', token: getToken })
		}, 1000)
	}, [])

	if (loginState.isLoading) {
		return (
			<SafeAreaView>
				<ActivityIndicator size="large" color="grey" />
			</SafeAreaView>
		)
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{loginState.userToken !== null ? (
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen
							name="Home"
							component={Home}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="List"
							component={List}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Detail"
							component={Detail}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Form"
							component={Form}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Uploader"
							component={Uploader}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Notification"
							component={Notification}
							options={{ headerShown: true }}
						/>
					</Stack.Navigator>
				) : (
					<Stack.Navigator initialRouteName="Start">
						<Stack.Screen
							name="Start"
							component={Start}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Report"
							component={Report}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	)
}

export default RouteApp
