// Featured: primeros 6 libros
const featuredGrid = document.getElementById("featured-grid");
if (featuredGrid) {
  featuredGrid.innerHTML = BOOKS.slice(0, 6).map((b, i) => renderBookCard(b, i)).join("");
  bindBookGrid("featured-grid");
}
renderCart();
