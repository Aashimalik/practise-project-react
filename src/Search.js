import "./styles.css";
import { useState } from "react";
import _ from "lodash";

// Blackbox start
const getRandomString = () => Math.random().toString(36).substring(2, 15);

const getRandomNumberLessThan = (max) => Math.floor(Math.random() * max);

const makeServerCall = (searchText) => {
  console.log(`Making server call for - ${searchText}`);
  let results = [];

  if (searchText) {
    for (let i = 0; i < 2 + getRandomNumberLessThan(5); i++) {
      results.push(`${searchText} - ${getRandomString()}`);
    }
  }

  return new Promise((resolve, reject) => {
    window.setTimeout(
      () => resolve({ searchText, results }),
      1000 * Math.random()
    );
  });
};
// Blackbox end

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  let cachedSearchText = "";

  const fetchSuggestions = (text) => {
    console.log("text", text);
    makeServerCall(text).then((res) => {
      if (cachedSearchText === res.searchText) {
        setResults(res.results);
      }
    });
  };

  const debouncedFetchSuggestions = _.debounce(fetchSuggestions, 300);

  const handleChange = (e) => {
    cachedSearchText = e.target.value;
    setSearchText(e.target.value);
    debouncedFetchSuggestions(e.target.value);
  };

  return (
    <div className="container">
      <div className="inputWrapper">
        <input
          type="text"
          placeholder="Type to search.."
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
      <ul className="search-dropdown">
        {results.map((suggestion) => (
          <li>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
