import React, { useState, useEffect } from 'react'
import {
	View,
	ScrollView,
	SafeAreaView,
	Text
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import BackButton from '../../components/BackButton'
import Button from '../../components/Button'

import styles from './styles'

export default function Ticket (props) {
	const [dt, setDt] = useState(new Date().toLocaleString())

	const checkinInfo = {
		temperature: props.temp === 1 ? '≥37.3°C' : '<37.3°C',
		test: props.test === 1 ? 'Negative' : 'Positive',
    contact: props.contact === 1 ? 'Yes' : 'No',
	}

	useEffect(() => {
		const secTimer = setInterval(() => {
			setDt(new Date().toLocaleString())
		}, 1000)
		return () => clearInterval(secTimer)
	}, [])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ zIndex: 2 }}>
				<BackButton
					navigation={() => {
						props.navigation.goBack()
					}}
				/>
			</View>

			<ScrollView style={styles.contain}>
				<View style={[styles.header]}>
					<Text style={[styles.headerText]}>CHECK-IN CODE</Text>
				</View>
				<View style={styles.codeWrapper}>
					<Text
						style={{
							margin: 20,
							textAlign: 'center',
							fontSize: 19,
							fontWeight: 'bold'
						}}
					>
						{'At The Entrance, Show The Code'}
					</Text>
					<View style={styles.qrcode}>
						<QRCode
							value={checkinInfo.temperature + ' ' + checkinInfo.test + ' ' + checkinInfo.contact}
							size={225}
							color={ props.route.params.status ? 'red' : 'green' }
						/>
					</View>
					<Text style={styles.time}>{dt}</Text>
				</View>
			</ScrollView>

			{/* button */}
			<View style={[styles.buttonWrapper]}>
				<Button
					text={'Download'}
					navigation={() => {
						props.navigation.navigate('VENUE', { id: 1 })
					}}
				/>
			</View>
		</SafeAreaView>
	)
}
