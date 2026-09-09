const buscadosList = document.getElementById("buscados-list");
const buscadoForm = document.getElementById("buscado-form");

function getAllBuscados() {
  const stored = JSON.parse(localStorage.getItem("cl-buscados") || "[]");
  return [...BUSCADOS_INICIALES, ...stored];
}

function renderBuscados() {
  if (!buscadosList) return;
  const items = getAllBuscados();
  if (items.length === 0) {
    buscadosList.innerHTML = `<p style="color:var(--text-soft);font-style:italic;">Todavía no hay búsquedas publicadas.</p>`;
    return;
  }
  buscadosList.innerHTML = items.map(b => `
    <div class="buscado-card">
      <p class="buscado-book">${b.book}</p>
      ${b.comment ? `<p class="buscado-comment">"${b.comment}"</p>` : ""}
      <div class="buscado-meta">
        <span class="buscado-name">Busca: ${b.name} · ${b.date}</span>
        <a href="mailto:${b.email}?subject=${encodeURIComponent("Tengo el libro que buscás en Cruda Librera")}" class="buscado-contact">Contactar</a>
      </div>
    </div>
  `).join("");
}

if (buscadoForm) {
  buscadoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(buscadoForm).entries());
    if (!data.name || !data.email || !data.book) {
      alert("Completá nombre, email y libro que buscás.");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("cl-buscados") || "[]");
    const today = new Date();
    const dateStr = today.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
    stored.push({
      name: data.name,
      email: data.email,
      book: data.book,
      comment: data.comment || "",
      date: dateStr,
    });
    localStorage.setItem("cl-buscados", JSON.stringify(stored));
    buscadoForm.reset();
    renderBuscados();
    alert("¡Búsqueda publicada! Los lectores que tengan el libro podrán contactarte.");
  });
}

renderBuscados();
