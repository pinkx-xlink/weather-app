const url = 'https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago';

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const currentTempCard = document.getElementById('forecast-today');
const tomorrowTempCard = document.getElementById('forecast-tomorrow');
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
    console.log(`${currentLocation}`);
    // data is stored as an object
    city.innerHTML = currentLocation;
    currentTempCard.innerHTML = `
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
    tomorrowTempCard.innerHTML = `
    <h2>${tmrwAverageTemp}</h2>
    <p>High: ${tmrwHighTemp}</p>
    <p>Low: ${tmrwLowTemp} </p>
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
  .then(data => { console.log(data) })
  try {
    // nonexistantFunction();
  } catch (error) {
    console.log(error);
  }
// Fetch the forecast for in two days from now