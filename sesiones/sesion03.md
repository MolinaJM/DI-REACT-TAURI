# Sesión 3: Introducción a TypeScript desde cero (Parte 2)

Generics, utilidades de tipos, módulos, asincronía y tipos de datos

[← Volver al Índice](index.md)

---

> Todo el temario de esta sesión está en los apuntes de [`apuntes/s03/`](apuntes/s03/). Esta página solo enlaza dichos apuntes en el orden recomendado.

## 📚 Índice de Apuntes

Haz clic en cada apunte para ver el código TypeScript detallado con explicaciones y ejemplos.

- [📖 A7 · Arrays](apuntes/s03/07_Arrays.md)
- [📖 A8 · Objetos](apuntes/s03/08_Objetos.md)
- [📖 A9 · Módulos ES y type-only](apuntes/s03/09_Modulos.md)
- [📖 A10 · Node, npm, pnpm, tsc y Vite](apuntes/s03/10_NPM.md)
- [📖 A11 · Asincronía: callbacks, promesas y async/await](apuntes/s03/11_Asincronismo_Callbacks_Promesas_AsyncAwait.md)

## ✅ Práctica de la sesión

> **¿Por qué el repositorio y no copiar y pegar?** Los apuntes ya contienen todo el código, pero el repo aporta el **entorno ejecutable**: desde `repos/01-typescript-fundamentos/` puedes lanzar `npx tsx src/REPO-XX.ts` y los ejemplos corren con su `tsconfig` estricto (`strict`, `noUncheckedIndexedAccess`, `lib: ES2024…`). Sin ese entorno, casos como `toSorted()`, `.with()` o `Map.groupBy` (REPO-15) o los `export`/`import` entre ficheros (REPO-12) **no compilan ni se ejecutan** pegados sueltos en un playground. Además puedes modificar valores y depurar.

- Código ejecutable: [`repos/01-typescript-fundamentos`](../repos/01-typescript-fundamentos/).
- Ejercicios con soluciones: [`../ejercicios/s03/`](../ejercicios/s03/).

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)