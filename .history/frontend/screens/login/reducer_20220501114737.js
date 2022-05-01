import { SET_SMS, SET_PHONE, SET_PASSWORD, SET_TOKEN } from './actionType'

const defaultState = {
	phone: null,
  password: null,
  sms: 1111,
  token: null,
  verified: false
}

export default function reducer (state = defaultState, action) {
  if (action.type === SET_SMS) {
    const newState = {
      phone: state.phone,
      password: state.password,
      sms: action.data,
      token: state.token,
      verified: state.verified
    }
    return newState
  }
  if (action.type === SET_PHONE) {
    const newState = {
      phone: action.data,
      password: state.password,
      sms: state.sms,
      token: state.token
    }
    return newState
  }
  if (action.type === SET_PASSWORD) {
    const newState = {
      phone: state.phone,
      password: action.data,
      sms: state.sms,
      token: state.token
    }
    return newState
  }
  if (action.type === SET_TOKEN) {
    const newState = {
      phone: state.phone,
      password: state.password,
      sms: state.sms,
      token: action.data
    }
    return newState
  }
	return state
}