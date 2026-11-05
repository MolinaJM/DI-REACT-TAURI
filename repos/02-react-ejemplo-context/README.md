# React Context: contador compartido entre hermanos

![Tecnologia](https://img.shields.io/badge/Tecnologia-React-61DAFB?logo=react&logoColor=black)
![Framework](https://img.shields.io/badge/Framework-Vite-646CFF?logo=vite&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto Vite + React que muestra cómo compartir estado entre **componentes hermanos** con `createContext` + `useContext`, sin pasar props de padre a hijo en cadena.

## Qué demuestra

- **`createContext` + `useContext`**: un contexto tipado (`ContadorContextType`) y un hook custom `useContador()` que lanza error si se usa fuera del `Provider`.
- **`Provider` con `useState`**: el estado vive en un ancestro común (`ContadorProvider`) y expone `{ contador, incrementar }`.
- **Hermanos sin props**: `ContadorMostrar` (lee) y `ContadorBoton` (escribe) comparten el mismo estado **sin** que el padre les pase nada.
- **Contraste con lifting state up**: en [`02-react-ejemplo-minimo`](../02-react-ejemplo-minimo/) el estado se sube al padre y baja por props; aquí se evita ese encadenado con Context.

## Estructura

```
├── src/
│   ├── components/
│   │   ├── ContadorMostrar.tsx   Hermano que lee el contador (useContext)
│   │   └── ContadorBoton.tsx     Hermano que incrementa (useContext)
│   ├── ContadorContext.tsx       createContext + Provider + hook useContador
│   ├── tipos.ts                  interface ContadorContextType
│   ├── App.tsx                   Envuelve a los hermanos con ContadorProvider
│   └── main.tsx                  Punto de entrada (lo crea Vite)
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

A diferencia de `02-react-componentes` (el ejemplo completo de las sesiones S04–S06), este repo no lleva Tailwind ni componentes extra: el mínimo para ver `useContext` en acción.

## Relación con el repo mínimo

La **misma idea de compartir estado entre hermanos** en [`02-react-ejemplo-minimo`](../02-react-ejemplo-minimo/) se hace con *lifting state up* (el estado vive en `App` y baja por props). Aquí se hace con `createContext`/`useContext`: cualquier descendiente del `Provider` accede al estado directamente, sin encadenar props.
