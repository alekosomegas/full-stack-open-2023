const PersonForm = ({handleSubmit, newName, handleChange, newNumber, handleNumChange}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm
