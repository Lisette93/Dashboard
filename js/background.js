/*----------- background.js -----------

Manages the random background functionality.*/

const repoName = "Dashboard";


const backgroundImages = [
    `${repoName}/images/img1.jpg`,
    `${repoName}/images/img2.jpg`,
    `${repoName}/images/img3.jpg`,
    `${repoName}/images/img4.jpg`,
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = `url(${backgroundImages[randomIndex]})`;
  }

  export function initBackground() {
    // Set an initial random background
    setRandomBackground();
    // Attach an event listener to the random background button
    const btn = document.getElementById('random-bg-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        setRandomBackground();
      });
    }
  }