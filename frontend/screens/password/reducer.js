import { SET_SMS, SET_PHONE, SET_PASSWORD, SET_CONFIRM, SET_TOKEN, SET_VERIFY } from './actionType'

const defaultState = {
	phone: null,
  password: null,
  confirm: null,
  sms: 1111,
  token: null,
  verified: 0
}

export default function reducer (state = defaultState, action) {
  if (action.type === SET_SMS) {
    const newState = {
      phone: state.phone,
      password: state.password,
      confirm: state.confirm,
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
      confirm: state.confirm,
      sms: state.sms,
      token: state.token,
      verified: state.verified
    }
    return newState
  }
  if (action.type === SET_PASSWORD) {
    const newState = {
      phone: state.phone,
      password: action.data,
      confirm: state.confirm,
      sms: state.sms,
      token: state.token,
      verified: state.verified
    }
    return newState
  }
  if (action.type === SET_CONFIRM) {
    const newState = {
      phone: state.phone,
      password: state.password,
      confirm: action.data,
      sms: state.sms,
      token: state.token,
      verified: state.verified
    }
    return newState
  }
  if (action.type === SET_TOKEN) {
    const newState = {
      phone: state.phone,
      password: state.password,
      confirm: state.confirm,
      sms: state.sms,
      token: action.data,
      verified: state.verified
    }
    return newState
  }
  if (action.type === SET_VERIFY) {
    console.log(action.data)
    const newState = {
      phone: state.phone,
      password: state.password,
      confirm: state.confirm,
      sms: state.sms,
      token: state.token,
      verified: action.data
    }
    return newState
  }
	return state
}