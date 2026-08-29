# Sesión 12: Prueba automatizada

Vitest, Testing Library, pruebas unitarias y E2E

[← Volver al Índice](index.md)

---

> 💻 **Código:** [`repos/05-testing`](../repos/05-testing/) (+ [`repos/04`](../repos/04-react-avanzado/)) · ✏️ **Práctica:** [ejercicios/s12](../ejercicios/)


## Documentación de la Aplicación

Documentar es esencial para que la aplicación pueda usarse, mantenerse y evolucionar. La documentación se realiza de distintas formas:

- **En la propia aplicación (ayudas contextuales):** textos de ayuda, tooltips, mensajes de validación, placeholders y avisos que guían al usuario directamente en la interfaz, en el contexto donde realiza la acción.
- **Manuales externos:** documentación más completa y estructurada, que incluye:
  - **Manual de usuario:** cómo instalar, navegar y usar la aplicación para el usuario final.
  - **Manual de administración:** gestión de usuarios, configuración, mantenimiento y resolución de incidencias.
  - **Manual de instalación:** requisitos del sistema, pasos de instalación, despliegue y actualizaciones.

A lo largo de las sesiones se han ido generando estos contenidos (mensajes de ayuda en los formularios, instrucciones en el README, guías de instalación del entorno, etc.). En esta sesión se recuerda su importancia y se documenta el trabajo realizado antes de pasar a las pruebas.

---

## Pruebas con Vitest

Vitest es un framework de pruebas unitarias para Vite, rapido y compatible con Jest.

```bash
# Instalacion
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Configuración (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
        exclude: ['e2e/**', 'node_modules/**'],
    },
});
```

### 📦 Archivo de setup (repos/05-testing/src/test/setup.ts)

```typescript
import '@testing-library/jest-dom';
```

## 📦 Código bajo prueba (repos/05-testing)

Estos son los componentes, hooks y funciones que se prueban en el repositorio `repos/05-testing`:

### 📦 src/components/Contador.tsx

```tsx
import { useState } from 'react';

export default function Contador() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
```

### 📦 src/components/Saludo.tsx

```tsx
interface SaludoProps {
    nombre: string;
    edad?: number;
}

export default function Saludo({ nombre, edad }: SaludoProps) {
    return (
        <div>
            <p>Hola, {nombre}</p>
            {edad !== undefined && <p>{edad} anios</p>}
        </div>
    );
}
```

### 📦 src/hooks/useForm.ts

```typescript
import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormReturn<T> {
    values: T;
    errors: Record<string, string>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent, callback: () => void) => void;
}

export default function useForm<T extends Record<string, string>>(
    initialValues: T,
    validator: (values: T) => Record<string, string>
): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent, callback: () => void) => {
        e.preventDefault();
        const validationErrors = validator(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            callback();
        }
    };

    return { values, errors, handleChange, handleSubmit };
}
```

### 📦 src/utils/matematicas.ts

```typescript
export function sumar(a: number, b: number): number {
    return a + b;
}

export function filtrarPares(numeros: number[]): number[] {
    return numeros.filter(n => n % 2 === 0);
}
```

### 📦 src/components/FormularioLogin.tsx

```tsx
import { FormEvent } from 'react';
import useForm from '../hooks/useForm';

interface FormularioLoginProps {
    onSubmit?: (values: { usuario: string; password: string }) => void;
}

export default function FormularioLogin({ onSubmit }: FormularioLoginProps) {
    const { values, errors, handleChange, handleSubmit } = useForm(
        { usuario: '', password: '' },
        (vals) => {
            const errs: Record<string, string> = {};
            if (!vals.usuario) errs.usuario = 'El nombre es obligatorio';
            if (!vals.password) errs.password = 'La contrasenia es obligatoria';
            return errs;
        }
    );

    const onSubmitHandler = (e: FormEvent) => {
        handleSubmit(e, () => {
            onSubmit?.({ usuario: values.usuario, password: values.password });
        });
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="usuario">Usuario</label>
                <input
                    id="usuario"
                    name="usuario"
                    value={values.usuario}
                    onChange={handleChange}
                />
                {errors.usuario && <span>{errors.usuario}</span>}
            </div>
            <div>
                <label htmlFor="password">Contrasenia</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Iniciar Sesion</button>
        </form>
    );
}
```

## Pruebas Unitarias de Componentes

> 📦 **Estos tests están en el repositorio:** `repos/05-testing/src/__tests__/Contador.test.tsx` y `repos/05-testing/src/__tests__/Saludo.test.tsx`

