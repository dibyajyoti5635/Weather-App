const apiKey = 'b257f7d39231db2b330544a0670b7f5e';
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

function searchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;

    fetch(`${currentWeatherUrl}?q=${cityInput}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data, unit);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            alert('Error fetching current weather. Please try again.');
        });

    fetch(`${forecastUrl}?q=${cityInput}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayForecast(data, unit);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            alert('Error fetching forecast. Please try again.');
        });
}

function returnToHomePage() {
    document.getElementById('cityInput').value = '';
    document.getElementById('currentWeatherContainer').innerHTML = '';
    document.getElementById('forecastContainer').innerHTML = '';
}

function displayCurrentWeather(data, unit) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    const temperature = convertTemperature(data.main.temp, unit);
    const minTemperature = convertTemperature(data.main.temp_min, unit);
    const maxTemperature = convertTemperature(data.main.temp_max, unit);

    currentWeatherDiv.innerHTML = `
        <p>Temperature: ${temperature.toFixed(2)} ${getTemperatureUnitSymbol(unit)}</p>
        <p>Min Temperature: ${minTemperature.toFixed(2)} ${getTemperatureUnitSymbol(unit)}</p>
        <p>Max Temperature: ${maxTemperature.toFixed(2)} ${getTemperatureUnitSymbol(unit)}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Wind Direction: ${data.wind.deg}°</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}

function displayForecast(data, unit) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt_txt);
        const averageTemp = (forecastItem.main.temp_max + forecastItem.main.temp_min) / 2;
        const convertedTemp = convertTemperature(averageTemp, unit);

        forecastDiv.innerHTML += `
            <div class="forecast-item">
                <p>Date: ${date.toDateString()}</p>
                <p>Avg Temperature: ${convertedTemp.toFixed(2)} ${getTemperatureUnitSymbol(unit)}</p>
                <p>Description: ${forecastItem.weather[0].description}</p>
                <img src="https://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;
    }
}

function convertTemperature(celsius, unit) {
    if (unit === 'imperial') {
        return (celsius * 9 / 5) + 32;
    } else {
        return celsius;
    }
}




function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function getTemperatureUnitSymbol(unit) {
    return unit === 'imperial' ? '°F' : '°C';
}

