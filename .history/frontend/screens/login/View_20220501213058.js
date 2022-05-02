import { connect } from 'react-redux'
import { getSetPasswordAction, getSetPhoneAction, getSetSMSAction, sendSMS, codeLoginAction, getSetVefifyAction, getSetTokenAction } from './actionCreator'

import Report from './UI'


const mapState = (state) => {
	return {
		phone: state.login.phone,
		password: state.login.password,
		sms: state.login.sms,
		token: state.login.token,
		verified: state.login.verified
	}
}


const mapDispatch = (dispatch) => {
	return {
		setPhone(res) {
			if (res) {
				const action = getSetPhoneAction(res)
				dispatch(action)
			}
		},
		setPassword(res) {
			if (res) {
				const action = getSetPasswordAction(res)
				dispatch(action)
			}
		},
		setAuth(res) {
			if (res) {
				const action = getSetAuthAction(res)
				dispatch(action)
			}
		},
		testSMS(res) {
			if (res) {
				const action = getSetSMSAction(res)
				dispatch(action)
			}
		},
		setSMS(phone) {
			const action = sendSMS(phone)
			dispatch(action)
		},
		codeLogin(phone, code) {
			const action = codeLoginAction(phone, code)
			dispatch(action)
		},
		setVerify(res) {
			console.log('setVerify called')
			const action = getSetVefifyAction(res)
			dispatch(action)
			const action2 = getSetTokenAction(null)
			dispatch(action2)
			const action3 = getSetPasswordAction(null)
			dispatch(action3)
			const action4 = getSetPhoneAction(null)
			dispatch(action4)
		}
	}
}

export default connect(mapState, mapDispatch)(Report)
