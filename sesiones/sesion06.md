# Sesión 6: Creación de Componentes Personalizados

Componentes reutilizables, props, composición y slots

[← Volver al Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13)

---

> 📚 **Apuntes:** [s06 · A16 · Creación de Componentes Personalizados](apuntes/s06/16_React_Creacion_de_Componentes_Personalizados.md) · 💻 **Código:** [`repos/02-react-ejemplo-pelis-componentes`](../repos/02-react-ejemplo-pelis-componentes/) — la AppCine del apunte 15 reconstruida con componentes personalizados

## Índice de apuntes (orden recomendado)

- [16 · React: creación de componentes personalizados](apuntes/s06/16_React_Creacion_de_Componentes_Personalizados.md) — composición y `children`, componentes en ficheros propios: `Buscador` y `PeliculaForm` (16.3.1–16.3.2) y la tabla de películas con `PeliculaTable` (16.3.3), composición de la pantalla principal (16.4), botón personalizado con `extends ButtonHTMLAttributes` (16.5), Modal con overlay + `useEffect` de limpieza (16.6) y tabla genérica con componentes `<T>` (16.7).
- [13 · TypeScript aplicado a React](apuntes/s04/13_Tipado_en_React_TS.md) — repaso del tipado avanzado que sostiene estos componentes: `keyof T`, componentes genéricos `<T>` y utility types.

## Práctica

La app completa de la sesión es [`repos/02-react-ejemplo-pelis-componentes`](../repos/02-react-ejemplo-pelis-componentes/) — la AppCine del apunte 15 reconstruida con componentes personalizados:

- `src/components/Boton.tsx` — botón reutilizable con variantes (`ButtonHTMLAttributes` + `Record<Variante, ...>`), usado por `PeliculaRow` y `PeliculaForm`.
- `src/components/Buscador.tsx` — input controlado que avisa al padre con `onBuscar`.
- `src/components/Spinner.tsx` + renderizado condicional en `App` (cargando / vacío / error).
- `src/components/Modal.tsx` — overlay, `children`, bloqueo de scroll, cierre con `Escape` y click-outside.
- `src/components/PeliculaTable.tsx` y `src/components/TablaGenerica.tsx` — listas con `key` y tabla genérica `<T>` con `Columna<T>`/`keyExtractor` (reutilizada con `Pelicula` y `ResumenGenero`).

Ejecución (2 terminales): `npm run api` (json-server en el puerto 3000) + `npm run dev`. Todo lo nuevo respecto al apunte 15 está marcado en el código con los pares de comentarios `//JMM - Inicio Nuevo con respecto a 15` / `//JMM - Fin Nuevo con respecto a 15`.

Complementos (demos sueltas) en [`repos/02-react-componentes`](../repos/02-react-componentes/):

- `src/components/Boton.tsx`, `Modal.tsx` y `TablaGenerica.tsx` — pestaña **Personalizados**.
- `src/components/Card.tsx`, `CardPelicula.tsx` y `TablaPeliculas.tsx` — pestaña **Cards**.

Para ejecutarlos: `cd repos/02-react-componentes && npm run dev`.

> 🧭 **Por dónde empezar:** mira primero el [`App.tsx` de AppCine](../repos/02-react-ejemplo-pelis-componentes/src/App.tsx); las demos están en las pestañas **Personalizados** y **Cards** de la app de componentes (ver [mapeo de sesiones](../repos/02-react-componentes/README.md#mapeo-de-sesiones)).

[Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md) [S13](sesion13.md)
