import { SET_TEMP, SET_TEST, SET_CONTACT, SET_PERSONNEL, SET_SYMPTOMS } from './actionType'

const defaultState = {
	temp: '',
	test: '',
	contact: '',
	personnel: [],
	symptoms: []
}

export default function reducer (state = defaultState, action) {
	if (action.type === SET_TEMP) {
		// console.log([...action.data])
		const newState = {
			temp: action.data,
			test: state.test,
			contact: state.contact,
			personnel: state.personnel,
			symptoms: state.symptoms,
		}
		return newState
	}
	if (action.type === SET_TEST) {
		const newState = {
			temp: state.temp,
			test: action.data,
			contact: state.contact,
			personnel: state.personnel,
			symptoms: state.symptoms,
		}
		return newState
	}
	if (action.type === SET_CONTACT) {
		const newState = {
			temp: state.temp,
			test: state.test,
			contact: action.data,
			personnel: state.personnel,
			symptoms: state.symptoms,
		}
		return newState
	}
	if (action.type === SET_PERSONNEL) {
		const newState = {
			temp: state.temp,
			test: state.test,
			contact: state.contact,
			personnel: action.data,
			symptoms: state.symptoms,
		}
		return newState
	}
	if (action.type === SET_SYMPTOMS) {
		const newState = {
			temp: state.temp,
			test: state.test,
			contact: state.contact,
			personnel: state.personnel,
			symptoms: action.data,
		}
		return newState
	}
	return state
}