const defaultState = {
	venues: [],
	lastid: 0,
	name: '',
	description: '',
	longitude: 10,
	latitude: 10,
	capacity: 0,
	start: 0,
	end: 0,
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
			capacity: state.capacity,
			start: state.start,
			end: state.end,
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
			capacity: state.capacity,
			start: state.start,
			end: state.end,
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
			capacity: state.capacity,
			start: state.start,
			end: state.end,
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
			capacity: state.capacity,
			start: state.start,
			end: state.end,
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
			capacity: state.capacity,
			start: state.start,
			end: state.end,
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
			capacity: state.capacity,
			start: state.start,
			end: state.end,
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
			capacity: state.capacity,
			start: state.start,
			end: state.end,
			venue: state.venue
		}
		return newState
	}
	if (action.type === 'CREATE_CAPACITY') {
		// console.log(action.venue.image_num)
		const newState = {
			venues: state.venues,
			lastid: state.lastid,
			name: state.name,
			description: state.description,
			longitude: state.longitude,
			latitude: state.latitude,
			capacity: action.capacity,
			start: state.start,
			end: state.end,
			venue: state.venue
		}
		return newState
	}
	if (action.type === 'CREATE_START') {
		// console.log(action.venue.image_num)
		const newState = {
			venues: state.venues,
			lastid: state.lastid,
			name: state.name,
			description: state.description,
			longitude: state.longitude,
			latitude: state.latitude,
			capacity: state.capacity,
			start: action.start,
			end: state.end,
			venue: state.venue
		}
		return newState
	}
	if (action.type === 'CREATE_END') {
		// console.log(action.venue.image_num)
		const newState = {
			venues: state.venues,
			lastid: state.lastid,
			name: state.name,
			description: state.description,
			longitude: state.longitude,
			latitude: state.latitude,
			capacity: state.capacity,
			start: state.start,
			end: action.end,
			venue: state.venue
		}
		return newState
	}
	return state
}
