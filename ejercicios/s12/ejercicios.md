# S12 · Pruebas automatizadas con Vitest

Ejercicios para `repos/05-testing`. Soluciones en `soluciones/s12/`.

## 1. Pruebas de funciones puras
Dado `sumar(a, b)` y `esPar(n)` (que encontrarás en `tests-ejercicios-ts`), escribe en `tests/soluciones.test.ts` casos:

- `sumar(2, 3) === 5`, caso con negativos, y simetría `sumar(a,b)===sumar(b,a)`.
- `esPar(4) true`, `esPar(3) false`.

```ts
import { describe, expect, it } from "vitest";
```

## 2. Pruebas de componentes
Para `Boton` (con props `variante`, `deshabilitado`, `onClick`):

- renderiza el `children`.
- al deshabilitarlo, `onClick` **no** se llama.
- si está habilitado y clic, `onClick` se llama una vez (`vi.fn()`).

Usa `@testing-library/react`.

## 3. Pruebas de hooks/async
Escribe un test con `async/await` para `esperar(ms)` que compruebe que resuelve después de al menos `ms` (usa temporizadores reales o `vi.useFakeTimers()`).

## 4. E2E con Playwright
Escribe el test de humo: abre `/`, comprueba que el título existe y que tras pulsar un botón "Contar" el contador muestra `1`.