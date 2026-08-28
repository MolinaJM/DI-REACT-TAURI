# S09 · CRUD tipado con Fetch

Ejercicios para la app CRUD con API. Soluciones en `soluciones/s09/`.

## 1. Modelo y validación
Define `interface Producto { id: number; nombre: string; precio: number; stock: number }` y una función `validarProducto(datos: Omit<Producto, "id">): Record<string, string>` que valide nombre no vacío, precio ≥ 0 y stock ≥ 0.

```ts
export interface Producto { id: number; nombre: string; precio: number; stock: number; }

export function validarProducto(datos: Omit<Producto, "id">): Record<string, string> {
  return {}; // TODO
}
```

## 2. Servicio genérico
Escribe una clase `ServicioCrud<T>` con constructor `(baseUrl: string)` y métodos tipados:

- `listar(): Promise<T[]>`
- `obtener(id: number): Promise<T>`
- `crear(datos: Omit<T, "id">): Promise<T>`
- `actualizar(id: number, datos: Partial<T>): Promise<T>`
- `borrar(id: number): Promise<void>`

Todos con `fetch`, `Content-Type: application/json` cuando envían cuerpo, y `throw`/control de `response.ok`.

## 3. Componente CRUD completo
Escribe el esqueleto de `ListaProductos` que use el servicio, muestre la lista con un botón borrar por fila, y un formulario para crear. Indica qué estados con `useState` necesitas (productos, cargando, error, formulario).