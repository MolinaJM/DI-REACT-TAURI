# Sesión 5: Gestión de Estado Básico y Tipado de Formularios

useState, useEffect, formularios controlados y validación

[← Volver al Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13)

---

> 📚 **Apuntes:** [s05 · A15 · Gestión de Estado y Formularios](apuntes/s05/15_React_Gestion_Estado_y_Formularios.md) · 💻 **Código:** [`repos/02-react-ejemplo-pelis-api`](../repos/02-react-ejemplo-pelis-api/) — la AppCine del apunte 13 evolucionada con backend

## Índice de apuntes (orden recomendado)

- [15 · React: gestión de estado y tipado de formularios](apuntes/s05/15_React_Gestion_Estado_y_Formularios.md) — `useState`/`useEffect`, lifting state up, eventos por props, `fetch` + cliente `api`, `useEffect` de carga con tres estados, formularios controlados con validación (15.6) y `localStorage` como patrón de persistencia (15.8).

## Práctica

La app completa de la sesión es la AppCine con backend en [`repos/02-react-ejemplo-pelis-api`](../repos/02-react-ejemplo-pelis-api/) — evolución directa de la app del apunte 13:

- Carga con `useEffect` + `AbortController` y tres estados de carga (`peliculas`/`cargando`/`error`).
- CRUD async vía el cliente `api` (`src/api.ts`), formulario en `Modal` y buscador con debounce (`useRef`).
- `PeliculaForm` con validación (`ErroresForm` + `validar`) y búsqueda persistida en `localStorage`.

Ejecución (2 terminales): `npm run api` (json-server en el puerto 3001) + `npm run dev`. Todo lo nuevo respecto al apunte 13 está marcado en el código con comentarios `//JMM:`.

Complementos (demos sueltas) en [`repos/02-react-componentes`](../repos/02-react-componentes/):

- `src/state/FormularioRegistro.tsx` — formulario controlado con validación (catálogo de todos los controles).
- `src/hooks/useForm.ts` — hook de formulario genérico con `Partial<Record<keyof T, string>>`.

Para ejecutarlos: `cd repos/02-react-componentes && npm run dev`.

> 🧭 **Por dónde empezar:** mira primero el [`App.tsx` de AppCine](../repos/02-react-ejemplo-pelis-api/src/App.tsx); las demos están en la pestaña **Estado** de la app de componentes (ver [mapeo de sesiones](../repos/02-react-componentes/README.md#mapeo-de-sesiones)).

[Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md) [S13](sesion13.md)
