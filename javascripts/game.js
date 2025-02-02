/**
 * This file contains the JavaScript code for the BTS-Meme-Generator.
 * 
 * @author: Gonzalo Cofre Real: 3621266
 * @author: Justine Schäfer: 3784912

 */

/**
 * Array of BTS-Meme-Images
 */
const images = [
    "/images/V1.jpg",
    "/images/V2.jpg",
    "/images/V3.jpg",
    "/images/V5.jpg",
    "/images/V6.jpg",
    "/images/V7.jpg",
    "/images/V8.jpg",
    "/images/Jungook1.jpg",
    "/images/Jungook2.jpg",
    "/images/Jungkook3.jpg",
    "/images/Jungkook4.jpg",
    "/images/Jin1.jpg",
    "/images/Jin2.jpg",
    "/images/Jimin2.jpg",
    "/images/JHope1.jpg",
    "/images/JHope2.jpg",
    "/images/Jimin3.jpg",
    "/images/Jimin4.jpg",
    "/images/Jimin5.jpg",
    "/images/Jimin6.jpg",
    "/images/JHope3.jpg",
];

/**
 * Stores the current time when loading the page.
 */
document.addEventListener('DOMContentLoaded', function() {
    const startTime = Date.now();
    localStorage.setItem('startTime', startTime);
});

/**
 * 
 * Makes the pop-up window appear on screen with varying text inside. It displays
 * the time spent on the platform.
 * @param {boolean} tick - true if called by home-button, false otherwise.
 */
function activatePopup(tick) {
    //Expose the popup-window.
    const popup = document.getElementById('popup-message');
    popup.hidden = false; 

    //Calculating the time spent.
    const startTime = parseInt(localStorage.getItem('startTime'), 10);
    const currentTime = Date.now();
    const timeSpentMinutes = Math.floor((currentTime - startTime) / 1000);
    let timeSpent = document.getElementById('time-spent');

    // Displays either minutes or seconds.
    if (timeSpentMinutes < 60) {
        timeSpent.textContent = `${timeSpentMinutes} sec`;
    } else {
        timeSpent.textContent = `${Math.floor(timeSpentMinutes / 60)} min`
    }
}

/**
 * Event Listener for the popup-window closing-button.
 */
document.getElementById('close-popup-button').addEventListener('click', function() {
    document.getElementById('popup-message').hidden = true;
});

/**
 * Event Listener for the text input. While typing the same text will be displayed
 * inside the lower third of the image. 
 */
document.getElementById('textInput').addEventListener('input', function() {
    let memeText = document.getElementById('memeText');
    memeText.textContent = this.value.toUpperCase();
});


/**
 * Returns a specified number of random memes from an array of images.
 *
 * @param {Array} imageArray - The array of image URLs or image objects.
 * @param {number} numberOfMemes - The number of random memes to select.
 * @returns {Array} An array containing the specified number of random memes.
 */
function getRandomMemes(imageArray, numberOfMemes) {
    let shuffledImages = imageArray.sort(() => 0.5 - Math.random());
    return shuffledImages.slice(0, numberOfMemes);
}

const selectedMemes = getRandomMemes(images, 10);
let currentIndex = 0;


/**
 * Event Listener for the next-button. Skips to the next image within the selectedMemes array.
 * Triggers popup-window if all images have been seen. 
 */
document.getElementById('next-button').addEventListener('click', function() {
    currentIndex++;
    if (currentIndex >= selectedMemes.length) {
        activatePopup(false);
    } else {
        document.getElementById('meme-image').src = selectedMemes[currentIndex];
        document.getElementById('memeText').textContent = "";
        document.getElementById('textInput').value = "";
    }
});

/**
 * Event Listener for the download-button. 
 */
document.getElementById('download-button').addEventListener('click', function() {
    let memeElement = document.querySelector("#textImage");

    html2canvas(memeElement).then(canvas => {
        let image = canvas.toDataURL("image/png");
        let link = document.createElement('a');
        link.href = image;
        link.download = "meme.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

/**
 * Event Listener for the home button. Activates the popup.
*/

document.getElementById('home-button').addEventListener('click', function() {
    activatePopup(true);    
});