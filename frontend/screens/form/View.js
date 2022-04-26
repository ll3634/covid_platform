import { connect } from 'react-redux'
import { submitForm, getSetTempAction, getSetTestAction, getSetContactAction, getSetPersonnelAction, getSetSymptomsAction } from './actionCreator'

import Form from './UI'

const mapState = (state) => {
	return {
		temp: state.form.temp,
		test: state.form.test,
		contact: state.form.contact,
		personnel: state.form.personnel,
		symptoms: state.form.symptoms
	}
}

const mapDispatch = (dispatch) => {
	return {
		submitForms (venue_id, temp, test, contact, personnel, symptoms) {
			dispatch(submitForm(venue_id, temp, test, contact, personnel, symptoms))
		},
		setTemp (res) {
			if (res) {
				const action = getSetTempAction(res)
				dispatch(action)
			}
		},
		setTest (res) {
			if (res) {
				const action = getSetTestAction(res)
				dispatch(action)
			}
		},
		setContact (res) {
			if (res) {
				const action = getSetContactAction(res)
				dispatch(action)
			}
		},
		setPersonnel (res) {
			if (res) {
				const action = getSetPersonnelAction(res)
				dispatch(action)
			}
		},
		setSymptoms (res) {
			if (res) {
				const action = getSetSymptomsAction(res)
				dispatch(action)
			}
		}
	}
}

export default connect(mapState, mapDispatch)(Form)
