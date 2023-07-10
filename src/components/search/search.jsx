import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URI, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  // make an API call to retrieve options based on the search input. It takes an inputValue parameter
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URI}/cities?/minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name},${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  // render an AsyncPaginate component with search functionality
  return (
    <AsyncPaginate
      placeholder="search for city"
      debounceTimeout={600} // wait 600ms before making an API call
      value={search} // current value of the search input
      onchange={handleOnChange} // callback function to handle changes in the search input
      loadOptions={loadOptions} // function to load options based on search input
    />
  );
};
export default Search;
