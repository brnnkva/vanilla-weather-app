function formatDate (date) {
    let hours = date.getHours();
    if  (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if  (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "sunday",
      "monday",
     "tuesday", 
     "wednesday", 
     "thursday", 
     "friday",
     "saturday"
     ];
     let day = days[date.getDay()]; 
     
     let months = [
     "january", 
     "february", 
     "march", 
     "april", 
     "may", 
     "june", 
     "july", 
     "august", 
     "september", 
     "october", 
     "november", 
     "december"
     ];
     let month = months [date.getMonth()]; 
  
    return `${day}, ${month} ${dateNumber} <br> ${hours}:${minutes}`;
  }
  
  let now = new Date();
  let dateNumber = now.getDate();
   
  let currentDate = document.querySelector(".current-date");
  currentDate.innerHTML = formatDate(now);

function formatForecastDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();

let days = [
  "sunday",
  "monday",
 "tuesday", 
 "wednesday", 
 "thursday", 
 "friday",
 "saturday"
 ];
 
return days[day];
}

function displayForecast(response){
  let forecast= response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
console.log(forecast);
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function(forecastDay, index){

    if (index < 6) {

  forecastHTML =  forecastHTML + 
  `
  <div class="col-2">
      <div class="forecast-date">
          ${formatForecastDay(forecastDay.dt)}
      </div>
      <div class="forecast-weather-details">
      ${forecastDay.weather[0].main}
     </div>
     <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
     alt="" 
     width="55"/> 
     
     <div class="forecast-temp">
         <span class="forecast-temp-max">
          ${Math.round(forecastDay.temp.max)}°
         </span>
         <span class="forecasr-temp-min">
          ${Math.round(forecastDay.temp.min)}°
         </span>
     </div>
  </div>
`;
}
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  
  let apiKey = "a2448133104335b630f878b5541b3167";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
    document.querySelector("#main-city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

    celTemp = response.data.main.temp;

    document.querySelector("#weather-discription").innerHTML = response.data.weather[0].description;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    let iconElement = document.querySelector("#main-icon");
    iconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
 
   getForecast(response.data.coord);
}

function searchCity(city){
    apiKey = "a2448133104335b630f878b5541b3167";
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

   axios.get(apiUrl).then(showTemp);
}

function handleSearch(event){
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchCity(city);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Budapest");
