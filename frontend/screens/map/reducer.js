import { SET_CATEGORIES, SET_TAB } from './actionType'

const defaultState = {
	categories: [],
	tab: 1
}

export default function reducer (state = defaultState, action) {
	if (action.type === SET_CATEGORIES) {
		// console.log([...action.data])
		const newState = {
			categories: [...action.data],
			tab: state.tab
		}
		return newState
	}
	if (action.type === SET_TAB) {
		console.log(action.data)
		const newState = {
			categories: [...state.categories],
			tab: action.data
		}
		return newState
	}
	return state
}
