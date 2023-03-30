import ElevatorCol from './ElevatorCol'

const ElevatorList = ({ num }) => {
    const elevators = Array.from({ length: num }, (_, ind) => ind)
    return (
        <div className="elevators">
            {elevators.map((ind) => {
                return <ElevatorCol key={'elvtr' + ind} index={ind} />
            })}
        </div>
    )
}

export default ElevatorList
