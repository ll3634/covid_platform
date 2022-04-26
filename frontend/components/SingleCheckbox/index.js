import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Fontisto } from 'react-native-vector-icons'

export default function SingleCheckbox ({
	selectionMode,
	optionlist,
	onSelectSwitch
}) {
	const [getSelectionMode, setSelectionMode] = useState(selectionMode)

	const updateSwitchData = (value) => {
		setSelectionMode(value)
		onSelectSwitch(value)
	}

	// console.log(getSelectionMode)

	return (
		<View style={[styles.listWrapper]}>
			{optionlist.map((category, index) => (
				<TouchableOpacity
					key={index}
					activeOpacity={1}
					onPress={() => updateSwitchData(index + 1)}
					style={{
						// flex: 1,
						flexDirection: 'row',
						// backgroundColor: getSelectionMode.includes(index + 1) ? 'orange' : '#f1f1f1',
						borderRadius: 5,
						margin: 5,
						paddingHorizontal: 5,
						justifyContent: 'space-between',
						alignItems: 'center',
						height: 30
					}}
				>
					<View style={styles.box}>
						{getSelectionMode === index + 1 && (
							<Fontisto name={'radio-btn-active'} size={15} />
						)}
						{getSelectionMode !== index + 1 && (
							<Fontisto name={'radio-btn-passive'} size={15} />
						)}
					</View>

					<Text style={[styles.listText]}>{category}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	listWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		// alignItems: 'center',
		// height: '100%',
		width: '100%',

		// backgroundColor: 'white',
		borderRadius: 7,
		borderColor: '#ad40af'
	},
	box: {
		marginRight: 5
	},
	listText: {
		fontSize: 14,
		color: 'black'
	}
})
