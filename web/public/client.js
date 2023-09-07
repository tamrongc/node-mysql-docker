
console.log('Client-side code running');

function onGetCounter() {
  fetch('/count', {method: 'GET'})
  .then(function(response) {
    if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
  .then(function(data) {
    document.getElementById('counter').innerHTML = `Button was clicked ${data[0].count} times`;
  })
  .catch(function(error) {
    console.log(error);
  });
}

function onUp() {
  fetch('/click-up', {method: 'POST'})
  .then(function(response) {
    if(response.ok) {
      this.onGetCounter();
      return;
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
    console.log(error);
  });
}

function onDown() {
  fetch('/click-down', {method: 'DELETE'})
  .then(function(response) {
    if(response.ok) {
      this.onGetCounter();
      return;
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
    console.log(error);
  });
}