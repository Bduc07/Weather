const cityInput = document.getElementById('cityInput');
const currentLocation = document.getElementById('currentLocation');
const currentTemperature = document.getElementById('currentTemperature');
const weatherIcon = document.querySelector('.weather-icon');
const maxTemperature = document.getElementById('maxTemperature');
const minTemperature = document.getElementById('minTemperature');
const feelTemperature = document.getElementById('feelTemperature');
const currentWind = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');

const apiKey = 'b31b1038834626fe15af7c82ae12014c';



function fetchWeatherData() {
  const cityName = cityInput.value || `Ulan bator`;

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const currentWeather = data.main;
      const forecastData = data.weather;

      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString(undefined, options);
      const formattedTime = now.toLocaleTimeString();


      currentLocation.textContent = cityName;
      currentTemperature.textContent = `${(currentWeather.temp - 273.15).toFixed(1)}°C`;
      minTemperature.textContent = `Min Temp: ${(currentWeather.temp_min - 273.15).toFixed(1)}°C`;
      feelTemperature.textContent = `Feels like: ${(currentWeather.feels_like - 273.15).toFixed(1)}°C`;
      maxTemperature.textContent = `Max Temp: ${(currentWeather.temp_max - 273.15).toFixed(1)}°C`;
      currentHumidity.textContent = `Humidity: ${currentWeather.humidity}%`;
      currentWind.textContent = `Wind: ${data.wind.speed.toFixed(1)} km/h at ${data.wind.deg}°`;
      if (forecastData.length > 0) {
        const forecastItem = document.querySelector('.forecast-item');
        const icon =  `<img src="https://openweathermap.org/img/wn/${forecastData[0].icon}@2x.png">`

        
        forecastItem.innerHTML = `${icon}<br>${forecastData[0].main} - ${forecastData[0].description}`;
      }
    });
}

window.addEventListener('load', fetchWeatherData());