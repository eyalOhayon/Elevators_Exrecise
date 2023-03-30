const floorsReducer = (state, action) => {
    //[ ('Call' | 'Waiting' | 'Arrived') ... ]
    switch (action.type) {
        case 'TO_WAITING':
            return [
                ...state.slice(0, action.floor),
                'Waiting',
                ...state.slice(action.floor+1)
            ]
        case 'TO_ARRIVED':
            return [
                ...state.slice(0, -action.floor),
                'Arrived',
                ...state.slice(-action.floor+1)
            ]
        case 'TO_CALL':
            return [
                ...state.slice(0, -action.floor),
                'Call',
                ...state.slice(-action.floor+1)
            ]
        default:
            return state
    }

}

export { floorsReducer as default }