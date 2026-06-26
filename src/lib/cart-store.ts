import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name:      string;
  slug:      string;
  price:     number;
  image:     string | null;
  quantity:  number;
  heatLevel: 'none' | 'country' | 'screamer';
}

interface CartStore {
  items: CartItem[];
  addItem:       (item: Omit<CartItem, 'quantity'>) => void;
  removeItem:    (productId: string, heatLevel: string) => void;
  updateQuantity:(productId: string, heatLevel: string, qty: number) => void;
  clearCart:     () => void;
  getSubtotal:   () => number;
  getCount:      () => number;
}

const key = (productId: string, heatLevel: string) => `${productId}::${heatLevel}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((s) => {
        const k    = key(item.productId, item.heatLevel);
        const existing = s.items.find(i => key(i.productId, i.heatLevel) === k);
        if (existing) {
          return {
            items: s.items.map(i =>
              key(i.productId, i.heatLevel) === k
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          };
        }
        return { items: [...s.items, { ...item, quantity: 1 }] };
      }),

      removeItem: (productId, heatLevel) => set(s => ({
        items: s.items.filter(i => key(i.productId, i.heatLevel) !== key(productId, heatLevel)),
      })),

      updateQuantity: (productId, heatLevel, qty) => set(s => ({
        items: qty <= 0
          ? s.items.filter(i => key(i.productId, i.heatLevel) !== key(productId, heatLevel))
          : s.items.map(i =>
              key(i.productId, i.heatLevel) === key(productId, heatLevel) ? { ...i, quantity: qty } : i,
            ),
      })),

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'seven-sides-cart' },
  ),
);