```tsx
// src/components/__tests__/Contador.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contador from '../components/Contador';

describe('Componente Contador', () => {
    it('debe renderizar el valor inicial en 0', () => {
        render(<Contador />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('debe incrementar el valor al hacer clic en "+"', () => {
        render(<Contador />);
        const boton = screen.getByText('+');
        fireEvent.click(boton);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('debe decrementar el valor al hacer clic en "-"', () => {
        render(<Contador />);
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('-'));
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('debe resetear el valor al hacer clic en "Reset"', () => {
        render(<Contador />);
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('Reset'));
        expect(screen.getByText('0')).toBeInTheDocument();
    });
});

// src/__tests__/Saludo.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Saludo from '../components/Saludo';

describe('Componente Saludo', () => {
    it('debe mostrar el nombre pasado por props', () => {
        render(<Saludo nombre="Maria" />);
        expect(screen.getByText(/Hola, Maria/i)).toBeInTheDocument();
    });

    it('debe mostrar la edad cuando se proporciona', () => {
        render(<Saludo nombre="Juan" edad={25} />);
        expect(screen.getByText(/25 anios/i)).toBeInTheDocument();
    });

    it('no debe mostrar edad cuando no se proporciona', () => {
        render(<Saludo nombre="Pedro" />);
        expect(screen.queryByText(/anios/i)).not.toBeInTheDocument();
    });
});
```

## Pruebas de Hooks y Funciones

> 📦 **Estos tests están en el repositorio:** `repos/05-testing/src/__tests__/useForm.test.ts` y `repos/05-testing/src/__tests__/matematicas.test.ts`

```typescript
// src/hooks/__tests__/useForm.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useForm from '../hooks/useForm';

describe('Hook useForm', () => {
    const initialValues = { email: '', password: '' };
    const validator = (values: { email: string; password: string }) => {
        const errors: Record<string, string> = {};
        if (!values.email.includes('@')) errors.email = 'Email invalido';
        if (values.password.length < 6) errors.password = 'Minimo 6 caracteres';
        return errors;
    };

    it('debe inicializar con valores por defecto', () => {
        const { result } = renderHook(() => useForm(initialValues, validator));
        expect(result.current.values).toEqual(initialValues);
    });

    it('debe actualizar valores al cambiar', () => {
        const { result } = renderHook(() => useForm(initialValues, validator));
        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: 'test@test.com', type: 'text', checked: false }
            } as any);
        });
        expect(result.current.values.email).toBe('test@test.com');
    });

    it('debe validar el formulario correctamente', () => {
        const { result } = renderHook(() => useForm(initialValues, validator));
        act(() => {
            result.current.handleSubmit({ preventDefault: () => {} } as any, () => {});
        });
        expect(result.current.errors.email).toBeDefined();
        expect(result.current.errors.password).toBeDefined();
    });
});

// Pruebas de funciones utilitarias (src/__tests__/matematicas.test.ts)
import { describe, it, expect } from 'vitest';
import { sumar, filtrarPares } from '../utils/matematicas';

describe('Funciones utilitarias', () => {
    it('sumar debe retornar la suma correcta', () => {
        expect(sumar(2, 3)).toBe(5);
        expect(sumar(-1, 1)).toBe(0);
        expect(sumar(0, 0)).toBe(0);
    });

    it('filtrarPares debe retornar solo numeros pares', () => {
        expect(filtrarPares([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
        expect(filtrarPares([1, 3, 5])).toEqual([]);
        expect(filtrarPares([])).toEqual([]);
    });
});
```

## Pruebas de Eventos y Asincronia

> 📦 **Este test está en el repositorio:** `repos/05-testing/src/__tests__/FormularioLogin.test.tsx`

```tsx
// src/components/__tests__/FormularioLogin.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FormularioLogin from '../components/FormularioLogin';

describe('FormularioLogin', () => {
    it('debe mostrar errores de validacion al enviar vacio', async () => {
        render(<FormularioLogin />);

        fireEvent.click(screen.getByText('Iniciar Sesion'));

        await waitFor(() => {
            expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
            expect(screen.getByText(/La contrasenia es obligatoria/i)).toBeInTheDocument();
        });
    });

    it('debe enviar el formulario con datos validos', async () => {
        const onSubmit = vi.fn();
        render(<FormularioLogin onSubmit={onSubmit} />);

        await userEvent.type(screen.getByLabelText(/usuario/i), 'admin');
        await userEvent.type(screen.getByLabelText(/contrasenia/i), '123456');
        fireEvent.click(screen.getByText('Iniciar Sesion'));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                usuario: 'admin',
                password: '123456'
            });
        });
    });
});

// Ejecutar pruebas
// npx vitest
// npx vitest run  # una sola vez
// npx vitest --coverage  # con cobertura
```

## E2E con Playwright

