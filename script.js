/* =========================
   CONFIGURACIÓN — EDITAR ACÁ
   ========================= */
const CONFIG = {
  whatsapp: "5491100000000",
  email: "hola@crudalibrera.com",
  mpPaymentLink: "",
  formEndpoint: "",
};

/* =========================
   Datos — catálogo de usados
   Cada libro tiene estado y precio usado asignado.
   ========================= */
const BOOKS = [
  { title: "La música del universo", author: "AA.VV.", publisher: "Siglo XXI Editores", price: 17500, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "Pasiones terrenas", author: "Maximiliano Crespi", publisher: "Taurus", price: 19999, state: "good", stateLabel: "Buen estado" },
  { title: "El negro corazón del crimen", author: "Marcelo Figueras", publisher: "Alfaguara", price: 38999, state: "excellent", stateLabel: "Estado excelente" },
  { title: "Una vida más verdadera", author: "Inés Garland", publisher: "Alfaguara", price: 24999, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "Las teorías salvajes", author: "Pola Oloixarac", publisher: "Literatura Random House", price: 29000, state: "fair", stateLabel: "Usado aceptable" },
  { title: "Amores mutantes", author: "Leticia Frenkel", publisher: "notanpüan", price: 20500, state: "excellent", stateLabel: "Estado excelente" },
  { title: "Prohibido morir aquí", author: "Elizabeth Taylor", publisher: "La bestia equilatera", price: 21000, state: "good", stateLabel: "Buen estado" },
  { title: "Las chicas no lloran", author: "Olivia Gallo", publisher: "Tenemos las máquinas", price: 17600, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "El forastero misterioso", author: "Mark Twain", publisher: "Tusquets", price: 11000, state: "worn", stateLabel: "Usado con marcas" },
  { title: "Perdidas en la noche", author: "Fabián Martínez Siccardi", publisher: "Tusquets", price: 12500, state: "good", stateLabel: "Buen estado" },
  { title: "Un reino demasiado breve", author: "Mauro Libertella", publisher: "Literatura Random House", price: 25499, state: "very-good", stateLabel: "Muy buen estado" },
  { title: "La lengua alemana", author: "Julieta Mortati", publisher: "emecé notanpüan", price: 22900, state: "fair", stateLabel: "Usado aceptable" },
  { title: "Variaciones enigma", author: "Andrés Aciman", publisher: "Alfaguara", price: 34599, state: "excellent", stateLabel: "Estado excelente" },
  { title: "Sobre los artistas Vol. 1", author: "John Berger", publisher: "GG", price: 39900, state: "good", stateLabel: "Buen estado" },
  { title: "Sobre los artistas Vol. 2", author: "John Berger", publisher: "GG", price: 39900, state: "good", stateLabel: "Buen estado" },
];

/* =========================
   Utilidades
   ========================= */
const fmt = n => "$" + n.toLocaleString("es-AR");

function hashColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  const hue = Math.abs(h) % 360;
  const sat = 45 + (Math.abs(h >> 3) % 25);
  const lig = 32 + (Math.abs(h >> 5) % 18);
  return `hsl(${hue} ${sat}% ${lig}%)`;
}
function hashColor2(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 3) - h);
  const hue = (Math.abs(h) + 40) % 360;
  return `hsl(${hue} 40% 22%)`;
}

/* =========================
   Render catálogo
   ========================= */
const grid = document.getElementById("books-grid");

BOOKS.forEach((book, i) => {
  const card = document.createElement("article");
  card.className = "book-card";
  card.innerHTML = `
    <div class="book-cover" style="background: linear-gradient(135deg, ${hashColor(book.title)}, ${hashColor2(book.title)});">
      <span class="book-state-badge ${book.state}">${book.stateLabel}</span>
      <span class="book-cover-publisher">${book.publisher}</span>
      <div>
        <h3 class="book-cover-title">${book.title}</h3>
        <p class="book-cover-author">${book.author}</p>
      </div>
    </div>
    <div class="book-info">
      <h4 class="book-title">${book.title}</h4>
      <p class="book-author">${book.author}</p>
      <div class="book-meta">
        <span class="book-publisher">${book.publisher}</span>
        <span class="book-price">${fmt(book.price)}</span>
      </div>
      <p class="book-state-text">Estado: ${book.stateLabel}</p>
      <button class="btn btn-ghost book-add" data-index="${i}">+ Reservar</button>
    </div>
  `;
  grid.appendChild(card);
});

