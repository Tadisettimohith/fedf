// A simple UI for a weather app would have an input field for a city name, a button to get the weather, and a display area for the results. 
// Use a single, correctly defined API key.
const apiKey = fetch('http://www.boredapi.com/api/activity')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });; // Replace with your OpenWeatherMap API key

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const fetchBtn = document.getElementById('fetchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');

/**
 * Fetches weather data for a given city.
 * @param {string} city - The name of the city.
 */
async function getWeather(city) {
  try {
    if (!city) {
      throw new Error('Please enter a city name.');
    }

    // Construct the API URL with the city and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    // Fetch data from the API
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      // Throw an error if the city is not found or API key is invalid
      throw new Error('City not found or API key invalid.');
    }

    // Parse the JSON data
    const data = await response.json();
    
    // Display the weather information
    displayWeather(data);

    // Save the last searched city to localStorage
    localStorage.setItem('lastCity', city);

  } catch (error) {
    // Handle and display any errors
    weatherDisplay.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

/**
 * Displays the weather information on the UI.
 * @param {object} data - The weather data object from the API.
 */
function displayWeather(data) {
  const { name, main, weather } = data;
  weatherDisplay.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Description: ${weather[0].description}</p>
  `;
}

// Add event listener to the button
fetchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  getWeather(city);
});

// Add event listener to the input field for 'Enter' key
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    getWeather(city);
  }
});

// Load the last searched city on page load
window.addEventListener('load', () => {
  const lastCity = localStorage.getItem('lastCity');
  if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
  }
});