import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CATALOG, COURIER_FEE, type CatalogProduct } from "@/lib/catalog";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: CatalogProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  subtotal: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.productId === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { productId: product.id, title: product.title, price: product.price, quantity },
            ],
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set({ items: get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)) });
      },

      removeItem: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),

      clearCart: () => set({ items: [] }),

      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      total: () => {
        const sub = get().subtotal();
        return sub === 0 ? 0 : sub + COURIER_FEE;
      },
    }),
    {
      name: "loudmouf-allocation",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

export function productImage(productId: string) {
  return CATALOG.find((p) => p.id === productId)?.images[0];
}
