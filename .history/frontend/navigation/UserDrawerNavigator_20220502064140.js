import * as React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Notification from '../screens/notification/View'

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title="Go back home" />
		</View>
	)
}

import UserTabkNavigator from './UserTabNavigator'

const Drawer = createDrawerNavigator()

export default function Home() {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerLabelStyle: {
					fontSize: 15
				}
			}}
			initialRouteName="Main"
		>
			<Drawer.Screen name="Main" component={UserTabkNavigator} />
			<Drawer.Screen name="Notifications" component={Notification} />
		</Drawer.Navigator>
	)
}
