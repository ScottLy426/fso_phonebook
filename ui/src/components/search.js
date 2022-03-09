const Search = ({ handleSearch, search }) => {
  return (
    <div>
      <h2>Search</h2> <input onChange={handleSearch} value={search} />
    </div>
  );
};

export default Search;
