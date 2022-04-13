import React, { useState, useEffect } from 'react'
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	SafeAreaView,
	View,
	FlatList
} from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { connect } from 'react-redux'
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'

import Button from '../../components/Button'

const imageUrl =
	'https://expouploads22309-dev.s3.us-east-2.amazonaws.com/public/'

Create = (props) => {
	const a = []
	if (props.venues.length > 0) {
		for (let n = 0; n < props.venues[props.venues.length - 1].image_num; n++) {
			a[n] = 0
		}
	} else {
	}

	// console.log(props.venues[props.venues.length - 1].id )

	const handleSubmit = async () => {
		props.createVenues(
			props.name,
			props.description,
			props.latitude,
			props.longitude,
			0
		)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TextInput
				placeholder=" Name"
				onChangeText={(text) => {
					props.setName(text)
				}}
				style={{
					borderWidth: 2,
					borderColor: '#000',
					padding: 10,
					marginTop: 10
				}}
			/>
			<TextInput
				placeholder=" Description"
				onChangeText={(text) => {
					props.setDescription(text)
				}}
				style={{
					borderWidth: 2,
					borderColor: '#000',
					padding: 10,
					marginTop: 10
				}}
			/>
			<Button
				// text={props.venues[props.venues.length - 1].id}
				text={'Submit'}
				navigation={() => {
					handleSubmit()
				}}
			/>

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
						console.log('latitude', details.geometry.location.lat)
						console.log('longitude', details.geometry.location.lng)
						props.setCoords(details.geometry.location)
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

			<ScrollView
				horizontal
				scrollEventThrottle={16}
				style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}
			>
				{a.map((marker, index) => {
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
									uri:
										'https://expouploads22309-dev.s3.us-east-2.amazonaws.com/public/venue/' +
										props.venues[props.venues.length - 1].id +
										'/' +
										(index + 1) +
										'.jpg'
								}}
								style={{ height: 100, width: 100 }}
								resizeMode="cover"
							/>
						</View>
					)
				})}
			</ScrollView>

			<View style={[styles.buttonWrapper]}>
				<Button
					text={'Upload Image'}
					navigation={() => {
						props.navigation.navigate('Upload', {
							id: props.venues[props.venues.length - 1].id,
							num: props.venues[props.venues.length - 1].image_num,
							name:
								'venue/' +
								props.venues[props.venues.length - 1].id +
								'/' +
								(props.venues[props.venues.length - 1].image_num + 1)
						})
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

const createVenue = (name, description, lat, lng, num) => async (dispatch) => {
	const res = await axios.post(`${baseUrl}/venue`, {
		name: name,
		description: description,
		latitude: lat,
		longitude: lng,
		image_num: num
	})
}

const getSetName = (data) => {
	return {
		type: 'CREATE_NAME',
		name: data
	}
}

const getSetDescription = (data) => {
	return {
		type: 'CREATE_DESCRIPTION',
		description: data
	}
}

const getSetCoords = (data) => {
	return {
		type: 'CREATE_COORDS',
		longitude: data.lng,
		latitude: data.lat
	}
}

const getSetVenue = (data) => {
	return {
		type: 'CREATE_IMAGE',
		venue: data.data
	}
}

const getVenueByID = (id) => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/venue/${id}`)
	if (res) {
		const action = getSetVenue(res)
		dispatch(action)
	}
}

const mapState = (state) => {
	// console.log(state.report.name)
	// console.log(state.report.description)
	// console.log(state.report.longitude)
	// console.log(state.report.venues)

	return {
		venues: state.report.venues,
		name: state.report.name,
		description: state.report.description,
		longitude: state.report.longitude,
		latitude: state.report.latitude
	}
}

const mapDispatch = (dispatch) => {
	return {
		createVenues (name, description, lat, lng, num) {
			dispatch(createVenue(name, description, lat, lng, num))
		},
		setName (res) {
			if (res) {
				const action = getSetName(res)
				dispatch(action)
			}
		},
		setDescription (res) {
			if (res) {
				const action = getSetDescription(res)
				dispatch(action)
			}
		},
		setCoords (res) {
			if (res) {
				const action = getSetCoords(res)
				dispatch(action)
			}
		},
		getVenuesByID (id) {
			dispatch(getVenueByID(id))
		}
	}
}

export default connect(mapState, mapDispatch)(Create)

const styles = StyleSheet.create({
	buttonWrapper: {
		position: 'absolute',
		marginTop: 400
	},
	container: {
		display: 'flex',
		flex: 1
	},
	searchBox: {
		position: 'absolute',
		marginTop: 250,
		paddingLeft: 40,
		paddingRight: 20,
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '90%',
		alignSelf: 'center',
		borderRadius: 20,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	}
})
