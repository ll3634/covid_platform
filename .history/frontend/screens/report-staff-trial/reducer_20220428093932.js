const defaultState = {
	venues: [],
	lastid: 0,
	name: '',
	description: '',
	longitude: 10,
	latitude: 10,
	capacity: 0,
	start: '',
	end: '',
	venue: {}
}

export default function reducer (state = defaultState, action) {
	if (action.type === 'SET_STATE') {
		// console.log([...action.venues])
		const newState = {
			venues: [...action.venues],
			lastid: state.lastid,
			name: state.name,
			description: state.description,
			longitude: state.longitude,
			latitude: state.latitude,
			
			venue: state.venue
		}
		return newState
	}
	if (action.type === 'CREATE_NAME') {
		const newState = {
			venues: state.venues,
			lastid: state.lastid,
			name: action.name,
			description: state.description,
			longitude: state.longitude,
			latitude: state.latitude,
			venue: state.venue
		}
		return newState
	}
	if (action.type === 'CREATE_DESCRIPTION') {
		// console.log([...action.venues])
		const newState = {
			venues: state.venues,
			lastid: state.lastid,
			name: state.name,
			description: action.description,
			longitude: state.longitude,
			latitude: state.latitude,
			venue: state.venue
		}
		return newState
	}
	if (action.type === 'CREATE_COORDS') {
		// console.log([...action.venues])
		const newState = {
			venues: state.venues,
			lastid: state.lastid,
			name: state.name,
			description: state.description,
			longitude: action.longitude,
			latitude: action.latitude,
			venue: state.venue
		}
		return newState
	}
	if (action.type === 'CREATE_IMAGE') {
		// console.log(action.venue.image_num)
		const newState = {
			venues: state.venues,
			lastid: state.lastid,
			name: state.name,
			description: state.description,
			longitude: state.longitude,
			latitude: state.latitude,
			venue: action.venue
		}
		return newState
	}
	if (action.type === 'UPDATE_ID') {
		// console.log(action.venue.image_num)
		const newState = {
			venues: state.venues,
			lastid: action.lastid,
			name: state.name,
			description: state.description,
			longitude: state.longitude,
			latitude: state.latitude,
			venue: state.venue
		}
		return newState
	}
	return state
}
