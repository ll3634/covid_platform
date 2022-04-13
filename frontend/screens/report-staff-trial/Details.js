import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'

function Details (props) {
	const data = props.route.params.data

	const handleDelete = async (item) => {
		props.deleteVenues(item.id)
	}

	return (
		<ScrollView>
			<View>
				<Text> {data.item.name}</Text>
				<Text> {data.item.description}</Text>
				<Text> {data.item.created_at}</Text>
			</View>
			<View>
				<Button
					icon="update"
					mode="contained"
					onPress={() => props.navigation.navigate('Edit', { data: data })}
				>
					Edit Venue
				</Button>
				<Button
					icon="delete"
					mode="contained"
					onPress={() => handleDelete(props.route.params.data.item)}
				>
					Delete Venue
				</Button>
			</View>
		</ScrollView>
	)
}

const deleteVenue = (id) => async (dispatch) => {
	const res = await axios.delete(`${baseUrl}/venue/${id}`)
}

const mapState = (state) => {
	return {}
}

const mapDispatch = (dispatch) => {
	return {
		deleteVenues (id) {
			dispatch(deleteVenue(id))
		}
	}
}

export default connect(mapState, mapDispatch)(Details)
