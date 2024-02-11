// Variables select
let landpage = document.querySelector(".landing-page");
let settingsBox = document.querySelector(".settings-box");
let gear = document.querySelector(".gear");
let gearIcon = document.querySelector(".gear i");
let colorOptions = document.querySelectorAll(".option-box .colors-list li");

// Settings

// Check If There's Local Storage Color options
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors);

    // Remove Active Class From ALl Colors List Items
    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");

        // Add Active Class On Element With Data-Color === Local Storage item
        if (element.dataset.color === mainColors) {
            // Add Active Class
            element.classList.add("active");
        }
    });
}
// Check if there's a preference stored in local storage
let isRandomBg = localStorage.getItem("randomBg");

// Get the checkbox element
let checkbox = document.getElementById("checkbox1");

// If there's a preference, update the checkbox state accordingly
if (isRandomBg !== true) {
    checkbox.checked = (isRandomBg === "true"); // Convert string to boolean
    if (checkbox.checked) {
        changeBg(); // If random background is preferred, call changeBg to start changing the background randomly
    }
} else {
    checkbox.checked = false;
}

// Select gear variable and Show setting box
gear.addEventListener("click", () => {
    // Toggle Class Fa-spin for Rotation On Self
    gearIcon.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    settingsBox.classList.toggle("opened");

    // Add event listener to close settings box when clicking anywhere on the screen
    if (settingsBox.classList.contains("opened")) {
        document.addEventListener("click", closeSettingsBoxOnClickOutside);
    } else {
        document.removeEventListener("click", closeSettingsBoxOnClickOutside);
    }
});

// Function to close settings box when clicking outside of it
function closeSettingsBoxOnClickOutside(event) {
    if (!settingsBox.contains(event.target) && event.target !== gear) {
        settingsBox.classList.remove("opened");
        gearIcon.classList.remove("fa-spin");
        document.removeEventListener("click", closeSettingsBoxOnClickOutside);
    }
}

// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Set the background to a background before changeing
landpage.style.backgroundImage = `url(imgs/05.jpg)`;



// Landscape background change
//  Random Background
function changeBg() {
    // console.log("Checkbox clicked")
    let checkbox = document.getElementById("checkbox1");

    if (checkbox.checked) {
        // Update local storage with the current checkbox state
        localStorage.setItem("randomBg", checkbox.checked);
        console.log("true")

        let intervalId = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // Change Background Image URL
            landpage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
        }, 5000);

        // Store the interval ID in case it needs to be cleared
        checkbox.intervalId = intervalId;
    } else {
        // Clear The Interval if it exists
        console.log("false")
        clearInterval(checkbox.intervalId);
        landpage.style.backgroundImage = `url(imgs/05.jpg)`;
        // checkbox.unchecked;
    }
}

colorOptions.forEach((color) => {
    color.addEventListener("click", (e) => {
        // Remove "active" class from all color options
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });

        // Add Active Class On Self
        e.target.classList.add("active");

        // get the color attribute and change the root color
        // let newColor = color.getAttribute("data-color");
        let newColor = e.target.dataset.color;

        document.documentElement.style.setProperty("--main-color", newColor);

        // Set Color On Local Storage
        localStorage.setItem("color_option", newColor);
    });
});
