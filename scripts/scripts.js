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
        console.log('ID do alvo:', targetId);
        console.log('Elemento encontrado:', targetElement);

        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      contactForm.reset(); // Limpa o formulário
    });
  }

  // ==================================================
  // 3. Header sólido ao rolar a página
  // ==================================================
  const header = document.querySelector(".header");
  
  if (!header) {
    console.error("Elemento .header não encontrado!");
    return;
  }

  window.addEventListener("scroll", () => {
    console.log("Rolagem detectada! ScrollY:", window.scrollY);
    
    if (window.scrollY > 50) {
      if (!header.classList.contains("solid")) {
        console.log("Adicionando classe .solid ao header");
        header.classList.add("solid");
      }
    } else {
      if (header.classList.contains("solid")) {
        console.log("Removendo classe .solid do header");
        header.classList.remove("solid");
      }
    }
  });
});

function switchLanguage() {
  const currentUrl = window.location.href;
  if (currentUrl.includes('/pt/')) {
    // Se estiver na versão em português, redireciona para a versão em inglês
    const newUrl = currentUrl.replace('/pt/', '/en/');
    window.location.href = newUrl;
  } else if (currentUrl.includes('/en/')) {
    // Se estiver na versão em inglês, redireciona para a versão em português
    const newUrl = currentUrl.replace('/en/', '/pt/');
    window.location.href = newUrl;
  } else {
    // Caso não esteja em nenhuma das pastas, define uma versão padrão (por exemplo, a em inglês)
    window.location.href = '../en/index.html';
  }
}