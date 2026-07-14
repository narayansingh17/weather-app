const searchInput = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');
const getLocButton = document.querySelector('.js-current-loc');
searchInput.addEventListener('keydown',(event)=>{
  if(event.key ==='Enter'){
    const q = searchInput.value;
    document.querySelector('.location')
    .innerHTML = `Loading...`;
    renderWeather(q);
    searchInput.value = '';
  }
});

searchButton.addEventListener('click',()=>{
    const q = searchInput.value;
    renderWeather(q);
    searchInput.value = '';
});

getLocButton.addEventListener('click',()=>{
  getLoc();
})

function getLoc(){
  function success(position){
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longitude;
    const q = latitude + ',' + longtitude;
    renderWeather(q);
  }
  function error(err) {
    console.log(err);
    console.log(err.code);
    console.log(err.message);

    alert(err.message);
}
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
  }else{
    navigator.geolocation.getCurrentPosition(success,error);
  }
}

async function renderWeather(q){
  const result = await getTemperature(q);
  console.log(result);
  if(result===null){
    return;
  }
  let generateHTML = `
    <div class="tile">
      <img src="images/temperature.png">
      <div class = "info-w">
        <p>Temperature</p>
        <span>${result.current.temp_c}&deg;C &#183; ${result.current.temp_f}&deg;F</span>
        <p>Feels like</p>
        <span style = "
          font-size: 15px;
          font-weight: 500; 
        ">${result.current.feelslike_c}&deg;C &#183; ${result.current.feelslike_f}&deg;F</span>
      </div>
    </div>
    <div class="tile">
      <img src="images/humidity.png">
      <div class = "info-w">
        <p>Humidity</p>
        <span>${result.current.humidity}%</span>
      </div>
    </div>
    <div class="tile">
      <img src="images/wind.png">
      <div class = "info-w">
        <p>Wind speed</p>
        <span>In kph: ${result.current.wind_kph}</span>
        <span>In mph: ${result.current.wind_mph}</span>
      </div>
    </div>
    <div class="tile">
      <img src="${result.current.condition.icon}">
      <div class = "info-w">
        <p>Weather condition</p>
        <span>${result.current.condition.text}</span>
      </div>
    </div>
    <div class="tile">
      <img src="images/pressure.png">
      <div class = "info-w">
        <p>Pressure</p>
        <span>${result.current.pressure_mb} mb</span>
      </div>
    </div>
    <div class="tile">
      <img src="images/uv-index.png">
      <div class = "info-w">
        <p>UV Index</p>
        <span>${result.current.uv}</span>
      </div>
    </div>
    <div class="tile">
      <img src="images/cloud-cover.png">
      <div class = "info-w">
        <p>Clouds</p>
        <span>${result.current.cloud}%</span>
      </div>
    </div>
    <div class="tile">
      <img src="images/visibility.png">
      <div class = "info-w">
        <p>Visibility</p>
        <span>${result.current.vis_km} km</span>
      </div>
    </div>
  `;
  document.querySelector('.location')
    .innerHTML = `<img class="placeholder" src="images/placeholder.png"></img> ${result.location.name},${result.location.country}`;
  document.querySelector('.js-weather')
    .innerHTML = generateHTML;
  document.querySelector('.forecast')
    .style.display = 'flex';

  let forecastHTML = ``;
  
  result.forecast.forecastday
  .forEach((forecast)=>{
    const weekDay = new Date(forecast.date).toLocaleDateString("en-US",{
      weekday: "long",
    });
  
    const img = forecast.day.condition.icon;
    const weather = forecast.day.condition.text;
    const mint = forecast.day.mintemp_c;
    const maxt = forecast.day.maxtemp_c;

    forecastHTML += `
      <div class="forecast-tile">
          <p>${weekDay}</p>
          <div>
            <img src="${img}">
            <p>${weather}</p>
          </div>
          <p>${mint}&deg;/${maxt}&deg;C</p>
      </div>
    `;
  });

  document.querySelector('.js-forecast-container')
    .innerHTML = forecastHTML;
}


const key = '9e013bfdc4764f13b60134158261107';
async function getTemperature(q){
  try{
  if(!q){
    document.querySelector('.js-error-message')
    .textContent = 'Please enter the city';

    return;
  }
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${q}&days=5`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  document.querySelector('.js-error-message').innerHTML = ``;

  return await response.json();

} catch(error){
  document.querySelector('.js-error-message')
    .innerHTML = 'City not found!';
    return null;
}
}

