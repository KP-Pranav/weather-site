const apiKey = "0cf0e337c8883efbb536463c8a5f3ff7"; // <-- Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        // Update UI
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;

        // Weather Icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Change Background Dynamically 🌦️
        const condition = data.weather[0].main.toLowerCase();
        changeBackground(condition);

    } catch (error) {
        alert("Failed to fetch weather data. Please try again.");
        console.error(error);
    }
}

function changeBackground(condition) {
    let imageUrl;

    switch (condition) {
        case "clear":
            imageUrl = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b"; // Sunny
            break;
        case "clouds":
            imageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb"; // Cloudy
            break;
        case "rain":
            imageUrl = "https://images.unsplash.com/photo-1498715888541-33cd64d9ea64"; // Rainy
            break;
        case "thunderstorm":
            imageUrl = "https://images.unsplash.com/photo-1500674425229-f692875b0ab7"; // Thunder
            break;
        case "snow":
            imageUrl = "https://images.unsplash.com/photo-1600508774454-11a4e11a9c53"; // Snowy
            break;
        case "mist":
        case "fog":
            imageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb"; // Foggy
            break;
        default:
            imageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb"; // Default
    }

    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Search button click event
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

// Search on "Enter" key press
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            getWeather(city);
        }
    }
});

// Load default city weather
getWeather("Chennai");
