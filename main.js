const url = 'https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago';

fetch('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=chicago')
  .then(response => response.json())
  .then(data => console.log(data));
  try {
    // nonexistantFunction();
  } catch (error) {
    console.log(error)
  }