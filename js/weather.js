/*----------- weather.js -----------

Handles, fetching and displaying weather data.*/
 
 export async function updateWeather() {

    // Coordinates for Helsingborg, Sweden
    const latitude = 56.0467;  
    const longitude = 12.6944;
    const apiKey ='8a555697895cc183fafe98881485fd27'
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Kunde inte hämta väderdata");
        }
        const data = await response.json();
        console.log("API-data:", data);
        displayForecastWeather(data);
      } 
        catch(error){
        console.error("Fel vid hämtning av väderdata:", error);
        }
        }

        function displayForecastWeather(data) {
            // Build HTML for a 3-day weather forecast
            let forecastHTML = '<h2>Dagens väder (3-dagars prognos)</h2>';
            forecastHTML += `<div class="weather-forecast-container">`;
          
            const displayedDates = new Set();
            let count = 0;
          
            for (let forecast of data.list) {
            // Extract the date
            const date = forecast.dt_txt.split(' ')[0]; 
              
            if (!displayedDates.has(date)) {
            displayedDates.add(date);
            const temp = Math.round(forecast.main.temp);

            // displays emoji depending on weather
            let icon = '';
            const weatherMain = forecast.weather[0].main.toLowerCase();
            if (weatherMain.includes("rain")) {
            icon = '🌧';
            } else if (weatherMain.includes("snow")) {
            icon = '❄';
            } else {
            icon = '☀';
            }
                
            forecastHTML += `
                <div class="weather-forecast-day">
                    <div class="main-info">
                      <p class="weather-icon">${icon}</p>
                      <h3>${date}</h3>
                      <p>${temp} °C</p>
                    </div>
                    <div class="weather-details">
                      <p>${forecast.weather[0].description}</p>
                      <p>Vind: ${forecast.wind.speed} m/s</p>
                      <p>Molnighet: ${forecast.clouds}%</p>
                    </div>
                  </div>
                `;
                count++;
                if (count >= 3) break;
              }
            }
          
            forecastHTML += `</div>`;
            document.querySelector('.card.weather').innerHTML = forecastHTML;
          }