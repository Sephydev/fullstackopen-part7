import { useField, useResource } from '../../services'

import PersonForm from './PersonForm'
import PersonsDisplay from './PersonsDisplay'

const Persons = () => {
    const name = useField('text')
    const number = useField('text')

    const [persons, personService] = useResource('http://localhost:3005/persons')

    const handlePersonSubmit = (event) => {
        event.preventDefault()
        personService.create({ name: name.value, number: number.value })
    }

    return (
        <>
            <h2>Persons</h2>
            <PersonForm handlePersonSubmit={handlePersonSubmit} name={name} number={number}/>
            <PersonsDisplay persons={persons} />
        </>
    )
}

export default Persons