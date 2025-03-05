import _ from 'lodash';
import './style.css';
// import testFunc from "../../functionn.js";

// testFunc();

const url = 'https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago';

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const currentTempCard = document.getElementById('forecast-today');
const tomorrowTempCard = document.getElementById('forecast-tomorrow');
const twoDayForecast = document.getElementById('forecast-in-two-days');
const astronomy = document.querySelector('.astronomy');
// Fetch the CURRENT temp

let currentCity;
let currentState;
let currentLocation;
let weatherDescription;
let currentWeatherIcon;
let currentTempC;
let currentTempF;
let currentHighTemp;
let currentLowTemp;
let currentDayOfWeek = (new Date().toLocaleString('en-us', {  weekday: 'long' }));
let day = new Date();
let dateTwoDaysFromNow = new Date();
dateTwoDaysFromNow.setDate(day.getDate() + 2);

// Get days of week
let today = new Date();
// Add one day to the current date
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
// Get the day of the week for tomorrow (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
let dayOfWeek = tomorrow.getDay();
// Array to convert day number to day name
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Get the name of the day
let tmrwDayName = days[dayOfWeek];
console.log("Tomorrow is " + tmrwDayName);
let inTwoDays = new Date(tomorrow);
inTwoDays.setDate(today.getDate() + 2);
let dayOfWeekInTwoDays = inTwoDays.getDay();
let inTwoDaysDayName = days[dayOfWeekInTwoDays];
console.log(`In two days it's ${inTwoDaysDayName}`);

