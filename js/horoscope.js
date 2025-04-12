/*----------- horoscope.js -----------

Fetches the daily horoscope from the API Ninjas service
 and displays it.*/

export async function updateHoroscope() {
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
            
//Function to display the fetched horoscope data  
function displayHoroscope (data) {
    // Build HTML markup for the horoscope display
    const html = `
    <div class="gemini-icon">
    <img src="images/gemini.png" alt="Gemini" class="gemini-img">
    </div>
    <span class="horoscope-header"><strong>${data.sign.toUpperCase()}</strong></span>
    <span class="horoscope-date">(${data.date})</span>
    <p class="horoscope-text"> ${data.horoscope}</p>
    `;
document.getElementById('horoscope-content').innerHTML = html;
}