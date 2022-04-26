import { connect } from 'react-redux'
import {
	getSetRefreshingAction,
	getChangeListAction,
	getListAction
} from './actionCreator'

import List from './UI'

const mapState = (state, ownProps) => {
	return {
		list: state.list.list,
		refreshing: state.list.refreshing,
		navigate: ownProps.navigation.navigate
	}
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		getListData () {
			dispatch(getListAction(ownProps.route.params.id, true))
		},
		handleListRefresh () {
			const action = getSetRefreshingAction()
			dispatch(action)
			dispatch(getListAction(ownProps.route.params.id, false))
		},
		changeListInfo (res) {
			if (res.data) {
				const action = getChangeListAction(res.data)
				dispatch(action)
			}
		}
	}
}

export default connect(mapState, mapDispatch)(List)
