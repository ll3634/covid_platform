import axios from 'axios'
import { CHANGE_REFRESH, CHANGE_LIST } from './actionType'
import baseUrl from '../../assets/constants/BaseUrl'

export const getSetRefreshingAction = () => {
	return {
		type: CHANGE_REFRESH,
		value: true
	}
}

export const getChangeListAction = (data, cover) => {
	return {
		type: CHANGE_LIST,
		list: data,
		refreshing: false,
		cover: cover
	}
}

export const getListAction = (navigation, cover) => async (dispatch) => {
	const id = navigation
	const res = await axios.get(`${baseUrl}/review/get/${id}`)
	if (res.data) {
		const action = getChangeListAction(res.data, cover)
		dispatch(action)
	}
}
