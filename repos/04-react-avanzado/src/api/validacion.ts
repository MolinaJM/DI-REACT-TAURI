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
