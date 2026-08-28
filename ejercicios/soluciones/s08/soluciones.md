# S08 · Soluciones

## 1. Zustand

```ts
import { create } from "zustand";

export interface ProductoCarrito { id: number; nombre: string; precio: number; cantidad: number; }

interface EstadoCarrito {
  items: ProductoCarrito[];
  anadir: (p: ProductoCarrito) => void;
  quitar: (id: number) => void;
}

export const useCarrito = create<EstadoCarrito>((set) => ({
  items: [],
  anadir: (p) =>
    set((estado) => {
      const existe = estado.items.some((i) => i.id === p.id);
      if (existe) return { items: estado.items.map((i) => (i.id === p.id ? { ...i, cantidad: i.cantidad + p.cantidad } : i)) };
      return { items: [...estado.items, p] };
    }),
  quitar: (id) => set((estado) => ({ items: estado.items.filter((i) => i.id !== id) })),
}));
```

## 2. Persistencia

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCarrito = create<EstadoCarrito>()(
  persist(
    (set) => ({ /* igual que antes */ }),
    { name: "carrito" } // serializa a localStorage automáticamente
  )
);
```

Al recargar, zustand hidrata el estado desde `localStorage`. Para evitar compartir referencias en operaciones de copia se usa `structuredClone` al leer: `JSON.parse`/`structuredClone` según el caso.

## 3. React Router v6

```tsx
import { createBrowserRouter, RouterProvider, NavLink } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/carrito", element: <Carrito /> },
  { path: "/pedido", element: <Pedido /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}

export function Navegacion() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "activa" : "")}>Inicio</NavLink>
      <NavLink to="/carrito" className={({ isActive }) => (isActive ? "activa" : "")}>Carrito</NavLink>
      <NavLink to="/pedido" className={({ isActive }) => (isActive ? "activa" : "")}>Pedido</NavLink>
    </nav>
  );
}
```

## 4. Context API

```tsx
import { createContext, useContext } from "react";

const ContextoCarrito = createContext<{ items: ProductoCarrito[]; quitar: (id: number) => void } | null>(null);

export function ProveedorCarrito({ children }: { children: React.ReactNode }) {
  // ... estado con useState/useReducer y funciones
  return <ContextoCarrito.Provider value={/* objeto */}>{children}</ContextoCarrito.Provider>;
}

export function useCarritoContext() {
  const ctx = useContext(ContextoCarrito);
  if (!ctx) throw new Error("useCarritoContext debe usarse dentro de ProveedorCarrito");
  return ctx;
}
```

Diferencia clave: con **Context**, todos los consumidores se re-renderizan cuando cambia el valor del provider; con **Zustand**, cada componente se suscribe selectivamente (via `useCarrito((s) => s.items)`) y solo re-renderiza si su selección cambió.