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

// Change background image


let checkbox = document.getElementById("checkbox1");
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
const initialImageIndex = 0; // Set initial image to 01.jpg (index 0)
landpage.style.backgroundImage = `url(imgs/${imgsArray[initialImageIndex]})`;
let intervalId;

function changeBg() {
    if (checkbox.checked) {
        intervalId = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * imgsArray.length);
            landpage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
        }, 5000);
        localStorage.setItem("randomBackground", "true");
    } else {
        clearInterval(intervalId);
        localStorage.removeItem("randomBackground");
    }
}

if (localStorage.getItem("randomBackground") === "true") {
    checkbox.checked = true;
    changeBg();
}

// Color Option 

colorOptions.forEach((color) => {
    color.addEventListener("click", (e) => {

        // Remove "active" class from all color options and Add Active Class On Self
        handleActive(e);

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

        let allSkills = document.querySelectorAll(".skill-box .skill-progress  span");

        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create Overlay Element
        let overlay = document.createElement('div');

        // Add Class To Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay To The Body
        document.body.appendChild(overlay);

        // Create popup 
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

        // img heading 
        if (img.alt !== null) {

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create Text for heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text To The Heading
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Create The image
        let popupImage = document.createElement("img");

        // Set Image Sourse
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Append THe popup Box To Body
        document.body.appendChild(popupBox);

        // Create Clsoing span
        let closeSpan = document.createElement("span");

        closeSpan.className = "close-button"

        let closeSpanText = document.createTextNode("X");

        closeSpan.appendChild(closeSpanText);

        popupBox.appendChild(closeSpan);

    })
})

// Close popup 
document.addEventListener("click", (e) => {

    if (e.target.className == 'close-button') {

        // Remove the current popup
        e.target.parentElement.remove();

        // Remove Overlay 
        document.querySelector(".popup-overlay").remove();
    }
})

// Select All Bullets 
const allBUllets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links 
const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault(); // Prevent default so when click on a link has hash wont accept it 
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            });
        });
    });
}

scrollToSection(allBUllets);
scrollToSection(allLinks);

// Remove Active Class From All Children
function handleActive(e) {

    // Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach(ele => {

        ele.classList.remove("active");
    })

    // Add Active Class On Self 
    e.target.classList.add("active");
} 


// Nav-bullets option settings

let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

// Function to toggle bullets based on checkbox state
function toggleBullets(state) {
    bulletsContainer.style.display = state ? 'block' : 'none';
}

// Initialize based on local storage or default to unchecked
if (bulletLocalItem === 'checked') {
    document.getElementById("checkbox2").checked = true;
    toggleBullets(true);
} else {
    toggleBullets(false);
}

// Function to handle checkbox change
function showBullets() {
    const checkbox2 = document.getElementById("checkbox2");
    if (checkbox2.checked) {
        localStorage.setItem("bullets-option", 'checked');
    } else {
        localStorage.setItem("bullets-option", 'unchecked');
    }
    toggleBullets(checkbox2.checked);
}