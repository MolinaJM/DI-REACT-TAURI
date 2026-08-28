# S09 · Soluciones

## 1. Modelo y validación

```ts
export interface Producto { id: number; nombre: string; precio: number; stock: number; }

export function validarProducto(datos: Omit<Producto, "id">): Record<string, string> {
  const errores: Record<string, string> = {};
  if (datos.nombre.trim() === "") errores.nombre = "El nombre es obligatorio";
  if (datos.precio < 0) errores.precio = "El precio no puede ser negativo";
  if (datos.stock < 0) errores.stock = "El stock no puede ser negativo";
  return errores;
}
```

## 2. Servicio genérico

```ts
export class ServicioCrud<T extends { id: number }> {
  constructor(private baseUrl: string) {}

  async listar(): Promise<T[]> {
    const r = await fetch(this.baseUrl);
    if (!r.ok) throw new Error(`GET ${this.baseUrl} → ${r.status}`);
    return r.json();
  }

  async obtener(id: number): Promise<T> {
    const r = await fetch(`${this.baseUrl}/${id}`);
    if (!r.ok) throw new Error(`GET ${id} → ${r.status}`);
    return r.json();
  }

  async crear(datos: Omit<T, "id">): Promise<T> {
    const r = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!r.ok) throw new Error(`POST → ${r.status}`);
    return r.json();
  }

  async actualizar(id: number, datos: Partial<T>): Promise<T> {
    const r = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!r.ok) throw new Error(`PUT ${id} → ${r.status}`);
    return r.json();
  }

  async borrar(id: number): Promise<void> {
    const r = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
    if (!r.ok) throw new Error(`DELETE ${id} → ${r.status}`);
  }
}
```

## 3. Componente

Necesitas, como mínimo, estos estados:

```tsx
const [productos, setProductos] = useState<Producto[]>([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState<string | null>(null);
const [datosForm, setDatosForm] = useState<Omit<Producto, "id">>({ nombre: "", precio: 0, stock: 0 });
const [erroresForm, setErroresForm] = useState<Record<string, string>>({});
```

Flujo: `useEffect` carga `listar()`; crear valida con `validarProducto` y si no hay errores llama a `crear()` y refresca la lista; borrar llama a `borrar(id)` y actualiza el estado local (`filter`).