// Default 
function setDefaultCity() {
  fetch('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      currentTempF = data.current.temp_f;
      console.log(`Current temp in Farenheit: ${currentTempF} F`)
      currentTempC = data.current.temp_c;
      console.log(`Current temp in Celsius: ${currentTempC} C`)
      currentCity = data.location.name;
      currentState = data.location.region;
      currentLocation = currentCity + ', ' + currentState;
      weatherDescription = data.current.condition.text;
      currentWeatherIcon = data.current.condition.icon;
      console.log(`${currentLocation}`);
      // data is stored as an object
      city.innerHTML = currentLocation;
      currentTempCard.innerHTML = `
      <p class="temp-card-title"> ${currentDayOfWeek} </p>
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
}
setDefaultCity();

const submit = document.querySelector('.submit');
submit.addEventListener('click', function searchCity(e) {
  // show temp in Farenheit
  if (document.getElementById('toggle-temp-setting').checked === false) {
  e.preventDefault();
  const search = document.querySelector('.searchbar').value;
  fetch('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q='+`${search}`)
    .then(response => response.json())
    .then(resp => {
      console.log(resp);
      currentTempF = resp.current.temp_f;
      console.log(`Current temp in Farenheit: ${currentTempF} F`)
      currentTempC = resp.current.temp_c;
      console.log(`Current temp in Celsius: ${currentTempC} C`)
      currentCity = resp.location.name;
      currentState = resp.location.region;
      currentLocation = currentCity + ', ' + currentState;
      weatherDescription = resp.current.condition.text;
      currentWeatherIcon = resp.current.condition.icon;
      console.log(`${currentLocation}`);
      // data is stored as an object
      city.innerHTML = currentLocation;
      currentTempCard.innerHTML = `
      <p class="temp-card-title"> ${currentDayOfWeek}</p>
      <img src=${currentWeatherIcon} /img>
      <h2>${currentTempF}℉</h2>
    `;
    });
    // update two dat forecast
    fetch('https://api.weatherapi.com/v1/forecast.json?key=48e6d0ed95094ce58d710855232908&q='+`${search}`+'&days=3')
    .then(response => response.json())
    .then(data => {
      console.log(data.forecast);
    const tempHigh = data.forecast.forecastday[0].day.maxtemp_f;
    const tempLow = data.forecast.forecastday[0].day.mintemp_f;
    currentTempCard.innerHTML += `
    <p>High: ${tempHigh}℉ - Low: ${tempLow}℉</p>
    <p>${weatherDescription}</p>
    `;
    const tmrwAverageTemp = data.forecast.forecastday[1].day.avgtemp_f;
    const tmrwHighTemp = data.forecast.forecastday[1].day.maxtemp_f;
    const tmrwLowTemp = data.forecast.forecastday[1].day.mintemp_f;
    const tmrwWeatherDescription = data.forecast.forecastday[1].day.condition.text;
    const tmrwWeatherIcon = data.forecast.forecastday[1].day.condition.icon;
    tomorrowTempCard.innerHTML = `
    <p class="temp-card-title"> ${tmrwDayName} </p>
    <img src=${tmrwWeatherIcon} /img>
    <h2>${tmrwAverageTemp}℉</h2>
    <p>High: ${tmrwHighTemp}℉ - Low: ${tmrwLowTemp}℉</p>
    <p>${tmrwWeatherDescription}</p>
    `;

    const twoDayAverageTemp = data.forecast.forecastday[2].day.avgtemp_f;
    const twoDayHighTemp = data.forecast.forecastday[2].day.maxtemp_f;
    const twoDayLowTemp = data.forecast.forecastday[2].day.mintemp_f;
    const twoDayWeatherDescription = data.forecast.forecastday[2].day.condition.text;
    const twoDayWeatherIcon = data.forecast.forecastday[2].day.condition.icon;
    console.log(`In ${currentCity} it is ${twoDayHighTemp} `)
    twoDayForecast.innerHTML = `
    <p class="temp-card-title"> ${inTwoDaysDayName} </p>
    <img src=${twoDayWeatherIcon} /img>
    <h2>${twoDayAverageTemp}℉</h2>
     <p>High: ${twoDayHighTemp}℉ - Low: ${twoDayLowTemp}℉</p>
    <p>${twoDayWeatherDescription}</p>
    `;
    });
  } else {
    // show temp in Celsius
    console.log('Switching to Celsius...');
    e.preventDefault();
    const search = document.querySelector('.searchbar').value;
    fetch('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q='+`${search}`)
      .then(response => response.json())
      .then(resp => {
        console.log(resp);
        currentTempC = resp.current.temp_c;
        console.log(`Current temp in Celsius: ${currentTempC} C`)
        currentCity = resp.location.name;
        currentState = resp.location.region;
        currentLocation = currentCity + ', ' + currentState;
        weatherDescription = resp.current.condition.text;
        currentWeatherIcon = resp.current.condition.icon;
        console.log(`${currentLocation}`);
        // data is stored as an object
        city.innerHTML = currentLocation;
        currentTempCard.innerHTML = `
        <p class="temp-card-title"> ${currentDayOfWeek}</p>
        <img src=${currentWeatherIcon} /img>
        <h2>${currentTempC}C</h2>
      `;
      });
      // update two dat forecast
      fetch('https://api.weatherapi.com/v1/forecast.json?key=48e6d0ed95094ce58d710855232908&q='+`${search}`+'&days=3')
      .then(response => response.json())
      .then(data => {
        console.log(data.forecast);
      const tempHigh = data.forecast.forecastday[0].day.maxtemp_c;
      const tempLow = data.forecast.forecastday[0].day.mintemp_c;
      currentTempCard.innerHTML += `
      <p>High: ${tempHigh}C - Low: ${tempLow}C</p>
      <p>${weatherDescription}</p>
      `;
      const tmrwAverageTemp = data.forecast.forecastday[1].day.avgtemp_c;
      const tmrwHighTemp = data.forecast.forecastday[1].day.maxtemp_c;
      const tmrwLowTemp = data.forecast.forecastday[1].day.mintemp_c;
      const tmrwWeatherDescription = data.forecast.forecastday[1].day.condition.text;
      const tmrwWeatherIcon = data.forecast.forecastday[1].day.condition.icon;
      tomorrowTempCard.innerHTML = `
      <p class="temp-card-title"> ${tmrwDayName} </p>
      <img src=${tmrwWeatherIcon} /img>
      <h2>${tmrwAverageTemp}C</h2>
      <p>High: ${tmrwHighTemp}C - Low: ${tmrwLowTemp}C</p>
      <p>${tmrwWeatherDescription}</p>
      `;

      const twoDayAverageTemp = data.forecast.forecastday[2].day.avgtemp_c;
      const twoDayHighTemp = data.forecast.forecastday[2].day.maxtemp_c;
      const twoDayLowTemp = data.forecast.forecastday[2].day.mintemp_c;
      const twoDayWeatherDescription = data.forecast.forecastday[2].day.condition.text;
      const twoDayWeatherIcon = data.forecast.forecastday[2].day.condition.icon;
      console.log(`In ${currentCity} it is ${twoDayHighTemp} `)
      twoDayForecast.innerHTML = `
      <p class="temp-card-title"> ${inTwoDaysDayName} </p>
      <img src=${twoDayWeatherIcon} /img>
      <h2>${twoDayAverageTemp}C</h2>
      <p>High: ${twoDayHighTemp}C - Low: ${twoDayLowTemp}C</p>
      <p>${twoDayWeatherDescription}</p>
      `;
      });
  }

    // END OF updating future forecast for searched city
  try {
  // nonexistantFunction();
  } catch (error) {
    console.log(error);
  }
});





// Fetch the current forecast (min and high temps)
fetch('https://api.weatherapi.com/v1/forecast.json?key=48e6d0ed95094ce58d710855232908&q=chicago&days=3')
  .then(response => response.json())
  .then(data => {
    console.log(data.forecast);
    const tempHigh = data.forecast.forecastday[0].day.maxtemp_f;
    const tempLow = data.forecast.forecastday[0].day.mintemp_f;
    currentTempCard.innerHTML += `
    <p>High: ${tempHigh}℉</p>
    <p>Low: ${tempLow}℉</p>
    `;
    const tmrwAverageTemp = data.forecast.forecastday[1].day.avgtemp_f;
    const tmrwHighTemp = data.forecast.forecastday[1].day.maxtemp_f;
    const tmrwLowTemp = data.forecast.forecastday[1].day.mintemp_f;
    const tmrwWeatherDescription = data.forecast.forecastday[1].day.condition.text;
    const tmrwWeatherIcon = data.forecast.forecastday[1].day.condition.icon;
    tomorrowTempCard.innerHTML = `
    <p class="temp-card-title"> ${tmrwDayName} </p>
    <img src=${tmrwWeatherIcon} /img>
    <h2>${tmrwAverageTemp}℉</h2>
        <p>High: ${tmrwHighTemp}℉ - Low: ${tmrwLowTemp}℉</p>
    <p>${tmrwWeatherDescription}</p>
    `;
    const twoDayAverageTemp = data.forecast.forecastday[2].day.avgtemp_f;
    const twoDayHighTemp = data.forecast.forecastday[2].day.maxtemp_f;
    const twoDayLowTemp = data.forecast.forecastday[2].day.mintemp_f;
    const twoDayWeatherDescription = data.forecast.forecastday[2].day.condition.text;
    const twoDayWeatherIcon = data.forecast.forecastday[2].day.condition.icon;
    console.log(`In ${currentCity} it is ${twoDayHighTemp} `)
    twoDayForecast.innerHTML = `
    <p class="temp-card-title"> ${inTwoDaysDayName} </p>
    <img src=${twoDayWeatherIcon} /img>
    <h2>${twoDayAverageTemp}℉</h2>
        <p>High: ${twoDayHighTemp}℉ - Low: ${twoDayLowTemp}℉</p>
    <p>${twoDayWeatherDescription}</p>

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
    // const moonIcon = 
    // add a different icon depending on the moon phase
    astronomy.innerHTML = `Moon Phase: ${moonPhase}`;
  })
try {
  // nonexistantFunction();
} catch (error) {
  console.log(error);
}