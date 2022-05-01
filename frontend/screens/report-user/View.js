import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import SubmissionForm from '../../components/SubmissionForm'
import Title from '../../components/Title'
import tw from 'twrnc'

import { AuthContext } from '../../context'

const Report = () => {
	const { signIn } = React.useContext(AuthContext)

	const [errorMessage, setErrorMessage] = React.useState('')
	const [successMessage, setSuccessMessage] = React.useState('')

	const login = (phone, password) => {
		if (!phone || !password) {
			setErrorMessage('Please enter phone number and password!')
			setSuccessMessage('')
			// alert(`${phone} ${password}`)
		} else {
			setErrorMessage('')
			signIn(phone, password)
			setSuccessMessage('User ' + phone + ' logged in successfully')
		}
		console.log(`${phone} ${password}`)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={tw`w-3/4`}>
				<Title text="Login"></Title>
				{!!errorMessage && (
					<Text style={tw`bg-red-400 p-1 my-2 text-red-700`}>
						{errorMessage}
					</Text>
				)}
				{!!successMessage && (
					<Text style={tw`bg-green-400 p-1 my-2 text-green-700`}>
						{successMessage}
					</Text>
				)}
				<SubmissionForm onSubmit={login}></SubmissionForm>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	}
})

export default Report
