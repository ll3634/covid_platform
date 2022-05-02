 
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState, useCallback } from 'react'
import {
   Button,
   Image,
   Text,
   StyleSheet,
   View,
   Header,
   ScrollView,
   TouchableOpacity,
   RefreshControl,
} from 'react-native'
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

   useEffect(() => {
    const res =  axios.get(`${baseUrl}/venue`)
    .then((res) => {
        if (res) {

		setVenue(res)}
        })
    .catch((err) => {
        console.log(err)
      })}
	, [])
   const Card =(data)=>{
       return (
           <View style={styles.card}><Text style={{ fontSize: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
           tincidunt imperdiet lacus, non viverra massa elementum vel. Mauris
           maximus augue elementum, semper mi eget, cursus nisl. Proin cursus ex
           a luctus malesuada. Quisque egestas luctus feugiat. Suspendisse ante
           sapien, scelerisque eget laoreet ac, venenatis ut orci. Nullam ac nunc
           et metus scelerisque congue sit amet at leo. Proin varius, mauris nec
           aliquam elementum, mi lorem rhoncus ex, ut consectetur mi lectus
           rutrum dui. Nunc pharetra mauris vitae maximus varius.</Text></View>
       )
 
   }
   return (
       <View style={styles.container}>
           <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}>
              
           </View>
           <ScrollView style={{height:'100%', marginBottom:'20%'}}  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
                <Text></Text>
               <Card></Card>
               <Card></Card>
               <Card/>
              
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
       alignItems: 'center',
       backgroundColor: '#F5FCFF'
   },
   addReview:{
       position: 'absolute',
       right: '5%',
       bottom:'16%'
   },
   card:{backgroundColor:'#e8e7e6', marginHorizontal:'5%', marginVertical:'3%', padding:'5%'}
})
 

