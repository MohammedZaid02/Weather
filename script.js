const apiKey = "81aad0762da4cf4ce429cba3f05d72b0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const encodedCity = encodeURIComponent(city);
        const response = await fetch(`${apiUrl}${encodedCity}&appid=${apiKey}`);

        if (response.status === 404) {
            showError("Invalid city name");
        } else {
            const data = await response.json();

            cityElement.innerHTML = data.name;
            tempElement.innerHTML = Math.round(data.main.temp) + "°C";
            humidityElement.innerHTML = data.main.humidity + "%";
            windElement.innerHTML = data.wind.speed + " km/h";

            setWeatherIcon(data.weather[0].main);

            showWeather();
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("An error occurred while fetching weather data");
    }
}

function showError(message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
}

function showWeather() {
    errorElement.style.display = "none";
    weatherElement.style.display = "block";
}

function setWeatherIcon(weatherMain) {
    switch (weatherMain) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            weatherIcon.src = ""; // Set a default icon or leave it blank
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
