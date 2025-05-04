const apikey = "44af1529af3d36e126326e26a4744d16";
const inputAreaTwo = document.getElementById("cityinput");

inputAreaTwo.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const city = document.getElementById("cityinput").value.trim();
    getWeather(city);
  }
});

function getWeather(city) {
  document.getElementById("cityinput").value = "";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const icon = getWeatherIcon(data.weather[0].main);
      document.getElementById("location").textContent =
        data.name + "," + " " + data.sys.country;
      document.getElementById(
        "Weather-icon"
      ).innerHTML = `<i class="fas ${icon}"></i>`;
      document.getElementById("temp").textContent = data.main.temp + "°C";
      document.getElementById("humidity-icon").style.display = "block";
      document.getElementById("humidity").textContent =
        "Humidity: " + data.main.humidity + "%";
      document.getElementById("wind-icon").style.display = "block";
      document.getElementById("wind").textContent =
        "Wind: " + Math.round(data.wind.speed * 3.6) + "km/h";
      document.getElementById("feelslike-icon").style.display = "block";
      document.getElementById("feels-like").textContent =
        "Feels like: " + data.main.feels_like + "°C";
      document.getElementById("weather-description").textContent =
        data.weather[0].description;

      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const dailyForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      console.log(dailyForecast);
      document.getElementById("forecast").style.display = "block";
      document.getElementById("forecast").style.display = "flex";
      document.getElementById("forecast").style.gap = "10px";
      document.getElementById("forecast").innerHTML = "";

      dailyForecast.forEach((day) => {
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-element");
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", {
          weekday: "short",
        });
        // const icon = getWeatherIcon(day.weather[0].main);

        console.log(date);
        console.log(dayName, day.main.temp_max, day.main.temp_min);
        forecastElement.innerHTML = `
           ${dayName} 
          <i class="fas ${getWeatherIcon(day.weather[0].main)}"></i>
          ${day.main.temp_max}°/${day.main.temp_min}°
          `;

        document.getElementById("forecast").appendChild(forecastElement);
      });
    });
}

function getWeatherIcon(weatherCondition) {
  const weatherMap = {
    Clear: "fa-sun",
    Clouds: "fa-cloud",
    Rain: "fa-cloud-rain",
    Drizzle: "fa-cloud-rain",
    Thunderstorm: "fa-bolt",
    Snow: "fa-snowflake",
    Mist: "fa-smog",
    Smoke: "fa-smog",
    Haze: "fa-smog",
    Dust: "fa-smog",
    Fog: "fa-smog",
    Sand: "fa-smog",
    Ash: "fa-smog",
    Squall: "fa-wind",
    Tornado: "fa-tornado",
  };

  return weatherMap[weatherCondition] || "fa-cloud";
}
