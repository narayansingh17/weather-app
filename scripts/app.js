const searchInput = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');

searchInput.addEventListener('keydown',(event)=>{
  if(event.key ==='Enter'){
    const q = searchInput.value;
    renderWeather(q);
  }
});

searchButton.addEventListener('click',()=>{
    const q = searchInput.value;
    renderWeather(q);
});

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
      </div>
    </div>
    <div class="tile">
      <img src="images/humidity.png">
      <div class = "info-w">
        <p>Humidity</p>
        <span>${result.current.humidity}</span>
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
  `;
  document.querySelector('.js-weather')
    .innerHTML = generateHTML;
}


const key = '9e013bfdc4764f13b60134158261107';
async function getTemperature(q){
  try{
  if(!q){
    document.querySelector('.js-error-message')
    .textContent = 'Please enter the city';

    return;
  }
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${q}`)
  if (!response.ok) {
    /*console.log(response.status);
    console.log(response.statusText);
    console.log(response.ok);*/
    throw new Error(`Response status: ${response.status}`);
  }

  document.querySelector('.js-error-message').innerHTML = ``;

  return await response.json();

} catch(error){
  //console.log('error')
  document.querySelector('.js-error-message')
    .innerHTML = 'City not found!';
    return null;
}
}

