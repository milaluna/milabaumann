const burger = document.querySelector('.burger');
const nav = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.nav-links li');

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!(event.target.classList.contains('burger') || event.target.parentNode.classList.contains('burger')) && nav.classList.contains('nav-active')) { //nav.classList.contains('nav-active') &&
    burger.click();
  }
}

burger.addEventListener('click', () => {
  //Toggle nav
  nav.classList.toggle('menu-active');
  //Animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.3s ease forwards ${index / 7 + 0.2}s`;
    }
  });
  //Burger animation
  burger.classList.toggle('toggle');
});
