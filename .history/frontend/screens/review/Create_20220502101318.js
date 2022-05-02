import * as React from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import StarRating from 'react-native-star-rating';


const Create = (props) => {
  const [text, setText] = React.useState("");
  const [venues, setVenues] = React.useState("")
  const [selectedValue, setSelectedValue] = React.useState("None");
  const [loaded, setLoaded] = React.useState(false);
  const [star, setRating] = React.useState(3.5)

  const onSubmit = () =>{
      console.log("submitted!!")
      props.navigation.navigate('Reviews')
  }

  React.useEffect(() => {
    const res =  axios.get(`${baseUrl}/venue`)
    .then((res) => {
        if (res) {
        //console.log(res)
        let lst = []
        for (let i=0; i < res.data.length; i++) {
            lst[i] = res.data[i]['name']
         }
        setVenues(lst)
        setLoaded(true)
        }
        })
    .catch((err) => {
        console(err)
      })}
	, [])

    const getVenues = (data)=>{
        
    }
  return (
		<View style={styles.display}>
			<Text style={styles.title}>Description</Text>
			<TextInput
				placeholder="Your reviews for the venue"
				onChangeText={(text) => {
					setText(text)
				}}
				style={[styles.searchBox2, {height:120}]}
				multiline={true}
			/>
            {/* <Text>{text}</Text> */}
			<Text style={styles.title}>{'\n'}Venue Location</Text>
			{loaded ? (
				<Picker
					selectedValue={selectedValue}
					onValueChange={(itemValue) => setSelectedValue(itemValue)}
				>
					<Picker.Item label="None" value="none" />
					{venues.map((pos) => (
						<Picker.Item label={pos} value={pos} key={pos} />
					))}
				</Picker>
			) : null}
            {/* <Text>{selectedValue}</Text> */}
            <Text style={styles.title}>{'\n'}Rating{'\n'}</Text>
			<StarRating
				disabled={false}
				maxStars={5}
				rating={star}
                fullStarColor={'orange'}
                starSize={30}
				selectedStar={(rating)=>setRating(rating)}
			/>
            <Text>{star}</Text>
<Text>{'\n\n\n\n'}</Text>
            <TouchableOpacity onPress={() => {
	const res = await axios.post(`${baseUrl}/review/review`, {
		venue_id: 1,
        review: text
	})
            }} style={styles.button}><Text style={styles.text}>Review</Text></TouchableOpacity>
		</View>
	)
};
const styles = StyleSheet.create({
	display: {
		padding: '5%'
	},
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
	searchBox2: {
        height:'30%',
		backgroundColor: '#fff',
		width: '100%',
		borderRadius: 10,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,

	},
	title: {
		fontSize: 15,
		fontWeight: 'bold',
        color:(255,255,255,180),
		margin: 5
	}
})
export default Create;