import { connect } from 'react-redux'

import Ticket from './UI'

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
	}
}

export default connect(mapState, mapDispatch)(Ticket)
