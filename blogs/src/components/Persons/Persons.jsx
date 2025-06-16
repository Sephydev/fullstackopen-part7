import { useResource } from '../../services'

import PersonForm from './PersonForm'
import PersonsDisplay from './PersonsDisplay'

const Persons = () => {
    const [persons, personService] = useResource('http://localhost:3005/persons')

    return (
        <>
            <h2>Persons</h2>
            <PersonForm personService={personService} />
            <PersonsDisplay persons={persons} />
        </>
    )
}

export default Persons