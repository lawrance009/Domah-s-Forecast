const apikey = "5060b9c2ca1fdc58824327d5b8c8668c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-image");



async function checkWeather(location){
const response = await fetch(apiUrl + location + `&appid=${apikey}`);

 
  

  if(response.status == "404"){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".first-card").style.display = "none";
  }

  else{
    var data = await response.json();

    console.log(data)

  
    document.querySelector(".location").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feeling").innerHTML = data.main.feels_like
    document.querySelector(".describe").innerHTML = data.weather[0].description;

    // Get the timezone offset in seconds and convert to milliseconds
    const timezoneOffset = data.timezone * 1000;

    // Get the current UTC time in milliseconds
    const utcTime = new Date().getTime();

    // Calculate local time in the searched location
    const localTime = new Date(utcTime + timezoneOffset);

    // Extract day and date
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    const formattedDay = localTime.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = localTime.toLocaleDateString("en-US", options);

    // Update the HTML content
    document.querySelector(".day").innerHTML = formattedDay;
    document.querySelector(".date").innerHTML = formattedDate;
  
    if(data.weather[0].main == "Clouds"){
      weatherIcon.src = "image/clouds.png";
    }
  
    else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "image/clear.png";
    }
  
    else if(data.weather[0].main == "Rain"){
      weatherIcon.src = "image/rain.png";
  }
  
    else if(data.weather[0].main == "Snow"){
    weatherIcon.src = "image/snow.png";
  }
  
    else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "image/drizzle.png";
  }
  
  
  else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "image/mist.png";
  }
 
  

 

document.querySelector(".first-card").style.display = "flex";
document.querySelector(".error").style.display = "none";
}


}

searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})


