import { useState} from "react";
import "./App.css";
function App(){
  const [city,setCity]=useState("");
  const [weather,setWeather]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  async function getWeather(){
    if(!city.trim())
    {
      setError("please enter a city name");
      return;
    }
    try{
      setLoading(true);
    setError("");
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f8f672bff9ad42a6b9d110114260906&q=${city}`
        );
    const data=await response.json();
    if (data.error) {
        throw new Error(data.error.message);
      }
    setWeather(data);
  }
  catch (err)
  {
    setError(err.message);
  }
  finally{
    setLoading(false);
  }
}
if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

return (
  
  <div className="container">
    <h1>🌤 Weather App</h1>


    <div className="search-box">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />

      <button onClick={getWeather}>Search</button>
    </div>

    {loading && <p className="loading">Loading...</p>}

    {error && <p className="error">{error}</p>}

    {weather && (
      <div className="weather-card">
        <h2>{weather.location.name}</h2>

        <p>Temperature: {weather.current.temp_c}°C</p>

        <p>Humidity: {weather.current.humidity}%</p>

        <p>Condition: {weather.current.condition.text}</p>

        <p>Wind: {weather.current.wind_kph} km/h</p>
      </div>
    )}
</div>
);
}
export default App;
