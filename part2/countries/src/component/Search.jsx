const Search = ({ search, handleSearchChange }) => {
    return (
        <div>
            Search : <input value={search} onChange={handleSearchChange} />
        </div>
    );
};

export default  Search