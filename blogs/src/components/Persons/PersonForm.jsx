import { useField } from '../../services'

import { useDispatch} from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'

const PersonForm = ({ personService }) => {
    const dispatch = useDispatch()

    const name = useField('text')
    const number = useField('text')

    const handlePersonSubmit = (event) => {
        event.preventDefault()
        personService.create({ name: name.value, number: number.value })

        dispatch(setNotification(`You've added ${name.value} ${number.value === '' ? '' : `with the number ${number.value}`}`))
    }
    return (
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} />
        number <input {...number} />
        <button>create</button>
      </form>
    )
}

export default PersonForm