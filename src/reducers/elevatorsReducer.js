const elevatorsReducer = (state, action) => {
    //state , [ { queue: [0], time: 0, color: 'black' | 'red' | 'green'}... ]
    switch (action.type) {
        case 'ORDER':
            console.log(state)
            let floor = -action.floor
            //choose closest free elevator (if all busy then closest)
            const elevators = state.map((elvtr) => ([
                Math.abs(floor - elvtr.queue[elvtr.queue.length-1]), //floor diffrence 
                elvtr.color    
                ]))  
            const index = elevators.reduce((chosen, cur_elvtr, cur_ind, arr) => (
                arr[chosen][1] === 'black' && cur_elvtr[1] !== 'black' ? chosen 
                : arr[chosen][1] !== 'black' && cur_elvtr[1] === 'black' ? cur_ind
                : arr[chosen][0] >= cur_elvtr[0] ? cur_ind 
                : chosen 
            ), 0)
            //assgin floor to chosen elevator
            floor = floor === state[index].queue[0] ? floor-0.01 : floor 
            return state[index].color !== 'black' ?
                [
                    ...state.slice(0, index),
                    { 
                        queue: state[index].queue.concat([floor]),
                        time: state[index].time,
                        color: state[index].color
                    },
                    ...state.slice(index+1)
                ]
            :
                [
                    ...state.slice(0, index),
                    {
                        queue: [floor],
                        time: Math.abs(floor - state[index].queue[0])*3,
                        color: 'red'
                    },
                    ...state.slice(index+1)
                ]
        case 'NEXT':
            return state[action.index].queue.length === 1 ?
                [
                    ...state.slice(0, action.index),
                    {
                        queue: state[action.index].queue,
                        time: state[action.index].time,
                        color: 'black'
                    },
                    ...state.slice(action.index+1)
                ]
            :
                [
                    ...state.slice(0, action.index),
                    {
                        queue: state[action.index].queue.slice(1),
                        time: Math.abs(state[action.index].queue[1] - state[action.index].queue[0])*3,
                        color: 'red'
                    },
                    ...state.slice(action.index+1)
                ]
        case 'ARRIVED':
            return [
                ...state.slice(0, action.index),
                {
                    queue: state[action.index].queue,
                    time: state[action.index].time,
                    color: 'green',
                },
                ...state.slice(action.index+1)
            ]
        default:
            return state
    }
}

export { elevatorsReducer as default }