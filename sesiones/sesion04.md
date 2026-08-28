# Sesión 4: Anatomía de Componentes y Funciones con TypeScript

Componentes funcionales, props, children y hooks básicos

[← Volver al Índice](index.md)

---

> 📚 **Conceptos y apuntes de la sesión:** [A12 · Preparación hacia React 19](conceptos/s04/12_Preparacion_React_19.md), [A13 · Tipado en React (props, eventos, generics)](conceptos/s04/13_Tipado_en_React_TS.md). Código ejecutable: [`repos/02-react-componentes`](../repos/02-react-componentes/).

## Componente Funcional con TypeScript

```
import { FC } from 'react';

interface SaludoProps {
    nombre: string;
    edad?: number;
}

const Saludo: FC<SaludoProps> = ({ nombre, edad }) => {
    return (
        <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-xl font-bold">Hola, {nombre}!</h2>
            {edad && <p className="text-gray-600">Edad: {edad} anios</p>}
        </div>
    );
};

// Uso
<Saludo nombre="Maria" edad={28} />
<Saludo nombre="Pedro" />
```

## Props Children

```
import { ReactNode } from 'react';

interface CardProps {
    titulo: string;
    children: ReactNode;
    className?: string;
}

function Card({ titulo, children, className = "" }: CardProps) {
    return (
        <div className={`bg-white shadow-md rounded-xl p-6 ${className}`}>
            <h3 className="text-lg font-semibold mb-3">{titulo}</h3>
            {children}
        </div>
    );
}

// Uso con children
<Card titulo="Noticia" className="max-w-md">
    <p>Este es el contenido de la tarjeta.</p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Leer mas
    </button>
</Card>
```

## useState con TypeScript

```
import { useState } from 'react';

interface Tarea {
    id: number;
    texto: string;
    completada: boolean;
}

function ListaTareas() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    const agregarTarea = () => {
        if (nuevaTarea.trim() === "") return;
        const tarea: Tarea = {
            id: Date.now(),
            texto: nuevaTarea,
            completada: false
        };
        setTareas([...tareas, tarea]);
        setNuevaTarea("");
    };

    const toggleTarea = (id: number) => {
        setTareas(tareas.map(t =>
            t.id === id ? { ...t, completada: !t.completada } : t
        ));
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
                <input type="text" value={nuevaTarea}
                    onChange={e => setNuevaTarea(e.target.value)}
                    className="border p-2 flex-1 rounded" />
                <button onClick={agregarTarea}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                    Agregar
                </button>
            </div>
            <ul>
                {tareas.map(tarea => (
                    <li key={tarea.id}
                        onClick={() => toggleTarea(tarea.id)}
                        className={`cursor-pointer p-2 ${tarea.completada ? "line-through text-gray-400" : ""}`}>
                        {tarea.texto}
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

## useEffect con TypeScript

```
import { useState, useEffect } from 'react';

interface Usuario {
    id: number;
    name: string;
    email: string;
}

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!res.ok) throw new Error("Error en la peticion");
                const data: Usuario[] = await res.json();
                setUsuarios(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setCargando(false);
            }
        };
        fetchUsuarios();
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <ul className="space-y-2">
            {usuarios.map(u => (
                <li key={u.id} className="bg-gray-100 p-3 rounded">
                    <strong>{u.name}</strong> - {u.email}
                </li>
            ))}
        </ul>
    );
}
```

## Patrones avanzados de funciones

Traducción a TypeScript de los patrones funcionales de JavaScript.

### Declaraciones, expresiones y arrow functions

```typescript
// Declaración de función (hoisting)
function sumar(a: number, b: number): number {
  return a + b;
}

// Expresión de función
const multiplicar = function (a: number, b: number): number {
  return a * b;
};

// Arrow function
const dividir = (a: number, b: number): number => a / b;

// Arrow multilínea
const procesar = (items: number[]): number[] =>
  items
    .filter((n) => n > 0)
    .map((n) => n * 2)
    .sort((a, b) => a - b);
```

### Parámetros por defecto, rest y spread

```typescript
// Parámetros por defecto
function saludar(nombre: string, saludo: string = "Hola"): string {
  return `${saludo}, ${nombre}`;
}

// Rest parameters
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log(sumarTodos(1, 2, 3, 4)); // 10

// Spread en llamadas
const nums: number[] = [5, 10, 15];
console.log(sumarTodos(...nums)); // 30

