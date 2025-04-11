
document.addEventListener('DOMContentLoaded', () => {
   

// ----Time and Date----
function TimeAndDate() {
    const d = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit' 
    };
    const formattedTime = d.toLocaleString('sv-SE', options);
    document.getElementById('date-time').textContent = formattedTime;
  }
  
  TimeAndDate();
  setInterval(TimeAndDate, 60000);
  
  // ----Editable heading----
  const h1 = document.querySelector('h1');
  const savedHeading = localStorage.getItem('dashboardHeading');
  if (savedHeading) {
    h1.textContent = savedHeading;
  }
  
  h1.addEventListener('click', () => {
    h1.contentEditable = true;
  });
  
  h1.addEventListener('blur', () => {
    h1.contentEditable = false;
    localStorage.setItem('dashboardHeading', h1.textContent);
  });
  



  // Länkar
  let links = [
    { name: "Google", url: "https://www.google.com/" },
    { name: "Aftonbladet", url: "https://www.aftonbladet.se/" }
  ];
  
  if (localStorage.getItem('savedLinks')) {
    links = JSON.parse(localStorage.getItem('savedLinks'));
  } else {
    localStorage.setItem('savedLinks', JSON.stringify(links));
  }
  
  // Funktion för att rendera länkar i DOM
  function renderLinks() {
    const ul = document.querySelector('.links-alternative');
    ul.innerHTML = ''; // Tömmer listan
  
    links.forEach((linkObj, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = linkObj.name;
      a.href = linkObj.url;
      a.target = "_blank";
      li.appendChild(a);

        // Skapa en ta bort -knapp
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    removeBtn.classList.add('remove-btn');

    removeBtn.dataset.index = index;
        li.appendChild(removeBtn);

      ul.appendChild(li);
    });
  }
  
  renderLinks(); // Första renderingen

  // Eventdelegation: lyssna på klick i <ul>-elementet
document.querySelector('.links-alternative').addEventListener('click', function(e) {
     // Om klickade elementet är en knapp, använd det; annars, om det är ett barn till en knapp, använd dess förälder
  const btn = e.target.nodeName === "BUTTON" ? e.target : (e.target.parentElement && e.target.parentElement.nodeName === "BUTTON" ? e.target.parentElement : null);
  if (btn) {
    const index = btn.dataset.index;
        links.splice(index, 1);
        localStorage.setItem('savedLinks', JSON.stringify(links));
        renderLinks();
    }
});
  



  // Event: Lägg till länk
  document.getElementById('add-link-btn').addEventListener('click', () => {
    console.log("Lägg till länk-knappen klickades");
    const url = prompt("Ange länkens URL:");
    const name = prompt("Ange länkens namn:");
    if (url && name) {
      links.push({ name: name, url: url });
      localStorage.setItem('savedLinks', JSON.stringify(links));
      renderLinks();
    }
  });
});




async function updateWeather() {

    // Cordinations for  Helsingborg Sweden
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
            // data.list är en array med prognosobjekt för varje 3 timme.
            let forecastHTML = '<h2>Dagens väder (3-dagars prognos)</h2>';
            forecastHTML += `<div class="weather-forecast-container">`;
          
            const displayedDates = new Set();
            let count = 0;
          
            for (let forecast of data.list) {
              // forecast.dt_txt är en sträng som t.ex. "2025-04-15 12:00:00"
              const date = forecast.dt_txt.split(' ')[0]; // extraherar datumet, t.ex. "2025-04-15"
              
              if (!displayedDates.has(date)) {
                displayedDates.add(date);
                const temp = Math.round(forecast.main.temp);

                // Enkel logik för att välja en emoji beroende på väder
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

          document.addEventListener('DOMContentLoaded', () => {
            updateWeather();
          });
        
 
     //Horoscope
      
      async function updateHoroscope() {
        const sign='gemini';
        const apiUrl=`https://api.api-ninjas.com/v1/horoscope?zodiac=gemini`;
        try{
            const response = await fetch(apiUrl, {
                headers: {'X-Api-Key':'rasVX4SXQ74UvEiax+L03A==O5ulCsDlBOX7n93z'}
            });

            if (!response.ok) {
                throw new Error("Kunde inte hämta horoskopdata");
            }
            const data = await response.json();
            console.log("Horoskopdata:", data);
            displayHoroscope(data);
        } catch (error) {
            console.error("Fel vid hämtning av horoskopdata:", error);
            document.getElementById('horoscope-content').textContent = "Kunde inte ladda horoskop.";
        }
      }    
                
      
      function displayHoroscope (data) {
        const html = `
        <div class="gemini-icon">
      <img src="images/gemini.png" alt="Gemini" class="gemini-img">
    </div>
    <span class="horoscope-header"><strong>${data.sign.toUpperCase()}</strong>

    
    
    <span class="horoscope-date">(${data.date})</span>
    
   <p class="horoscope-text"> ${data.horoscope}</p>
    </p>
  `;
  document.getElementById('horoscope-content').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    updateHoroscope();
  });
    
  


  //NOTES

  document.addEventListener('DOMContentLoaded', () => {
    // Ladda anteckningar från Local Storage
    const notesArea = document.getElementById('notes-area');
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
      notesArea.value = savedNotes;
    }
  
    // Spara anteckningar medan användaren skriver (på "input"-event)
    notesArea.addEventListener('input', () => {
      localStorage.setItem('userNotes', notesArea.value);
    });
  });
  

//Random background image

const backgroundImages = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = `url(${backgroundImages[randomIndex]})`;
  }
  
  document.getElementById('random-bg-btn').addEventListener('click', () => {
    setRandomBackground();
  });
  
  // Alternativ: sätt en initial bakgrund vid sidladdning
  document.addEventListener('DOMContentLoaded', () => {
    setRandomBackground("images/img3.jpg");
  });
