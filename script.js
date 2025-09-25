const API_KEY = "75b0ea4b6e227d4c0062c6d7f15accc3"; // 👉 Apna OpenWeatherMap API key
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  if (city === "") {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherResult.innerHTML = `<p>❌ City not found. Try again!</p>`;
      return;
    }

    weatherResult.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>☁ Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>⚠ Error fetching data</p>`;
  }
}

function changeBackground(mode) {
  if (mode === "day") {
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')";
  } 
  else if (mode === "night") {
    document.body.style.backgroundImage =
      "url('img/night.jpeg')";
  } 
  else if (mode === "cloud") {
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1600&q=80')";
  } 
  else {
    // 🌸 Default Aesthetic BG
    document.body.style.backgroundImage =
      
 "url('img/bg.jpeg')";

  }
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
}

// 🔹 Dropdown Listener
const bgSelector = document.getElementById("bgSelector");
bgSelector.addEventListener("change", () => {
  changeBackground(bgSelector.value);
});

// 🔹 Date Function
function showDate() {
  const dateEl = document.getElementById("date");
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', options);
}

// ✅ On page load
window.onload = function () {
  changeBackground("default"); // Default BG
  showDate(); // Show Date
};
// Current Date show
function showDate() {
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("date").innerText = today.toLocaleDateString("en-US", options);
}
showDate();
