const url = 'https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago';

const dataContainer = document.querySelector('.data-container');

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
    dataContainer.innerHTML = currentLocation;
    // Add the current temp to the farthest left card
    
  })
try {
  // nonexistantFunction();
} catch (error) {
  console.log(error)
}