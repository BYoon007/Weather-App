// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8e483eb089e156af24bc8b1ee8794179";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }

    else{
        displayError("Please enter a city.")
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data for the specified city.");
    }

    return await response.json();
};

function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

};

function getWeatherEmoji(weatherID){

    switch(true){
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️"; // Thunderstorm
        case (weatherID >= 300 && weatherID < 500):
            return "🌦️"; // Drizzle
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️"; // Rain
        case (weatherID >= 600 && weatherID < 700):
            return "❄️"; // Snow
        case (weatherID >= 700 && weatherID < 800):
            return "🌫️"; // Atmosphere
        case (weatherID === 800):
            return "☀️"; // Clear
        case (weatherID > 800 && weatherID < 810):
            return "☁️"; // Clouds
        default:
            return "🌈"; // Default/Fallback
    }

};

function displayError(message){

    const errorDisplay = document.createElement("p");

    errorDisplay.textContent = message;

    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";

    card.style.display = "flex";

    card.appendChild(errorDisplay);
};