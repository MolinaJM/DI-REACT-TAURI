# Sesión 9: Formulario CRUD para bases de datos

Operaciones CRUD con MySQL y API REST

[← Volver al Índice](index.md)

---

## Estructura del CRUD

CRUD son las cuatro operaciones básicas de persistencia: Crear (Create), Leer (Read), Actualizar (Update) y Eliminar (Delete).

```typescript
// Tipos compartidos
interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    edad: number;
    createdAt?: string;
}

const API_URL = "http://localhost:3001/api/usuarios";
```

## Operaciones CRUD con fetch

```typescript
// Obtener todos los usuarios (READ)
const fetchUsuarios = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUsuarios(data);
};

// Crear un nuevo usuario (CREATE)
const addUser = async (newUser: Usuario) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });
    if (response.ok) fetchUsuarios();
};

// Actualizar un usuario (UPDATE)
const updateUser = async (id: number, userData: Partial<Usuario>) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (response.ok) fetchUsuarios();
};

// Eliminar un usuario (DELETE)
const deleteUser = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) fetchUsuarios();
};
```

## Componente CRUD Completo

```tsx
function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [form, setForm] = useState({ nombre: "", email: "", edad: 0 });
    const [editando, setEditando] = useState<Usuario | null>(null);

    useEffect(() => { fetchUsuarios(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editando) {
            await updateUser(editando.id!, form);
            setEditando(null);
        } else {
            await addUser(form);
        }
        setForm({ nombre: "", email: "", edad: 0 });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Gestion de Usuarios</h2>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <input placeholder="Nombre" value={form.nombre}
                        onChange={e => setForm({...form, nombre: e.target.value})}
                        className="border rounded p-2" required />
                    <input placeholder="Email" type="email" value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="border rounded p-2" required />
                    <input placeholder="Edad" type="number" value={form.edad}
                        onChange={e => setForm({...form, edad: Number(e.target.value)})}
                        className="border rounded p-2" required />
                </div>
                <button type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {editando ? "Actualizar" : "Crear"}
                </button>
            </form>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Nombre</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Edad</th>
                        <th className="p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id} className="border-t">
                            <td className="p-3">{u.id}</td>
                            <td className="p-3">{u.nombre}</td>
                            <td className="p-3">{u.email}</td>
                            <td className="p-3">{u.edad}</td>
                            <td className="p-3 space-x-2">
                                <button onClick={() => { setEditando(u); setForm(u); }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                                <button onClick={() => deleteUser(u.id!)}
                                    className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

## CRUD completo con Fetch y TypeScript

### Tipos y modelo de datos

```typescript
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
}

type ProductoCrear = Omit<Producto, "id">;
type ProductoActualizar = Partial<ProductoCrear> & { id: number };
```

### Servicio CRUD genérico

```typescript
class ApiService<T extends { id: number | string }> {
  constructor(private baseUrl: string) {}

  async getAll(): Promise<T[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error(`GET error: ${res.status}`);
    return (await res.json()) as T[];
  }

  async getById(id: T["id"]): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) throw new Error(`GET ${id} error: ${res.status}`);
    return (await res.json()) as T;
  }

  async create(datos: Omit<T, "id">): Promise<T> {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error(`POST error: ${res.status}`);
    return (await res.json()) as T;
  }

  async update(id: T["id"], datos: Partial<Omit<T, "id">>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error(`PATCH error: ${res.status}`);
    return (await res.json()) as T;
  }

  async delete(id: T["id"]): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`DELETE error: ${res.status}`);
  }
}

// Uso
const productosAPI = new ApiService<Producto>(
  "https://api.ejemplo.com/productos"
);

async function ejemploCRUD(): Promise<void> {
  // Crear
  const nuevo = await productosAPI.create({
    nombre: "Laptop",
    precio: 1200,
    categoria: "electrónica",
    stock: 10,
  });
  console.log("Creado:", nuevo.id);

  // Leer todos
  const todos = await productosAPI.getAll();
  console.log(`Total: ${todos.length}`);

  // Actualizar
  await productosAPI.update(nuevo.id, { precio: 1100, stock: 15 });

  // Eliminar
  await productosAPI.delete(nuevo.id);
}
```

### Validación de formularios tipada

```typescript
interface ErroresFormulario {
  nombre?: string;
  email?: string;
  edad?: string;
}

function validarProducto(datos: ProductoCrear): ErroresFormulario {
  const errores: ErroresFormulario = {};

  if (!datos.nombre || datos.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres";
  }

  if (datos.precio <= 0) {
    errores.edad = "El precio debe ser positivo";
  }

  if (!datos.categoria) {
    errores.email = "La categoría es obligatoria";
  }

  return errores;
}

function manejarSubmit(e: SubmitEvent): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const producto: ProductoCrear = {
    nombre: data.get("nombre") as string,
    precio: Number(data.get("precio")),
    categoria: data.get("categoria") as string,
    stock: Number(data.get("stock")),
  };

  const errores = validarProducto(producto);

  if (Object.keys(errores).length > 0) {
    console.error("Errores de validación:", errores);
    return;
  }

  // Enviar
  productosAPI.create(producto).then(console.log).catch(console.error);
}
```

---

## Código real: repositorio 04 (React avanzado)

### 📦 ApiService.ts (repos/04-react-avanzado/src/api/)

```typescript
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
}

