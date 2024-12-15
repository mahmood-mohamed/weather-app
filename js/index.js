const cityNameInput = document.getElementById('cityNameInput');
const btnFind = document.getElementById('btnFind');

btnFind.addEventListener('click', () => {
  if (cityNameInput.value.length == 0) {
    alert('Please enter your location');
  } else {
    getData(cityNameInput.value);
    clearInput();
  }
})

cityNameInput.addEventListener('input', () => {
  getData(cityNameInput.value);
})

// Determine Location Of User
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  getData(`${latitude},${longitude}`);
});

// Get Data From API 
async function getData(name) {
  let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d83f532188ae44c8891105115241312&q=${name}&days=3`);
  let arr = await data.json();
  // console.log(arr);

  // Get Date
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dateOne = new Date(arr.forecast.forecastday[0].date);
  const dateTwo = new Date(arr.forecast.forecastday[1].date);
  const dateThree = new Date(arr.forecast.forecastday[2].date);
  const day = dateOne.getDate(); // Get number of dayOne
  const month = months[dateOne.getMonth()];  // Get the month
  const dayOfWeekOne = daysOfWeek[dateOne.getDay()]; // Get First Day
  const dayOfWeekTwo = daysOfWeek[dateTwo.getDay()]; // Get Second Day
  const dayOfWeekThree = daysOfWeek[dateThree.getDay()];  // Get Third Day

  displayWeather(arr, day, month, dayOfWeekOne, dayOfWeekTwo, dayOfWeekThree);
};

// Display Data 
function displayWeather(arr, day, month, dayOfWeekOne, dayOfWeekTwo, dayOfWeekThree) {
  document.getElementById('main-content').innerHTML =
    `<div class="col-md-4">
            <div class="card h-100 rounded-0 bg-body-one text-white">
              <div class="card-header text-clr bg-header-one d-flex justify-content-between">
                <div class="day">${dayOfWeekOne}</div>
                <div class="month">${day}${month}</div>
              </div>
              <div class="card-body">
                <h5 class="card-title text-clr">${arr.location.name}</h5>
                <div class="temp d-flex flex-wrap">
                    <h6 class="numTemperature roboto-bold h1 pe-3 py-4">${arr.current.temp_c}<sup>o</sup>C</h6>
                    <img src=${arr.current.condition.icon} class="img-responsive" alt="icon-${arr.current.condition.text}">
                </div>
                <p class="card-text description">${arr.current.condition.text}</p>
                <div class="py-2 text-clr">
                  <span>
                    <img src="images/icon-umberella@2x.png" alt="icon-umb">
                    ${arr.current.wind_degree}Deg
                  </span>
                  <span class="ps-2">
                    <img src="images/icon-wind@2x.png" alt="icon-wind">
                    ${arr.current.vis_km}km/h
                  </span>
                  <span class="ps-2">
                    <img src="images/icon-compass@2x.png" alt="icon-comp">
                    ${arr.current.wind_dir}
                  </span>
                </div>
              </div>
            </div>
            
        </div>
          <div class="col-md-4">
            <div class="card h-100 rounded-0 bg-body-two text-white">
              <div class="card-header text-clr bg-header-two">
                <div class="day text-center">${dayOfWeekTwo}</div>
              </div>
              <div class="card-body d-flex align-items-center flex-column ">
                <img src=${arr.forecast.forecastday[1].day.condition.icon} class="img-responsive" alt="">
                <h6 class="temperature roboto-bold h4 pt-4">${arr.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h6>
                <p class="temp roboto-light text-clr small">${arr.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                <p class="card-text description">${arr.forecast.forecastday[1].day.condition.text}</p>
                
              </div>
            </div>
            
          </div>
          <div class="col-md-4">
            <div class="card h-100 rounded-0 bg-body-one text-white">
              <div class="card-header text-clr bg-header-one">
                <div class="day text-center">${dayOfWeekThree}</div>
              </div>
              <div class="card-body d-flex align-items-center flex-column">
                <img src=${arr.forecast.forecastday[2].day.condition.icon} class="img-responsive" alt="">
                <h6 class="temperature roboto-bold h4 pt-4">${arr.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h6>
                <p class="temp roboto-light text-clr small">${arr.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                <p class="card-text description">${arr.forecast.forecastday[2].day.condition.text}</p>
                
              </div>
            </div>
            
    </div>
    `
}

// Clear Data Input
function clearInput() {
  cityNameInput.value = null;
}

