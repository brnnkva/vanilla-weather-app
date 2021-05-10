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

function displayForecast(){
  let forecastElemet = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  days.forEach(function(day){


  
  forecastHTML =  forecastHTML + 
  `
  <div class="col-2">
      <div class="forecast-date">
          ${day}
      </div>
     <img src="http://openweathermap.org/img/wn/01d@2x.png" 
     alt="" 
     width="60"/> 
     <div class="forecast-temp">
         <span class="forecast-temp-max">
          18
         </span>
         <span class="forecasr-temp-min">
          12
         </span>
     </div>
  </div>
`;

});
forecastHTML = forecastHTML + `</div>`;
forecastElemet.innerHTML = forecastHTML;
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

function showFaTemp(event){
event.preventDefault();
let FaTemp = (celTemp * 9) / 5 + 32;
celLink.classList.remove("active");
faLink.classList.add("active");
document.querySelector("#temperature").innerHTML = Math.round(FaTemp);
}

function showCelTemp(event){
  event.preventDefault();
  celLink.classList.add("active");
  faLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(celTemp);
}

let celTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

faLink = document.querySelector("#fa-link");
faLink.addEventListener("click", showFaTemp);

celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);

searchCity("Budapest");
displayForecast();