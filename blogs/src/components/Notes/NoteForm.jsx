const NoteForm = ({ handleNoteSubmit, content }) => {
    return (
    <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
    )
}

export default NoteForm