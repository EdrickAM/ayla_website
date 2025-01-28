// Scripts para funcionalidades do site

document.addEventListener('DOMContentLoaded', () => {
    // Exemplo de funcionalidade: Rolagem suave ao clicar nos links do menu
    const navLinks = document.querySelectorAll('.nav a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 50, // Compensar o header
            behavior: 'smooth',
          });
        }
      });
    });
  
    // Funcionalidade: Mensagem de formulário enviado (simulação)
    const contactForm = document.querySelector('form');
  
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada! Obrigado por entrar em contato.');
        contactForm.reset();
      });
    }
  });  

// Funções para controlar a rolagem dos destinos
function scrollLeft() {
  document.querySelector('.destinos-container').scrollBy({
    left: -500, // A quantidade de pixels para rolar para a esquerda
    behavior: 'smooth'
  });
}

function scrollRight() {
  document.querySelector('.destinos-container').scrollBy({
    left: 500, // A quantidade de pixels para rolar para a direita
    behavior: 'smooth'
  });
}
