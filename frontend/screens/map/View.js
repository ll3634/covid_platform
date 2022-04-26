import { connect } from 'react-redux'
import { getSetTabAction, getVenueInfo } from './actionCreator'

import Map from './UI'

const mapState = (state) => {
	return {
		categories: state.venue.categories,
		tab: state.venue.tab
	}
}

const mapDispatch = (dispatch) => {
	return {
		getVenuesInfo () {
			dispatch(getVenueInfo())
		},
		setTab (res) {
			const action = getSetTabAction(res)
			dispatch(action)
		}
	}
}

export default connect(mapState, mapDispatch)(Map)
