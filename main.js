fetch('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=london')
  .then(function(response) {
    // console.log('https://api.weatherapi.com/v1/current.json?key=48e6d0ed95094ce58d710855232908&q=london')
    console.log('got it!');
  })
  .catch(function(err) {
    alert('error!')
  })