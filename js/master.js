// Variables select
let landpage = document.querySelector(".landing-page");
let settingsBox = document.querySelector(".settings-box");
let gear = document.querySelector(".gear");
let gearIcon = document.querySelector(".gear i");
let colorOptions = document.querySelectorAll(".option-box .colors-list li");

// Settings 


// Select gear variable and Show setting box
gear.addEventListener('click', () => {
    // Toggle Class Fa-spin for Rotation On Self
    gearIcon.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    settingsBox.classList.toggle("opened");

    // Add event listener to close settings box when clicking anywhere on the screen
    if (settingsBox.classList.contains("opened")) {
        document.addEventListener('click', closeSettingsBoxOnClickOutside);
    } else {
        document.removeEventListener('click', closeSettingsBoxOnClickOutside);
    }
});

// Function to close settings box when clicking outside of it
function closeSettingsBoxOnClickOutside(event) {
    if (!settingsBox.contains(event.target) && event.target !== gear) {
        settingsBox.classList.remove("opened");
        gearIcon.classList.remove("fa-spin");
        document.removeEventListener('click', closeSettingsBoxOnClickOutside);
    }
}

// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Set the background to a background before changeing
landpage.style.backgroundImage = `url(imgs/05.jpg)`;

// Landscape background change
setInterval(() => {

    // Get Random Number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);

    // Change Background Image URL
    landpage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
}, 5000);


colorOptions.forEach((color) => {
    
    color.addEventListener('click', (e) => {

        // Remove "active" class from all color options
        colorOptions.forEach((el) => {
            el.classList.remove("active");
            
        });
        // get the color attribute and change the root color
        // let newColor = color.getAttribute("data-color");
        let newColor = e.target.dataset.color;

        document.documentElement.style.setProperty('--main-color', newColor);
        // Add "active" class to the clicked element with the color option
        color.classList.add("active");

    });

})



console.log(colorOptions)