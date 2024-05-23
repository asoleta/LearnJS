// API key to access weather information
const apiKey = "919b312088aceae81f45eb22ba0d6df7";

// accesses the search box and search button from the HTML code
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// displays an icon representing current weather conditions in the city
const weatherIcon = document.querySelector(".weather-icon");

// displays the weather in the corresponding unit
const imperialRB = document.querySelector(".imperial");
const metricRB = document.querySelector(".metric");

function updateImages(data) {
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
}

// async functions helps you deal with tasks that take time... retrieving information for the weather
async function checkWeatherImperial(city) {
    // await keyword tells the function to wait until the fetch operation completes before moving to the next line
    // fetch makes a request to get data from the API
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";
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

        //hides error message
        document.querySelector(".error").style.display = "none";

        //updates the weather icon based on the weather
        updateImages(data);
    } 
}

async function checkWeatherMetric(city) {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
    }

    else {
        var data = await response.json();

        console.log(data);

        // updates the information based on which city was entered
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        //hides error message
        document.querySelector(".error").style.display = "none";

        //updates the weather icon based on the weather
        updateImages(data);
    } 
}

// when the search button is pressed, the checkWeather function will run
searchBtn.addEventListener("click", () => {
    // if the imperial radio button is checked, it will provide the information in imperial measurements
    if (imperialRB.checked) {
        checkWeatherImperial(searchBox.value); // gets the city name that is written in the input box
    }

    // if the metric radio button is checked, it will provide the information in metric measurements
    else if (metricRB.checked) {
        checkWeatherMetric(searchBox.value); // gets the city name that is written in the input box
    }
})
