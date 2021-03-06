import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FormControl, Select, MenuItem, Card, CardContent
} from "@material-ui/core";
import InfoBox from './infoBox';
import Table from './Table';
import Map from './Map';
import { sortData } from './util';
import LineGraph from './LineGraph';
import numeral from "numeral";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getContriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          })); 

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getContriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    

    const url = 
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode);

          setCountryInfo(data);
        });    
  };

  console.log('Country info', countryInfo)

  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
            <h3>Live Cases</h3>
            <Table countries={tableData}>
            </Table>
            <h3>Worldwide new cases</h3>
            <LineGraph casesType={casesType} />
        </CardContent>

      </Card>

    </div>

  );
}

export default App;