```bash
# Instalacion
npm install -D @playwright/test
npx playwright install
```

Configuración (playwright.config.ts):

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: { headless: true, viewport: { width: 1280, height: 720 } },
});
```

Spec E2E en `e2e/navegacion.spec.ts`:

```tsx
import { test, expect } from '@playwright/test';

test('debe mostrar la pagina principal', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toContainText('Bienvenido');
});

test('debe navegar a productos y ver la lista', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Productos');
    await expect(page).toHaveURL(/.*productos/);
    await expect(page.locator('.producto')).toHaveCount(10);
});

test('debe agregar un producto al carrito', async ({ page }) => {
    await page.goto('http://localhost:3000/productos');
    await page.click('.producto:first-child .btn-agregar');
    await expect(page.locator('.badge-carrito')).toContainText('1');
});
```


### Tests de Arrays

```typescript
// Funciones puras para manipulación de arrays

function sumarNumeros(numeros: number[]): number {
  return numeros.reduce((total, numero) => total + numero, 0);
}

function filtrarPares(numeros: number[]): number[] {
  return numeros.filter((numero) => numero % 2 === 0);
}

function obtenerNombres<T extends { nombre: string }>(alumnos: T[]): string[] {
  return alumnos.map((alumno) => alumno.nombre);
}

function agruparPorEstado<T extends { estado: string }>(tareas: T[]): Record<string, T[]> {
  return tareas.reduce<Record<string, T[]>>((grupos, tarea) => {
    const estado = tarea.estado;
    return {
      ...grupos,
      [estado]: [...(grupos[estado] ?? []), tarea],
    };
  }, {});
}

// Pruebas
console.assert(sumarNumeros([1, 2, 3, 4]) === 10, "sumarNumeros falló");
console.assert(
  JSON.stringify(filtrarPares([1, 2, 3, 4, 5, 6])) === "[2,4,6]",
  "filtrarPares falló"
);
console.assert(
  JSON.stringify(obtenerNombres([
    { nombre: "Ana", nota: 8 },
    { nombre: "Luis", nota: 7 },
  ])) === '["Ana","Luis"]',
  "obtenerNombres falló"
);

const agrupadas = agruparPorEstado([
  { id: 1, texto: "Repasar", estado: "pendiente" },
  { id: 2, texto: "Entregar", estado: "completada" },
]);
console.assert(agrupadas.pendiente.length === 1, "agruparPorEstado falló");
console.assert(agrupadas.completada.length === 1, "agruparPorEstado falló");

console.log("✅ Todos los tests de arrays han pasado");
```

### Tests de Objetos

```typescript
function obtenerPais(objeto: Record<string, unknown>): string {
  return (objeto.pais as string) ?? "No se encuentra";
}

function tienePropiedad(objeto: Record<string, unknown>, clave: string): boolean {
  return Object.hasOwn(objeto, clave);
}

function eliminarClave<T extends Record<string, unknown>>(
  objeto: T,
  clave: keyof T
): Omit<T, typeof clave> {
  const copia = { ...objeto };
  delete copia[clave];
  return copia;
}

function sumarTemperaturas(objeto: Record<string, unknown>): number {
  return Object.values(objeto).reduce<number>((total, valor) => {
    return typeof valor === "number" ? total + valor : total;
  }, 0);
}

// Pruebas
console.assert(
  obtenerPais({ continente: "Europa", pais: "España" }) === "España",
  "obtenerPais falló (existe)"
);
console.assert(
  obtenerPais({ continente: "Europa" }) === "No se encuentra",
  "obtenerPais falló (no existe)"
);
console.assert(tienePropiedad({ a: 1, b: 2 }, "b") === true, "tienePropiedad falló");
console.assert(tienePropiedad({ a: 1 }, "b") === false, "tienePropiedad falló");
console.assert(
  JSON.stringify(eliminarClave({ a: 1, b: 2, c: 3 }, "b")) === '{"a":1,"c":3}',
  "eliminarClave falló"
);
console.assert(
  sumarTemperaturas({ enero: 10, febrero: 12, marzo: "x" }) === 22,
  "sumarTemperaturas falló"
);

console.log("✅ Todos los tests de objetos han pasado");
```

### Tests de Funciones

```typescript
function esNumeroValido(valor: unknown): valor is number {
  return typeof valor === "number" && !Number.isNaN(valor);
}

function normalizarTexto(texto: string): string {
  return texto.trim().toLowerCase();
}

interface TareaConId {
  id: string;
  texto: string;
  completada: boolean;
}

function crearTarea(texto: string): TareaConId {
  return {
    id: crypto.randomUUID(),
    texto: texto.trim(),
    completada: false,
  };
}

