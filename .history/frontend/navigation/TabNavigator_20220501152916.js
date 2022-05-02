import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { View as Venue } from '../screens/home'
import Map from '../screens/map/View'
import Report from '../screens/login/View'
import Check from '../screens/check-user/View'
import Trial from '../screens/report-staff-trial/App'

// import RouteApp from './StackNavigator'

import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
	return (
		// <NavigationContainer>
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: '#ffffff',
					position: 'absolute',
					bottom: 25,
					left: 20,
					right: 20,
					elavation: 0,
					borderRadius: 15,
					height: 55,
					...styles.shadow
				},
				tabBarInactiveTintColor: '#999999',
				tabBarActiveTintColor: '#007aff',
				tabBarLabelStyle: { fontSize: 8, fontWeight: 'bold', top: 17 },
				marginBottom: 10
			}}
		>
			<Tab.Screen
				name="VENUE"
				component={Venue}
				options={{
					tabBarIcon: ({ color, size }) => (
						<View style={styles.tabBar}>
							<Ionicons name="md-home-sharp" color={color} size={size - 3} />
						</View>
					)
				}}
			></Tab.Screen>

			<Tab.Screen
				name="CHECK"
				component={Check}
				options={{
					tabBarIcon: ({ color, size }) => (
						<View style={styles.tabBar}>
							<Ionicons
								name="qr-code-sharp"
								color={color}
								size={size - 3}
								style={{ right: 7 }}
							/>
						</View>
					)
				}}
			></Tab.Screen>

			<Tab.Screen
				name="MAP"
				component={Map}
				options={{
					tabBarStyle: { display: 'none' },
					tabBarIcon: () => (
						<Ionicons
							name="md-map-sharp"
							color={'#ffffff'}
							size={25}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						/>
					),
					tabBarButton: (props) => (
						<View style={styles.text}>
							<TouchableOpacity {...props} />
						</View>
					)
				}}
			></Tab.Screen>

			<Tab.Screen
				name="REPORT"
				component={Report}
				options={{
					tabBarIcon: ({ color, size }) => (
						<View style={styles.tabBar}>
							<Ionicons
								name="md-chatbox-ellipses-sharp"
								color={color}
								size={size - 3}
								style={{ left: 7 }}
							/>
						</View>
					)
				}}
			></Tab.Screen>

			<Tab.Screen
				name="TRIAL"
				component={Trial}
				options={{
					headerSh
					tabBarIcon: ({ color, size }) => (
						<View style={styles.tabBar}>
							<Ionicons
								name="md-settings-sharp"
								color={color}
								size={size - 3}
							/>
						</View>
					)
				}}
			></Tab.Screen>
		</Tab.Navigator>
		// </NavigationContainer>
	)
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	},
	tabBar: {
		top: 15
	},
	button: {
		top: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		top: -15,
		width: 55,
		height: 55,
		borderRadius: 30,
		backgroundColor: '#007aff',

		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	}
})

export default TabNavigator
