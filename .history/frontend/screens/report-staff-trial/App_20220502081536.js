import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import App from './View'
import Create from './Create'
import Details from './Details'
import Edit from './Edit'
import Upload from './Upload'
import Rule from './Rule'

const Tab = createNativeStackNavigator()

function Report () {
	return (
		<Tab.Navigator initialRouteName="View">
			<Tab.Screen name="Venues Created by Me" component={App}></Tab.Screen>
			<Tab.Screen name="Create" component={Create} />
			<Tab.Screen name="Details" component={Details} />
			<Tab.Screen name="Edit" component={Edit} />
			<Tab.Screen name="Upload" component={Upload} />
			
		</Tab.Navigator>
	)
}

export default Report
