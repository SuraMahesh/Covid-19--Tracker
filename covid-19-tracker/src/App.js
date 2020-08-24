import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FormControl, Select, MenuItem
} from "@material-ui/core";
import InfoBox from './infoBox';
import Map from './Map';
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log("YOO!!!!", countryCode);
    setCountry(countryCode);
  };

  return ( 
    <div className="App">
      <div className="app_header">
        <h1>COVID-19-TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem> */}
          </Select>
        </FormControl>

      </div>
      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" total={20000} cases={20000} />
        <InfoBox title="Recovered" />
        <InfoBox title="Deaths" />

      </div>
      <Map />
    </div>
  );
}

export default App;
