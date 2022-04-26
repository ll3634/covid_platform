import axios from 'axios'
import { SET_CATEGORIES, SET_TAB, SET_CHECKIN } from './actionType'
import baseUrl from '../../assets/constants/BaseUrl'


export const getSetCategoriesAction = (data) => {
	return {
		type: SET_CATEGORIES,
		data: data
	}
}

export const getSetTabAction = (data) => {
	return {
		type: SET_TAB,
		data: data
	}
}

export const getSetCheckinAction = (data) => {
	return {
		type: SET_CHECKIN,
		data: data
	}
}

export const getVenueInfo = () => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/venue`)
	if (res.data) {
		const action = getSetCategoriesAction(res.data)
		dispatch(action)
	}
}

export const getCheckinInfo = () => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/checkin/num`)
	if (res.data) {
		const action = getSetCheckinAction(res.data)
		// console.log(res.data)
		dispatch(action)
	}
}