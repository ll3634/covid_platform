import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Notification from '../screens/notification/View'

import CustomDrawer from '../components/CustomDrawer'
import UserTabkNavigator from './UserTabNavigator'


const Drawer = createDrawerNavigator()

export default function Home() {
	return (
		<Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
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
      <Drawer.Screen name="Notifications" component={Notification} />
		</Drawer.Navigator>
	)
}
