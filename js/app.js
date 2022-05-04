// Global Variables
const cancelMenu = document.querySelector(".closed-menu");
const topBtn = document.querySelector(".top-btn");
const mainContainer = document.querySelector("main");
const heroSection = document.querySelector(".hero-section");
const sections = document.querySelectorAll("section");
const mainNav = document.querySelector(".main-nav");
const openMenu = document.querySelector(".open-menu");

// Event listens for document to load and runs makeActive function
document.addEventListener("DOMContentLoad", makeActive);

// Generating Navigation Dynamically
function createNav() {
  const fragment = document.createDocumentFragment();
  const navUl = document.createElement("ul");
  navUl.setAttribute("class", "nav-links");

  // Creating elements, Appends to DOM, Loops through sections
  for (let i = 0; i < sections.length; i++) {
    const sectionId = sections[i].getAttribute("id");
    const navLi = document.createElement("li");
    const navImg = document.createElement("img");
    const navLink = document.createElement("a");

    //Grabbing nav icon links
    navLi.setAttribute("data-nav", `${sectionId}`);
    navImg.setAttribute("src", `images/nav-icons/svg/${sectionId}.svg`);
    navImg.setAttribute("class", "nav-link-icon");
    navLink.setAttribute("herf", `#${sectionId}`);
    navLink.textContent = `${sectionId}`;

    navLi.appendChild(navImg);
    navLi.appendChild(navLink);
    navUl.appendChild(navLi);
    fragment.appendChild(navUl);
  }

  mainNav.appendChild(fragment);
}

// Call function
createNav();

// checks whether the passed section ID matches menu item data-nav attribute

function makeActive(navEl) {
  // get all nav-links
  const navLinks = document.querySelectorAll(`.nav-links li`);
  let activeLink;

  for (link of navLinks) {
    // get nav-link attribute and check if it matches function param(NavEl)
    activeLink = link.getAttribute("data-nav");
    if (navEl === activeLink) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}

// Listens form scroll event and calls grabActiveSection function
document.addEventListener("scroll", grabActiveSection);

// description: checks sections visibility upon scrolling & grabs current section

function grabActiveSection() {
  let currentSection;
  for (section of sections) {
    // stores section top value
    const sectionTop = section.offsetTop;

    // stores section third part of height
    const sectionHeight = section.clientHeight / 3;

    if (pageYOffset >= sectionTop - sectionHeight) {
      currentSection = section.id;
      makeActive(currentSection);
    }
  }
}

// description: scrolls nav-links to view respective section

function scrollToSection() {
  const navLinks = document.querySelectorAll(`.nav-links li`);
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      let navEl = link.getAttribute("data-nav");
      const sec = document.querySelector(`#${navEl}`);
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Call function
scrollToSection();

// creates button to scroll to top
function createtoTopBtn() {
  const button = document.createElement("button");
  topBtn.appendChild(button);
  button.id = "scrollToTop";
  button.innerHTML = '<i class="fas fa-chevron-up"></i>';
}

// Scrolls top button
createtoTopBtn();

// Events listens for scroll event and calls showToTopBtn function
document.addEventListener("scroll", showToTopBtn);

// shows and hides to-top-btn based on document scroll value

function showToTopBtn() {
  if (pageYOffset >= 800) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
}

// Add scroll to top behavior to to-top-btn
topBtn.addEventListener("click", () => {
  heroSection.scrollIntoView({ behavior: "smooth" });
});

// Open and Closing mobile menu functionality
openMenu.addEventListener("click", () => {
  openMenu.classList.add("hide");
  cancelMenu.classList.add("show");
  mainNav.classList.add("active");
});

cancelMenu.addEventListener("click", () => {
  openMenu.classList.remove("hide");
  cancelMenu.classList.remove("show");
  mainNav.classList.remove("active");
});

// adds main element hight dynamically

function setMainHeight() {
  const header = document.querySelector("header");
  const height = header.offsetHeight;
  mainContainer.style.paddingTop = height + "px";
}

window.addEventListener("resize", setMainHeight);
window.addEventListener("load", setMainHeight);

// Sets top value of mainNav element depending on viewport width
function setmainNavHeight() {
  if (window.innerWidth <= 823) {
    const header = document.querySelector("header");
    const height = header.offsetHeight;
    mainNav.style.top = height + "px";
  }
}

window.addEventListener("resize", setmainNavHeight);
window.addEventListener("load", setmainNavHeight);
