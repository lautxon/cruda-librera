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

// Color determinístico a partir de un string (para las tapas)
function hashColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  const hue = Math.abs(h) % 360;
  const sat = 45 + (Math.abs(h >> 3) % 25);  // 45-70
  const lig = 32 + (Math.abs(h >> 5) % 18);  // 32-50
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
const btnWA = document.getElementById("cart-send-wa");
const btnMail = document.getElementById("cart-send-mail");

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

function renderCart() {
  cartCount.textContent = cart.length;
  cartCount.dataset.count = cart.length;
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Tu consulta está vacía.<br/>Agregá libros para armar tu pedido.</p>`;
    btnWA.disabled = true; btnMail.disabled = true;
    return;
  }
  btnWA.disabled = false; btnMail.disabled = false;
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

// Botones "Consulta" en cada libro
grid.addEventListener("click", e => {
  const btn = e.target.closest(".book-add");
  if (!btn) return;
  const book = BOOKS[+btn.dataset.index];
  addToCart({ ...book, type: "nuevo" });
});

// Vaciar
document.getElementById("cart-clear").addEventListener("click", () => {
  cart.length = 0;
  renderCart();
});

// Enviar WhatsApp
btnWA.addEventListener("click", () => {
  const phone = "5491100000000"; // ← reemplazar por el número real
  const lines = cart.map(it => `• ${it.title} — ${it.author} (${it.publisher}) — ${fmt(it.price)}${it.state ? " [" + it.state + "]" : ""}`);
  const msg = `Hola Cruda Librera! Quería consultar por:\n\n${lines.join("\n")}\n\n¿Están disponibles?`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
});

// Enviar mail
btnMail.addEventListener("click", () => {
  const lines = cart.map(it => `• ${it.title} — ${it.author} (${it.publisher}) — ${fmt(it.price)}${it.state ? " [" + it.state + "]" : ""}`);
  const body = `Hola Cruda Librera,\n\nQuería consultar por:\n\n${lines.join("\n")}\n\n¿Están disponibles?\n\nGracias!`;
  window.location.href = `mailto:hola@crudalibrera.com?subject=${encodeURIComponent("Consulta de libros")}&body=${encodeURIComponent(body)}`;
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
  const used = Math.round(book.price * factor);
  calcPrice.textContent = fmt(used);
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
   Año footer
   ========================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   Init
   ========================= */
renderCart();