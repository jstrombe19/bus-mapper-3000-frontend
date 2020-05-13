console.log('app.js is connected!');
const busURL = 'http://localhost:3000/buses';

fetch(busURL)
  .then((response) => response.json())
  .then(displayBusInfo);

function displayBusInfo(buses) {
  console.log(buses);
  buses.forEach((bus) => {
    const busTitle = document.createElement('h2');
    busTitle.innerText = bus.tag;
    document.body.append(busTitle);
  });
}

const newBusForm = document.querySelector('#new-bus-form');

newBusForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(newBusForm);
  const newBusTag = formData.get('tag');
  const newBusCapacity = formData.get('capacity');
  const newBusDriver = formData.get('driver');
  const newBusRoute = formData.get('current_route');
  const newBus = {
    bus: {
      tag: newBusTag,
      capacity: newBusCapacity,
      driver: newBusDriver,
      current_route: newBusRoute,
    },
  };

  const busTitle = document.createElement('h2');
  busTitle.innerText = newBusTag;
  document.body.append(busTitle);

  saveNewBusToDatabase(newBus);
  newBusForm.reset();
});

function saveNewBusToDatabase(bus) {
  fetch(busURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(bus),
  })
    .then((response) => response.json())
    .then(console.log);
}
