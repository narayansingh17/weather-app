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
  await getTemperature(q);
  let generateHTML = `
    <div>Temperature &#9728;&#65039;
        <span>${result.current.temp_c}&deg;C &#183; ${result.current.temp_f}&deg;F</span>
      </div>
      <div>Humidity 💧
        <span>${result.current.humidity}</span>
      </div>
      <div>Wind speed 🌫
        <span>In kph: ${result.current.wind_kph}</span>
        <span>In mph: ${result.current.wind_mph}</span>
      </div>
      <div>Weather condition 🌦️
        <span>${result.current.condition.text}</span>
      </div>
  `;
  document.querySelector('.js-weather')
    .innerHTML = generateHTML;
}


const key = '9e013bfdc4764f13b60134158261107';
let result = ``;
async function getTemperature(q){
  try{
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${q}`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  result = await response.json();
  console.log(result);
} catch(error){
  console.error(error.message);
}
}

