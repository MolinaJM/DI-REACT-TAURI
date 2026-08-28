# React: Componentes, Hooks y Formularios

![Sesiones](https://img.shields.io/badge/Sesiones-S04--S06-blue)
![Tecnologia](https://img.shields.io/badge/Tecnologia-React-61DAFB?logo=react&logoColor=black)
![Framework](https://img.shields.io/badge/Framework-Vite-646CFF?logo=vite&logoColor=white)
![Estilos](https://img.shields.io/badge/Estilos-Tailwind-06B6D4?logo=tailwindcss&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto Vite + React que demuestra creacion de componentes, hooks fundamentales, gestion de estado con useReducer, formularios controlados y patrones de composicion.

## Estructura

```
├── src/
│   ├── components/
│   │   ├── Saludo.tsx            S04 - Componente basico con props
│   │   ├── Card.tsx              S04 - Card con children
│   │   ├── ListaTareas.tsx       S04 - Lista con useState + useEffect
│   │   ├── ListaUsuarios.tsx     S04 - Fetch de datos
│   │   ├── Boton.tsx             S06 - ButtonHTMLAttributes + variantes
│   │   ├── Modal.tsx             S06 - Portal + composicion
│   │   └── TablaGenerica.tsx     S06 - Tabla generica <T>
│   ├── hooks/
│   │   └── useForm.ts            S05 - Hook de formulario controlado
│   ├── state/
│   │   ├── useReducerEjemplo.tsx S05 - Contador con useReducer
│   │   ├── FormularioRegistro.tsx S05 - Formulario completo
│   │   └── localStorage.ts       S05 - Persistencia en storage
│   ├── patterns/
│   │   ├── CleanCode.ts          S04 - IIFE, closures, modules
│   │   └── AdvancedFunctions.ts  S04 - Patron Factory, Pure Functions
│   ├── App.tsx
│   └── main.tsx
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
