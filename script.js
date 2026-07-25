const header = document.querySelector(".site-header");
const revealEls = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const cursorGlow = document.getElementById("cursorGlow");
const year = document.getElementById("year");
const demoPlay = document.getElementById("demoPlay");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => observer.observe(el));

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

let playing = false;
let timer = null;
let elapsed = 0;

demoPlay.addEventListener("click", () => {
  playing = !playing;
  demoPlay.querySelector(".play-icon").textContent = playing ? "❚❚" : "▶";
  demoPlay.querySelector(".play-text").textContent = playing ? "Pause" : "Preview";

  if (playing) {
    timer = setInterval(() => {
      elapsed += 0.1;
      if (elapsed >= 30) {
        elapsed = 0;
        playing = false;
        clearInterval(timer);
        demoPlay.querySelector(".play-icon").textContent = "▶";
        demoPlay.querySelector(".play-text").textContent = "Preview";
      }
      const percent = (elapsed / 30) * 100;
      progressBar.style.width = `${percent}%`;
      currentTime.textContent = `0:${String(Math.floor(elapsed)).padStart(2, "0")}`;
    }, 100);
  } else {
    clearInterval(timer);
  }
});