// Spread en arrays
const combinado: number[] = [1, 2, ...nums, 20];
```

### IIFE (Immediately Invoked Function Expression)

```typescript
// IIFE clásica
(function () {
  const privado = "solo aquí";
  console.log(privado);
})();

// IIFE con arrow
(() => {
  const mensaje: string = "Ejecutada al instante";
  console.log(mensaje);
})();

// IIFE con parámetros
((nombre: string) => {
  console.log(`Hola, ${nombre}`);
})("TypeScript");
```

### Recursión tipada

```typescript
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function fibonacci(n: number, memoria: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memoria.has(n)) return memoria.get(n)!;

  const resultado = fibonacci(n - 1, memoria) + fibonacci(n - 2, memoria);
  memoria.set(n, resultado);
  return resultado;
}

console.log(factorial(5));  // 120
console.log(fibonacci(10)); // 55
```

### Clausuras (closures) para factories

```typescript
type Operacion = (x: number) => number;

function crearMultiplicador(factor: number): Operacion {
  return (x: number) => x * factor;
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(duplicar(5));  // 10
console.log(triplicar(5)); // 15
```

### Composición de funciones

```typescript
function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (x: T) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const agregarIVA = (precio: number): number => precio * 1.21;
const redondear = (precio: number): number => Math.round(precio * 100) / 100;
const formatear = (precio: number): string => `${precio.toFixed(2)}€`;

const calcularPrecioFinal = compose(redondear, agregarIVA);
console.log(calcularPrecioFinal(100)); // 121
```

## Principios de Clean Code en TypeScript

### Nombres significativos

```typescript
// ❌ Malo
function proc(d: number[]): number {
  return d.filter((x) => x > 0).reduce((a, b) => a + b, 0) / d.length;
}

// ✅ Bueno
function calcularPromedioPositivos(numeros: number[]): number {
  const positivos = numeros.filter((n) => n > 0);
  if (positivos.length === 0) return 0;
  return positivos.reduce((suma, n) => suma + n, 0) / positivos.length;
}
```

### Funciones de una sola responsabilidad

```typescript
// ❌ Malo: hace demasiadas cosas
function procesarUsuario(datos: unknown): void {
  const usuario = datos as { nombre: string; email: string };
  if (!usuario.nombre || !usuario.email) throw new Error("Datos inválidos");
  fetch("/api/usuarios", { method: "POST", body: JSON.stringify(usuario) });
  localStorage.setItem("ultimoUsuario", JSON.stringify(usuario));
}

// ✅ Bueno: cada función hace una cosa
function validarUsuario(datos: unknown): asserts datos is { nombre: string; email: string } {
  if (typeof datos !== "object" || !datos) throw new Error("Datos inválidos");
  if (!("nombre" in datos) || !("email" in datos)) throw new Error("Faltan campos");
}

async function guardarUsuario(usuario: { nombre: string; email: string }): Promise<Response> {
  return fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
}

function persistirLocalmente(usuario: Record<string, unknown>): void {
  localStorage.setItem("ultimoUsuario", JSON.stringify(usuario));
}
```

### Inmutabilidad

```typescript
// ❌ Mutación
function agregarTarea(tareas: string[], nueva: string): string[] {
  tareas.push(nueva);
  return tareas;
}

// ✅ Inmutabilidad con spread
function agregarTareaInmutable(tareas: readonly string[], nueva: string): string[] {
  return [...tareas, nueva];
}

// ✅ Inmutabilidad con map/filter/reduce
function actualizarEstado(
  tareas: ReadonlyArray<{ id: number; done: boolean }>,
  id: number
): ReadonlyArray<{ id: number; done: boolean }> {
  return tareas.map((t) => (t.id === id ? { ...t, done: true } : t));
}
```

### Separación de datos, UI y lógica

```typescript
// 📁 datos.ts
type Estado = "pendiente" | "completada";

interface Tarea {
  id: string;
  texto: string;
  estado: Estado;
}

// 📁 logica.ts
function crearTarea(texto: string): Tarea {
  return { id: crypto.randomUUID(), texto: texto.trim(), estado: "pendiente" };
}

function filtrarPorEstado(tareas: Tarea[], estado: Estado): Tarea[] {
  return tareas.filter((t) => t.estado === estado);
}

// 📁 ui.ts
function renderizarTarea(tarea: Tarea): HTMLElement {
  const div = document.createElement("div");
  div.textContent = tarea.texto;
  div.dataset.id = tarea.id;
  return div;
}
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
