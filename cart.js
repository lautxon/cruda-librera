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

function renderBookCard(book, i) {
  return `
    <article class="book-card">
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
    </article>
  `;
}

// Carrito
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
  if (!cartPanel) return;
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  cartBackdrop.classList.add("open");
}
function closeCart() {
  if (!cartPanel) return;
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartBackdrop.classList.remove("open");
}

const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
if (cartToggle) cartToggle.addEventListener("click", openCart);
if (cartClose) cartClose.addEventListener("click", closeCart);
if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

function cartTotal() {
  return cart.reduce((sum, it) => sum + it.price, 0);
}

function renderCart() {
  if (!cartItems) return;
  cartCount.textContent = cart.length;
  cartCount.dataset.count = cart.length;
  cartTotalAmount.textContent = fmt(cartTotal());

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
  if (cart.some(c => c.title === item.title && c.author === item.author)) {
    openCart();
    return;
  }
  cart.push(item);
  renderCart();
  openCart();
}

function bindBookGrid(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.addEventListener("click", e => {
    const btn = e.target.closest(".book-add");
    if (!btn) return;
    addToCart({ ...BOOKS[+btn.dataset.index] });
  });
}

function buildCartText() {
  return cart.map(it =>
    `• ${it.title} — ${it.author} (${it.publisher}) — ${fmt(it.price)} [${it.stateLabel}]`
  ).join("\n");
}

if (btnWA) {
  btnWA.addEventListener("click", () => {
    const msg = `Hola Cruda Librera! Quisiera reservar:\n\n${buildCartText()}\n\nTotal: ${fmt(cartTotal())}\n\n¿Siguen disponibles?`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  });
}
if (btnMail) {
  btnMail.addEventListener("click", () => {
    const body = `Hola Cruda Librera,\n\nQuisiera reservar:\n\n${buildCartText()}\n\nTotal: ${fmt(cartTotal())}\n\n¿Siguen disponibles?\n\nGracias!`;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Reserva de libros")}&body=${encodeURIComponent(body)}`;
  });
}

// Mercado Pago modal
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
      alert("Para activar los pagos:\n\n1) Entrá a tu panel de Mercado Pago\n2) Generá un 'Link de pago' por el total\n3) Pegalo en CONFIG.mpPaymentLink dentro de data.js\n\nMientras tanto, podés reservar por WhatsApp o email.");
    };
  }
  mpModal.classList.add("open");
  mpModal.setAttribute("aria-hidden", "false");
}

function closeMPModal() {
  mpModal.classList.remove("open");
  mpModal.setAttribute("aria-hidden", "true");
}

if (btnPayMP) btnPayMP.addEventListener("click", openMPModal);
const mpClose = document.getElementById("mp-modal-close");
if (mpClose) mpClose.addEventListener("click", closeMPModal);
const mpBackdrop = document.querySelector(".mp-modal-backdrop");
if (mpBackdrop) mpBackdrop.addEventListener("click", closeMPModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeMPModal(); closeCart(); }
});
