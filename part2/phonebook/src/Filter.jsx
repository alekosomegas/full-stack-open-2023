const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <label>filter shown with</label>
      <input value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
