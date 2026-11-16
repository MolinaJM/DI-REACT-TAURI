# React Pelis: gestor de películas (formulario + tabla)

![Tecnologia](https://img.shields.io/badge/Tecnologia-React-61DAFB?logo=react&logoColor=black)
![Framework](https://img.shields.io/badge/Framework-Vite-646CFF?logo=vite&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto Vite + React que implementa el **ejemplo corriendo** del apunte [13 · TypeScript aplicado a React](../../sesiones/apuntes/s04/13_Tipado_en_React_TS.md): una app de películas (AppCine) con **formulario** para crear/editar y **tabla** para listar, editar y borrar.

## Qué demuestra

- **Modelo de datos** con `interface Pelicula` y tipos derivados (`Omit`, `Pick`, `Partial`) — §13.1 y §13.3.2.
- **`Record<string, string>`** para los colores por género — §13.3.1.
- **Props tipadas** con `interface XProps` en cada componente — §13.2.
- **`useState<Pelicula[]>`** para la lista y **`useState<number | null>`** (`enEdicion`) con estado derivado `peliculaEnEdicion` — §13.5.
- **Conversiones** de texto a número con `Number.parseInt`/`Number.parseFloat` — §13.6.2.
- **Eventos tipados** (`SubmitEvent`, `ChangeEvent` por `name`) — §13.7 (los clicks van inline: React infiere el evento).
- **CRUD** con inmutabilidad: `añadir`/`editar`/`borrar`, estado derivado (`peliculaEnEdicion`) y `key` del formulario para reinicializarlo al editar — §13.8.

## Estructura

```
├── src/
│   ├── components/
│   │   ├── PeliculaRow.tsx    Fila de la tabla (color de género + botones editar/borrar)
│   │   └── PeliculaForm.tsx   Formulario crear/editar (objeto `valores` + `handleChange` por `name`)
│   ├── App.tsx                Estado (`enEdicion`), CRUD y composición (formulario + tabla)
│   ├── tipos.ts               Pelicula, NuevaPelicula, FilaMinima, Cambios
│   ├── colorGenero.ts         Record<string,string> + colorDeGenero()
│   └── main.tsx               Punto de entrada (lo crea Vite)
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Ejecutar

```bash
npm install
npm run dev
```

## Dependencias

- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `typescript`

A diferencia de `02-react-componentes` (el ejemplo completo de las sesiones S04–S06), este repo no lleva Tailwind ni componentes extra: es el mínimo para ver el tipado de React en acción (props, generics, utility types y eventos) sobre una app de películas.

## Relación con el apunte 13

Cada bloque **🔧 Lo añadimos al ejemplo** del apunte [13 · TypeScript aplicado a React](../../sesiones/apuntes/s04/13_Tipado_en_React_TS.md) corresponde a un trozo de este repo:

| Apartado | Archivo |
|---|---|
| §13.1 Modelo de datos | `tipos.ts` |
| §13.2 Tipado de props | `components/PeliculaRow.tsx` |
| §13.3.1 `Record` colores | `colorGenero.ts` |
| §13.3.2 `Omit`/`Pick`/`Partial` | `tipos.ts` |
| §13.4 Props opcionales | `components/PeliculaForm.tsx` |
| §13.5 `useState<T>` | `App.tsx` |
| §13.6.2 `parseInt`/`parseFloat` | `components/PeliculaForm.tsx` |
| §13.7 Eventos tipados | `components/PeliculaForm.tsx` |
| §13.8 App completa | `App.tsx` |
