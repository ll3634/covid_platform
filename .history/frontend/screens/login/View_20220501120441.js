import { connect } from 'react-redux'
import { getSetPasswordAction, getSetPhoneAction, getSetSMSAction, sendSMS, codeLoginAction } from './actionCreator'

import Report from './UI'


const mapState = (state) => {
	return {
		phone: state.login.phone,
		password: state.login.password,
		sms: state.login.sms,
		token: state.login.token,
		
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
		}
	}
}

export default connect(mapState, mapDispatch)(Report)
