const apiKey = "YOUR_API_KEY"; // Your API key from OpenWeatherMap

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred. Please try again.");
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");

  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Description: ${description}</p>
  `;

  weatherInfo.innerHTML = weatherHTML;
}
