const cityEl = document.querySelector('#cityEl');
const savedEl = document.querySelector('#city-buttons');
const searchEl = document.querySelector('#searchEl');
const infoEl = document.querySelector('#infoEl');

// Get today's date from day.js
const today = dayjs().format("M/D/YYYY");

// Function to display current weather
function displayCurrentWeather(city, data) {
  document.getElementById("currentCityDate").textContent = city + " (" + today + ")";
  document.getElementById("todayTemp").textContent = "Current Temp: " + Number(data.main.temp).toFixed() + "°F";
  document.getElementById("todayWind").textContent = "Wind: " + Number(data.wind.speed).toFixed() + " mph";
  document.getElementById("todayHumid").textContent = "Humidity: " + Number(data.main.humidity).toFixed() + "%";
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById("imgToday").src = iconUrl;
}

// Function to display forecast
function displayForecast(data) {
  for (let i = 0; i < 5; i++) {
    const forecastData = data.list[i];
    document.getElementById("day" + (i + 1) + "Temp").textContent = "Temp: " + Number(forecastData.main.temp).toFixed() + "°F";
    document.getElementById("day" + (i + 1) + "Wind").textContent = "Wind: " + Number(forecastData.wind.speed).toFixed() + " mph";
    document.getElementById("day" + (i + 1) + "Humid").textContent = "Humidity: " + Number(forecastData.main.humidity).toFixed() + "%";
    const iconCode = forecastData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    document.getElementById(`img${i + 1}`).src = iconUrl;
  }
}

// Function to handle API request and fetch weather data
function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9a412fa836ab78666b780cfb1499f11d`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(city, data);
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=9a412fa836ab78666b780cfb1499f11d`);
    })
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(err => {
      console.error(err);
      alert("Invalid city name!");
    });
}

// Function to add a city button to the search history
function addCityButton(city) {
  const cityButton = document.createElement("button");
  cityButton.classList.add("btn", "btn-warning", "mb-2", "text-uppercase");
  cityButton.textContent = city;
  savedEl.appendChild(cityButton);
  cityButton.addEventListener('click', function () {
    getWeather(cityButton.textContent);
  });
}

// Event listener for the search button
searchEl.addEventListener('click', function () {
  infoEl.style.display = "block";
  const city = cityEl.value.trim();

  if (city === "") {
    return;
  }

  getWeather(city);
  addCityButton(city);
  cityEl.value = "";
});


