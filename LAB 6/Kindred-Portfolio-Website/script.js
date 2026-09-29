const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const backToTop = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");
const form = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");
const featureCards = [...document.querySelectorAll(".feature-card")];

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .14 });
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${(index % 3) * 90}ms`;
  observer.observe(item);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  backToTop.classList.toggle("visible", window.scrollY > 500);
  if (window.scrollY < 180) {
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === "#home"));
  }
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

featureCards.forEach((card) => {
  const selectCard = () => {
    featureCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
  };
  card.addEventListener("click", selectCard);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCard();
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;
  if (!name.value.trim() || !email.validity.valid || !message.value.trim()) {
    formMessage.textContent = "Please complete all fields with valid information.";
    formMessage.style.color = "#ffaaa5";
    form.reportValidity();
    return;
  }
  formMessage.textContent = `Thanks, ${name.value.trim()}! Your message is ready to take flight.`;
  formMessage.style.color = "";
  form.reset();
});

const cursorGlow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

document.getElementById("year").textContent = new Date().getFullYear();
