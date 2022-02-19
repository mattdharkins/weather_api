const weatherToken = '8f63f7346d3e714a39e1028e3e2431e3'

const getData = async (formCity) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${formCity}&appid=${weatherToken}`)
    console.log(response.data)

    return response.data
}

// create constant to hold DOM Elements
const DOM_Elements = {
    weathers: '.weather-list'
}



// Function to load weather data
const loadData = async (formCity) =>{
    const weatherList = await getData(formCity);


    const appCity = weatherList['name']

    const tempK = weatherList.main['temp']
    const temp = Math.round(((tempK - 273.15) * (9/5) + 32))

    const feelsLikeK = weatherList.main['feels_like']
    const feelsLike = Math.round(((feelsLikeK - 273.15) * (9/5) + 32))

    const tempMaxK = weatherList.main['temp_max']
    const tempMax = Math.round(((tempMaxK - 273.15) * (9/5) + 32))

    const tempMinK = weatherList.main['temp_min']
    const tempMin = Math.round(((tempMinK - 273.15) * (9/5) + 32))
    
    const cond = weatherList.weather[0]['description']
    
    const humid = weatherList.main['humidity']
    
    console.log(appCity, temp, feelsLike, tempMax, tempMin, cond, humid)
    
    const html = `<a href='#' class= 'list-group-item list-group-item-action list-group-item-light id=citytext'> - - - ${appCity} - - -  </a>
    <a href='#' class= 'list-group-item list-group-item-action list-group-item-light'> Temp: ${temp}&#176 | Feels Like: ${feelsLike}&#176
     | Recorded High: ${tempMax}&#176 | Recorded Low: ${tempMin}&#176 | Condition: ${cond} | Humidity: ${humid}%</a>`
    document.querySelector(DOM_Elements.weathers).insertAdjacentHTML("beforeend", html)
}



// Grabbing Form Data From a Submit Event
const form = document.querySelector('#getDataForm')

console.log(form)
// Add Event Listener for submit event(s)
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    let formCity = document.querySelector('#form-city').value

    console.log(event)
    console.log(formCity)
    loadData(formCity)
})



