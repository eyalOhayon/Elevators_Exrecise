import { useEffect, useReducer } from 'react'
import './styles/styles.scss'
import FloorList from './components/FloorList'
import ElevatorList from './components/ElevatorList'
import Context from './context'
import elevatorsReducer from './reducers/elevatorsReducer'
import floorsReducer from './reducers/floorsReducer'

export const elevators_width = 120
export const floor_height = 60


const App = () => {
    const floors_num = 10
    const elevators_num = 5

    const [elevators_context, elevators_dispatch] = useReducer(
        elevatorsReducer,
        Array.from({ length: elevators_num }, () => ({
            queue: [0],
            time: 0,
            color: 'black'
        }))
    )

    const [floors_context, floors_dispatch] = useReducer(
        floorsReducer,
        Array.from({ length: floors_num }, () => 'Call')
    )
    console.log(floors_context) // remove console logs

    useEffect(() => {
        const chart_width = elevators_num * (elevators_width + 1) - 4 //elevator width and border
        const elevators_height = floors_num * floor_height
        document.documentElement.style.setProperty('--chart_width', chart_width + 'px')
        document.documentElement.style.setProperty('--elevators_height', elevators_height + 'px')
        document.documentElement.style.setProperty('--container_height', (elevators_height+100) + 'px')
    }, [elevators_num, floors_num])

    return (
        <Context.Provider
            value={{
                elevators_context,
                elevators_dispatch,
                floors_context,
                floors_dispatch,
            }}
            className="app"
        >
            <div className="container">
                <FloorList num={floors_num} />
                <ElevatorList num={elevators_num} />
            </div>
        </Context.Provider>
    )
}

export default App
