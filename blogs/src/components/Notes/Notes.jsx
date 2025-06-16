import { useField, useResource } from '../../services'

import NoteForm from './NoteForm'
import NotesDisplay from './NotesDisplay'

const Notes = () => {
    const content = useField('text')
    const [notes, noteService] = useResource('http://localhost:3005/notes')

    const handleNoteSubmit = (event) => {
        event.preventDefault()
        noteService.create({ content: content.value })
    }
    return (
        <>
            <h2>Notes</h2>
            <NoteForm handleNoteSubmit={handleNoteSubmit} content={content} />
            <NotesDisplay notes={notes}/>
        </>
    )
}

export default Notes