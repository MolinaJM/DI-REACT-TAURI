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
