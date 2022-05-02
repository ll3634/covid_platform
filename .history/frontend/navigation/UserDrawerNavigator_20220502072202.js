import * as React from 'react'
import { View, Touch } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Notification from '../screens/notification/View'

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
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
		</Drawer.Navigator>
	)
}
