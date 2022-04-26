import { combineReducers } from 'redux'
import { reducer as venue } from '../screens/venue'
import { reducer as map } from '../screens/map'
import { reducer as report } from '../screens/report-staff-trial'
import { reducer as list } from '../screens/detail'
import { reducer as form } from '../screens/form'

const reducer = combineReducers({
	venue: venue,
	map: map,
	report: report,
	list: list,
	form: form
})

export default reducer
