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
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateName(name) {
    return name.trim().length >= 2;
  }

  function validatePhone(phone) {
    return /^\+?[1-9]\d{1,14}$/.test(phone.replace(/\D/g, ''));
  }

  function applyPhoneMask(input) {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.startsWith('55')) {
        value = `+${value.slice(0, 2)} ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      } else {
        value = `+${value}`;
      }
      e.target.value = value;
    });
  }

  function showError(input, message) {
    const error = document.createElement('span');
    error.classList.add('error-message');
    error.textContent = message;
    input.parentNode.appendChild(error);
    setTimeout(() => error.remove(), 3000);
  }

  function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach(el => el.remove());
  }

  // Validação do formulário de contato
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {  
    const phoneInput = contactForm.querySelector('input[name="phone"]');

    if (phoneInput) applyPhoneMask(phoneInput);

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors(contactForm);
      
      const name = contactForm.querySelector('input[name="name"]');
      const email = contactForm.querySelector('input[name="email"]');
      const phone = contactForm.querySelector('input[name="phone"]');
      const message = contactForm.querySelector('textarea[name="message"]');
      
      let valid = true;
      if (!validateName(name.value)) {
        showError(name, getLanguage() === "pt" ? "Nome deve ter pelo menos 2 caracteres." : "Name must have at least 2 characters.");
        valid = false;
      }
      if (!validateEmail(email.value)) {
        showError(email, getLanguage() === "pt" ? "Email inválido." : "Invalid email.");
        valid = false;
      }
      if (phone && !validatePhone(phone.value)) {
        showError(phone, getLanguage() === "pt" ? "Número de telefone inválido. Use formato internacional." : "Invalid phone number. Use international format.");
        valid = false;
      }
      if (message.value.trim().length < 10) {
        showError(message, getLanguage() === "pt" ? "Mensagem deve ter pelo menos 10 caracteres." : "Message must have at least 10 characters.");
        valid = false;
      }
      
      if (valid) contactForm.submit();
    });
  }

  // Envio do formulário de contato
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      formData.append('lang', getLanguage());

      fetch('../php/process_contact.php', {
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
      clearErrors(newsletterForm);
      
      const name = newsletterForm.querySelector('input[name="name"]');
      const email = newsletterForm.querySelector('input[name="email"]');
      
      let valid = true;
      if (!validateName(name.value)) {
        showError(name, getLanguage() === "pt" ? "Nome deve ter pelo menos 2 caracteres." : "Name must have at least 2 characters.");
        valid = false;
      }
      if (!validateEmail(email.value)) {
        showError(email, getLanguage() === "pt" ? "Email inválido." : "Invalid email.");
        valid = false;
      }
      
      if (valid) newsletterForm.submit();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(newsletterForm);
      formData.append('lang', getLanguage());

      fetch('../php/process_newsletter.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text()) // Primeiro obtém a resposta como texto
      .then(text => {
        try {
          const data = JSON.parse(text); // Tenta converter para JSON
          if (data.status === "success") {
            alert(data.message);
            newsletterForm.reset();
          } else {
            alert(data.message || "Erro inesperado.");
          }
        } catch (error) {
          console.error("A resposta não é um JSON válido:", text);
          alert(getLanguage() === "pt" 
            ? "Erro inesperado ao processar a resposta do servidor." 
            : "Unexpected error processing server response.");
        }
      })
      .catch(error => {
        console.error("Erro ao se inscrever:", error);
        alert(getLanguage() === "pt" 
          ? "Erro ao se inscrever na newsletter." 
          : "Error subscribing to the newsletter.");
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

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isActive = button.classList.contains('active');

      document.querySelectorAll('.faq-answer').forEach(item => item.style.display = 'none');
      document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

      if (!isActive) {
        answer.style.display = 'block';
        button.classList.add('active');
      }
    });
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
  var hamburger = document.querySelector(".hamburger");

  // Se o clique for no ícone do menu, alterna o estado do checkbox
  if (event.target === checkbox || hamburger.contains(event.target)) {
      checkbox.checked = !checkbox.checked;
      return; // Sai da função para evitar fechar imediatamente
  }

  // Se o menu estiver aberto e o clique for fora dele, fecha o menu
  if (checkbox.checked && !menu.contains(event.target)) {
      checkbox.checked = false;
  }
});

function openDay(evt, dayName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");

  // Obtém a referência correta ao elemento da aba selecionada
  let targetTab = document.getElementById(dayName);

  // Captura o valor atual de flex-direction (se houver)
  let computedStyle = window.getComputedStyle(targetTab);
  let currentFlexDirection = computedStyle.getPropertyValue("flex-direction") || "row"; // Default para "row"

  // Esconde todas as abas
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove a classe ativa de todos os botões
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Mostra a aba correta e reaplica o flex-direction
  targetTab.style.display = "flex";
  targetTab.style.flexDirection = currentFlexDirection;

  // Marca o botão atual como ativo
  evt.currentTarget.classList.add("active");
}

