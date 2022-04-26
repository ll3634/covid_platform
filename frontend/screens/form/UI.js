import React, { useState, useEffect } from 'react'
import {
	View,
	SafeAreaView,
	Text
} from 'react-native'

import SingleCheckbox from '../../components/SingleCheckbox'
import MultiCheckbox from '../../components/MultiCheckbox'
import Sign from '../../components/Sign'
import DatePicker from '../../components/DatePicker'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'

import styles from './styles'

export default function Form(props) {
	const [dt, setDt] = useState(new Date().toLocaleString())

	const handleSubmit = async () => {
		props.submitForms(
			props.route.params.venue_id,
			props.temp,
			props.test,
			props.contact,
			props.personnel,
			props.symptoms
		)
	}

	useEffect(() => {
		const secTimer = setInterval(() => {
			setDt(new Date().toLocaleString())
		}, 1000)
		return () => clearInterval(secTimer)
	}
	, [])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ zIndex: 2 }}>
				<BackButton
					navigation={() => {
						props.navigation.goBack()
					}}
				/>
			</View>
			<View style={styles.contain}>
				<View>
					<Text style={styles.header}>CHECK-IN FORM</Text>
					<Text style={{ marginTop: 10 }}>
						Please fill out the following form with accurate information.
					</Text>
					<View style={styles.line} />
					<Text style={styles.text}>1. Your temperature: {props.temp}</Text>
					<SingleCheckbox
						selectionMode={props.temp}
						optionlist={['≥37.3°C', '<37.3°C']}
						onSelectSwitch={props.setTemp}
					/>
					<Text style={styles.text}>2. Your recent Covid-19 Test result: {props.test}</Text>
					<SingleCheckbox
						selectionMode={props.test}
						optionlist={['Negative', 'Positive', 'No test']}
						onSelectSwitch={props.setTest}
					/>
					<Text style={styles.text}>3. Your date of Covid-19 Test:</Text>
					<View style={styles.datePicker}>
						<DatePicker />
					</View>
					<Text style={styles.text}>
						4. Exposure to people with COVID symptoms: {props.contact}
					</Text>
					<SingleCheckbox
						selectionMode={props.contact}
						optionlist={['Yes, within 14 days', 'No', 'Others']}
						onSelectSwitch={props.setContact}
					/>

					<Text style={styles.text}>5. Highly exposed position personnel: {props.personnel}</Text>
					<MultiCheckbox
						selectionMode={props.personnel}
						optionlist={[
							'Clinic/Isolation Ward',
							'Immigration/Customs',
							'people from Pandemic Areas by CDC',
							'Others'
						]}
						onSelectSwitch={props.setPersonnel}
					/>
					<Text style={styles.text}>6. Clinical symptoms: {props.symptoms}</Text>
					<MultiCheckbox
						selectionMode={props.symptoms}
						optionlist={[
							'Fever',
							'Cough',
							'Sniffle',
							'Pharyngalgia',
							'Weakness',
							'Smell/Taste Recession',
							'Others'
						]}
						onSelectSwitch={props.setSymptoms}
					/>
				</View>
				<View style={styles.sign}>
					<Text style={styles.text}>Sign your name:</Text>
					<Sign />
				</View>
			</View>

			{/* button */}
			<View style={[styles.buttonWrapper]}>
				<Button
					text={'Submit'}
					navigation={() => {
					handleSubmit(),
											props.navigation.navigate('Detail', { id: 1, 
						status: (props.temp === 1 || props.test === 2 || props.symptoms === 1),
						checkinInfo : `${props.temp}`
						})
				}}
				/>
			</View>
		</SafeAreaView>
	)
}
