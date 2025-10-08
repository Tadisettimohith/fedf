export let cart = [];

export function addToCart(book) {
  cart.push(book);
}

export function removeFromCart(index) {
  cart.splice(index, 1);
}

export function calculateTotal() {
  return cart.reduce((total, book) => total + book.price, 0);
}