// API key to access weather information
const apiKey = "919b312088aceae81f45eb22ba0d6df7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

// accesses the search box and search button from the HTML code
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

// async functions helps you deal with tasks that take time... retrieving information for the weather
async function checkWeather(city) {
    // await keyword tells the function to wait until the fetch operation completes before moving to the next line
    // fetch makes a request to get data from the API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
    }

    else {
        var data = await response.json();

        console.log(data);

        // updates theinformation based on which city was entered
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " mph";

        //update image based on the weather condition
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }

        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }

        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }

        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }

        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/fog.png";
        }

        else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".error").style.display = "none";
    } 
}
// when the search button is pressed, the checkWeather function will run
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // gets the city name that is written in the input box
})
