# S08 · Estado Global y Enrutado

Ejercicios para `repos/04-react-avanzado` (Context/Zustand). Soluciones en `soluciones/s08/`.

## 1. Zustand con TypeScript
Crea una store Zustand para un carrito: `items: ProductoCarrito[]`, `anadir(producto)`, `quitar(id)`, `total()` (calculado con `reduce`). Usa `ProductoCarrito` como en la sesión 5.

```ts
import { create } from "zustand";

export interface ProductoCarrito { id: number; nombre: string; precio: number; cantidad: number; }

interface EstadoCarrito {
  items: ProductoCarrito[];
  anadir: (p: ProductoCarrito) => void;   // TODO
  quitar: (id: number) => void;            // TODO
}
export const useCarrito = create<EstadoCarrito>(() => ({
  items: [],
  anadir: () => {},
  quitar: () => {},
}));
```

## 2. Persistencia con localStorage
Configura la store para **persistir** en `localStorage` (clave `"carrito"` o `partialize`+`persist` de zustand/middleware) y recupérala al arrancar. Indica qué clonación usas para evitar aliasing (`structuredClone`).

## 3. React Router v6
Crea la estructura de rutas `/`, `/carrito` y `/pedido` con `createBrowserRouter` + `RouterProvider`. Añade un `NavLink` con clase `activa` cuando la ruta coincide.

## 4. Context API
Escribe una alternativa con Context (`ContextoCarrito.Provider` + hook `useCarritoContext()`) y menciona la diferencia clave con Zustand (re-render de consumidores vs suscripción selectiva).