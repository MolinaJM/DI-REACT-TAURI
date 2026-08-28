# S10 · Estilización con Tailwind CSS

Ejercicios sobre el proyecto con Tailwind. Soluciones en `soluciones/s10/`.

## 1. Clases condicionales
Escribe una función `cx(...clases)` (como `clsx`) que una clases y filtre los falsos. Úsala para un `Boton` que aplique `"bg-blue-600 text-white"` o `"bg-gray-200"` según la prop `variante`.

```ts
// TODO: export function cx(...clases: Array<string | false | null | undefined>): string
```

## 2. Responsive
Crea una tarjeta que, en móvil, muestre un único centrado y en `md:` dos columnas (grid) con `grid-cols-1 md:grid-cols-2 gap-4`.

## 3. Transiciones y estados
Añade a un botón: `transition-colors duration-200`, `hover:bg-blue-700`, `disabled:opacity-50 disabled:cursor-not-allowed`.

## 4. Layout completo
Escribe el JSX de una página de producto con: header (`flex justify-between`), main (`max-w-6xl mx-auto px-4`), y tablas listas usando clases utilitarias `table-auto w-full border-collapse`.