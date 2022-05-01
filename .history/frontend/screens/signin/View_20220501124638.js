import { connect } from 'react-redux'
import { getSetPasswordAction, getSetPhoneAction, getSetSMSAction, sendSMS, passwordLoginAction,  } from './actionCreator'

import Signin from './UI'


const mapState = (state) => {
	return {
		phone: state.signin.phone,
		password: state.signin.password,
		sms: state.signin.sms,
		token: state.signin.token,
		verified: state.signin.verified
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

export default connect(mapState, mapDispatch)(Signin)
