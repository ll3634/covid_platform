import React, { useEffect, useState, useCallback } from 'react'
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
    const [loading, setloading] = useState(false)

   const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

	useEffect(async() => {
		const res = await axios.get(`${baseUrl}/review`)
            let reviews = []
			for (let i = 0; i < res.data.length; i++){
                reviews[i] = res.data[i]['review']
            }
			setVenue(reviews)
            setloading(true)

	}, [refreshing])
	const Card = (data) => {
		return (
			<View style={styles.card}>
				<Text style={{ fontSize: 15 }}>
					{data}
				</Text>
			</View>
		)
	}

	const renderReviews=() => {
        return 
    }
    return(

		<View style={styles.container}>
           <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}>
              
           </View>
           <ScrollView style={{height:'100%', marginBottom:'20%'}}  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
               {loading?(venue.map((ven,id) =><View key={id} style={styles.card}>
				<Text style={{ fontSize: 15 }}>
					{ven}
				</Text>
			</View>)):(null)}
    
              
           </ScrollView>
           <View style={styles.addReview}>
                   <TouchableOpacity onPress={() => props.navigation.navigate('Create New Review')}>
                       <Icon name="add-circle-sharp" color="black" size={60} />
                   </TouchableOpacity>
               </View>
       </View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',

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
