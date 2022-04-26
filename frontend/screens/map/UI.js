import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import * as Location from 'expo-location'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	useSharedValue,
	useDerivedValue,
	useAnimatedReaction,
	useAnimatedStyle,
	withDecay,
	withTiming,
	cancelAnimation,
	Easing,
	Extrapolate,
	interpolate
} from 'react-native-reanimated'

import Card from '../../components/Card'
import BackButton from '../../components/BackButton'

import { Entypo, MaterialIcons } from 'react-native-vector-icons'

import styles from './style'


import { windowWidth, windowHeight } from '../../assets/constants/Dimensions'

const titles = ['hi', 'good', 'ok', 'dfd', 'omg']

const mapStyle = []

const Map = (props) => {

  useEffect(() => {
		props.getVenuesInfo()
	}, [])

  const markers = props.categories

	const initialState = {
		markers,
		region: {
			latitude: 40.729035,
			longitude: -73.996271,
			latitudeDelta: 0.0175,
			longitudeDelta: 0.0175
		}
	}

	const [state, setState] = useState(initialState)

	const mapRef = useRef(null)
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)
	const context = useSharedValue({ x: 0, y: 0 })
	const itemIndex = useSharedValue(0)
	const clampedTranslateX = useDerivedValue(() => {
		const MAX_TRANSLATEX = -windowWidth * (titles.length - 1)
		return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATEX)
	})

	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		;(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			const location = await Location.getCurrentPositionAsync({})
			setLocation(location)
		})()
	}, [])

	let text = 'Waiting..'
	if (errorMsg) {
		text = errorMsg
	} else if (location) {
		text = JSON.stringify(location)
	}

	const gesture = Gesture.Pan()
		.onStart(() => {
			context.value = {
				x: clampedTranslateX.value
				// y: translateY.value
			}
			cancelAnimation(translateX)
		})
		.onUpdate((event) => {
			translateX.value = event.translationX + context.value.x
			// translateY.value = event.translationY + context.value.y
		})
		.onEnd((event) => {
			translateX.value = withDecay({ velocity: event.velocityX })
			itemIndex.value = Math.floor(-clampedTranslateX.value / windowWidth) + 1
		})
	const scroll = () => {
		const { coordinate } = state.markers[2]
		value.animateToRegion(
			{
				...coordinate,
				latitudeDelta: state.region.latitudeDelta,
				longitudeDelta: state.region.longitudeDelta
			},
			350
		)
	}

	useAnimatedReaction(
		() => translateX.value,
		(next, prev) => {
			if (next !== prev && prev !== null) {
				console.log(itemIndex.value)
				const res = itemIndex.value
				if (next < prev - 1) {
					if (
						translateX.value < -windowWidth * res + windowWidth &&
						translateX.value > -windowWidth * res
					) {
						translateX.value = withTiming(-windowWidth * res, {
							duration: 500,
							easing: Easing.bezier(0.25, 0.1, 0.25, 1)
						})
						translateY.value = withTiming(0, {
							duration: 500,
							easing: Easing.bezier(0.25, 0.1, 0.25, 1)
						})
					}
				} else if (next > prev + 1) {
					if (
						translateX.value < -windowWidth * res + windowWidth &&
						translateX.value > -windowWidth * res
					) {
						translateX.value = withTiming(-windowWidth * (res - 1), {
							duration: 500,
							easing: Easing.bezier(0.25, 0.1, 0.25, 1)
						})
						translateY.value = withTiming(0, {
							duration: 500,
							easing: Easing.bezier(0.25, 0.1, 0.25, 1)
						})
					}
				}
			}
		}
	)

	const onMarkerPress = (mapEventData) => {
		const markerID = mapEventData._targetInst.return.key
		let x = markerID * windowWidth
		if (x !== 0) {
			x = -x
		}
		console.log(x)
		translateX.value =
			// -x
			withTiming(x, {
				duration: 500,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1)
			})
		translateY.value = 0
	}

	const markerAnimation = (hi) =>
		useAnimatedStyle(() => {
			const scale = interpolate(
				translateX.value,
				[-windowWidth * (hi + 1), -windowWidth * hi, -windowWidth * (hi - 1)],
				[1, 1.75, 1],
				Extrapolate.CLAMP
			)
			return {
				transform: [{ scale }]
			}
		})

	const imageAnimation = (hi) =>
		useAnimatedStyle(() => {
			const scale = interpolate(
				translateX.value,
				[-windowWidth * (hi + 1), -windowWidth * hi, -windowWidth * (hi - 1)],
				[0, 1.25, 0],
				Extrapolate.CLAMP
			)
			return {
				transform: [{ scale }]
			}
		})

	const upStyle = useAnimatedStyle(() => {
		const opacity = interpolate(translateY.value, [-100, -50], [0, 1])
		return {
			opacity
		}
	})

	const downStyle = useAnimatedStyle(() => {
		const opacity = interpolate(translateY.value, [-100, -50], [1, 0])
		return {
			opacity
		}
	})

	return (
		<View>
			<View style={{ zIndex: 3, top: 49.5, left: 10 }}>
				<BackButton
					navigation={() => {
						props.navigation.goBack()
					}}
				/>
				<Animated.View style={styles.clickWrapper}>
					<TouchableOpacity
						style={[styles.click]}
						onPress={() => {
							mapRef.current.animateToRegion(
								{
									latitude: location.coords.latitude,
									longitude: location.coords.longitude,
									latitudeDelta: 0.015,
									longitudeDelta: 0.015
								},
								350
							)
						}}
					>
						<MaterialIcons name="near-me" size={24} color="black" />
					</TouchableOpacity>
				</Animated.View>
			</View>

			<View style={styles.icon}>
				<Text style={styles.iconText}>SEARCH</Text>
			</View>

			<View style={[styles.searchBox, { zIndex: 2 }]}>
				<GooglePlacesAutocomplete
					placeholder="Search"
					minLength={2} // minimum length of text to search
					autoFocus={false}
					returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
					listViewDisplayed="auto" // true/false/undefined
					fetchDetails={true}
					renderDescription={(row) => row.description} // custom description render
					onPress={(data, details = null) => {
						// console.log('data', data);
						// console.log('latitude', details.geometry.location.lat);
						// console.log('longitude', details.geometry.location.lng);
						mapRef.current.animateToRegion(
							{
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng,
								latitudeDelta: 0.015,
								longitudeDelta: 0.015
							},
							350
						)
					}}
					getDefaultValue={() => {
						return ''
					}}
					query={{
						key: 'AIzaSyCANhUvc31mdriYGIh4oLF4G5diQiXokQg',
						language: 'en'
					}}
					styles={{
						textInputContainer: {
							height: 45
						},
						textInput: {
							backgroundColor: '#ffffff',
							height: 45,
							borderRadius: 5,
							paddingVertical: 5,
							paddingHorizontal: 10,
							fontSize: 15,
							flex: 1
						}
					}}
					currentLocationLabel="Current location"
					nearbyPlacesAPI="GooglePlacesSearch"
					GoogleReverseGeocodingQuery={{}}
					GooglePlacesSearchQuery={{
						rankby: 'distance'
					}}
					debounce={200}
				/>
			</View>

			<MapView
				ref={mapRef}
				initialRegion={state.region}
				style={[styles.container, { zIndex: 1 }]}
				provider={PROVIDER_GOOGLE}
				customMapStyle={mapStyle}
				rotateEnabled={true}
			>
				{state.markers.map((marker, index) => {
					return (
						<Marker
							key={index}
							coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
							onPress={(e) => {
								onMarkerPress(e),
								mapRef.current.animateToRegion(
									{
										latitude: parseFloat(marker.latitude),
										longitude: parseFloat(marker.longitude),
										latitudeDelta: state.region.latitudeDelta,
										longitudeDelta: state.region.longitudeDelta
									},
									350
								)
							}}
						>
							<Animated.View key={index} style={[styles.markerWrap]}>
								<Animated.Image
									source={require('../../assets/images/pins.png')}
									style={[styles.marker, markerAnimation(index)]}
									resizeMode="cover"
								/>
								<Animated.View
									key={index}
									style={[
										{
											top: -21.25,
											left: 7.49,
											width: 27,
											height: 27,
											borderRadius: 20,
											overflow: 'hidden',
											marginRight: 15,
											borderWidth: 1.5,
											borderColor: 'white'
										},
										imageAnimation(index)
									]}
								>
									<Image
										source={{
											uri: `https://expouploads22309-dev.s3.us-east-2.amazonaws.com/public/venue/${marker.id}/1.jpg`
										}}
										style={{ height: 27, width: 27 }}
										resizeMode="cover"
									/>
								</Animated.View>
							</Animated.View>
						</Marker>
					)
				})}
			</MapView>

			<GestureDetector gesture={gesture}>
				<Animated.View
					style={[styles.scrollView, { zIndex: 3, flexDirection: 'row' }]}
				>
					{state.markers.map((marker, index) => {
						return (
							<Card
								key={index}
								marker={marker}
								translateX={clampedTranslateX}
								translateY={translateY}
								index={index}
							>
								<TouchableOpacity
									style={{
										height: 30,
										marginBottom: -10,
										marginTop: -10,
										backgroundColor: '#fefefe',
										borderRadius: 5,
										alignItems: 'center',
										justifyContent: 'center'
									}}
									onPress={() => {
										if (translateY.value === 0) {
											translateY.value = withTiming(350 - windowHeight, {
												duration: 500,
												easing: Easing.bezier(0.25, 0.1, 0.25, 1)
											})
										} else {
											translateY.value = withTiming(0, {
												duration: 500,
												easing: Easing.bezier(0.25, 0.1, 0.25, 1)
											})
										}
										mapRef.current.animateToRegion(
											{
												latitude: parseFloat(marker.latitude),
												longitude: parseFloat(marker.longitude),
												latitudeDelta: state.region.latitudeDelta,
												longitudeDelta: state.region.longitudeDelta
											},
											350
										)
									}}
								>
									<Animated.View
										style={[
											{ position: 'absolute', right: 3, bottom: 50 },
											upStyle
										]}
									>
										<TouchableOpacity
											style={styles.click}
											onPress={() => {
												mapRef.current.animateToRegion(
													{
														latitude: parseFloat(marker.latitude),
														longitude: parseFloat(marker.longitude),
														latitudeDelta: state.region.latitudeDelta,
														longitudeDelta: state.region.longitudeDelta
													},
													350
												)
											}}
										>
											<MaterialIcons name="gps-fixed" size={25} />
										</TouchableOpacity>
									</Animated.View>
									<Animated.View style={[upStyle, { top: 15 }]}>
										<Entypo name="chevron-up" size={30} />
									</Animated.View>
									<Animated.View style={[downStyle, { bottom: 15 }]}>
										<Entypo name="chevron-down" size={30} />
									</Animated.View>
								</TouchableOpacity>
							</Card>
						)
					})}
				</Animated.View>
			</GestureDetector>
		</View>
	)
}

export default Map
