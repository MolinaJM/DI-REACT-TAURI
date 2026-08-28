// store/carritoStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ItemCarrito {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

interface CarritoStore {
    items: ItemCarrito[];
    agregarItem: (item: Omit<ItemCarrito, "cantidad">) => void;
    eliminarItem: (id: number) => void;
    vaciarCarrito: () => void;
    total: () => number;
}

export const useCarritoStore = create<CarritoStore>()(
    persist(
        (set, get) => ({
            items: [],
            agregarItem: (item) => {
                const existente = get().items.find(i => i.id === item.id);
                if (existente) {
                    set({ items: get().items.map(i =>
                        i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
                    )});
                } else {
                    set({ items: [...get().items, { ...item, cantidad: 1 }] });
                }
            },
            eliminarItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
            vaciarCarrito: () => set({ items: [] }),
            total: () => get().items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
        }),
        { name: "carrito-storage" }
    )
);
