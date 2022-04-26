import axios from 'axios'
import { SET_TEMP, SET_TEST, SET_CONTACT, SET_PERSONNEL, SET_SYMPTOMS } from './actionType'
import baseUrl from '../../assets/constants/BaseUrl'


export const getSetTempAction = (data) => {
	return {
		type: SET_TEMP,
		data: data
	}
}

export const getSetTestAction = (data) => {
	return {
		type: SET_TEST,
		data: data
	}
}

export const getSetContactAction = (data) => {
	return {
		type: SET_CONTACT,
		data: data
	}
}

export const getSetPersonnelAction = (data) => {
	return {
		type: SET_PERSONNEL,
		data: data
	}
}

export const getSetSymptomsAction = (data) => {
	return {
		type: SET_SYMPTOMS,
		data: data
	}
}

export const submitForm = (venue_id, temp, test, contact, personnel, symptoms) => async (dispatch) => {
	const res = await axios.post(`${baseUrl}/checkin`, {
		venue_id: venue_id,
		temp: temp,
		test: test,
		contact: contact,
		personnel: personnel,
		symptoms: symptoms
	})
}
