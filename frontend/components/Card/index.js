import React, { useCallback } from 'react'
import {
	Image,
	Dimensions,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity
} from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	interpolate,
	withSpring
} from 'react-native-reanimated'
import { MaterialIcons, Entypo } from 'react-native-vector-icons'

import StarRating from '../Rating'
import WaterfallList from '../WaterfallList'
import styles from './style'

import markers from '../../data/mapData'
import items from '../../data/boxData'

import { windowHeight, windowWidth } from '../../assets/constants/Dimensions'

const Card = ({ children, index, marker, translateX, translateY }) => {
	const pageOffset = windowWidth * index

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value + pageOffset },
				{ translateY: translateY.value }
			]
		}
	})

	return (
		<Animated.View
			style={[styles.card, rStyle, { backgroundColor: 'transparent' }]}
		>
			<View style={[styles.textContent, { backgroundColor: 'white' }]}>
				{children}
				<Text style={styles.cardtitle}>{marker.name}</Text>
				<View style={styles.rating}>
					<StarRating ratings={marker.rating} reviews={marker.reviews} />
				</View>
			</View>
			<View style={{ height: 220, backgroundColor: 'white' }}>
				<View style={styles.iconWrapper}>
					<View style={styles.icon}>
						<MaterialIcons name="restaurant" />
						<Text style={styles.iconText}> {marker.categories}</Text>
					</View>
					<View style={styles.icon}>
						<MaterialIcons name="local-cafe" />
						<Text style={styles.iconText}> CAFE</Text>
					</View>
					<View style={styles.icon}>
						<MaterialIcons name="local-mall" />
						<Text style={styles.iconText}> MALL</Text>
					</View>
				</View>
				<ScrollView
					horizontal
					scrollEventThrottle={16}
					style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}
				>
					{markers.map((item, index) => {
						return (
							<View
								key={index}
								style={{
									width: 100,
									height: 100,
									borderRadius: 10,
									overflow: 'hidden',
									marginRight: 15
								}}
							>
								<Image
										source={{
											uri: `https://expouploads22309-dev.s3.us-east-2.amazonaws.com/public/venue/${marker.id}/${index + 1}.jpg`
										}}
									style={{ height: 100, width: 100 }}
									resizeMode="cover"
								/>
							</View>
						)
					})}
				</ScrollView>
				<View style={styles.buttonWrapper}>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: '#f74d4d' }]}
					>
						<Text style={[styles.text, { color: 'white' }]}>Check-In</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: '#007aff' }]}
					>
						<Text style={[styles.text, { color: 'white' }]}>Review</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View
					style={{ height: 100, width: 20, backgroundColor: 'white' }}
				></View>
				<View
					style={{ height: 100, width: 20, backgroundColor: 'white' }}
				></View>
			</View>
			<View
				style={{
					zIndex: 4,
					height: 450,
					backgroundColor: 'white',
					paddingTop: 12.5,
					marginLeft: -2.5,
					alignSelf: 'center'
				}}
			>
				<WaterfallList items={items} />
			</View>
		</Animated.View>
	)
}

export default Card
