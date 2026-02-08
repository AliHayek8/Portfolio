// Highlight active page link in the navbar
(function setActiveNavLink() {
  const links = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
})();

// Contact form: simple validation + message + character counter
(function contactFormEnhancements() {
  const form = document.querySelector("#contactForm");
  if (!form) return; // runs only on contact.html

  const nameInput = document.querySelector("#fullName");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");
  const messageBox = document.querySelector("#formMessage");
  const counter = document.querySelector("#messageCounter");

  const MAX = 300;

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type; // "success" or "error"
  }

  function updateCounter() {
    const len = messageInput.value.length;
    counter.textContent = `${len}/${MAX}`;
    if (len > MAX) counter.classList.add("danger");
    else counter.classList.remove("danger");
  }

  messageInput.addEventListener("input", updateCounter);
  updateCounter();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email) {
      showMessage("Please fill in your name and email.", "error");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    if (!message) {
      showMessage("Please write a message.", "error");
      return;
    }

    if (message.length > MAX) {
      showMessage(`Message is too long. Max ${MAX} characters.`, "error");
      return;
    }

    showMessage("Message sent successfully (UI only). ✅", "success");
    form.reset();
    updateCounter();
  });
})();

