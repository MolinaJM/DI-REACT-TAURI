# Sesión 2: Introducción a TypeScript desde cero (Parte 1)

Tipos básicos, funciones, objetos, interfaces, type guards y más

[← Volver al Índice](index.md)

---

> 📚 **Apuntes:** [s02 · A0–A6](apuntes/s02/) · 💻 **Código:** [`repos/01-typescript-fundamentos`](../repos/01-typescript-fundamentos/) · ✏️ **Práctica:** [ejercicios/s02](../ejercicios/)


> Todo el temario de esta sesión está en los apuntes de [`apuntes/s02/`](apuntes/s02/). Esta página solo enlaza dichos apuntes en el orden recomendado.

## 📚 Índice de Apuntes

Haz clic en cada apunte para ver el código TypeScript detallado con explicaciones y ejemplos.

- [📖 A0 · Introducción a JS y TS](apuntes/s02/00_Introduccion.md)
- [📖 A1 · Sintaxis básica](apuntes/s02/01_SintaxisBasica.md)
- [📖 A2 · Conversión de tipos](apuntes/s02/02_ConversionTipos.md)
- [📖 A3 · Operadores](apuntes/s02/03_Operadores.md)
- [📖 A4 · Funciones](apuntes/s02/04_Funciones.md)
- [📖 A5 · Control de flujo](apuntes/s02/05_ControlDeFlujo.md)
- [📖 A6 · Ámbito, scope y this](apuntes/s02/06_Ambito_Scope.md)

## ✅ Práctica de la sesión

> **¿Por qué el repositorio y no copiar y pegar?** Los apuntes ya contienen todo el código, pero el repo aporta el **entorno ejecutable**: desde `repos/01-typescript-fundamentos/` puedes lanzar `npx tsx src/REPO-XX.ts` y los ejemplos corren con su `tsconfig` estricto (`strict`, `noUncheckedIndexedAccess`, `lib: ES2024…`). Sin ese entorno, casos como `toSorted()`, `.with()` o `Map.groupBy` (REPO-15) o los `export`/`import` entre ficheros (REPO-12) **no compilan ni se ejecutan** pegados sueltos en un playground. Además puedes modificar valores y depurar.

- Código ejecutable: [`repos/01-typescript-fundamentos`](../repos/01-typescript-fundamentos/).
- Ejercicios con soluciones: [`../ejercicios/s02/`](../ejercicios/s02/).

---


## 🧪 Autoevaluación

Marca lo que ya eres capaz de hacer por ti mismo/a:

- [ ] Declaro variables y constantes con los tipos básicos más comunes (`string`, `number`, `boolean`, `string[]`).
- [ ] Defino `interface` para objetos y la uso como tipo de parámetros en funciones.
- [ ] Escribo un *type guard* (`typeof`/`Array.isArray`) para estrechar el tipo en un if.
- [ ] Sé cuándo usar `let` frente a `const` y lo que dice la salida de `tsc`/`npx tsx`.

> **Reto de la sesión:** Declara un `interface Usuario`, una función `saludar(u: Usuario): string` y un guard que distinga dos variantes, todo en un único fichero y compilando sin errores.

> 📌 La práctica completa está en [`../ejercicios/`](../ejercicios/) (soluciones en el entorno de clase).
[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
