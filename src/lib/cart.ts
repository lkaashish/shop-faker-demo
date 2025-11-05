import { CartItem, Product } from '@/types/product';

const CART_STORAGE_KEY = 'shopping-cart';

export const cartService = {
  getCart(): CartItem[] {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  },

  addToCart(product: Product, quantity: number = 1): CartItem[] {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    this.saveCart(cart);
    return cart;
  },

  updateQuantity(productId: number, quantity: number): CartItem[] {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      }
      item.quantity = quantity;
    }

    this.saveCart(cart);
    return cart;
  },

  removeFromCart(productId: number): CartItem[] {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(cart);
    return cart;
  },

  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
  },

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartItemsCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
};
