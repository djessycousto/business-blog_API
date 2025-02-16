// navebar

const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close-menu");
const linksContainer = document.querySelector(".links-container");
const overlay = document.querySelector(".overlay");

menu.addEventListener("click", () => {
  overlay.classList.remove("show-menu");
  overlay.classList.add("show-menu");
});

closeMenu.addEventListener("click", () => {
  overlay.classList.remove("show-menu");
});
