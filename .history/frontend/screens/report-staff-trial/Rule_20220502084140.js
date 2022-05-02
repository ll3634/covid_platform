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

import { connect } from 'react-redux'
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'

import SingleCheckbox from '../../components/SingleCheckbox'
import Button from '../../components/Button'

Rule = (props) => {
	const a = []
	if (props.venues.length > 0) {
		for (let n = 0; n < props.venues[props.venues.length - 1].image_num; n++) {
			a[n] = 0
		}
	} else {
	}

	const handleSubmit = async () => {
    props.
		props.createVenues(
			props.name,
			props.description,
			props.latitude,
			props.longitude,
			0,
			props.capacity,
			props.start,
			props.end
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

      <View
				style={{
					flexDirection: 'row',
					marginVertical: 0,
					marginHorizontal: 10
				}}
			>
				<Text style={[styles.title2, {}]}>Release</Text>
				<TextInput
					placeholder="10"
					onChangeText={(text) => {
						props.setStartTime(text)
					}}
					style={[styles.searchBox3, { height: 35, width: 60 }]}
				/>
        <Text style={[styles.title2, {}]}>seats every</Text>
        <TextInput
					placeholder="2"
					onChangeText={(text) => {
						props.setEndTime(text)
					}}
					style={[styles.searchBox3, { height: 35, width: 60 }]}
				/>
        <Text style={[styles.title2, {}]}>hours.</Text>
			</View>

      {/* <Text>{props.start}</Text>
      <Text>{props.end}</Text> */}

      <View
				style={{
					flexDirection: 'row',
					marginVertical: 0,
					marginHorizontal: 10
				}}
			>
				<Text style={[styles.title2, {}]}>Set seats to 0 when closed</Text>
				<View
					style={{
						backgroundColor: 'white',
						marginVertical: 5,
						borderRadius: 0,
						height: 39,
						alignSelf: 'center',
						width: '49.75%',
						shadowColor: '#ccc',
						shadowOffset: { width: 0, height: 3 },
						shadowOpacity: 0.5,
						shadowRadius: 5,
						elevation: 10
					}}
				>
					<SingleCheckbox
						selectionMode={[1]}
						optionlist={['Yes', 'No']}
						onSelectSwitch={() => {}}
					/>
				</View>
			</View>

			<View
				style={{
					flexDirection: 'row',
					marginVertical: 0,
					marginHorizontal: 10
				}}
			>
				<Text style={[styles.title2, {}]}>Report positive cases</Text>
				<View
					style={{
						backgroundColor: 'white',
						marginVertical: 5,
						borderRadius: 0,
						height: 39,
						alignSelf: 'center',
						width: '49.75%',
						shadowColor: '#ccc',
						shadowOffset: { width: 0, height: 3 },
						shadowOpacity: 0.5,
						shadowRadius: 5,
						elevation: 10
					}}
				>
					<SingleCheckbox
						selectionMode={[1]}
						optionlist={['Yes', 'No']}
						onSelectSwitch={() => {}}
					/>
				</View>
			</View>

			<Button
				// text={props.venues[props.venues.length - 1].id}
				text={'Submit'}
				navigation={() => {
					handleSubmit()
				}}
			/>
		</SafeAreaView>
	)
}

const createVenue =
	(name, description, lat, lng, num, capacity, start, end) =>
	async (dispatch) => {
		const res = await axios.post(`${baseUrl}/venue`, {
			name: name,
			description: description,
			latitude: lat,
			longitude: lng,
			image_num: num,
			capacity: capacity,
			start: start,
			end: end
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

const getSetStartTime = (data) => {
	return {
		type: 'CREATE_START',
		start: data
	}
}

const getSetEndTime = (data) => {
	return {
		type: 'CREATE_END',
		end: data
	}
}

const getVenueByID = (id) => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/venue/${id}`)
	if (res) {
		const action = getSetVenue(res)
		dispatch(action)
	}
}

const setAddCapacity = (capacity, interval) => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/addcapacity/${capacity}/${interval}`)
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
		end: state.report.end
	}
}

const mapDispatch = (dispatch) => {
	return {
		createVenues(name, description, lat, lng, num, capacity, start, end) {
			dispatch(
				createVenue(name, description, lat, lng, num, capacity, start, end)
			)
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
		},
    setAddCapacities(capacity, interval) {
      dispatch(setAddCapacity(capacity, interval))
    }
	}
}

export default connect(mapState, mapDispatch)(Rule)

const styles = StyleSheet.create({
	badge: {
		zIndex: 2,
		backgroundColor: 'white',
		padding: 20,
		width: '97.5%',
		alignSelf: 'center',
		margin: 5,
		borderRadius: 10,
		marginHorizontal: 5,

		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	},
	buttonWrapper: {
		backgroundColor: 'white',
		marginVertical: 15,
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
		marginRight: 10
	},
	searchBox3: {
		// paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: 5,
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '50%',
		height: 27.5,
		alignSelf: 'center',
		borderRadius: 0,
    marginRight: 10,
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
