/*----------- links.js -----------

This code manages the Link section.
  It initializes the links, renders them, and sets up event listeners for adding and removing links.
*/


export function initLinks() {
    // Default links array
 let links = [
    { name: "Google", url: "https://www.google.com/" },
    { name: "Aftonbladet", url: "https://www.aftonbladet.se/" }
  ];

   // Load saved links from localStorage if they exist, otherwise store the default links
  if (localStorage.getItem('savedLinks')) {
    links = JSON.parse(localStorage.getItem('savedLinks'));
  } else {
    localStorage.setItem('savedLinks', JSON.stringify(links));
  }
  
  // Function to render the links in the DOM
  function renderLinks() {
    const ul = document.querySelector('.links-alternative');
    ul.innerHTML = ''; //clear existing links
  
    links.forEach((linkObj, index) => {
      const li = document.createElement('li');
      // Create the anchor element for the link
      const a = document.createElement('a');
      a.textContent = linkObj.name;
      a.href = linkObj.url;
      a.target = "_blank";
      li.appendChild(a);

      // Create a button to remove the link
      const removeBtn = document.createElement('button');
      // Using Font Awesome icon for minus
      removeBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
      removeBtn.classList.add('remove-btn');

      removeBtn.dataset.index = index;
        li.appendChild(removeBtn);

      ul.appendChild(li);
    });
  }
  
  renderLinks();

  //Removing links when clicking the remove button
  const ulElement = document.querySelector('.links-alternative');
    if (ulElement) {
        ulElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.remove-btn');
            if (btn) {
                const index = btn.dataset.index;
                links.splice(index, 1);
                localStorage.setItem('savedLinks', JSON.stringify(links));
                renderLinks();
            }
        });
    }

  // Add link using prompt()
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
}