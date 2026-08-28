# Sesión 6: Creación de Componentes Personalizados

Componentes reutilizables, props, composicion y slots

[← Volver al Índice](index.md)

---

> 📚 **Conceptos y apuntes de la sesión:** [A14 · Componentes, JSX y props](conceptos/s06/14_React_Componentes_JSX_Props.md). Código ejecutable: [`repos/02-react-componentes`](../repos/02-react-componentes/).

## Componente Boton Personalizado

> 📦 **Este código está en el repositorio:** `repos/02-react-componentes/src/components/Boton.tsx` (idéntico; el fichero real añade `export default Boton`)

```tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variante = "primary" | "secondary" | "danger" | "ghost";
type Tamano = "sm" | "md" | "lg";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variante?: Variante;
    tamano?: Tamano;
    icono?: ReactNode;
    cargando?: boolean;
}

const VARIANTES: Record<Variante, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
};

const TAMANOS: Record<Tamano, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

function Boton({ children, variante = "primary", tamano = "md",
    icono, cargando, disabled, className = "", ...props }: BotonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors
                ${VARIANTES[variante]} ${TAMANOS[tamano]}
                ${(disabled || cargando) ? "opacity-50 cursor-not-allowed" : ""}
                ${className}`}
            disabled={disabled || cargando} {...props}>
            {cargando ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : icono}
            {children}
        </button>
    );
}
```

## Componente Modal

> 📦 **Este código está en el repositorio:** `repos/02-react-componentes/src/components/Modal.tsx` (idéntico; el fichero real añade `export default Modal`)

```tsx
import { ReactNode, useEffect } from 'react';

interface ModalProps {
    abierto: boolean;
    onCerrar: () => void;
    titulo: string;
    children: ReactNode;
    tamano?: "sm" | "md" | "lg";
}

function Modal({ abierto, onCerrar, titulo, children, tamano = "md" }: ModalProps) {
    useEffect(() => {
        if (abierto) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [abierto]);

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onCerrar}></div>
            <div className={`relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{titulo}</h2>
                    <button onClick={onCerrar}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
                </div>
                {children}
            </div>
        </div>
    );
}
```

## Componente Tabla Genérica

> 📦 **Este código está en el repositorio:** `repos/02-react-componentes/src/components/TablaGenerica.tsx` (idéntico; el fichero real añade `export default Tabla`)

```tsx
import { ReactNode } from 'react';

interface Columna<T> {
    key: keyof T | string;
    titulo: string;
    render?: (item: T) => ReactNode;
}

interface TablaProps<T> {
    datos: T[];
    columnas: Columna<T>[];
    keyExtractor: (item: T) => string | number;
}

function Tabla<T extends Record<string, any>>({
    datos, columnas, keyExtractor }: TablaProps<T>) {
    if (datos.length === 0) {
        return <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>;
    }

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    {columnas.map(col => (
                        <th key={String(col.key)}
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                            {col.titulo}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {datos.map(item => (
                    <tr key={keyExtractor(item)} className="border-t hover:bg-gray-50 transition">
                        {columnas.map(col => (
                            <td key={String(col.key)} className="px-4 py-3 text-sm">
                                {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
```

## Patrones avanzados de DOM con TypeScript

### Renderizado de listas tipado

```typescript
interface Item {
  id: number;
  titulo: string;
  precio: number;
}

function renderizarLista(items: Item[], container: HTMLElement): void {
  container.innerHTML = items
    .map(
      (item) => `
      <div class="item" data-id="${item.id}">
        <h3>${item.titulo}</h3>
        <p>${item.precio.toFixed(2)}€</p>
      </div>
    `
    )
    .join("");
}

function renderizarListaSegura(items: readonly Item[]): HTMLUListElement {
  const ul = document.createElement("ul");
  ul.append(
    ...items.map((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.titulo} - ${item.precio.toFixed(2)}€`;
      li.dataset.id = String(item.id);
      return li;
    })
  );
  return ul;
}
```

### Template literal para componentes

```typescript
function tarjetaProducto(producto: Item): string {
  return `
    <article class="producto">
      <header>
        <h2>${escapeHTML(producto.titulo)}</h2>
      </header>
      <p class="precio">${producto.precio.toFixed(2)}€</p>
      <button data-id="${producto.id}" class="btn-comprar">Añadir</button>
    </article>
  `;
}

function escapeHTML(texto: string): string {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML; // Escapa < > & etc.
}

// Delegación de eventos con tipos
function setupCarrito(container: HTMLElement): void {
  container.addEventListener("click", (e: MouseEvent) => {
    const boton = (e.target as HTMLElement).closest("[data-id]");
    if (!boton) return;

    const id = Number(boton.getAttribute("data-id"));
    console.log("Producto añadido:", id);
  });
}
```

### Patrón de componente con estado local

```typescript
class ContadorComponente {
  private contador: number = 0;
  private elemento: HTMLElement;

  constructor(selector: string) {
    this.elemento = document.querySelector(selector) as HTMLElement;
    this.render();
    this.elemento.querySelector(".btn-incrementar")!
      .addEventListener("click", () => this.incrementar());
    this.elemento.querySelector(".btn-decrementar")!
      .addEventListener("click", () => this.decrementar());
  }

  private incrementar(): void {
    this.contador++;
    this.actualizarDisplay();
  }

  private decrementar(): void {
    this.contador--;
    this.actualizarDisplay();
  }

  private actualizarDisplay(): void {
    this.elemento.querySelector(".valor")!.textContent = String(this.contador);
  }

  private render(): void {
    this.elemento.innerHTML = `
      <button class="btn-decrementar">-</button>
      <span class="valor">${this.contador}</span>
      <button class="btn-incrementar">+</button>
    `;
  }
}

// Uso
new ContadorComponente("#app-contador");
```

### Patrón de fábrica de componentes

```typescript
type EventHandler = (e: Event) => void;

interface ComponenteConfig {
  tag?: string;
  clases?: string[];
  hijos?: Array<string | HTMLElement>;
  eventos?: Record<string, EventHandler>;
  atributos?: Record<string, string>;
}

function crearComponente(config: ComponenteConfig): HTMLElement {
  const el = document.createElement(config.tag ?? "div");

  if (config.clases) el.classList.add(...config.clases);
  if (config.atributos) {
    for (const [key, value] of Object.entries(config.atributos)) {
      el.setAttribute(key, value);
    }
  }
  if (config.hijos) el.append(...config.hijos);
  if (config.eventos) {
    for (const [evento, handler] of Object.entries(config.eventos)) {
      el.addEventListener(evento, handler);
    }
  }

  return el;
}

// Uso
const boton = crearComponente({
  tag: "button",
  clases: ["btn", "btn-primary"],
  atributos: { "data-action": "guardar" },
  eventos: {
    click: () => console.log("¡Clic!"),
  },
  hijos: ["Guardar"],
});
document.body.append(boton);
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
