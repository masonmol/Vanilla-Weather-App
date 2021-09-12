let dateElement = document.querySelector(".date");

let currentDate = new Date();

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
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let realTempElement = document.querySelector(".feels-like-temp");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionsElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  realTempElement.innerHTML = Math.round(response.data.main.feels_like);
}

let apiKey = "eda5f4c1faef5ba99e914999cfcb1292";
let city = "Napa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
