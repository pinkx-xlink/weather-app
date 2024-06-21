const url = 'https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago';

const dataContainer = document.createElement('div');
dataContainer.innerHTML = 'hi';
document.body.appendChild(dataContainer);

fetch('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const currentTemp = data.current.temp_f;
    console.log(`Current temp: ${currentTemp} F`)
    // data is stored as an object
    dataContainer.innerHTML = data;
  })
try {
  // nonexistantFunction();
} catch (error) {
  console.log(error)
}