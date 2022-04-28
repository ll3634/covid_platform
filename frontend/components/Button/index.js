import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles'

const Button = ({ text, navigation, wrapperStyle = {}, textStyle = {} }) => {
	return (
		<TouchableOpacity onPress={navigation}>
			<View style={[styles.button, wrapperStyle]}>
				<Text style={[styles.buttonText, textStyle]}>{text}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default Button
