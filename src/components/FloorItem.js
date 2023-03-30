import { useContext } from 'react'
import Context from '../context'

const FloorItem = ({ name, index }) => {
    const { elevators_dispatch, floors_context, floors_dispatch } =
        useContext(Context)
    const tag = floors_context[index]
    
    const mapping = {
        'Call': {},
        'Waiting': { backgroundColor: 'red'},
        'Arrived': { color: 'green', backgroundColor: '#ebebeb', border: '1px solid green' }
       }

    const button_style = mapping[tag]

    const handleClick = () => {
        floors_dispatch({ type: 'TO_WAITING', floor: index })
        elevators_dispatch({ type: 'ORDER', floor: index })
    }
    return (
        <div className="floor">
            <h3 className="floor__name">{name}</h3>
            <div className="floor__chart" />
            <button
                className="button"
                style={button_style}
                disabled={tag !== 'Call'}
                onClick={handleClick}
            >
                {tag}
            </button>
        </div>
    )
}

export default FloorItem
