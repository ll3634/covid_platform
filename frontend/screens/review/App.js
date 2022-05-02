import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import App from './View'
import Create from './Create'


const Tab = createNativeStackNavigator()

function Review () {
	return (
		<Tab.Navigator initialRouteName="View">
			<Tab.Screen name="Reviews" component={App}></Tab.Screen>
			<Tab.Screen name="Create New Review" component={Create} />

		</Tab.Navigator>
	)
}

export default Review
