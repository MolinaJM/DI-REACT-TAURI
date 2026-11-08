# Sesión 4: Anatomía de Componentes y TypeScript en React

Componentes funcionales, props, children y primeros hooks con tipado

[← Volver al Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13)

---

> 📚 **Apuntes:** [s04 · A11–A13](apuntes/s04/) · 💻 **Código:** [`repos/02-react-componentes`](../repos/02-react-componentes/)

## Índice de apuntes (orden recomendado)

- [11 · Qué es React (teoría de partida)](apuntes/s04/11_Que_es_React.md) — repaso de TypeScript previo (el puente: tipos, módulos, arrays inmutables, `fetch` con estados) y qué es React: modelo mental (declarativo, Virtual DOM), componentes, JSX, props, estado, hooks y su relación con TypeScript.
- [12 · Los tres patrones de React](apuntes/s04/12_Tres_Patrones_React.md) — los tres patrones (`componente`, `useState`, `useEffect`) con código, ejemplo completo (gestor de tareas), el ciclo estado → render → eventos, errores comunes y debugging.
- [13 · TypeScript aplicado a React: props, eventos y generics](apuntes/s04/13_Tipado_en_React_TS.md) — tipar props, `useState<T>`, `useRef<T>`, utility types, eventos y `strict` mode.
- [14 · React & TypeScript Cheatsheet (Decálogo)](apuntes/s04/14_React_TS_Cheatsheet.md) — consulta rápida de las 10 reglas de oro.

## Práctica

Los ejemplos ejecutables están en el repositorio [`repos/02-react-componentes`](../repos/02-react-componentes/): `src/components/Saludo.tsx`, `Card.tsx`, `ListaTareas.tsx`, `ListaUsuarios.tsx`, `TablaGenerica.tsx`, `Boton.tsx`, `TextInput.tsx`, `Select.tsx`, `RadioGroup.tsx`, `Checkbox.tsx`, `SearchBox.tsx`, `ControlesFormulario.tsx`, `RenderCounter.tsx`, `SagaContext.tsx`, `LikeCounter.tsx`, `Reloj.tsx`, `Toast.tsx`, `Pagination.tsx` y `src/hooks/useForm.ts`. Para ejecutarlos: `cd repos/02-react-componentes && npm run dev`.



[Índice](../README.md#5-distribución-temporal-y-contenidos-s00s13) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md) [S13](sesion13.md)
