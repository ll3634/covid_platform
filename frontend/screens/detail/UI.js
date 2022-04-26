import React, { Component, useState, useEffect, useCallback } from 'react'
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	Image,
	FlatList,
	ScrollView,
	ImageBackground,
	TouchableOpacity
} from 'react-native'
import { BlurView } from 'expo-blur'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
	interpolate,
	Extrapolate,
	useAnimatedStyle,
	useAnimatedScrollHandler,
	useSharedValue
} from 'react-native-reanimated'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import styles from './style'

import BottomSheet from '../../components/BottomSheet'
import FloatingButton from '../../components/FloatingButton'
import RateDetail from '../../components/RatingTable'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import WaterfallList from '../../components/WaterfallList'

import { windowHeight, windowWidth } from '../../assets/constants/Dimensions'

import items from '../../data/boxData'

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedImageBackground =
	Animated.createAnimatedComponent(ImageBackground)
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function List (props) {
	const childFunc = React.useRef(null)
	const childScroll = React.useRef(null)
	const translateY = useSharedValue(0)
	const scrollHandler = useAnimatedScrollHandler((event) => {
		// console.log(event.contentOffset.y)
		translateY.value = event.contentOffset.y
		childScroll.current()
	})

	const [rateDetail] = useState({
		point: 4.7,
		maxPoint: 5,
		totalRating: 25,
		data: ['5%', '5%', '35%', '40%', '10%']
	})

	useEffect(() => {
		
	})

	useEffect(() => {
		props.getListData()
	},[])

	const bannerAnimation = useAnimatedStyle(() => {
		const height = interpolate(
			translateY.value,
			[0, 200],
			[200, 85],
			Extrapolate.CLAMP
		)
		const scale = interpolate(
			translateY.value,
			[-100, 0],
			[2, 1],
			Extrapolate.CLAMP,
			{ extrapolateLeft: Extrapolate.Extend }
		)
		const top = interpolate(
			translateY.value,
			[0, 200],
			[0, -200 + 85],
			Extrapolate.CLAMP
		)
		return {
			height: height,
			top,
			transform: [{ scale }]
		}
	})

	const titleAnimation = useAnimatedStyle(() => {
		const INPUT_RANGE = [25, 100]
		const scale = interpolate(
			translateY.value,
			INPUT_RANGE,
			[1, 0.75],
			Extrapolate.CLAMP
		)
		const translateX = interpolate(
			translateY.value,
			INPUT_RANGE,
			[0, 100],
			Extrapolate.CLAMP
		)
		const newTranslateY = interpolate(
			translateY.value,
			INPUT_RANGE,
			[0, -50],
			Extrapolate.CLAMP
		)
		const opacity = interpolate(translateY.value, INPUT_RANGE, [1, 0])
		return {
			opacity,
			transform: [{ scale }, { translateX }, { translateY: newTranslateY }]
		}
	})

	const subtitleAnimation = useAnimatedStyle(() => {
		const INPUT_RANGE = [125, 200]
		const newTranslateY = interpolate(
			translateY.value,
			INPUT_RANGE,
			[25, 0],
			Extrapolate.CLAMP
		)
		const opacity = interpolate(translateY.value, INPUT_RANGE, [0, 1])
		return {
			opacity,
			transform: [{ translateY: newTranslateY }]
		}
	})

	const blurAnimation = useAnimatedStyle(() => {
		const INPUT_RANGE = [125, 200]
		const opacity = interpolate(translateY.value, INPUT_RANGE, [0, 1])
		return {
			opacity
		}
	})

	return (
		<GestureHandlerRootView style={{}}>
			<View style={{ zIndex: 2, top: 40 }}>
				<BackButton
					navigation={() => {
						props.navigation.goBack()
					}}
				/>
			</View>

			<FloatingButton
				style={{
					zIndex: 4,
					position: 'absolute',
					top: windowHeight * 0.8,
					right: windowWidth * 0.3
				}}
			/>

			{/* subtitle */}
			<AnimatedView
				style={[
					{
						zIndex: 2,
						position: 'absolute',
						alignItems: 'center',
						justifyContent: 'center',
						top: 50,
						left: 55,
						right: 55
					},
					subtitleAnimation
				]}
			>
				<Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>
					{props.route.params.venue_name}
				</Text>
			</AnimatedView>

			<View style={{ zIndex: 3 }}>
				<BottomSheet
					childFunc={childFunc}
					childScroll={childScroll}
					scrollY={translateY.value}
				>
					<View style={{}}>
						<TouchableOpacity onPress={childFunc.current}>
							<View
								style={{
									backgroundColor: 'gray',
									marginHorizontal: 10,
									marginBottom: 15,
									height: 25,
									width: 100,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5
								}}
							>
								<Text style={styles.buttonText}>Reviews</Text>
							</View>
						</TouchableOpacity>
					</View>

					<WaterfallList items={items} />
				</BottomSheet>
			</View>

			{/* button */}
			<View style={[styles.buttonWrapper]}>
				<Button
					text={'Check-In'}
					navigation={() => {
						props.navigation.navigate('Form', { venue_id: props.route.params.id })
					}}
				/>
			</View>

			{/* banner */}
			<AnimatedImageBackground
				style={[
					{
						zIndex: 1
					},
					bannerAnimation,
					styles.backgroudImage
				]}
				// source={require('../../../assets/images/test.png')}
				source={{
											uri: `https://expouploads22309-dev.s3.us-east-2.amazonaws.com/public/venue/${props.route.params.id}/1.jpg`
										}}
			>
				<AnimatedBlurView
					tint="dark"
					intensity={500}
					style={[
						{
							...StyleSheet.absoluteFillObject,
							zIndex: 2
						},
						blurAnimation
					]}
				/>
			</AnimatedImageBackground>

			{/* title */}
			<Animated.View
				style={[
					{
						zIndex: 2,
						position: 'absolute',
						top: 145,
						left: 20,
						right: 20
					},
					titleAnimation
				]}
			>
				<Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
					{props.route.params.venue_name}
				</Text>
			</Animated.View>

			<Animated.ScrollView
				scrollEventThrottle={16}
				onScroll={scrollHandler}
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: '#f1f1f1' }}
			>
				{/* Description */}
				<View
					style={[
						styles.shadow,
						{
							paddingVertical: 20,
							paddingHorizontal: 25,
							backgroundColor: 'white',
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
							marginBottom: 5
						}
					]}
				>
					<Text style={[styles.descText, { color: 'gray', fontSize: 13 }]}>
						{props.route.params.venue_description}
					</Text>
				</View>

				{/* badge */}
				<View style={[styles.badge, { height: 250, padding: 15 }]}>
					<MapView
						provider={PROVIDER_GOOGLE}
						style={{ flex: 1 }}
						region={{
							latitude: parseFloat(props.route.params.venue_latitude),
							longitude: parseFloat(props.route.params.venue_longitude),
							latitudeDelta: 0.00864195044303443,
							longitudeDelta: 0.000142817690068
						}}
					>
						<MapView.Marker
							coordinate={{
								latitude: parseFloat(props.route.params.venue_latitude),
								longitude: parseFloat(props.route.params.venue_longitude)
							}}
						/>
					</MapView>
				</View>

				<View style={[styles.badge]}>
					<Text style={[styles.badgeText, { fontSize: 17 }]}>
						Rating Information
					</Text>
					<RateDetail
						point={rateDetail.point}
						maxPoint={rateDetail.maxPoint}
						totalRating={rateDetail.totalRating}
						data={rateDetail.data}
					/>
				</View>

				<View style={[styles.badge, { height: 100 }]}>
					<Text style={[styles.badgeText, { fontSize: 17 }]}>
						Covid-19 Data
					</Text>
				</View>
				<View
					style={[styles.section, { height: 500, backgroundColor: '#f1f1f1' }]}
				></View>
			</Animated.ScrollView>
		</GestureHandlerRootView>
	)
}