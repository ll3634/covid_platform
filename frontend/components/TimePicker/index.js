import React, { Component, useState } from 'react'
import { View, Button, Text, Icon } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const DatePicker = () => {
	const [date, setDate] = useState(new Date(1651196730000))
	const [mode, setMode] = useState('date')

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate
		setDate(currentDate)
	}

	return (
		<View>
			{/* <Text>selected: {date.toLocaleString()}</Text> */}
			<DateTimePicker
				testID="dateTimePicker"
				value={date}
				mode={mode}
				is24Hour={true}
				onChange={onChange}
			/>
		</View>
	)
}

export default DatePicker
