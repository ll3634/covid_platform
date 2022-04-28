import Auth from '@aws-amplify/auth'
import Amplify from '@aws-amplify/core'
import Storage from '@aws-amplify/storage'
import * as Clipboard from 'expo-clipboard'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, View, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import axios from 'axios'
import baseUrl from '../../assets/constants/BaseUrl'

// import BackButton from '../../components/BackButton'

import awsconfig from '../../datacenter/aws-exports'

Amplify.configure(awsconfig)

FileModule = (props) => {
	const [image, setImage] = useState(null)
	const [percentage, setPercentage] = useState(0)

	const a = []
	for (let n = 0; n < props.venue.image_num; n++) a[n] = 0

	useEffect(() => {
		props.getVenuesByID(props.route.params.id)
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
	}, [])

	useEffect(() => {
		// props.getVenuesByID(props.route.params.id);
		if (percentage === 100) {
			// props.editImages(props.route.params.id, props.venues[props.venues.length - 1].image_num + 1)
			props.editImages(props.venue.id, props.venue.image_num + 1)
			props.venue.image_num = props.venue.image_num + 1
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
				props.getVenuesByID(props.route.params.id)
				const img = await fetchImageFromUri(pickerResult.uri)
				const uploadUrl = await uploadImage(
					// 'venue/' + props.venues[props.venues.length - 1].id + '/' + (props.venues[props.venues.length - 1].image_num + 1)
					'venue/' +
						props.venue.id +
						'/' +
						(props.venue.image_num + 1) +
						'.jpg',
					img
				)
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
			<Button onPress={takePhoto} title={'Take a photo '} />
			<Button
				onPress={() => {
					props.getVenuesByID(props.route.params.id)
				}}
				title={
					'Refresh' +
					props.venue.image_num +
					props.venues[props.venues.length - 1].image_num
				}
			/>
			<ScrollView
				horizontal
				scrollEventThrottle={16}
				style={{
					zIndex: 3,
					marginHorizontal: 20,
					marginTop: 50,
					marginBottom: 10
				}}
			>
				{a.map((marker, index) => {
					return (
						<View
							key={index}
							style={{
								width: 100,
								height: 100,
								borderRadius: 10,
								overflow: 'hidden',
								marginRight: 15
							}}
						>
							<Image
								source={{
									uri:
										'https://expouploads22309-dev.s3.us-east-2.amazonaws.com/public/venue/' +
										props.venue.id +
										'/' +
										(index + 1) +
										'.jpg'
								}}
								style={{ height: 100, width: 100 }}
								resizeMode="cover"
							/>
							<Text>{props.venue.id + '/' + (index + 1) + '.jpg'}</Text>
						</View>
					)
				})}
			</ScrollView>
		</View>
	)
}

const getSetVenue = (data) => {
	return {
		type: 'CREATE_IMAGE',
		venue: data.data
	}
}

const getVenueByID = (id) => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/venue/${id}`)
	if (res) {
		const action = getSetVenue(res)
		dispatch(action)
	}
}

const editImage = (id, num) => async (dispatch) => {
	const res = await axios.put(`${baseUrl}/venue/upload/${id}`, {
		image_num: num
	})
}

const mapState = (state) => {
	return {
		venues: state.report.venues,
		venue: state.report.venue
	}
}

const mapDispatch = (dispatch) => {
	return {
		getVenuesByID (id) {
			dispatch(getVenueByID(id))
		},
		editImages (id, res) {
			dispatch(editImage(id, res))
		}
	}
}

export default connect(mapState, mapDispatch)(FileModule)

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
