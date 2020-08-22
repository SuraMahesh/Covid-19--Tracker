import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FormControl, Select, MenuItem
} from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getContriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };
    getContriesData();

  }, []);

  return (
    <div className="App">
      <div className="app_header">
        <h1>COVID-19-TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem> */}
          </Select>
        </FormControl>

      </div>
    </div>
  );
}

export default App;
