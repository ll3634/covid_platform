import axios from 'axios'
import { SET_SMS, SET_PHONE, SET_PASSWORD, SET_CONFIRM, SET_TOKEN, SET_VERIFY } from './actionType'
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

export const getSetConfirmAction = (data) => {
	return {
		type: SET_CONFIRM,
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


export const sendSMS = (phone) => async (dispatch) => {
	const res = await axios.get(`${baseUrl}/user/resetpassword`, {
		phone: phone
	})
  // if (res.data) {
  //   const action = getSetSMSAction(res.data.code)
  //   dispatch(action)
  // }
}


export const passwordResetAction = (phone, code, password, confirm) => async (dispatch) => {
	const res = await axios.put(`${baseUrl}/user/user`, {
		phone: phone,
		code: code,
    password: password,
		confirm: confirm
	})
}