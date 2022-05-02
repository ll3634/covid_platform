import { SET_SMS, SET_PHONE, SET_PASSWORD, SET_TOKEN, SET_VERIFY, SET_AUTH } from './actionType'

const defaultState = {
	phone: null,
  password: null,
  sms: 1111,
  token: null,
  verified: 0,
  auth: '1'
}

export default function reducer (state = defaultState, action) {
  if (action.type === SET_SMS) {
    const newState = {
      phone: state.phone,
      password: state.password,
      sms: action.data,
      token: state.token,
      verified: state.verified,
      auth: state.auth
    }
    return newState
  }
  if (action.type === SET_PHONE) {
    const newState = {
      phone: action.data,
      password: state.password,
      sms: state.sms,
      token: state.token,
      verified: state.verified,
      auth: state.auth
    }
    return newState
  }
  if (action.type === SET_PASSWORD) {
    const newState = {
      phone: state.phone,
      password: action.data,
      sms: state.sms,
      token: state.token,
      verified: state.verified,
      auth: state.auth
    }
    return newState
  }
  if (action.type === SET_AUTH) {
    const newState = {
      phone: state.phone,
      password: state.password,
      sms: state.sms,
      token: state.token,
      verified: state.verified,
      auth: action.data
    }
    return newState
  }
  if (action.type === SET_TOKEN) {
    const newState = {
      phone: state.phone,
      password: state.password,
      sms: state.sms,
      token: action.data,
      verified: state.verified,
      auth: state.auth
    }
    return newState
  }
  if (action.type === SET_VERIFY) {
    console.log(action.data)
    const newState = {
      phone: state.phone,
      password: state.password,
      sms: state.sms,
      token: state.token,
      verified: action.data,
      auth: state.auth
    }
    return newState
  }
	return state
}