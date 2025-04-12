/*----------- TimeDate.js -----------*/

//Updates the #date-time element with the current date and time.
export function TimeAndDate() {
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
  
  // Initializes the time display and updates it every 60 seconds.
  export function initTimeAndDate() {
  TimeAndDate();
  setInterval(TimeAndDate, 60000);
}
  
