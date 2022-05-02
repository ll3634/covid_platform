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
		<View>
			<ScrollView style={{height:'100%', padding: '5%' }}>
			<View >
				<Text
					style={{
						fontSize: 15,
						fontWeight: 'bold',
						color: (255, 255, 255, 180),
						margin: 5,
						left: -10
					}}
				>
					Name:
				</Text>
				<Text
					style={{ fontWeight: 'bold', fontSize: 17,  paddingVertical: '2.5%' }}
				>
					{' '}
					{data.item.name}
				</Text>
				<Text
					style={{
						fontSize: 15,
						fontWeight: 'bold',
						color: (255, 255, 255, 180),
						margin: 5,
						left: -10, 
						borderBottomEndRadius:20,
						
					}}
				>
					Description:
				</Text>
				<Text style={{borderRadius: 10, padding:20,backgroundColor:'white', padding:'5%', marginTop:'2.5%'}}> {data.item.description}</Text>
				<Text
					style={{
						fontSize: 15,
						fontWeight: 'bold',
						color: (255, 255, 255, 180),
						margin: 5,
						left: -10,
						paddingTop:'5%',
					}}
				>
					Created at:
				</Text>
				<Text> {data.item.created_at}</Text>
			</View>
			
		</ScrollView>
		<View style={{position:'absolute', bottom:'15%', width:'100%'}}>
				<Button
					icon="update"
					mode="contained"
					style={{
						backgroundColor: '#00b894',
						color: 'white',
						fontSize: '20px',
						padding: '2%',
						borderRadius: '5px',
						marginHorizontal: '5%',
						width: '80%',
						alignSelf:'center'
					}}
					onPress={() => props.navigation.navigate('Edit', { data: data })}
				>
					Edit Venue
				</Button>
				<Button
					icon="delete"
					mode="contained"
					style={{
						backgroundColor: '#00b894',
						color: 'white',
						fontSize: '20px',
						padding: '2%',
						borderRadius: '5px',
						margin: '3%'
					}}
					onPress={() => handleDelete(props.route.params.data.item)}
				>
					Delete Venue
				</Button>
				<Button
					icon="delete"
					mode="contained"
					style={{
						backgroundColor: '#00b894',
						color: 'white',
						fontSize: '20px',
						padding: '2%',
						borderRadius: '5px',
						margin: '3%'
					}}
					onPress={() => handleDelete(props.route.params.data.item)}
				>
					Apply Rule
				</Button>
			</View>
		</View>
		
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
