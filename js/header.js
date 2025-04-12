/*----------- header.js -----------*/


export function initEditableHeader() {
 const h1 = document.querySelector('h1');
 const savedHeading = localStorage.getItem('dashboardHeading');
 if (savedHeading) {
   h1.textContent = savedHeading;
 }
 
 // When the header is clicked, make it editable
 h1.addEventListener('click', () => {
   h1.contentEditable = true;
 });
 
 // When editing stops, save the new header text
 h1.addEventListener('blur', () => {
   h1.contentEditable = false;
   localStorage.setItem('dashboardHeading', h1.textContent);
 });
}