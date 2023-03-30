import FloorItem from './FloorItem'

const FloorList = ({ num }) => {
    const floors = Array.from({ length: num }, (_, ind) => {
        const value = num - 1 - ind
        switch (value) {
            case 0:
                return 'Ground Floor'
            case 1:
                return '1st'
            case 2:
                return '2nd'
            case 3:
                return '3rd'
            default:
                return `${value}th`
        }
    })

    return (
        <div className="floors">
            <h3 className='title'>Elevator Exercise</h3>
            {floors.map((name, index) => {
                return (
                    <FloorItem
                        key={name}
                        name={name}
                        index={num - 1 - index}
                    />
                )
            })}
        </div>
    )
}

export default FloorList
