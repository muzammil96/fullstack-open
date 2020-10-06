import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country, onClick }) => {
  return (
    <div>
      {country.name}{" "}
      <button id={country.name} onClick={onClick}>
        show
      </button>
    </div>
  );
};

const DisplayWeather = ({ country }) => {
  console.log(country, "weather");
  const [weather, setWeather] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const api_key = process.env.REACT_APP_API_KEY;

  console.log(api_key);

  const request = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
  console.log(`Hello ${country.capital}`);
  console.log(request);
  useEffect(() => {
    axios.get(request).then(response => {
      setWeather(weather.concat(response.data));
      setLoading(false);
      console.log(response.data);
    });
  }, [country]);

  if (isLoading) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>
          <strong>temperature: loading</strong>
        </p>
      </div>
    );
  } else {
    console.log(weather[0].current);
    console.log(isLoading);
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>
          <strong>temperature:</strong> {weather[0].current.temperature}
        </p>
        <img src={weather[0].current.weather_icons[0]} />
        <p>
          <strong>wind: </strong>
          {weather[0].current.wind_speed} mph direction{" "}
          {weather[0].current.wind_dir}
        </p>
      </div>
    );
  }
};

const OneCountry = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="200px" height="200px" />
      <DisplayWeather country={country} />
    </>
  );
};

const Countries = ({ countries, onClick }) => {
  if (countries.length === 1) {
    return <OneCountry country={countries[0]} />;
  } else if (countries.length <= 10) {
    return countries.map(country => (
      <Country key={country.name} country={country} onClick={onClick} />
    ));
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries =
    countries.length === 1
      ? countries
      : countries.filter(country =>
          country.name.toLowerCase().includes(filterValue.toLowerCase())
        );

  const btnCountry = event => {
    setFilterValue(event.target.id);
  };

  const handleFilterChange = event => {
    setFilterValue(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          find countries{": "}
          <input onChange={handleFilterChange} value={filterValue} />
        </div>
      </form>

      <Countries countries={filteredCountries} onClick={btnCountry} />
    </div>
  );
}

export default App;
