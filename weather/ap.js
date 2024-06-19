document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityname');
    const searchIcon = document.getElementById('sea');
    const temper = document.querySelector('.temper');
    const city = document.querySelector('.city');
    const humperc = document.querySelector('.humperc');
    const windSpeed = document.querySelector('.Winsp');
    const weatherImage = document.querySelector('.wea_ima');

    const apiKey = 'f930f26c1eb6c81b9fa3d93aba624f47'; 
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    searchIcon.addEventListener('click', async () => {
        const cityName = cityInput.value.trim();
        if (cityName) {
            try {
                const data = await fetchWeather(cityName);
                updateWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        } else {
            console.warn('City name is empty');
        }
    });

    async function fetchWeather(cityName) {
        try {
            const response = await fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error; 
        }
    }

    function updateWeather(data) {
        const temperature = Math.round(data.main.temp);
        temper.textContent = `${temperature}°C`;
        city.textContent = data.name;
        humperc.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} Km/h`;

        console.log('Weather data:', data);

        if (temperature > 30) {
            weatherImage.src = "E:/weather/clear.png";
        }else if(temperature <= 0){
            weatherImage.src = "E:/weather/snow.png";
        }
        else if (data.weather[0].main.toLowerCase() === 'rain') {
            weatherImage.src = "E:/weather/rain.png";
        } else if (data.weather[0].main.toLowerCase() === 'clouds') {
            weatherImage.src = "E:/weather/clouds.png";
        } 
        else {
            weatherImage.src = "E:/weather/rain.png";
        }

        console.log('Updated weather image source:', weatherImage.src);
    }
});
