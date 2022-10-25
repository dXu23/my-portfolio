
const navbarBtn = document.getElementById('navbar-btn');
const navbarElem = document.querySelector('nav');
const navLinks = document.querySelectorAll('#navbar a');

navbarBtn.addEventListener('click', () => {
  navbarBtn.classList.toggle('opened');
  navbarElem.classList.toggle('reveal');
});

navLinks.forEach(navLink => {
  navLink.addEventListener('click', () => {
    navbarElem.classList.remove('reveal');
    navbarBtn.classList.remove('opened');
  });
});


