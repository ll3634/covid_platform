import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Review from './View'
import Create from './Create'

const Tab = createNativeStackNavigator()

function Report () {
	return (
		<Tab.Navigator initialRouteName="Report">
			<Tab.Screen name="Review" component={Review} options={{ title: 'Reviews' }}></Tab.Screen>
			<Tab.Screen name="Create" component={Create} options={{title:"Create"}}></Tab.Screen>
		</Tab.Navigator>
	)
}

export default Report
