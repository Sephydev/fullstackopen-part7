import { useField } from '../../services'

import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'

const NoteForm = ({noteService}) => {
  const dispatch = useDispatch()

  const content = useField('text')
  
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    dispatch(setNotification(`You added the note '${content.value}'`))
  }
  
  return (
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
  )
}

export default NoteForm