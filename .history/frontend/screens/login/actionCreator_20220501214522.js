import axios from 'axios'
import { SET_SMS, SET_PHONE, SET_PASSWORD, SET_TOKEN, SET_VERIFY, SET_AUTH } from './actionType'
import baseUrl from '../../assets/constants/BaseUrl'


export const getSetSMSAction = (data) => {
	return {
		type: SET_SMS,
		data: data
	}
}

export const getSetPhoneAction = (data) => {
	return {
		type: SET_PHONE,
		data: data
	}
}

export const getSetPasswordAction = (data) => {
	return {
		type: SET_PASSWORD,
		data: data
	}
}

export const getSetTokenAction = (data) => {
	return {
		type: SET_TOKEN,
		data: data
	}
}

export const getSetVefifyAction = (data) => {
	return {
		type: SET_VERIFY,
		data: data
	}
}

export const getSetAuthAction = (data) => {
	return {
		type: SET_AUTH,
		data: data
	}
}


export const sendSMS = (phone) => async (dispatch) => {
	const res = await axios.post(`${baseUrl}/user/sms`, {
		phone: phone
	})
  if (res.data) {
    const action = getSetSMSAction(res.data.code)
    dispatch(action)
  }
}


export const codeLoginAction = (phone, code, auth) => async (dispatch) => {
	const res = await axios.post(`${baseUrl}/user/codelogin`, {
		phone: phone,
    code: code,
		auth: auth
	})
  if (res.data) {
    console.log(res.data.token)
    const action = getSetTokenAction(res.data.token)
		dispatch(action)
		const action2 = getSetVefifyAction(1)
    dispatch(action2)
  }
}

export const forgetAction = (phone) => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/user/resetpassword`, {
		phone: phone
	})
  if (res.data) {
    console.log(res.data.code)
    const action = getSetTokenAction(res.data.code)
		dispatch(action)
		const action2 = getSetVefifyAction(1)
    dispatch(action2)
  }
}