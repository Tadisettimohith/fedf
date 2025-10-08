import { displayBooks } from './bookList.js';
import { updateCartUI } from './ui.js';

window.addEventListener('DOMContentLoaded', () => {
  displayBooks();
  updateCartUI();
});
console.log('Modules are working!');