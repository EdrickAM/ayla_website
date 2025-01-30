// Scripts para funcionalidades do site

document.addEventListener('DOMContentLoaded', () => {
  // ==================================================
  // 1. Rolagem suave ao clicar nos links do menu
  // ==================================================
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

  // ==================================================
  // 2. Mensagem de formulário enviado (simulação)
  // ==================================================
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita o envio padrão do formulário

      // Simula o envio do formulário
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      contactForm.reset(); // Limpa o formulário
    });
  }

  // ==================================================
  // 3. Header sólido ao rolar a página
  // ==================================================
  const header = document.querySelector('.header');

  // Função para adicionar/remover a classe "solid" ao header
  function toggleHeaderSolid() {
    if (window.scrollY > 50) { // Se o usuário rolar mais de 50px
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }
  }

  // Adiciona o listener de scroll
  window.addEventListener('scroll', toggleHeaderSolid);

  // ==================================================
  // 4. Funcionalidade de rolagem dos destinos
  // ==================================================
  function scrollLeft() {
    document.querySelector('.destinos-container').scrollBy({
      left: -500, // Rola 500px para a esquerda
      behavior: 'smooth',
    });
  }

  function scrollRight() {
    document.querySelector('.destinos-container').scrollBy({
      left: 500, // Rola 500px para a direita
      behavior: 'smooth',
    });
  }

  // Atualiza o estado dos botões de rolagem
  function updateScrollButtons() {
    const container = document.querySelector('.destinos-container');
    const scrollLeftButton = document.querySelector('.destinos-buttons .btn:first-child');
    const scrollRightButton = document.querySelector('.destinos-buttons .btn:last-child');

    // Desabilita o botão de rolar para a esquerda se não houver mais conteúdo à esquerda
    scrollLeftButton.disabled = container.scrollLeft === 0;

    // Desabilita o botão de rolar para a direita se não houver mais conteúdo à direita
    scrollRightButton.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth;
  }

  // Adiciona listeners para atualizar os botões de rolagem
  document.querySelector('.destinos-container').addEventListener('scroll', updateScrollButtons);
  document.addEventListener('DOMContentLoaded', updateScrollButtons);
});