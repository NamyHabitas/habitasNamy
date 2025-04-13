// Effet de défilement pour l'en-tête
$(window).on('scroll', function(){
  if($(window).scrollTop()){
    $('header').addClass('nav-show');
  } else{
    $('header').removeClass('nav-show');
  }
});

// Menu hamburger pour mobile
const navSlide = () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".nav-bar");

  hamburger.addEventListener('click', () => {
    navbar.classList.toggle("nav-active");
    hamburger.classList.toggle("toggle");
  });
}

// Soumission du formulaire de contact
document.querySelector('.contact-form form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const nom = this.querySelector('input[name="Nom et Prénom"]').value;
  const email = this.querySelector('input[name="Email"]').value;
  const telephone = this.querySelector('input[name="Téléphone"]').value;
  const sujet = this.querySelector('select[name="Sujet"]').value;
  const message = this.querySelector('textarea[name="Message"]').value;

  if (nom && email && message) {
    alert('Merci ' + nom + ' ! Votre message a été envoyé.');
    this.submit();  // Laisse le formulaire s'envoyer (FormSubmit)
  } else {
    alert('Veuillez remplir tous les champs obligatoires.');
  }
});

// Système de filtrage des propriétés
function filterProperties() {
  const priceFilter = document.getElementById('priceFilter').value;
  const roomFilter = document.getElementById('roomFilter').value;
  const properties = document.querySelectorAll('.card');

  properties.forEach(property => {
    const price = parseInt(property.querySelector('.price').textContent);
    const rooms = parseInt(property.querySelector('.work-content p').textContent);
    
    let showProperty = true;

    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v));
      if (price < min || price > max) showProperty = false;
    }

    if (roomFilter !== 'all') {
      const [min, max] = roomFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v));
      if (rooms < min || rooms > max) showProperty = false;
    }

    property.style.display = showProperty ? 'block' : 'none';
  });
}

// Système de favoris
function setupFavorites() {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  
  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      const propertyId = this.dataset.propertyId;
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      if (this.classList.contains('active')) {
        if (!favorites.includes(propertyId)) {
          favorites.push(propertyId);
        }
      } else {
        const index = favorites.indexOf(propertyId);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });
}

// Modal functionality
function openModal(propertyCard) {
  const modal = document.getElementById('propertyModal');
  const img = propertyCard.querySelector('.work-img');
  const title = propertyCard.querySelector('h4');
  const rooms = propertyCard.querySelector('.work-content p');
  const price = propertyCard.querySelector('.price');

  document.getElementById('modalImage').src = img.src;
  document.getElementById('modalTitle').textContent = title.textContent;
  document.getElementById('modalRooms').textContent = rooms.textContent;
  document.getElementById('modalPrice').textContent = price.textContent;
  
  modal.style.display = 'block';
}

// Gestion des cookies
function showCookieModal() {
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieModal').style.display = 'block';
  }
}

function setCookieConsent(type) {
  localStorage.setItem('cookieConsent', type);
  document.getElementById('cookieModal').style.display = 'none';
}

window.onload = () => {
  navSlide();
  showCookieModal();
  setupFavorites();
  
  document.getElementById('acceptAllCookies')?.addEventListener('click', () => setCookieConsent('all'));
  document.getElementById('customizeCookies')?.addEventListener('click', () => setCookieConsent('custom'));
  document.getElementById('rejectAllCookies')?.addEventListener('click', () => setCookieConsent('rejected'));
  
  const priceFilter = document.getElementById('priceFilter');
  const roomFilter = document.getElementById('roomFilter');
  
  if (priceFilter) priceFilter.addEventListener('change', filterProperties);
  if (roomFilter) roomFilter.addEventListener('change', filterProperties);

  document.querySelectorAll('.property-link').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      openModal(link.closest('.card'));
    }
  });

  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById('propertyModal').style.display = 'none';
    }
  }

  window.onclick = (e) => {
    const modal = document.getElementById('propertyModal');
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  }
};
