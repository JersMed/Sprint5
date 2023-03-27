interface JokeReport {
  joke: string;
  score: number;
  date: string;
}

const urlJoke: string[] = ["https://icanhazdadjoke.com/"];
let currentJoke: string | null = null;
let currentScore: number | null = null;
const header: RequestInit = {
    method: 'get',
    headers: {
        'Accept': 'application/json'
    },
};
// Printing on Console and Screen
const reportAcudits: JokeReport[] = [];
const getNextJoke = () => {
    fetch(urlJoke[0], header)
        .then(response => response.json())
        .then(json => {
        currentJoke = json.joke;
        console.log(currentJoke);
        const jokeElement: HTMLElement | null = document.getElementById("joke");
        if (jokeElement) {
            jokeElement.innerText = JSON.stringify(currentJoke, null, 2);
        }
    });
};  
getNextJoke();
// Scoring Jokes
let hasVoted: boolean = false;

const disableVoteButtons = () => {
  const scoreButtons: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.score-button');
  if (scoreButtons) {
    scoreButtons.forEach(button => button.disabled = true);
  }
}

const setJokeScore = (score: number | null) => {
  if (!hasVoted) {
    currentScore = score;

    disableVoteButtons();

    const date: string = new Date().toISOString();
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
  const scoreButtons: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.score-button');
  if (scoreButtons) {
    scoreButtons.forEach(button => button.disabled = false);
  }
}

// Adding button for next joke
const nextJokeButton: HTMLButtonElement | null = document.getElementById("nextJokeButton") as HTMLButtonElement | null;
if (nextJokeButton) {
  nextJokeButton.addEventListener("click", () => {
    getNextJoke();
    hasVoted = false;
    resetScoreAndEnableVoteButtons();
  });
}

// Adding buttons for score
const badJoke: HTMLButtonElement | null = document.getElementById("badJokeButton") as HTMLButtonElement | null;
if (badJoke) {
    badJoke.addEventListener("click", () => {
        setJokeScore(1);
    });
}
const regularJoke: HTMLButtonElement | null = document.getElementById("regularJokeButton") as HTMLButtonElement | null;
if (regularJoke) {
    regularJoke.addEventListener("click", () => {
        setJokeScore(2);
    });
}
const goodJoke: HTMLButtonElement | null = document.getElementById("goodJokeButton") as HTMLButtonElement | null;
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




// Weather API
interface WeatherData {
    temp: number;
    description: string;
    city: string;
  }
  
  const weatherUrl = (city: string) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1a569ab83dd5e3e09b8065b6a57697e7`;
  
  const getWeatherData = async (city: string): Promise<WeatherData | null> => {
    try {
      const response = await fetch(weatherUrl(city));
      const data = await response.json();
  
      return {
        temp: data.main.temp,
        description: data.weather[0].description,
        city: data.name
      };
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
      return null;
    }
  };
  
  const displayWeatherData = async (city: string) => {
    const weatherData = await getWeatherData(city);
  
    if (weatherData !== null) {
      const temperature = weatherData.temp;
      const description = weatherData.description;
      const cityName = weatherData.city;
  
      const temperatureElement = document.getElementById("weather-string") as HTMLElement;
      temperatureElement.innerText = `Temperature: ${temperature}°C`;
  
      const descriptionElement = document.getElementById("weather-description") as HTMLElement;
      descriptionElement.innerText = `Description: ${description}`;
  
      const cityElement = document.getElementById("weather-location") as HTMLElement;
      cityElement.innerText = `City: ${cityName}`;
    }
  };
  
  displayWeatherData("Barcelona");
  