let currentDate = new Date();
let dateElement = document.querySelector(".date");

let day = currentDate.getDay();
let month = currentDate.getMonth();
let date = currentDate.getDate();
let year = currentDate.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let formattedDate = `${days[day]}, ${months[month]} ${date}, ${year}`;

dateElement.innerHTML = formattedDate;

function convertToStandardTime(hour, minute) {
  let meridiem;

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (hour >= 12) {
    meridiem = "pm";
  } else {
    meridiem = "am";
  }

  if (hour > 12) {
    return `${hour - 12}:${minute} ${meridiem}`;
  } else {
    return `${hour}:${minute} ${meridiem}`;
  }
}

let timeElement = document.querySelector(".time");

let hour = currentDate.getHours();
let minute = currentDate.getMinutes();

let formattedTime = convertToStandardTime(hour, minute);
timeElement.innerHTML = formattedTime;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
    <div class="col-2">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="44px"
      />
      <div class="forecast-temp">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}</span>°
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}</span>°
      </div>
    </div>
`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "eda5f4c1faef5ba99e914999cfcb1292";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".temperature");
  let cityElement = document.querySelector(".city");
  let conditionsElement = document.querySelector(".conditions");
  let highTempElement = document.querySelector(".temp-high");
  let lowTempElement = document.querySelector(".temp-low");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let realTempElement = document.querySelector(".feels-like-temp");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  celsiusHigh = response.data.main.temp_max;
  celsiusLow = response.data.main.temp_min;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  conditionsElement.innerHTML = response.data.weather[0].description;
  highTempElement.innerHTML = Math.round(celsiusHigh);
  lowTempElement.innerHTML = Math.round(celsiusLow);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  realTempElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "eda5f4c1faef5ba99e914999cfcb1292";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
