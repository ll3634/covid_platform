import { connect } from 'react-redux'
import { getSetPasswordAction, getSetPhoneAction, getSetSMSAction, sendSMS, codeLoginAction } from './actionCreator'

import Password from './UI'


const mapState = (state) => {
	return {
		phone: state.password.phone,
		password: state.password.password,
		confirm: state.password.confirm,
		sms: state.password.sms,
		token: state.password.token,
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
		passwordLogin(phone, password) {
			const action = passwordLoginAction(phone, password)
			dispatch(action)
		}
	}
}

export default connect(mapState, mapDispatch)(Password)
