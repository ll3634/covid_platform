import { SET_CATEGORIES, SET_TAB, SET_CHECKIN } from './actionType'

const defaultState = {
	categories: [],
	tab: 1,
	checkin: new Array(200).fill({
		"case_num": 0,
		"check_num": 0,
		"venue_id": 0
		}) 
}

export default function reducer (state = defaultState, action) {
	if (action.type === SET_CATEGORIES) {
		// console.log([...action.data])
		const newState = {
			categories: [...action.data],
			tab: state.tab,
			checkin: state.checkin
		}
		return newState
	}
	if (action.type === SET_TAB) {
		console.log(action.data)
		const newState = {
			categories: [...state.categories],
			tab: action.data,
			checkin: state.checkin
		}
		return newState
	}
	if (action.type === SET_CHECKIN) {
		const newState = {
			categories: [...state.categories],
			tab: state.tab,
			checkin: action.data
		}
		return newState
	}
	return state
}
