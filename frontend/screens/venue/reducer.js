import { SET_CATEGORIES, SET_TAB, SET_CHECKIN, SET_VENUE } from './actionType'

const defaultState = {
	categories: [],
	tab: 1,
	checkin: new Array(100).fill({
		"case_num": 0,
		"check_num": 0,
		"venue_id": 0
		}),
	venue: new Array(100).fill({
		"capacity": 0,
		"created_at": '',
		"end_hour": '09:00:00',
		"id": 0,
		"start_hour": '09:00:00',
		"venue_id": 0
		})
}

export default function reducer (state = defaultState, action) {
	if (action.type === SET_CATEGORIES) {
		// console.log([...action.data])
		const newState = {
			categories: [...action.data],
			tab: state.tab,
			checkin: state.checkin,
			venue: state.venue
		}
		return newState
	}
	if (action.type === SET_TAB) {
		console.log(action.data)
		const newState = {
			categories: [...state.categories],
			tab: action.data,
			checkin: state.checkin,
			venue: state.venue
		}
		return newState
	}
	if (action.type === SET_CHECKIN) {
		const newState = {
			categories: [...state.categories],
			tab: state.tab,
			checkin: action.data,
			venue: state.venue
		}
		return newState
	}
	if (action.type === SET_VENUE) {
		const newState = {
			categories: [...state.categories],
			tab: state.tab,
			checkin: state.checkin,
			venue: action.data
		}
		return newState
	}
	return state
}
