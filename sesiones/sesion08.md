# Sesión 8: Persistencia de Estado Global y Enrutado

Context API, Zustand, React Router y almacenamiento local

[← Volver al Índice](index.md)

---

## Context API

```
// store/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: "admin" | "usuario";
}

interface AuthContextType {
    usuario: Usuario | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    esAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const login = async (email: string, password: string) => {
        const user: Usuario = {
            id: 1, nombre: "Admin", email,
            rol: email.includes("admin") ? "admin" : "usuario"
        };
        setUsuario(user);
        localStorage.setItem("usuario", JSON.stringify(user));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, esAdmin: usuario?.rol === "admin" }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
```

## Zustand: Estado Global con Tipado

```
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
```

## React Router v6

```
// main.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Inicio/>} />
                <Route path="productos" element={<Productos/>} />
                <Route path="productos/:id" element={<DetalleProducto/>} />
                <Route path="*" element={<NoEncontrado/>} />
            </Route>
        </Routes>
    </BrowserRouter>
);

// Layout con navegacion
function Layout() {
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 flex gap-4">
                <Link to="/" className="hover:text-blue-300">Inicio</Link>
                <Link to="/productos" className="hover:text-blue-300">Productos</Link>
                <Outlet />
            </nav>
            <main className="container mx-auto p-4"><Outlet/></main>
        </div>
    );
}
```

## Persistencia de estado global y enrutado

### Almacenamiento de estado con localStorage + Map

```typescript
interface EntradaCache<T> {
  data: T;
  timestamp: number;
  expiraEn: number; // ms
}

class AlmacenPersistente<T extends Record<string, unknown>> {
  private store: Map<string, EntradaCache<unknown>> = new Map();

  constructor(private claveRaiz: string) {
    this.cargar();
  }

  private cargar(): void {
    const raw = localStorage.getItem(this.claveRaiz);
    if (raw) {
      const parsed = JSON.parse(raw) as [string, EntradaCache<unknown>][];
      this.store = new Map(parsed);
    }
  }

  private guardar(): void {
    localStorage.setItem(
      this.claveRaiz,
      JSON.stringify([...this.store.entries()])
    );
  }

  set<K extends keyof T>(clave: K, data: T[K], ttlMs: number = 300000): void {
    this.store.set(clave as string, {
      data,
      timestamp: Date.now(),
      expiraEn: ttlMs,
    });
    this.guardar();
  }

  get<K extends keyof T>(clave: K): T[K] | null {
    const entrada = this.store.get(clave as string);
    if (!entrada) return null;

    if (Date.now() - entrada.timestamp > entrada.expiraEn) {
      this.store.delete(clave as string);
      this.guardar();
      return null;
    }

    return entrada.data as T[K];
  }

  eliminar<K extends keyof T>(clave: K): void {
    this.store.delete(clave as string);
    this.guardar();
  }

  limpiar(): void {
    this.store.clear();
    localStorage.removeItem(this.claveRaiz);
  }
}

// Uso
interface DatosApp {
  usuario: { nombre: string; rol: string };
  preferencias: { tema: "claro" | "oscuro"; idioma: string };
  ultimaRuta: string;
}

const almacen = new AlmacenPersistente<DatosApp>("app-state");

almacen.set("usuario", { nombre: "Ana", rol: "admin" }, 3600000);
almacen.set("preferencias", { tema: "oscuro", idioma: "es" });

const usuario = almacen.get("usuario");
console.log(usuario?.nombre); // "Ana"
```

### Enrutado SPA con Map e History API

```typescript
type ComponenteFn = () => string;

interface Ruta {
  patron: string;
  componente: ComponenteFn;
  titulo?: string;
}

class RouterSPA {
  private rutas: Map<string, Ruta> = new Map();
  private contenedor: HTMLElement;

  constructor(selector: string) {
    this.contenedor = document.querySelector(selector) as HTMLElement;

    window.addEventListener("popstate", () => {
      this.navegar(window.location.pathname, false);
    });
  }

  registrar(ruta: Ruta): void {
    this.rutas.set(ruta.patron, ruta);
  }

  navegar(path: string, pushState: boolean = true): void {
    const ruta = this.rutas.get(path) ?? this.rutas.get("*");

    if (!ruta) {
      this.contenedor.innerHTML = "<h1>404 - No encontrada</h1>";
      return;
    }

    if (pushState) {
      history.pushState({ path }, "", path);
    }

    if (ruta.titulo) document.title = ruta.titulo;
    this.contenedor.innerHTML = ruta.componente();
  }
}

// Uso
const app = new RouterSPA("#app");

app.registrar({
  patron: "/",
  componente: () => "<h1>Inicio</h1>",
  titulo: "Inicio",
});

app.registrar({
  patron: "/about",
  componente: () => "<h1>Acerca de</h1>",
  titulo: "Acerca de",
});

app.registrar({
  patron: "*",
  componente: () => "<h1>Error 404</h1>",
});

// Navegación mediante clicks en enlaces
document.addEventListener("click", (e: MouseEvent) => {
  const link = (e.target as HTMLElement).closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (href?.startsWith("/")) {
    e.preventDefault();
    app.navegar(href);
  }
});
```

### Clonación profunda de estado con structuredClone

```typescript
// structuredClone preserva Map, Set, Date, RegExp, ArrayBuffer...
// Es ideal para clonar estado antes de mutarlo

interface EstadoComplejo {
  usuarios: Map<string, { nombre: string; roles: Set<string> }>;
  cache: Map<string, unknown>;
  metadatos: { creado: Date; versión: number };
}

const estadoOriginal: EstadoComplejo = {
  usuarios: new Map([
    ["u1", { nombre: "Ana", roles: new Set(["admin", "user"]) }],
  ]),
  cache: new Map([["key", { data: "valor" }]]),
  metadatos: { creado: new Date(), versión: 1 },
};

// Clonación profunda verdadera
const estadoClonado = structuredClone(estadoOriginal);

// Mutar el clon no afecta al original
estadoClonado.usuarios.get("u1")!.nombre = "Modificado";
console.log(estadoOriginal.usuarios.get("u1")!.nombre); // "Ana" (intacto)
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
