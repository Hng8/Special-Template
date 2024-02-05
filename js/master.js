// Variables select
let landpage = document.querySelector(".landing-page");
let settingsBox = document.querySelector(".settings-box");
let  gear = document.querySelector(".gear");
let gearIcon = document.querySelector(".gear i");

// Settings 
let Islose = true;

// Get Array Of Images
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

// Set the background to a background before changeing
landpage.style.backgroundImage = `url(imgs/05.jpg)`;

// Landscape background change
setInterval(() => {

    // Get Random Number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);

    // Change Background Image URL
    landpage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
}, 5000);

// Select gear variable and Show setting box
gear.addEventListener('click', () => {
    // Toggle Class Fa-spin for Rotation On Self
    gearIcon.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    settingsBox.classList.toggle("opened");
});