import { cart, removeFromCart, calculateTotal } from './cart.js';

export function updateCartUI() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '<h2>Shopping Cart</h2>';

  if (cart.length === 0) {
    cartContainer.innerHTML += '<p>Your cart is empty.</p>';
    return;
  }

  const list = document.createElement('ul');
  cart.forEach((book, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      ${book.title} - ₹${book.price}
      <button class="remove-from-cart-btn" data-index="${index}">Remove</button>
    `;
    list.appendChild(item);
  });

  cartContainer.appendChild(list);

  const total = document.createElement('p');
  total.innerHTML = `<strong>Total:</strong> ₹${calculateTotal()}`;
  cartContainer.appendChild(total);

  const checkout = document.createElement('button');
  checkout.textContent = 'Proceed to Checkout';
  cartContainer.appendChild(checkout);

  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
      updateCartUI();
    }
  });
}