// Pruebas
console.assert(esNumeroValido(42) === true, "esNumeroValido(42) falló");
console.assert(esNumeroValido(Number.NaN) === false, "esNumeroValido(NaN) falló");
console.assert(
  normalizarTexto("  Hola Mundo  ") === "hola mundo",
  "normalizarTexto falló"
);

const tarea = crearTarea("  Estudiar JavaScript  ");
console.assert(tarea.texto === "Estudiar JavaScript", "crearTarea texto falló");
console.assert(tarea.completada === false, "crearTarea completada falló");
console.assert(typeof tarea.id === "string", "crearTarea id falló");

console.log("✅ Todos los tests de funciones han pasado");
```

### Tests de Estado (patrón reducer)

```typescript
type FiltroTareas = "todas" | "pendientes" | "completadas";

interface TareaItem {
  id: string;
  texto: string;
  completada: boolean;
}

interface EstadoTareas {
  tareas: TareaItem[];
  filtro: FiltroTareas;
  cargando: boolean;
  error: string;
}

function crearEstadoInicial(): EstadoTareas {
  return { tareas: [], filtro: "todas", cargando: false, error: "" };
}

function agregarTarea(estado: EstadoTareas, texto: string): EstadoTareas {
  const textoLimpio = String(texto).trim();
  if (!textoLimpio) return estado;

  return {
    ...estado,
    tareas: [
      ...estado.tareas,
      { id: crypto.randomUUID(), texto: textoLimpio, completada: false },
    ],
  };
}

function cambiarFiltro(estado: EstadoTareas, filtro: FiltroTareas): EstadoTareas {
  return { ...estado, filtro };
}

function actualizarTarea(
  estado: EstadoTareas,
  id: string,
  cambios: Partial<Pick<TareaItem, "texto" | "completada">>
): EstadoTareas {
  return {
    ...estado,
    tareas: estado.tareas.map((t) => (t.id === id ? { ...t, ...cambios } : t)),
  };
}

function obtenerTareasVisibles(estado: EstadoTareas): TareaItem[] {
  switch (estado.filtro) {
    case "pendientes":
      return estado.tareas.filter((t) => !t.completada);
    case "completadas":
      return estado.tareas.filter((t) => t.completada);
    default:
      return estado.tareas;
  }
}

// Pruebas
const base = crearEstadoInicial();
console.assert(base.tareas.length === 0, "crearEstadoInicial falló");

const conTarea = agregarTarea(base, "  Estudiar React  ");
console.assert(base.tareas.length === 0, "Inmutabilidad: base no debe cambiar");
console.assert(conTarea.tareas.length === 1, "agregarTarea falló");
console.assert(conTarea.tareas[0].texto === "Estudiar React", "Texto sin espacios");
console.assert(typeof conTarea.tareas[0].id === "string", "ID debe ser UUID");

const filtrado = cambiarFiltro(conTarea, "pendientes");
console.assert(filtrado.filtro === "pendientes", "cambiarFiltro falló");
console.assert(conTarea.filtro === "todas", "Inmutabilidad: filtro original");

const actualizado = actualizarTarea(conTarea, conTarea.tareas[0].id, { completada: true });
console.assert(actualizado.tareas[0].completada === true, "actualizarTarea falló");
console.assert(conTarea.tareas[0].completada === false, "Inmutabilidad: completada");

const conVarias: EstadoTareas = {
  ...conTarea,
  tareas: [...conTarea.tareas, { id: "2", texto: "Repasar arrays", completada: true }],
};

console.assert(
  obtenerTareasVisibles({ ...conVarias, filtro: "pendientes" }).length === 1,
  "filtrar pendientes falló"
);
console.assert(
  obtenerTareasVisibles({ ...conVarias, filtro: "completadas" }).length === 1,
  "filtrar completadas falló"
);
console.assert(
  obtenerTareasVisibles({ ...conVarias, filtro: "todas" }).length === 2,
  "filtrar todas falló"
);

console.log("✅ Todos los tests de estado han pasado");
```

---


## 🧪 Autoevaluación

Marca lo que ya eres capaz de hacer por ti mismo/a:

- [ ] Escribo pruebas unitarias de funciones puras con Vitest.
- [ ] Pruebo un componente con Testing Library (render, eventos, expect).
- [ ] Lanzo una prueba E2E con Playwright contra la app real.
- [ ] Interpreté la cobertura y sé qué casos prueban.

> **Reto de la sesión:** Suite Vitest + una prueba E2E de Playwright que navegue por el CRUD completo.

> 📌 La práctica completa está en [`../ejercicios/`](../ejercicios/) (soluciones en el entorno de clase).
[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
