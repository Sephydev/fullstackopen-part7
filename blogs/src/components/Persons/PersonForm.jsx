const PersonForm = ({ handlePersonSubmit, name, number}) => {
    return (
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} />
        number <input {...number} />
        <button>create</button>
      </form>
    )
}

export default PersonForm