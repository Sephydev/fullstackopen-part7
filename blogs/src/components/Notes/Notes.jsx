import { useResource } from '../../services'

import NoteForm from './NoteForm'
import NotesDisplay from './NotesDisplay'

const Notes = () => {
    const [notes, noteService] = useResource('http://localhost:3005/notes')

    return (
        <>
            <h2>Notes</h2>
            <NoteForm noteService={noteService} />
            <NotesDisplay notes={notes}/>
        </>
    )
}

export default Notes