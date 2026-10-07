# Sesión 3: Introducción a TypeScript desde cero (Parte 2)

Generics, utilidades de tipos, módulos, asincronía y tipos de datos

[← Volver al Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13)

---

> 📚 **Apuntes:** [s03 · A6–A10](apuntes/s03/) · 💻 **Ejemplos:** bloques "📦 Ejemplo completo" al final de cada apunte · ✏️ **Práctica:** [catálogo de ejercicios S03](../ejerciciosTS/ejerciciosTS.md)


> Todo el temario de esta sesión está en los apuntes de [`apuntes/s03/`](apuntes/s03/). Esta página solo enlaza dichos apuntes en el orden recomendado.

## 📚 Índice de Apuntes

Haz clic en cada apunte para ver el código TypeScript detallado con explicaciones y ejemplos.

- [📖 A6 · Arrays](apuntes/s03/06_Arrays.md)
- [📖 A7 · Estructuras de Datos (Objetos)](apuntes/s03/07_Estructuras_de_Datos.md)
- [📖 A8 · Asincronía: callbacks, promesas y async/await](apuntes/s03/08_Asincronismo_Callbacks_Promesas_AsyncAwait.md)
- [📖 A9 · Miscelánea: Módulos y NPM](apuntes/s03/09_Miscelánea.md)
- [📖 A10 · Genéricos *(optativo)*](apuntes/s03/10_Generics.md)

## ✅ Práctica de la sesión



- Ejemplos ejecutables: bloques "📦 Ejemplo completo" al final de cada apunte de [`apuntes/s03/`](apuntes/s03/).
- Ejercicios: bloques 14–23 del [catálogo canónico](../ejerciciosTS/ejerciciosTS.md). Las soluciones resueltas están en `ejerciciosTS/<NN>/solucion.ts` (la carpeta `ejerciciosTS/NN` de cada bloque se indica en el catálogo).

---


## 🧪 Autoevaluación previa al examen

El examen de TypeScript (sesiones 2 y 3) es **100 % práctico** y sigue siempre la misma estructura: primero la **DEFINICIÓN** de los datos de un supuesto (modelas entidades y estado de carga con `interface`/`type`), y después la **resolución** de apartados de **consultas**, **estadísticas y utilidades** y **carga asíncrona con estado**. Marca lo que ya eres capaz de hacer por ti mismo/a para saber si estás preparado/a:

- **DEFINICIÓN — modelar datos**
  - [ ] Crear el modelo de datos en un fichero aparte (p. ej. `pelisSusp.ts`, `viajesMarte.ts`) y cargarlo con `import { … } from "./xxx.ts"`.
  - [ ] Modelar cada entidad con `interface`/`type` cubriendo variedad: `readonly` en el `id`, al menos un `string`, un `number`, un `boolean`, un campo **opcional** (`?`), una unión de literales (p. ej. `estado`) y una **función** (método).
  - [ ] Importar los datos estáticos con `import datos from "./datos.json" with { type: "json" }` (nunca con `node:fs` ni `fetch` sobre el fichero).
  - [ ] Exponer (`export`) las constantes tipadas que pide el enunciado (p. ej. `PELICULAS`, `ACTORES`).
  - [ ] Añadir a cada elemento, al cargarlo, el método que pide su tipo (p. ej. `resumen()`): el JSON no incluye los métodos.
  - [ ] Modelar el **estado de la carga como unión discriminada**: `{ estado: "cargando" } | { estado: "error"; mensaje } | { estado: "listo"; … }`, sin propiedades opcionales.

- **A) Consultas al catálogo**
  - [ ] Escribir un *type guard* con predicado de tipo: `x is Entidad & { estado: "…" }`.
  - [ ] Devolver textos-resumen combinando campos y usando `??` para el campo opcional.
  - [ ] Filtrar con `filter` y buscar con `find` (que devuelve `Entidad | undefined`).
  - [ ] Escribir un `switch` exhaustivo con *exhaustiveness check* (`never` en el `default`).
  - [ ] Estrechar con `typeof` una entrada `string | number | boolean` y aplicar a cada caso una lógica distinta.

- **B) Estadísticas y utilidades**
  - [ ] Calcular totales con `reduce` y medias controlando la lista vacía (devuelve `0`).
  - [ ] Ordenar/derivar listas **nuevas sin mutar** la original (`toSorted`, spread, `map`).
  - [ ] Desestructurar el objeto recibido **en la firma** (patrón `props`) y devolver tuplas `[string, number]`.
  - [ ] Obtener valores únicos con `Set` + `for...of`.

- **C) Carga asíncrona y estado**
  - [ ] Crear una promesa con retardo (`esperar(ms)`) y una función `async` que devuelve la lista cargada.
  - [ ] Cargar varias listas **en paralelo** con `Promise.all`.
  - [ ] Con `fetch`, comprobar `res.ok` y estrechar `await res.json()` (que es `unknown`) con `Array.isArray` antes de devolverlo tipado.
  - [ ] Estrechar el `EstadoCarga` con su type guard (p. ej. `esCargando`) y describirlo con un `switch` exhaustivo.
  - [ ] Envolver la carga en `try/catch` y devolver la variante `"error"` (nunca propagar la excepción).
  - [ ] Implementar un closure tipo `{ leer, setX }` cuyo `setX` acepta un valor **o** una función de actualización `(prev) => …`, y encadenar updates con spread **sin mutar**.

> 🎯 **De cara al examen:** exporta con los **mismos nombres** del enunciado, todo en `strict`, y nada de extensiones que generen código (solo autocompletado básico de TS).

> 🏁 **Práctica integrada (cierre de la sesión):** [bloque 23 · Práctica integrada](../ejerciciosTS/ejerciciosTS.md#23-práctica-integrada) — Realización de una práctica que integre todos los conocimientos vistos para TS.

> 📌 La práctica completa está en el [catálogo canónico de ejercicios](../ejerciciosTS/ejerciciosTS.md).
[Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md) [S13](sesion13.md)
