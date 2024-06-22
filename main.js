const url = 'https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago';

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const currentTempCard = document.getElementById('forecast-today');
const tomorrowTempCard = document.getElementById('forecast-tomorrow');
const twoDayForecast = document.getElementById('forecast-in-two-days');
const astronomy = document.querySelector('.astronomy');
// Fetch the CURRENT temp
fetch('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const currentTempF = data.current.temp_f;
    console.log(`Current temp in Farenheit: ${currentTempF} F`)
    const currentTempC = data.current.temp_c;
    console.log(`Current temp in Celsius: ${currentTempC} C`)
    const currentCity = data.location.name;
    const currentState = data.location.region;
    const currentLocation = currentCity + ', ' + currentState;
    const weatherDescription = data.current.condition.text;
    const currentWeatherIcon = data.current.condition.icon;
    console.log(`${currentLocation}`);
    // data is stored as an object
    city.innerHTML = currentLocation;
    currentTempCard.innerHTML = `
    <img src=${currentWeatherIcon} /img>
    <h2>${currentTempF}℉</h2>
    <p>${weatherDescription}</p>
    `;
  });
try {
  // nonexistantFunction();
} catch (error) {
  console.log(error);
}
// Fetch the current forecast (min and high temps)
fetch('https://api.weatherapi.com/v1/forecast.json?key=48e6d0ed95094ce58d710855232908&q=chicago&days=3')
  .then(response => response.json())
  .then(data => {
    console.log(data.forecast);
    const tempHigh = data.forecast.forecastday[0].day.maxtemp_f;
    const tempLow = data.forecast.forecastday[0].day.mintemp_f;
    currentTempCard.innerHTML += `
    <p>High: ${tempHigh}</p>
    <p>Low: ${tempLow} </p>
    `;
    const tmrwAverageTemp = data.forecast.forecastday[1].day.avgtemp_f;
    const tmrwHighTemp = data.forecast.forecastday[1].day.maxtemp_f;
    const tmrwLowTemp = data.forecast.forecastday[1].day.mintemp_f;
    const tmrwWeatherDescription = data.forecast.forecastday[1].day.condition.text;
    const tmrwWeatherIcon = data.forecast.forecastday[1].day.condition.icon;
    tomorrowTempCard.innerHTML = `
     <img src=${tmrwWeatherIcon} /img>
    <p>${tmrwWeatherDescription}</p>
    <h2>${tmrwAverageTemp}</h2>
    <p>High: ${tmrwHighTemp}</p>
    <p>Low: ${tmrwLowTemp} </p>
    `;
    const twoDayAverageTemp = data.forecast.forecastday[2].day.avgtemp_f;
    const twoDayHighTemp = data.forecast.forecastday[2].day.maxtemp_f;
    const twoDayLowTemp = data.forecast.forecastday[2].day.mintemp_f;
    const twoDayWeatherDescription = data.forecast.forecastday[2].day.condition.text;
    const twoDayWeatherIcon = data.forecast.forecastday[2].day.condition.icon;
    twoDayForecast.innerHTML = `
    <img src=${twoDayWeatherIcon} /img>
    <p>${twoDayWeatherDescription}</p>
    <h2>${twoDayAverageTemp}</h2>
    <p>High: ${twoDayHighTemp}</p>
    <p>Low: ${twoDayLowTemp} </p>
    `;
  })
  try {
    // nonexistantFunction();
  } catch (error) {
    console.log(error);
  }

// Fetch the current astronomy
fetch('https://api.weatherapi.com/v1/astronomy.json?key=48e6d0ed95094ce58d710855232908&q=chicago')
  .then(response => response.json())
  .then(data => { 
    console.log(data);
    const moonPhase = data.astronomy.astro.moon_phase;
    astronomy.innerHTML += `${moonPhase}`;
  })
  try {
    // nonexistantFunction();
  } catch (error) {
    console.log(error);
  }