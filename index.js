"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlJoke = ["https://icanhazdadjoke.com/"];
let currentJoke = null;
let currentScore = null;
const header = {
    method: 'get',
    headers: {
        'Accept': 'application/json'
    },
};
// Printing on Console and Screen
const reportAcudits = [];
const getNextJoke = () => {
    fetch(urlJoke[0], header)
        .then(response => response.json())
        .then(json => {
        currentJoke = json.joke;
        console.log(currentJoke);
        const jokeElement = document.getElementById("joke");
        if (jokeElement) {
            jokeElement.innerText = JSON.stringify(currentJoke, null, 2);
        }
    });
};
getNextJoke();
// Scoring Jokes
let hasVoted = false;
const disableVoteButtons = () => {
    const scoreButtons = document.querySelectorAll('.score-button');
    if (scoreButtons) {
        scoreButtons.forEach(button => button.disabled = true);
    }
};
const setJokeScore = (score) => {
    if (!hasVoted) {
        currentScore = score;
        disableVoteButtons();
        const date = new Date().toISOString();
        console.log(date);
        if (currentJoke !== null && currentScore !== null) {
            reportAcudits.push({
                joke: currentJoke,
                score: currentScore,
                date: date
            });
        }
        console.log(reportAcudits);
        hasVoted = true;
    }
};
const resetScoreAndEnableVoteButtons = () => {
    currentScore = null;
    const scoreButtons = document.querySelectorAll('.score-button');
    if (scoreButtons) {
        scoreButtons.forEach(button => button.disabled = false);
    }
};
// Adding button for next joke
const nextJokeButton = document.getElementById("nextJokeButton");
if (nextJokeButton) {
    nextJokeButton.addEventListener("click", () => {
        getNextJoke();
        hasVoted = false;
        resetScoreAndEnableVoteButtons();
    });
}
// Adding buttons for score
const badJoke = document.getElementById("badJokeButton");
if (badJoke) {
    badJoke.addEventListener("click", () => {
        setJokeScore(1);
    });
}
const regularJoke = document.getElementById("regularJokeButton");
if (regularJoke) {
    regularJoke.addEventListener("click", () => {
        setJokeScore(2);
    });
}
const goodJoke = document.getElementById("goodJokeButton");
if (goodJoke) {
    goodJoke.addEventListener("click", () => {
        setJokeScore(3);
    });
}
const pulseButtons = document.querySelectorAll('.btn-pulse');
pulseButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('pulsed');
        setTimeout(() => {
            button.classList.remove('pulsed');
        }, 1000);
    });
});
const weatherUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1a569ab83dd5e3e09b8065b6a57697e7`;
const getWeatherData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(weatherUrl(city));
        const data = yield response.json();
        return {
            temp: data.main.temp,
            description: data.weather[0].description,
            city: data.name
        };
    }
    catch (error) {
        console.error(`Error fetching weather data: ${error}`);
        return null;
    }
});
const displayWeatherData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const weatherData = yield getWeatherData(city);
    if (weatherData !== null) {
        const temperature = weatherData.temp;
        const description = weatherData.description;
        const cityName = weatherData.city;
        const temperatureElement = document.getElementById("weather-string");
        temperatureElement.innerText = `Temperature: ${temperature}°C`;
        const descriptionElement = document.getElementById("weather-description");
        descriptionElement.innerText = `Description: ${description}`;
        const cityElement = document.getElementById("weather-location");
        cityElement.innerText = `City: ${cityName}`;
    }
});
displayWeatherData("Barcelona");
