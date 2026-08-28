# React Avanzado: Estado Global, Routing, API y PDF

![Sesiones](https://img.shields.io/badge/Sesiones-S08--S11-blue)
![Zustand](https://img.shields.io/badge/Zustand-Estado-2D2D2D?logo=zustand&logoColor=white)
![Router](https://img.shields.io/badge/React--Router-v6-CA4245?logo=reactrouter&logoColor=white)
![PDF](https://img.shields.io/badge/@react--pdf/renderer-PDF-FF6B35)
![Tailwind](https://img.shields.io/badge/Tailwind--CSS-Estilos-06B6D4?logo=tailwindcss&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto Vite + React con Context API, Zustand, React Router v6, servicio CRUD generico, estilos con Tailwind CSS y generacion de PDF.

## Estructura

```
├── src/
│   ├── context/
│   │   └── AuthProvider.tsx        S08 - Context + useReducer (auth)
│   ├── store/
│   │   └── carritoStore.ts         S08 - Zustand store con persist
│   ├── routing/
│   │   ├── AppRouter.tsx           S08 - React Router v6
│   │   └── RouterSPA.ts            S08 - Router custom con History API
│   ├── api/
│   │   ├── ApiService.ts           S09 - Clase generica ApiService<T>
│   │   ├── crud.ts                 S09 - GET/POST/PUT/DELETE
│   │   └── validacion.ts           S09 - Validacion de formularios
│   ├── styles/
│   │   ├── Dashboard.tsx           S10 - Layout responsive (Tailwind)
│   │   ├── Navbar.tsx              S10 - Navbar + hamburger menu
│   │   └── Animations.tsx          S10 - Animaciones y transiciones
│   ├── pdf/
│   │   ├── InformePDF.tsx          S11 - Documento PDF con @react-pdf/renderer
│   │   ├── InformeTablas.tsx       S11 - Tablas en PDF
│   │   └── PDFViewer.tsx           S11 - Visor y descarga de PDF
│   ├── components/
│   │   └── AlmacenPersistente.ts   S08 - Almacen con localStorage
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
- `zustand` - Estado global
- `react-router-dom` - Enrutado
- `@react-pdf/renderer` - Generacion de PDF
- `tailwindcss` - Estilos
- `vite`, `@vitejs/plugin-react`
- `typescript`
