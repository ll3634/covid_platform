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
import Report  from '../screens/login/View'
import Signin from '../screens/signin/View'
import Password from '../screens/password/View'

const Stack = createNativeStackNavigator()

function RouteApp() {

	const initialLoginState = {
		isLoading: true,
		phone: null,
		userToken: null,
		userAuth: null
	}

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return {
					...prevState,
					userToken: action.token,
					userAuth: action.auth,
					isLoading: false,
				}
			case 'LOGIN':
				return {
					...prevState,
					isLoading: false,
					phone: action.id,
					userToken: action.token,
					userAuth: action.auth
				}
			case 'LOGOUT':
				return {
					...prevState,
					isLoading: false,
					phone: null,
					userToken: null,
					userAuth: null
				}
			case 'RESET':
				return {
					...prevState,
					isLoading: false,
					phone: action.id,
					userToken: action.token,
					userAuth: action.auth
				}
		}
	}

	const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

	const authContext = useMemo(
		() => ({
			signIn: async(phone, password, token, auth) => {
				// let userToken = null
				// if (phone === '123' && password === '123') {
				// 	userToken = 'test'
				let userToken = token
				let userAuth = auth.toString()
					try {
						await AsyncStorage.setItem('userToken', userToken)
						await AsyncStorage.setItem('userAuth', userAuth)
						console.log('hi', getAuth)
					} catch(e) {
						console.log(e)
					}
				// }
				console.log('login token', userToken, userAuth)
				dispatch({ type: 'LOGIN', id: phone, token: userToken, auth: userAuth })
			},
			signOut: async() => {
				try {
					await AsyncStorage.removeItem('userToken')
					await AsyncStorage.removeItem('userAuth')
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
			let getToken = null
			let getAuth = null
			try {
				getToken = await AsyncStorage.getItem('userToken')
				getAuth = await AsyncStorage.getItem('userAuth')
				console.log('---', getToken, getAuth)
			} catch(e) {
				console.log(e)
			}
			dispatch({ type: 'RETRIEVE_TOKEN', token: getToken, auth: getAuth })
		}, 1000)
	}, [])

	// if (loginState.isLoading) {
	// 	return (
	// 		<SafeAreaView>
	// 			<ActivityIndicator size="large" color="grey" />
	// 		</SafeAreaView>
	// 	)
	// }

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{loginState.userToken !== null && loginState.userAuth === 1 ? (
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
						<Stack.Screen
							name="Signin"
							component={Signin}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Password"
							component={Password}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	)
}

export default RouteApp
