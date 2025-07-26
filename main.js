// User role simulation: 'visitor', 'member', 'bod', 'core', 'admin'
let userRole = 'visitor'; // Change this to simulate different roles

const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) navLinks.classList.remove('open');
  });
});

// Dynamic navigation based on user role
function updateNavByRole(role) {
  const nav = document.getElementById('navLinks');
  let html = `
    <li><a href="home.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="events.html">Events</a></li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="projects.html">Projects</a></li>
    <li><a href="contact.html">Contact</a></li>
  `;
  if (role === 'visitor') {
    html += '<li><a href="login.html" class="cta-btn">Members Login</a></li>';
  } else if (role === 'member') {
    html += '<li><a href="#">Profile</a></li>';
    html += '<li><a href="#" onclick="logout()">Logout</a></li>';
  } else if (role === 'bod' || role === 'core') {
    html += '<li><a href="#">Dashboard</a></li>';
    html += '<li><a href="#" onclick="logout()">Logout</a></li>';
  } else if (role === 'admin') {
    html += '<li><a href="admin.html">Admin</a></li>';
    html += '<li><a href="#" onclick="logout()">Logout</a></li>';
  }
  nav.innerHTML = html;
}

updateNavByRole(userRole);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in animation on scroll
function handleFadeIn() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('DOMContentLoaded', handleFadeIn);

// Simulate logout (for demo)
function logout() {
  userRole = 'visitor';
  updateNavByRole(userRole);
  alert('Logged out!');
}

// EVENTS PAGE: Filter upcoming/past events
if (document.querySelector('.events-filter')) {
  const filterBtns = document.querySelectorAll('.events-filter .filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      eventCards.forEach(card => {
        if (filter === 'upcoming') {
          card.style.display = card.dataset.type === 'upcoming' ? '' : 'none';
        } else if (filter === 'past') {
          card.style.display = card.dataset.type === 'past' ? '' : 'none';
        } else {
          card.style.display = '';
        }
      });
    });
  });
}

// GALLERY PAGE: Filter and modal/lightbox
if (document.querySelector('.gallery-filter')) {
  const galleryBtns = document.querySelectorAll('.gallery-filter .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      galleryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  // Modal/Lightbox
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementById('closeModal');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('open');
    });
  });
  closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
    modalImg.src = '';
    modalImg.alt = '';
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modalImg.src = '';
      modalImg.alt = '';
    }
  });
} 