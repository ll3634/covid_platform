import { connect } from 'react-redux'
import { getSetTabAction, getVenueInfo, getCheckinInfo } from './actionCreator'

import Venue from './UI'

const mapState = (state) => {
	return {
		categories: state.venue.categories,
		tab: state.venue.tab,
		checkin: state.venue.checkin
	}
}

const mapDispatch = (dispatch) => {
	return {
		getVenuesInfo () {
			dispatch(getVenueInfo())
		},
		getCheckinsInfo () {
			dispatch(getCheckinInfo())
		},
		setTab (res) {
			const action = getSetTabAction(res)
			dispatch(action)
		}
	}
}

export default connect(mapState, mapDispatch)(Venue)
