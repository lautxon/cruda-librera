const booksGrid = document.getElementById("books-grid");
if (booksGrid) {
  booksGrid.innerHTML = BOOKS.map((b, i) => renderBookCard(b, i)).join("");
  bindBookGrid("books-grid");
}
renderCart();
