import React from 'react'
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import FormLabel from '../../components/FormLabel'
import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import tw from 'twrnc'

import Logo from '../../assets/images/logo.svg'
import { windowHeight, windowWidth } from '../../assets/constants/Dimensions'

import { AuthContext } from '../../context'

const FormInputGroup = ({ children }) => {
	return <View style={tw`my-3`}>{children}</View>
}

const Password = (props) => {
	const { signIn } = React.useContext(AuthContext)

	const [verfied, setVerified] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState('')
	const [successMessage, setSuccessMessage] = React.useState('')
	const login = (phone, password) => {
		if (!phone || !password) {
			setErrorMessage('Please enter phone number and password!')
			setSuccessMessage('')
		} else {
			setErrorMessage('')
			signIn(phone, password)
			setSuccessMessage('User ' + phone + ' logged in successfully')
		}
		console.log(`${phone} ${password}`)
	}

	return (
		<View style={styles.container}>
			<Logo width={175} height={175} />
			<Text style={styles.text}>Map Venue</Text>

			<View style={tw`w-3/4`}>
				{/* <Title text="Login"></Title> */}
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
				<View>
				<FormInputGroup>
						<FormLabel text="Phone"></FormLabel>
						<FormInput
							onChangeText={(text) => {
								props.setPhone(text)
							}}
						></FormInput>
						{/* <Text>{props.phone}</Text> */}
					</FormInputGroup>
					<FormInputGroup>
						<FormLabel text="SMS Code"></FormLabel>
						<FormInput
							onChangeText={(text) => {
								props.testSMS(text)
							}}
						></FormInput>
						{/* <Text>{props.sms}</Text> */}
					</FormInputGroup>
					<FormInputGroup>
						<FormLabel text="New Password"></FormLabel>
						<FormInput
							onChangeText={(text) => {
								props.setPassword(text)
							}}
						></FormInput>
						{/* <Text>{props.password}</Text> */}
					</FormInputGroup>
					<FormInputGroup>
						<FormLabel text="Confirm"></FormLabel>
						<FormInput
							onChangeText={(text) => {
								props.setPassword(text)
							}}
						></FormInput>
						{/* <Text>{props.password}</Text> */}
					</FormInputGroup>
					<FormButton
						primary={true}
						text="Submit"
						onPress={() => {
							alert(props.phone + ' ' + props.sms + ' ' + props.password + ' ' + props.confirm)
							props.passwordReset(props.phone, props.sms, props.password, props.confirm)
						}}
					></FormButton>
				</View>
			</View>

			<TouchableOpacity
				style={styles.forgotButton}
				onPress={() => {
					props.navigation.navigate('Signin')
				}}
			>
				<Text style={[styles.navButtonText, { marginTop: 40 }]}>
					Login with Password
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
        style={styles.sendButton}
				onPress={() => {
					props.setSMS(props.phone)
				}}
			>
				<Text style={styles.sendText}>SEND</Text>
			</TouchableOpacity>

			{/* <Text>{props.token}</Text> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F9FAFD',
		padding: 20
	},
	text: {
		fontWeight: 'bold',
		fontStyle: 'italic',
		fontSize: 28,
		marginBottom: 10,
		color: '#2D2D2D'
	},
	navButton: {
		marginTop: 15
	},
	sendButton: {
    position: 'absolute',
    bottom: windowHeight* 0.4715,
    right: windowWidth * 0.1615,
    backgroundColor: 'rgba(7,131,238,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    width: 100,
    height: 34,
  },
  sendText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
	forgotButton: {
		marginVertical: 10
	},
	navButtonText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#2e64e5'
	}
})

export default Password
