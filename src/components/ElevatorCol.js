import { useContext } from 'react'
import { ReactComponent as ElevSVG } from '../icons8-elevator.svg'
import { floor_height } from '../App'
import Context from '../context'
import elevatorDing from '../elevator-ding.mp3'

const ElevatorCol = ({ index }) => {
    const { elevators_context, elevators_dispatch, floors_dispatch } =
        useContext(Context)
    const { queue, time, color } = elevators_context[index]
    const floor = queue[0]
    

    const handleTransitionEnd = (e) => {
        const audio = new Audio(elevatorDing)
        audio.play()
        elevators_dispatch({ type: 'ARRIVED', index: index })
        floors_dispatch({ type: 'TO_ARRIVED', floor })
        setTimeout(() => {
            elevators_dispatch({ type: 'NEXT', index: index })
            floors_dispatch({ type: 'TO_CALL', floor })
        }, 2000)
    }

    return (
        <div className="elevator__col">
            <ElevSVG
                style={{
                    margin: '17.5px 0px',
                    transform: `translateY(${floor * floor_height}px)`,
                    transition: `transform ${time}s linear`,
                    width: '25px',
                    height: '25px',
                    fill: color,
                }}
                onTransitionEnd={handleTransitionEnd}
            />
        </div>
    )
}

export default ElevatorCol
