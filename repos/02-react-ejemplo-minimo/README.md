# React Mínimo: Caja de texto y botón

![Tecnologia](https://img.shields.io/badge/Tecnologia-React-61DAFB?logo=react&logoColor=black)
![Framework](https://img.shields.io/badge/Framework-Vite-646CFF?logo=vite&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto Vite + React super simple: una caja de texto y un botón. Muestra la mínima expresión de lo que es una app React y dos componentes comunicados por props.

## Qué demuestra

- **Dos componentes funcionales** comunicados por props (`FormularioNombre` y `Saludo`).
- **Estado local** con `useState` en un componente (`FormularioNombre`).
- **Callback**: el hijo avisa al padre (`onEnviar`) y el padre decide qué hacer con el dato.
- **Lifting state up**: el estado vive en `App` (el padre) y los datos bajan por props.

## Estructura

```
├── src/
│   ├── components/
│   │   ├── FormularioNombre.tsx   Caja de texto + botón (estado local + callback)
│   │   └── Saludo.tsx             Muestra "¡Hola, {nombre}!" (solo props)
│   ├── App.tsx                    Padre: mantiene el estado y compone los dos
│   └── main.tsx                   Punto de entrada (lo crea Vite)
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

A diferencia de `02-react-componentes` (el ejemplo completo de las sesiones S04–S06), este repo no lleva Tailwind ni componentes extra: el mínimo para ver dos componentes, estado y props en acción.

## Evolución → Tauri

La **misma app en Tauri** vive en [`03-tauri-ejemplo-minimo`](../03-tauri-ejemplo-minimo/): aquí el saludo se crea con estado local de React; allí el nombre viaja a Rust con `invoke()` y el saludo lo devuelve el backend. Compara ambos para ver el puente React ↔ Rust en su forma más pequeña.