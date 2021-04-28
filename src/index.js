function formatDate(timestamp){
    let now = new Date(timestamp);

    let hours = now.getHours();
    if  (hours < 10) {
        hours = `0${hours}`;
      }
    let minutes = now.getMinutes();
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
    let day = days[now.getDay()]; 

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
        let month = months [now.getMonth()]; 
        let dateNumber = now.getDate();
     
       return `${day}, ${month} ${dateNumber} <br> ${hours}:${minutes}`;
}

function showTemp(response) {
    document.querySelector("#main-city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#weather-discription").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  let currentDate = document.querySelector(".current-date");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

apiKey = "a2448133104335b630f878b5541b3167";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);