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

import SingleCheckbox from '../../components/SingleCheckbox'
import MultiCheckbox from '../../components/MultiCheckbox'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'


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
		<SafeAreaView
			style={{
				flex: 1,
				// justifyContent: 'space-between',
				marginTop: 5,
				marginBottom: 115,
				marginHorizontal: 20
			}}
		>
			<Text style={styles.title}>Location</Text>
			<Text style={[styles.title, { marginTop: 60 }]}>Venue Name</Text>
			<TextInput
				placeholder="Name"
				onChangeText={(text) => {
					props.setName(text)
				}}
				style={styles.searchBox2}
			/>
			<Text style={styles.title}>Description</Text>
			<TextInput
				placeholder="Description"
				onChangeText={(text) => {
					props.setDescription(text)
				}}
				style={[styles.searchBox2, { paddingTop: 12.5, height: 75 }]}
				multiline={true}
			/>
			<View style={{ flexDirection: 'row', marginVertical: 0, marginHorizontal: 10, }}>
				<Text style={[styles.title2, {}]}>Max Capacity</Text>
				<TextInput
					placeholder="#"
					onChangeText={(text) => {
						props.setName(text)
					}}
					style={[styles.searchBox3, { height: 35, width: 230 }]}
				/>
			</View>

			{/* <ScrollView
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
			</ScrollView> */}
			<View style={{ flexDirection: 'row', marginVertical: 0, marginHorizontal: 10}}>
			<Text style={[styles.title2, {}]}>Allow Free Check-in</Text>
			<View style={{backgroundColor: 'white', marginVertical: 5, borderRadius: 10, height: 39, alignSelf: 'center', width:'50%',shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10}}>
			<SingleCheckbox
						selectionMode={[1]}
						optionlist={['Yes', 'No']}
						onSelectSwitch={() => {}}
					/></View>
			</View>
			
			<View style={{ flexDirection: 'row', marginVertical: 0, marginHorizontal: 10}}>
			<Text style={[styles.title2, {}]}>Openning Days</Text>
			<View style={{backgroundColor: 'white', marginVertical: 5, borderRadius: 10, width:'60%', shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10}}>
			<MultiCheckbox
						selectionMode={[1]}
						optionlist={[
							'Weekdays',
							'Weekends',
						]}
						onSelectSwitch={() => {}}
			/>
			</View>
			</View>

			<View style={{ flexDirection: 'row', marginVertical: 0, marginHorizontal: 10}}>
			<Text style={styles.title2}>Hours</Text>
			<View style={{backgroundColor: 'white', marginVertical: 5, borderRadius: 10, width: '77.5%',shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10}}>
			<View style={{ flexDirection: 'row', marginVertical: 0, marginHorizontal: 10, justifyContent: 'center' }}>
				<TextInput
					placeholder="9"
					onChangeText={(text) => {
						props.setName(text)
					}}
					style={[styles.searchBox3, { width: 75, height: 27.5 }]}
				/>
				<Text style={{ marginHorizontal: 10, alignSelf:'center' }}> A.M. - </Text>
				<TextInput
					placeholder="5"
					onChangeText={(text) => {
						props.setName(text)
					}}
					style={[styles.searchBox3, { width: 75, height: 27.5 }]}
				/>
				<Text style={{ marginHorizontal: 10, alignSelf:'center' }}> P.M. </Text>
			</View>
			</View>
			</View>

			<TouchableOpacity
				style={styles.buttonWrapper}
				onPress={() => {
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
			>
				<Icon name="cloud-upload-outline" size={25} color={'grey'} />
				<Text style={styles.buttonText}>Upload Image</Text>
			</TouchableOpacity>

			<Button
				// text={props.venues[props.venues.length - 1].id}
				text={'Submit'}
				navigation={() => {
					handleSubmit()
				}}
			/>

			<View style={[styles.searchBox]}>
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
							height: 40
						},
						textInput: {
							backgroundColor: '#ffffff',
							height: 40,
							borderRadius: 5,
							paddingVertical: 5,
							paddingHorizontal: 5,
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

const getSetCapacity = (data) => {
	return {
		type: 'CREATE_CAPACITY',
		capacity: data
	}
}

const getSetStartTime


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
		latitude: state.report.latitude,
		capacity: state.report.capacity,
		start: state.report.start,
		end: state.report.end,
	}
}

const mapDispatch = (dispatch) => {
	return {
		createVenues(name, description, lat, lng, num) {
			dispatch(createVenue(name, description, lat, lng, num))
		},
		setName(res) {
			if (res) {
				const action = getSetName(res)
				dispatch(action)
			}
		},
		setDescription(res) {
			if (res) {
				const action = getSetDescription(res)
				dispatch(action)
			}
		},
		setCoords(res) {
			if (res) {
				const action = getSetCoords(res)
				dispatch(action)
			}
		},
		setCapacity(res) {
			if (res) {
				const action = getSetCapacity(res)
				dispatch(action)
			}
		},
		setStartTime(res) {
			if (res) {
				const action = getSetStartTime(res)
				dispatch(action)
			}
		},
		setEndTime(res) {
			if (res) {
				const action = getSetEndTime(res)
				dispatch(action)
			}
		},
		getVenuesByID(id) {
			dispatch(getVenueByID(id))
		}
	}
}

export default connect(mapState, mapDispatch)(Create)

const styles = StyleSheet.create({
	buttonWrapper: {
		backgroundColor: 'white',
		marginVertical: 20,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: 'grey',
		borderRadius: 10,
		width: '98.5%',
		alignSelf: 'center',

		height: 75
	},
	buttonText: {
		marginTop: 2.5,
		fontSize: 16,
		color: 'grey'
	},
	container: {
		display: 'flex',
		flex: 1
	},
	title: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'grey',
		margin: 5
	},
	title2: {
		alignSelf: 'center',
		fontSize: 15,
		color: 'grey',
		fontWeight: 'bold',
		marginLeft: -5,
		marginRight: 50,
	},
	searchBox3: {
		// paddingVertical: 10,
		paddingHorizontal: 20,
		marginVertical: 5,
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '50%',
		height: 27.5,
		alignSelf: 'center',
		borderRadius: 10,
		// borderWidth: 1.5,
		// borderColor: 'grey',
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	},
	searchBox2: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginVertical: 7.5,
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '100%',
		height: 40,
		alignSelf: 'center',
		borderRadius: 10,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	},
	searchBox: {
		position: 'absolute',
		marginTop: 32.5,
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '100%',
		alignSelf: 'center',
		borderRadius: 10,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	}
})
