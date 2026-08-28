# S10 · Soluciones

## 1. cx()

```ts
export function cx(...clases: Array<string | false | null | undefined>): string {
  return clases.filter(Boolean).join(" ");
}

export function Boton({ variante = "primaria", ...rest }: { variante?: "primaria" | "secundaria" } & Record<string, unknown>) {
  const clases =
    variante === "primaria"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300";
  return <button className={cx("px-4 py-2 rounded", clases)} {...rest} />;
}
```

## 2. Responsive

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div className="mx-auto max-w-sm rounded-lg border p-4">Tarjeta 1</div>
  <div className="mx-auto max-w-sm rounded-lg border p-4">Tarjeta 2</div>
</div>
```

## 3. Transiciones y estados

```tsx
<button className="transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
  Acción
</button>
```

## 4. Layout completo

```tsx
<>
  <header className="flex items-center justify-between px-4 py-3">
    <h1 className="text-xl font-bold">Tienda</h1>
    <nav className="flex gap-4">…</nav>
  </header>
  <main className="mx-auto max-w-6xl px-4">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="border-b text-left text-sm uppercase">
          <th>Producto</th><th>Precio</th>
        </tr>
      </thead>
      <tbody>{/* filas con border-b */}</tbody>
    </table>
  </main>
</>
```