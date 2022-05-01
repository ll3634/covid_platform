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

	const handleAdd = async () => {
		props.addCapacities()
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
				<Button
					icon="update"
					mode="contained"
					onPress={() => handleAdd()}
				>
					Apply Rule
				</Button>
			</View>
		</ScrollView>
	)
}

const deleteVenue = (id) => async (dispatch) => {
	const res = await axios.delete(`${baseUrl}/venue/${id}`)
}

const addCapacity = () => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/addcapacity`)
}

const mapState = (state) => {
	return {}
}

const mapDispatch = (dispatch) => {
	return {
		deleteVenues (id) {
			dispatch(deleteVenue(id))
		},
		addCapacities () {
			dispatch(addCapacity())
		}

	}
}

export default connect(mapState, mapDispatch)(Details)
