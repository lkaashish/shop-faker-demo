const API_BASE = 'https://fakestoreapi.com';

export const api = {
  async getProducts() {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: number) {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async getCategories() {
    const response = await fetch(`${API_BASE}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getProductsByCategory(category: string) {
    const response = await fetch(`${API_BASE}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch category products');
    return response.json();
  },
};
