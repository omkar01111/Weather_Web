import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

// This component represents a search bar for cities.
// It takes an `onSearchChange` function as a prop.

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  // This function is called when searching in the search bar.
  // It retrieves data based on the input value.
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  // This function is called when the search data changes.
  // It updates the search state and calls the `onSearchChange` function.
  const handleOnChange = (searchData) => {
    setSearch(searchData); // Update the search state
    onSearchChange(searchData); // Call the `onSearchChange` function
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
