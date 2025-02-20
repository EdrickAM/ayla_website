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
  function getLanguage() {
    return window.location.href.includes("/pt/") ? "pt" : "en";
  }

  // Envio do formulário de contato
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      formData.append('lang', getLanguage());

      fetch('process_contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.status === "success") {
          contactForm.reset();
        }
      })
      .catch(error => {
        console.error("Erro no envio:", error);
        alert(getLanguage() === "pt" ? "Erro ao enviar mensagem." : "Error sending message.");
      });
    });
  }

  // Envio do formulário da newsletter
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(newsletterForm);
      formData.append('lang', getLanguage());

      fetch('process_newsletter.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.status === "success") {
          newsletterForm.reset();
        }
      })
      .catch(error => {
        console.error("Erro ao se inscrever:", error);
        alert(getLanguage() === "pt" ? "Erro ao se inscrever na newsletter." : "Error subscribing to the newsletter.");
      });
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

document.addEventListener("click", function (event) {
  var checkbox = document.getElementById("menu-toggle");
  var menu = document.querySelector(".nav .menu");

  // Verifica se o menu está aberto e se o clique foi fora dele
  if (checkbox.checked && !menu.contains(event.target) && event.target !== checkbox) {
      checkbox.checked = false;
  }
});