// Add a shadow to the navbar once the page is scrolled
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Close the mobile menu after a link is tapped
const menu = document.getElementById('navMenu');
document.querySelectorAll('#navMenu .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});