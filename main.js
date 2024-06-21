const url = 'https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago';

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const currentTempCard = document.getElementById('forecast-today');
// Fetch the CURRENT weather info
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
    console.log(`${currentLocation}`);
    // data is stored as an object
    city.innerHTML = currentLocation;
    currentTempCard.innerHTML = `
    <h2>${currentTempF}℉</h2>
    <p>${data.current.condition.text}</p>
    `;
  });
try {
  // nonexistantFunction();
} catch (error) {
  console.log(error);
}

// Fetch tomorrow's forecast


// Fetch the forecast for in two days from now