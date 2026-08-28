# Testing en React: Vitest + Playwright

![Sesion](https://img.shields.io/badge/Sesion-S12-blue)
![Vitest](https://img.shields.io/badge/Vitest-Unit-729B1B?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)
![Testing--Library](https://img.shields.io/badge/Testing--Library-React-E33332?logo=testing-library&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto con tests unitarios (Vitest + Testing Library), tests E2E (Playwright) y ejercicios autoevaluables de TypeScript.

## Estructura

```
├── src/
│   ├── components/
│   │   ├── Contador.tsx            Componente con estado
│   │   ├── Saludo.tsx              Componente con props
│   │   └── FormularioLogin.tsx     Formulario con validacion
│   ├── hooks/
│   │   └── useForm.ts              Hook de formulario
│   ├── utils/
│   │   └── matematicas.ts          Funciones utilitarias
│   ├── test/
│   │   └── setup.ts                Setup de Vitest (jest-dom)
│   ├── __tests__/
│   │   ├── Contador.test.tsx       Tests del contador
│   │   ├── Saludo.test.tsx         Tests del saludo
│   │   ├── FormularioLogin.test.tsx Tests del formulario
│   │   ├── useForm.test.ts         Tests del hook
│   │   └── matematicas.test.ts     Tests de funciones puras
│   ├── App.tsx
│   └── main.tsx
├── e2e/
│   └── navegacion.spec.ts          Test E2E con Playwright
├── tests-ejercicios-ts/
│   ├── 01-arrays.test.ts           Ejercicio: arrays
│   ├── 02-objetos.test.ts          Ejercicio: objetos
│   ├── 03-funciones.test.ts        Ejercicio: funciones
│   └── 04-estado-reducer.test.ts   Ejercicio: estado/reducer
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── playwright.config.ts
```

## Ejecutar

```bash
npm install

# Tests unitarios
npx vitest

# Tests E2E (requiere instalar navegadores)
npx playwright install
npx playwright test
```

## Dependencias

- `vitest` - Test runner
- `@testing-library/react` - Testing de componentes React
- `@testing-library/jest-dom` - Matchers del DOM
- `@playwright/test` - Tests E2E
- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `typescript`
