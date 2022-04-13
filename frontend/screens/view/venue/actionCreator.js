import axios from 'axios'
import { SET_CATEGORIES, SET_TAB } from './actionType'
import baseUrl from '../../../assets/constants/BaseUrl'

// const baseUrl = 'http://127.0.0.1:5000';

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

export const getVenueInfo = () => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/venue`)
	if (res.data) {
		const action = getSetCategoriesAction(res.data)
		dispatch(action)
	}
}
