import React, { useEffect, useState, useCallback} from 'react'
import { Image, StyleSheet, Text, View, FlatList, jsonify, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

App = (props) => {
	const [refreshing, setRefreshing] = useState(false)


	const onRefresh = useCallback(() => {
		setRefreshing(true)
		console.log('refreshing!!')
		props.getVenuesInfo()
		wait(2000).then(() => setRefreshing(false))
	  }, [])

	  
	useEffect(() => {
		props.getVenuesInfo()
	}, [])

	const clickedItem = (data) => {
		props.navigation.navigate('Details', { data: data })
	}

	const renderData = (item) => {
		return (
			<View style={styles.card} onPress={() => clickedItem(item)}>
				<Text style={styles.title} >
					{item.item.name}
				</Text>
				<Text style={{color:'grey'}}>{'\t'}{item.item.description}</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
		
			<FlatList
			style={{height:'100%', marginBottom:'20%'}}
				data={props.venues.venues}
				renderItem={(data) => {
					return renderData(data)
				}}
				keyExtractor={(data) => `${data.id}`}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>

		
			<View style={styles.addReview}>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('Create')}
				>
					<Icon name="add-circle-sharp" color="#007aff" size={70} />
				</TouchableOpacity>
			</View>
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
	addReview: {
		position: 'absolute',
		right: '7.5%',
		bottom: '15%'
	},
	card: {
		backgroundColor: 'white',
  	borderRadius: 10,
		marginHorizontal: 10,
		marginTop: 10,
		padding: '5%'
	},
	title: {
		fontSize: 17,
		fontWeight:'bold',
		marginBottom:5,
		textAlign:'center'
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