/* =========================
   Carrito
   ========================= */
const cart = [];
const cartPanel = document.getElementById("cart-panel");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalAmount = document.getElementById("cart-total-amount");
const btnWA = document.getElementById("cart-send-wa");
const btnMail = document.getElementById("cart-send-mail");
const btnPayMP = document.getElementById("cart-pay-mp");

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  cartBackdrop.classList.add("open");
}
function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartBackdrop.classList.remove("open");
}

document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

function cartTotal() {
  return cart.reduce((sum, it) => sum + it.price, 0);
}

function renderCart() {
  cartCount.textContent = cart.length;
  cartCount.dataset.count = cart.length;
  const total = cartTotal();
  cartTotalAmount.textContent = fmt(total);

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Tu selección está vacía.<br/>Reservá los libros que te interesen.</p>`;
    btnWA.disabled = true;
    btnMail.disabled = true;
    btnPayMP.disabled = true;
    return;
  }
  btnWA.disabled = false;
  btnMail.disabled = false;
  btnPayMP.disabled = false;

  cartItems.innerHTML = cart.map((it, idx) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <p class="cart-item-title">${it.title}</p>
        <p class="cart-item-sub">${it.author} · ${it.publisher}<br/>${it.stateLabel}</p>
      </div>
      <span class="cart-item-price">${fmt(it.price)}</span>
      <button class="cart-item-remove" data-idx="${idx}" aria-label="Quitar">×</button>
    </div>
  `).join("");

  cartItems.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      cart.splice(+btn.dataset.idx, 1);
      renderCart();
    });
  });
}

function addToCart(item) {
  // Evitar duplicados (cada ejemplar es único)
  if (cart.some(c => c.title === item.title && c.author === item.author)) {
    openCart();
    return;
  }
  cart.push(item);
  renderCart();
  openCart();
}

grid.addEventListener("click", e => {
  const btn = e.target.closest(".book-add");
  if (!btn) return;
  const book = BOOKS[+btn.dataset.index];
  addToCart({ ...book });
});

document.getElementById("cart-clear").addEventListener("click", () => {
  cart.length = 0;
  renderCart();
});

/* =========================
   Envío WhatsApp / Email
   ========================= */
function buildCartText() {
  const lines = cart.map(it =>
    `• ${it.title} — ${it.author} (${it.publisher}) — ${fmt(it.price)} [${it.stateLabel}]`
  );
  return lines.join("\n");
}

btnWA.addEventListener("click", () => {
  const msg = `Hola Cruda Librera! Quisiera reservar:\n\n${buildCartText()}\n\nTotal: ${fmt(cartTotal())}\n\n¿Siguen disponibles?`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
});

btnMail.addEventListener("click", () => {
  const body = `Hola Cruda Librera,\n\nQuisiera reservar:\n\n${buildCartText()}\n\nTotal: ${fmt(cartTotal())}\n\n¿Siguen disponibles?\n\nGracias!`;
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Reserva de libros")}&body=${encodeURIComponent(body)}`;
});

/* =========================
   Mercado Pago (modal)
   ========================= */
const mpModal = document.getElementById("mp-modal");
const mpSummary = document.getElementById("mp-summary");
const mpTotalAmount = document.getElementById("mp-total-amount");
const mpConfirmBtn = document.getElementById("mp-confirm-btn");

