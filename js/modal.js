// Fonctionnalités du modal
function openModal(propertyCard) {
  const modal = document.getElementById('propertyModal');
  const img = propertyCard.querySelector('.work-img');
  const title = propertyCard.querySelector('h4');
  const details = propertyCard.querySelectorAll('.work-content p');
  const price = propertyCard.querySelector('.price');

  document.getElementById('modalImage').src = img.src;
  document.getElementById('modalTitle').textContent = title.textContent;
  document.getElementById('modalRooms').textContent = details[0].textContent;
  document.getElementById('modalSize').textContent = details[1].textContent;
  document.getElementById('modalPrice').textContent = price.textContent;
  
  document.getElementById('modalDescription').textContent = 
    `Découvrez ce magnifique ${title.textContent.toLowerCase()} situé à ${details[1].textContent.split(' - ')[1] || 'une localisation privilégiée'}.`;
  
  modal.style.display = 'block';
  
  // Gestion des boutons d'action
  document.querySelector('.contact-btn').onclick = () => {
    window.location.href = '#contact';
    modal.style.display = 'none';
  };
  
  document.querySelector('.reserve-btn').onclick = () => {
    window.location.href = '#contact';
    modal.style.display = 'none';
  };
}

// Initialisation des événements du modal
function initModal() {
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
}

// Initialiser le modal quand la page est chargée
window.addEventListener('DOMContentLoaded', initModal);
