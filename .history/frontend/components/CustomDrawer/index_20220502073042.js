import React from 'react'
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity
} from 'react-native'
import {
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const CustomDrawer = (props) => {
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{ backgroundColor: 'grey' }}
			>
      <View style={{marginLeft: 100}}>
					<Image
						source={require('../../assets/images/icon.png')}
						style={{
							height: 80,
							width: 80,
							borderRadius: 40,
							marginBottom: 10
						}}
					/>
					<Text
						style={{
              marginLeft: 15,
							color: '#fff',
							fontSize: 20,
							marginBottom: 20,
              fontWeight: 'bold'
						}}
					>
						User
					</Text>
          </View>
				<View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name="exit-outline" size={22} />
						<Text
							style={{
								fontSize: 15,
								fontFamily: 'Roboto-Medium',
								marginLeft: 5
							}}
						>
							Log Out
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default CustomDrawer
