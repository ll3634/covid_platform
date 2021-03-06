import { connect } from 'react-redux'
import { getSetPasswordAction, getSetPhoneAction, getSetConfirmAction, getSetSMSAction, sendSMS, passwordResetAction } from './actionCreator'

import Password from './UI'


const mapState = (state) => {
	return {
		phone: state.password.phone,
		password: state.password.password,
		confirm: state.password.confirm,
		sms: state.password.sms,
		token: state.password.token,
		verified: state.password.verified
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
		setConfirm(res) {
			if (res) {
				const action = getSetConfirmAction(res)
				dispatch(action)
			}
		},
		setCode(res) {
			if (res) {
				const action = getSetSMSAction(res)
				dispatch(action)
			}
		},
		setSMS(phone) {
			const action = sendSMS(phone)
			dispatch(action)
		},
		passwordReset(phone, code, password, confirm) {
			const action = passwordResetAction(phone, code, password, confirm)
			dispatch(action)
		}
	}
}

export default connect(mapState, mapDispatch)(Password)
