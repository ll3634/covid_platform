import { CHANGE_REFRESH, CHANGE_LIST } from './actionType'

const defaultState = {
	list: [],
	refreshing: false
}

export default function reducer (state = defaultState, action) {
	if (action.type === CHANGE_LIST) {
		let newState = {}
		if (action.cover) {
			newState = {
				list: [...action.list],
				refreshing: false
			}
		} else {
			newState = {
				list: [...state.list, ...action.list],
				refreshing: false
			}
		}
		return newState
	} else if (action.type === CHANGE_REFRESH) {
		const newState = {
			list: [...state.list],
			refreshing: action.value
		}
		return newState
	}
	return state
}
