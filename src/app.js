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
}

function search(city) {
  let apiKey = "eda5f4c1faef5ba99e914999cfcb1292";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitTemperatureHigh = (celsiusHigh * 9) / 5 + 32;
  let fahrenheitTemperatureLow = (celsiusLow * 9) / 5 + 32;
  let highTempElement = document.querySelector(".temp-high");
  let lowTempElement = document.querySelector(".temp-low");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  highTempElement.innerHTML = Math.round(fahrenheitTemperatureHigh);
  lowTempElement.innerHTML = Math.round(fahrenheitTemperatureLow);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temperature");
  let highTempElement = document.querySelector(".temp-high");
  let lowTempElement = document.querySelector(".temp-low");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  highTempElement.innerHTML = Math.round(celsiusHigh);
  lowTempElement.innerHTML = Math.round(celsiusLow);
}

let celciusTemperature = null;

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector(".fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
