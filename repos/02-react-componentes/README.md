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
│   ├── views/                        Navegacion por pestanas (una vista por seccion)
│   │   ├── Inicio.tsx                S04 - Pagina principal (indice de secciones)
│   │   ├── Basicos.tsx               S04 - Saludo, Card, ListaTareas, ListaUsuarios
│   │   ├── Controles.tsx             S04 - Controles de formulario
│   │   ├── Hooks.tsx                 S04 - useRef, useContext, stale closure, Reloj
│   │   ├── Extras.tsx                S04/S05 - Toast y Paginacion
│   │   ├── Personalizados.tsx        S06 - Boton, Modal, TablaGenerica
│   │   ├── Estado.tsx                S05 - useReducer, FormularioRegistro
│   │   ├── Swapi.tsx                 S04 - Carga de datos (fetch a SWAPI)
│   │   └── Cards.tsx                 S04 - Tarjetas de pelicula (Card, CardBorde, Tabla)
│   ├── components/
│   │   ├── Saludo.tsx                S04 - Componente basico con props
│   │   ├── Card.tsx                  S04 - Card con children
│   │   ├── ListaTareas.tsx           S04 - Lista con useState
│   │   ├── ListaUsuarios.tsx         S04 - Fetch de datos (3 estados)
│   │   ├── TextInput.tsx             S04 - Input controlado basico
│   │   ├── Label.tsx                 S04 - label htmlFor tipado
│   │   ├── Select.tsx                S04 - Desplegable controlado
│   │   ├── RadioGroup.tsx            S04 - Grupo de radios
│   │   ├── Checkbox.tsx              S04 - Grupo de checkboxes
│   │   ├── SearchBox.tsx             S04 - Buscador con boton limpiar
│   │   ├── ControlesFormulario.tsx   S04 - Demo: agrupa los controles sueltos
│   │   ├── RenderCounter.tsx         S04 - useRef (DOM + valor persistente)
│   │   ├── SagaContext.tsx           S04 - useContext (provider + hook custom)
│   │   ├── LikeCounter.tsx           S04 - Stale closure vs actualizacion funcional
│   │   ├── Reloj.tsx                 S04 - useEffect + setInterval + cleanup
│   │   ├── Toast.tsx                 S04/S05 - Notificacion auto-cerrable
│   │   ├── Pagination.tsx            S04/S05 - Paginacion
│   │   ├── Boton.tsx                 S06 - ButtonHTMLAttributes + variantes
│   │   ├── Modal.tsx                 S06 - Portal + composicion
│   │   ├── TablaGenerica.tsx         S06 - Tabla generica <T>
│   │   ├── CardPelicula.tsx          S04 - Tarjeta de pelicula (campos opcionales)
│   │   ├── CardBordePelicula.tsx     S04 - Tarjeta de pelicula con borde
│   │   └── TablaPeliculas.tsx        S04 - Tabla de peliculas
│   ├── hooks/
│   │   └── useForm.ts                S05 - Hook de formulario controlado
│   ├── state/
│   │   ├── useReducerEjemplo.tsx     S05 - Contador con useReducer
│   │   └── FormularioRegistro.tsx    S05 - Formulario completo
│   ├── types.ts                      S04 - Tipos compartidos (Opcion, Pelicula, SwapiFilm, SwapiList)
│   ├── App.tsx                       Navegacion por pestanas
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Mapeo de sesiones

Cada apunte del curso tiene sus ejemplos en una o varias pestañas de la app. Al terminar de leer un apunte, ve a la pestaña indicada para ver el código en acción.

| Sesión | Apunte | Pestaña(s) en la app | Ejemplos |
|---|---|---|---|
| S04 | [12 · Tres Patrones](../../sesiones/apuntes/s04/12_Tres_Patrones_React.md) | Básicos · Controles · Hooks · Extras · SWAPI | Saludo, Card, ListaTareas, ListaUsuarios, ControlesFormulario, RenderCounter, SagaContext, LikeCounter, Reloj, Toast, Pagination, Swapi |
| S04 | [13 · Tipado en React + TS](../../sesiones/apuntes/s04/13_Tipado_en_React_TS.md) | Hooks · Básicos · Controles · Personalizados | RenderCounter, Saludo, Card, TextInput, Select, SearchBox, Boton, TablaGenerica |
| S05 | [15 · Estado y Formularios](../../sesiones/apuntes/s05/15_React_Gestion_Estado_y_Formularios.md) | Estado | useReducerEjemplo, FormularioRegistro, useForm |
| S06 | [16 · Componentes Personalizados](../../sesiones/apuntes/s06/16_React_Creacion_de_Componentes_Personalizados.md) | Personalizados · Cards | Boton, Modal, TablaGenerica, CardPelicula, CardBordePelicula, TablaPeliculas |

> 💡 La pestaña **Inicio** es el índice: desde ahí se navega a cada sección.

## Ejecutar

```bash
npm install
npm run dev
```

## Dependencias

- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `typescript`
