import Auth from '@aws-amplify/auth'
import Amplify from '@aws-amplify/core'
import Storage from '@aws-amplify/storage'
import * as Clipboard from 'expo-clipboard'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

import BackButton from '../../components/BackButton'

import awsconfig from '../../datacenter/aws-exports'

Amplify.configure(awsconfig)

export default function FileModule (props) {
	const [image, setImage] = useState(null)
	const [percentage, setPercentage] = useState(0)

	useEffect(() => {
		;(async () => {
			if (Constants.platform.ios) {
				const cameraRollStatus =
					await ImagePicker.requestMediaLibraryPermissionsAsync()
				const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
				if (
					cameraRollStatus.status !== 'granted' ||
					cameraStatus.status !== 'granted'
				) {
					alert('Sorry, we need these permissions to make this work!')
				}
			}
		})()
		// console.log('percentage changed, new value', percentage);
		if (percentage === 100) {
			console.log('hi')
		}
	}, [percentage])

	const takePhoto = async () => {
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: 'Images',
			aspect: [4, 3]
		})

		this.handleImagePicked(result)
	}

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: 'Images',
			aspect: [4, 3],
			quality: 1
		})

		this.handleImagePicked(result)
	}

	handleImagePicked = async (pickerResult) => {
		try {
			if (pickerResult.cancelled) {
				alert('Upload cancelled')
				return
			} else {
				setPercentage(0)
				const img = await fetchImageFromUri(pickerResult.uri)
				const uploadUrl = await uploadImage(props.route.params.id + '.jpg', img)
				console.log(uploadUrl)
				downloadImage(uploadUrl)
			}
		} catch (e) {
			console.log(e)
			alert('Upload failed')
		}
	}

	uploadImage = (filename, img) => {
		Auth.currentCredentials()

		return Storage.put(filename, img, {
			level: 'public',
			contentType: 'image/jpeg',
			progressCallback (progress) {
				setLoading(progress)
			}
		})
			.then((response) => {
				return response.key
			})
			.catch((error) => {
				console.log(error)
				return error.response
			})
	}

	const setLoading = (progress) => {
		const calculated = parseInt((progress.loaded / progress.total) * 100)
		updatePercentage(calculated) // due to s3 put function scoped
	}

	const updatePercentage = (number) => {
		setPercentage(number)
	}

	downloadImage = (uri) => {
		Storage.get(uri)
			.then((result) => {
				setImage(result)
			})
			.catch((err) => console.log(err))
	}

	const fetchImageFromUri = async (uri) => {
		const response = await fetch(uri)
		const blob = await response.blob()
		return blob
	}

	const copyToClipboard = () => {
		Clipboard.setString(image)
		alert('Copied image URL to clipboard')
	}

	return (
		<View style={styles.container}>
			<View style={{ zIndex: 2, top: 0 }}>
				<BackButton
					navigation={() => {
						props.navigation.goBack()
					}}
				/>
			</View>

			{percentage !== 0 && <Text style={styles.percentage}>{percentage}%</Text>}
			{image && (
				<View>
					<Text style={styles.result} onPress={copyToClipboard}>
						<Image
							source={{ uri: image }}
							style={{ width: 250, height: 250 }}
						/>
					</Text>
					<Text style={styles.info}>Long press to copy the image url</Text>
				</View>
			)}

			<Button onPress={pickImage} title="Pick an image from camera roll" />
			<Button
				onPress={takePhoto}
				title={'Take a photo' + props.route.params.id}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	title: {
		fontSize: 20,
		marginBottom: 20,
		textAlign: 'center',
		marginHorizontal: 15
	},
	percentage: {
		marginBottom: 10
	},
	result: {
		paddingTop: 5
	},
	info: {
		textAlign: 'center',
		marginBottom: 20
	}
})
