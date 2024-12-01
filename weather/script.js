const API_KEY = "461c2e996a5f19383d64c90a698fac0e";

const getWeatherData = async (city) => {
    const URL = 'https://api.openweathermap.org/data/2.5/weather';
    const fullUrl = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;

    try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`City not found: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
        alert("Failed to fetch weather data. Please try again.");
    }
};

const searchCity = async () => {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const weatherData = await getWeatherData(city);
    if (weatherData) {
        showWeatherData(weatherData);
    }
};

const showWeatherData = (weatherData) => {
    document.getElementById('city-name').innerText = weatherData.name || "N/A";
    document.getElementById('weather-type').innerText = weatherData.weather[0]?.main || "N/A";
    document.getElementById('temp').innerText = weatherData.main?.temp || "N/A";
    document.getElementById('min-temp').innerText = weatherData.main?.temp_min || "N/A";
    document.getElementById('max-temp').innerText = weatherData.main?.temp_max || "N/A";
};