export class ApiService<T extends { id: number | string }> {
  constructor(private baseUrl: string) {}

  async getAll(): Promise<T[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error(`GET error: ${res.status}`);
    return (await res.json()) as T[];
  }

  async getById(id: T["id"]): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) throw new Error(`GET ${id} error: ${res.status}`);
    return (await res.json()) as T;
  }

  async create(datos: Omit<T, "id">): Promise<T> {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error(`POST error: ${res.status}`);
    return (await res.json()) as T;
  }

  async update(id: T["id"], datos: Partial<Omit<T, "id">>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error(`PATCH error: ${res.status}`);
    return (await res.json()) as T;
  }

  async delete(id: T["id"]): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`DELETE error: ${res.status}`);
  }
}

// Uso
const productosAPI = new ApiService<Producto>(
  "https://api.ejemplo.com/productos"
);

export async function ejemploCRUD(): Promise<void> {
  // Crear
  const nuevo = await productosAPI.create({
    nombre: "Laptop",
    precio: 1200,
    categoria: "electrónica",
    stock: 10,
  });
  console.log("Creado:", nuevo.id);

  // Leer todos
  const todos = await productosAPI.getAll();
  console.log(`Total: ${todos.length}`);

  // Actualizar
  await productosAPI.update(nuevo.id, { precio: 1100, stock: 15 });

  // Eliminar
  await productosAPI.delete(nuevo.id);
}
```

### 📦 crud.tsx (repos/04-react-avanzado/src/api/)

```tsx
import { useState, useEffect, type FormEvent, type Dispatch, type SetStateAction } from 'react';

// Tipos compartidos
interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    edad: number;
    createdAt?: string;
}

const API_URL = "http://localhost:3001/api/usuarios";

// Obtener todos los usuarios (READ)
const fetchUsuarios = async (setUsuarios: Dispatch<SetStateAction<Usuario[]>>) => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUsuarios(data);
};

// Crear un nuevo usuario (CREATE)
const addUser = async (newUser: Usuario, recargar: () => void) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });
    if (response.ok) recargar();
};

// Actualizar un usuario (UPDATE)
const updateUser = async (id: number, userData: Partial<Usuario>, recargar: () => void) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (response.ok) recargar();
};

// Eliminar un usuario (DELETE)
const deleteUser = async (id: number, recargar: () => void) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) recargar();
};

function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [form, setForm] = useState({ nombre: "", email: "", edad: 0 });
    const [editando, setEditando] = useState<Usuario | null>(null);

    const recargar = () => fetchUsuarios(setUsuarios);

    useEffect(() => { recargar(); }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (editando) {
            await updateUser(editando.id!, form, recargar);
            setEditando(null);
        } else {
            await addUser(form, recargar);
        }
        setForm({ nombre: "", email: "", edad: 0 });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Gestion de Usuarios</h2>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <input placeholder="Nombre" value={form.nombre}
                        onChange={e => setForm({...form, nombre: e.target.value})}
                        className="border rounded p-2" required />
                    <input placeholder="Email" type="email" value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="border rounded p-2" required />
                    <input placeholder="Edad" type="number" value={form.edad}
                        onChange={e => setForm({...form, edad: Number(e.target.value)})}
                        className="border rounded p-2" required />
                </div>
                <button type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {editando ? "Actualizar" : "Crear"}
                </button>
            </form>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Nombre</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Edad</th>
                        <th className="p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id} className="border-t">
                            <td className="p-3">{u.id}</td>
                            <td className="p-3">{u.nombre}</td>
                            <td className="p-3">{u.email}</td>
                            <td className="p-3">{u.edad}</td>
                            <td className="p-3 space-x-2">
                                <button onClick={() => { setEditando(u); setForm(u); }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                                <button onClick={() => deleteUser(u.id!, recargar)}
                                    className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionUsuarios;
```

### 📦 validacion.ts (repos/04-react-avanzado/src/api/)

```typescript
import { ApiService, type Producto } from './ApiService';

type ProductoCrear = Omit<Producto, "id">;

interface ErroresFormulario {
  nombre?: string;
  email?: string;
  edad?: string;
}

function validarProducto(datos: ProductoCrear): ErroresFormulario {
  const errores: ErroresFormulario = {};

  if (!datos.nombre || datos.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres";
  }

  if (datos.precio <= 0) {
    errores.edad = "El precio debe ser positivo";
  }

  if (!datos.categoria) {
    errores.email = "La categoría es obligatoria";
  }

  return errores;
}

const productosAPI = new ApiService<Producto>(
  "https://api.ejemplo.com/productos"
);

function manejarSubmit(e: SubmitEvent): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const producto: ProductoCrear = {
    nombre: data.get("nombre") as string,
    precio: Number(data.get("precio")),
    categoria: data.get("categoria") as string,
    stock: Number(data.get("stock")),
  };

  const errores = validarProducto(producto);

  if (Object.keys(errores).length > 0) {
    console.error("Errores de validación:", errores);
    return;
  }

  // Enviar
  productosAPI.create(producto).then(console.log).catch(console.error);
}

export { validarProducto, manejarSubmit };
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