function openMPModal() {
  if (cart.length === 0) return;

  mpSummary.innerHTML = cart.map(it => `
    <div class="mp-summary-item">
      <span class="mp-summary-item-name">${it.title}<br/><small style="color:var(--text-soft);font-weight:400;">${it.stateLabel}</small></span>
      <span class="mp-summary-item-price">${fmt(it.price)}</span>
    </div>
  `).join("");

  mpTotalAmount.textContent = fmt(cartTotal());

  if (CONFIG.mpPaymentLink) {
    mpConfirmBtn.href = CONFIG.mpPaymentLink;
    mpConfirmBtn.textContent = "Ir a Mercado Pago";
    mpConfirmBtn.onclick = null;
  } else {
    mpConfirmBtn.href = "#";
    mpConfirmBtn.textContent = "Configurar link de pago";
    mpConfirmBtn.onclick = (e) => {
      e.preventDefault();
      alert("Para activar los pagos:\n\n1) Entrá a tu panel de Mercado Pago\n2) Generá un 'Link de pago' por el total\n3) Pegalo en CONFIG.mpPaymentLink dentro de script.js\n\nMientras tanto, podés reservar por WhatsApp o email.");
    };
  }

  mpModal.classList.add("open");
  mpModal.setAttribute("aria-hidden", "false");
}

function closeMPModal() {
  mpModal.classList.remove("open");
  mpModal.setAttribute("aria-hidden", "true");
}

btnPayMP.addEventListener("click", openMPModal);
document.getElementById("mp-modal-close").addEventListener("click", closeMPModal);
document.querySelector(".mp-modal-backdrop").addEventListener("click", closeMPModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeMPModal();
    closeCart();
  }
});

/* =========================
   Calculadora — vender tus libros
   ========================= */
const calcOriginal = document.getElementById("calc-original");
const calcState = document.getElementById("calc-state");
const calcPrice = document.getElementById("calc-price");

function updateCalc() {
  const original = parseFloat(calcOriginal.value) || 0;
  const factor = parseFloat(calcState.value);
  const offer = Math.round(original * factor);
  calcPrice.textContent = offer > 0 ? fmt(offer) : "$—";
}
calcOriginal.addEventListener("input", updateCalc);
calcState.addEventListener("change", updateCalc);
updateCalc();

document.getElementById("calc-contact").addEventListener("click", () => {
  const original = parseFloat(calcOriginal.value) || 0;
  const stateLabel = calcState.options[calcState.selectedIndex].textContent;
  const offer = Math.round(original * parseFloat(calcState.value));

  const msg = original > 0
    ? `Hola Cruda Librera! Quisiera vender libros. Tengo un libro con precio de tapa ${fmt(original)}, en estado "${stateLabel}". Según la calculadora, me ofrecerían ${fmt(offer)}. ¿Cómo seguimos?`
    : `Hola Cruda Librera! Quisiera vender algunos libros. ¿Cómo hacemos para tasarlos?`;

  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
});

/* =========================
   Formulario de contacto
   ========================= */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.className = "form-status";
  formStatus.textContent = "";

  const data = Object.fromEntries(new FormData(contactForm).entries());
  if (!data.name || !data.email || !data.subject || !data.message) {
    formStatus.classList.add("error");
    formStatus.textContent = "Por favor completá todos los campos.";
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!emailOk) {
    formStatus.classList.add("error");
    formStatus.textContent = "El email no parece válido.";
    return;
  }

  if (CONFIG.formEndpoint) {
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        formStatus.classList.add("success");
        formStatus.textContent = "¡Gracias! Tu mensaje fue enviado. Te respondemos pronto.";
        contactForm.reset();
        return;
      }
      throw new Error("Error de red");
    } catch (err) {
      formStatus.classList.add("error");
      formStatus.textContent = "Hubo un problema al enviar. Intentá de nuevo o escribinos por WhatsApp.";
      return;
    }
  }

  const body = `Nombre: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
  formStatus.classList.add("success");
  formStatus.textContent = "Se abrió tu cliente de correo. Si no se abrió, escribinos a " + CONFIG.email;
  contactForm.reset();
});

/* =========================
   Modo oscuro
   ========================= */
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("cl-theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  if (next === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  localStorage.setItem("cl-theme", next);
});

/* =========================
   Init
   ========================= */
document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
