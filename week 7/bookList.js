import { books } from './book.js';
import { addToCart } from './cart.js';
import { updateCartUI } from './ui.js';

export function displayBooks() {
  const bookContainer = document.getElementById('book-list');
  bookContainer.innerHTML = '';

  books.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Price:</strong> ₹${book.price}</p>
      <p><strong>Status:</strong> ${book.availability}</p>
      <button class="add-to-cart-btn" ${book.availability === 'out of stock' ? 'disabled' : ''} data-index="${index}">
        Add to Cart
      </button>
    `;

    bookContainer.appendChild(bookCard);
  });

  bookContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const index = e.target.getAttribute('data-index');
      addToCart(books[index]);
      updateCartUI();
    }
  });
}