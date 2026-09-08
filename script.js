/* =========================
   CONFIGURACIÓN — EDITAR ACÁ
   ========================= */
const CONFIG = {
  whatsapp: "5491100000000",            // ← tu número con código de país
  email: "hola@crudalibrera.com",       // ← tu email
  // Mercado Pago: pegá acá el link de pago que generes desde tu panel de MP.
  // Si está vacío, el botón muestra un aviso.
  mpPaymentLink: "",                    // ej: "https://mpago.la/2AbCdEf"
  // Para envío del formulario con backend real (Formspree/Web3Forms):
  formEndpoint: "",                     // ej: "https://formspree.io/f/xxxxxx"
};

/* =========================
   Datos
   ========================= */
const BOOKS = [
  { title: "La música del universo", author: "AA.VV.", publisher: "Siglo XXI Editores", price: 24800 },
  { title: "Pasiones terrenas", author: "Maximiliano Crespi", publisher: "Taurus", price: 34999 },
  { title: "El negro corazón del crimen", author: "Marcelo Figueras", publisher: "Alfaguara", price: 48999 },
  { title: "Una vida más verdadera", author: "Inés Garland", publisher: "Alfaguara", price: 34999 },
  { title: "Las teorías salvajes", author: "Pola Oloixarac", publisher: "Literatura Random House", price: 57000 },
  { title: "Amores mutantes", author: "Leticia Frenkel", publisher: "notanpüan", price: 24500 },
  { title: "Prohibido morir aquí", author: "Elizabeth Taylor", publisher: "La bestia equilatera", price: 31000 },
  { title: "Las chicas no lloran", author: "Olivia Gallo", publisher: "Tenemos las máquinas", price: 25600 },
  { title: "El forastero misterioso", author: "Mark Twain", publisher: "Tusquets", price: 25000 },
  { title: "Perdidas en la noche", author: "Fabián Martínez Siccardi", publisher: "Tusquets", price: 19000 },
  { title: "Un reino demasiado breve", author: "Mauro Libertella", publisher: "Literatura Random House", price: 36499 },
  { title: "La lengua alemana", author: "Julieta Mortati", publisher: "emecé notanpüan", price: 39900 },
  { title: "Variaciones enigma", author: "Andrés Aciman", publisher: "Alfaguara", price: 41599 },
  { title: "Sobre los artistas Vol. 1", author: "John Berger", publisher: "GG", price: 62900 },
  { title: "Sobre los artistas Vol. 2", author: "John Berger", publisher: "GG", price: 62900 },
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
      <button class="btn btn-ghost book-add" data-index="${i}">+ Consulta</button>
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
    cartItems.innerHTML = `<p class="cart-empty">Tu consulta está vacía.<br/>Agregá libros para armar tu pedido.</p>`;
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
        <p class="cart-item-sub">${it.author} · ${it.publisher}${it.state ? " · " + it.state : ""}</p>
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
  cart.push(item);
  renderCart();
  openCart();
}

grid.addEventListener("click", e => {
  const btn = e.target.closest(".book-add");
  if (!btn) return;
  const book = BOOKS[+btn.dataset.index];
  addToCart({ ...book, type: "nuevo" });
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
    `• ${it.title} — ${it.author} (${it.publisher}) — ${fmt(it.price)}${it.state ? " [" + it.state + "]" : ""}`
  );
  return lines.join("\n");
}

btnWA.addEventListener("click", () => {
  const msg = `Hola Cruda Librera! Quería consultar por:\n\n${buildCartText()}\n\nTotal: ${fmt(cartTotal())}\n\n¿Están disponibles?`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
});

btnMail.addEventListener("click", () => {
  const body = `Hola Cruda Librera,\n\nQuería consultar por:\n\n${buildCartText()}\n\nTotal: ${fmt(cartTotal())}\n\n¿Están disponibles?\n\nGracias!`;
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Consulta de libros")}&body=${encodeURIComponent(body)}`;
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
      <span class="mp-summary-item-name">${it.title}</span>
      <span class="mp-summary-item-price">${fmt(it.price)}</span>
    </div>
  `).join("");

  mpTotalAmount.textContent = fmt(cartTotal());

  // Si hay link de pago configurado, lo usamos. Si no, mostramos aviso.
  if (CONFIG.mpPaymentLink) {
    mpConfirmBtn.href = CONFIG.mpPaymentLink;
    mpConfirmBtn.textContent = "Ir a Mercado Pago";
    mpConfirmBtn.onclick = null;
  } else {
    mpConfirmBtn.href = "#";
    mpConfirmBtn.textContent = "Configurar link de pago";
    mpConfirmBtn.onclick = (e) => {
      e.preventDefault();
      alert("Para activar los pagos:\n\n1) Entrá a tu panel de Mercado Pago\n2) Generá un 'Link de pago' por el total\n3) Pegalo en CONFIG.mpPaymentLink dentro de script.js\n\nMientras tanto, podés consultar por WhatsApp o email.");
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
   Calculadora usados
   ========================= */
const calcBook = document.getElementById("calc-book");
const calcState = document.getElementById("calc-state");
const calcPrice = document.getElementById("calc-price");

BOOKS.forEach((b, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `${b.title} — ${b.author} (${fmt(b.price)})`;
  calcBook.appendChild(opt);
});

function updateCalc() {
  const book = BOOKS[+calcBook.value];
  const factor = parseFloat(calcState.value);
  calcPrice.textContent = fmt(Math.round(book.price * factor));
}
calcBook.addEventListener("change", updateCalc);
calcState.addEventListener("change", updateCalc);
updateCalc();

document.getElementById("calc-add").addEventListener("click", () => {
  const book = BOOKS[+calcBook.value];
  const factor = parseFloat(calcState.value);
  const stateLabel = calcState.options[calcState.selectedIndex].textContent;
  addToCart({
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    price: Math.round(book.price * factor),
    type: "usado",
    state: stateLabel,
  });
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

  // Validación básica
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

  // Si hay endpoint configurado (Formspree/Web3Forms), lo usamos
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

  // Fallback: mailto
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
