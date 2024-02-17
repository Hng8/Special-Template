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
// let isRandomBg = localStorage.getItem("randomBackground");

// // Get the checkbox element
// let checkbox = document.getElementById("checkbox1");

// // If there's a preference, update the checkbox state accordingly
// if (isRandomBg !== true) {
//     checkbox.checked = (isRandomBg === "true"); // Convert string to boolean
//     if (checkbox.checked) {
//         changeBg(); // If random background is preferred, call changeBg to start changing the background randomly
//     }
// } else {
//     checkbox.checked = false;
// }

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

let checkbox = document.getElementById("checkbox1");

// Get array of images
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Set initial background image (assuming 'landpage' is the element)
const initialImageIndex = 4; // Set initial image to 05.jpg (index 4)
landpage.style.backgroundImage = `url(imgs/${imgsArray[initialImageIndex]})`;

// Define function to change background image
function changeBg() {
    const checkbox = document.getElementById("checkbox1");

    // Handle checkbox state change
    if (checkbox.checked) {
        // Check for saved preference or create interval
        if (localStorage.getItem("randomBackground") !== "true") {
            const intervalId = setInterval(() => {
                const randomNumber = Math.floor(Math.random() * imgsArray.length);
                landpage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
            }, 5000);
            // Store interval ID for future clearing
            checkbox.intervalId = intervalId;
            // Store "true" preference in local storage
            localStorage.setItem("randomBackground", "true");
        }
    } else {
        // Clear interval if necessary
        if (checkbox.intervalId) {
            clearInterval(checkbox.intervalId);
            checkbox.intervalId = null; // Remove reference
        }
        landpage.style.backgroundImage = `url(imgs/${imgsArray[initialImageIndex]})`; // Reset to initial image
        // Remove local storage preference to avoid conflicts
        localStorage.removeItem("randomBackground");
    }
}

// Check for existing preference on page load
if (localStorage.getItem("randomBackground") === "true") {
    checkbox.checked = true;
    changeBg(); // Trigger background change if preference is true
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

// // Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        console.log("Scrolling")

        let allSkills = document.querySelectorAll(".skill-box .skill-progress  span");

        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};