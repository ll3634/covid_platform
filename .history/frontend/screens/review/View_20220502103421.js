import { useEffect, useState, useCallback } from 'react'
import {
	Button,
	Image,
	Text,
	StyleSheet,
	View,
	FlatList,
	Header,
	ScrollView,
	TouchableOpacity,
	RefreshControl
} from 'react-native'
import { Card, TextInput, FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout))
}

export default function App(props) {
	const [refreshing, setRefreshing] = useState(false)
	const [venue, setVenue] = useState()

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		console.log('refreshing!!')
		wait(2000).then(() => setRefreshing(false))
	}, [])

	useEffect(async() => {
		const res = await axios.get(`${baseUrl}/review`)
			
			
			setVenue(res.data)
			console.log(venue)
	}, [])
	const Card = (data) => {
		return (
			<View style={styles.card}>
				<Text style={{ fontSize: 15 }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
					tincidunt imperdiet lacus, non viverra massa elementum vel. Mauris
					maximus augue elementum, semper mi eget, cursus nisl. Proin cursus ex
					a luctus malesuada. Quisque egestas luctus feugiat. Suspendisse ante
					sapien, scelerisque eget laoreet ac, venenatis ut orci. Nullam ac nunc
					et metus scelerisque congue sit amet at leo. Proin varius, mauris nec
					aliquam elementum, mi lorem rhoncus ex, ut consectetur mi lectus
					rutrum dui. Nunc pharetra mauris vitae maximus varius.
				</Text>
			</View>
		)
	}

	const renderData = (item) => {
		return (
			<TouchableOpacity style={styles.card} onPress={() => clickedItem(item)}>
				<Text style={{color:'grey'}}>{'\t'}{item.review}</Text>
			</TouchableOpacity>
		)
	}
	return (
		<View style={styles.container}>
			<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
			{/* <Text>{venue[0]}</Text> */}
			{/* {venue.map((item) => {
				return (
					<View style={styles.card}>

						<Text style={{ fontSize: 15 }}>
						{'\t'}{item.review}
						</Text>
					</View>
				)
			})} */}


			<View style={styles.addReview}>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('Create New Review')}
				>
					<Icon name="add-circle-sharp" color="#007aff" size={70} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#F5FCFF',
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
		padding: '5%',
		borderWidth: 0.5,
		borderColor: '#ddd',
	}
})
