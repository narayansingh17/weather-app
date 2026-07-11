const searchInput = document.querySelector('.js-search-bar');

searchInput.addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
    const q = searchInput.value;
    getTemperature(q);
  }
});

const key = '9e013bfdc4764f13b60134158261107';
async function getTemperature(q){
  try{
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${q}`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  console.log(result);
} catch(error){
  console.error(error.message);
}
}

