import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

const StarRating = (props) => {
	const stars = []
	for (let i = 1; i <= 5; i++) {
		let name = 'ios-star'
		if (i > props.ratings) {
			name = 'ios-star-outline'
		}

		stars.push(<Ionicons name={name} size={13} style={styles.star} key={i} />)
	}

	return (
		<View style={styles.container}>
			{stars}
			{props.reviews != 0 && <Text style={styles.text}>({props.reviews})</Text>}
		</View>
	)
}

export default StarRating

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 1,
		marginLeft: 1
	},
	star: {
		color: '#FF8C00'
	},
	text: {
		fontSize: 11,
		marginLeft: 5,
		color: '#444'
	}
})
