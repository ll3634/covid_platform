import { connect } from 'react-redux'
import { getSetTabAction, getVenueInfo, getCheckinInfo, getVenueDetail } from './actionCreator'

import Venue from './UI'

const mapState = (state) => {
	return {
		categories: state.venue.categories,
		tab: state.venue.tab,
		checkin: state.venue.checkin,
		venue: state.venue.venue
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
		},
		getVenuesDetail () {
			dispatch(getVenueDetail())
		}
	}
}

export default connect(mapState, mapDispatch)(Venue)
