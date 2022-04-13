import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View, FlatList, jsonify } from 'react-native'
import { Card, TextInput, Button, FAB } from 'react-native-paper'
import { connect } from 'react-redux'
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'

App = (props) => {
	useEffect(() => {
		props.getVenuesInfo()
	}, [])

	const clickedItem = (data) => {
		props.navigation.navigate('Details', { data: data })
	}

	const renderData = (item) => {
		return (
			<Card style={styles.card}>
				<Text style={styles.title} onPress={() => clickedItem(item)}>
					{item.item.name}
				</Text>
				<Text>{item.item.description}</Text>
				<Text>{props.venues.venues.length}</Text>
			</Card>
		)
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={props.venues.venues}
				renderItem={(data) => {
					return renderData(data)
				}}
				keyExtractor={(data) => `${data.id}`}
			/>

			<FAB
				style={styles.fab}
				small={false}
				icon="plus"
				theme={{ colors: { accent: 'green' } }}
				onPress={() => props.navigation.navigate('Create')}
			/>
		</View>
	)
}

const getSetState = (data) => {
	return {
		type: 'SET_STATE',
		venues: data.data
	}
}

const getVenueInfo = () => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/venue`)
	if (res) {
		const action = getSetState(res)
		dispatch(action)
	}
}

const mapState = (state) => {
	return {
		venues: state.report
	}
}

const mapDispatch = (dispatch) => {
	return {
		getVenuesInfo () {
			dispatch(getVenueInfo())
		},
		setState (res) {
			const action = getSetState(res)
			dispatch(action)
		}
	}
}

export default connect(mapState, mapDispatch)(App)

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1
	},
	card: {
		flex: 1,
		margin: 10,
		padding: 20
	},
	title: {
		fontSize: 17
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 100
	},
	input1: {
		padding: 10,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		height: 30
	},
	input2: {
		padding: 10,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		height: 60
	}
})
