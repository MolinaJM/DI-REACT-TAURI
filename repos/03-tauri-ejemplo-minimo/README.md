# Tauri Mínimo: Caja de texto y botón

![Tecnologia](https://img.shields.io/badge/Tecnologia-Tauri-FFC131?logo=tauri&logoColor=black)
![Rust](https://img.shields.io/badge/Rust-backend-CE422B?logo=rust&logoColor=white)
![React](https://img.shields.io/badge/React-frontend-61DAFB?logo=react&logoColor=black)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

La misma idea que el ejemplo mínimo de React (`02-react-ejemplo-minimo`), pero **en Tauri**: una caja de texto y un botón que saludan. Aquí el saludo lo genera el **backend Rust** y viaja de vuelta por `invoke()`, en lugar de componerse solo con estado de React.

## Qué demuestra (la evolución)

| `02-react-ejemplo-minimo` (React puro) | `03-tauri-ejemplo-minimo` (Tauri) |
|---|---|
| El saludo se arma en React con `useState`. | El nombre se envía con `invoke("saludar", { nombre })` y el saludo **lo devuelve Rust**. |
| Todo vive en el frontend (web). | Hay **dos mundos**: React (frontend) ↔ Rust (backend) por IPC. |
| Sin backend. | Comando `#[tauri::command]` en `src-tauri/src/lib.rs`. |

Es el "puente mínimo": lo que ya sabías de React/components, más **una llamada `invoke()`** al backend.

## Qué contiene

- **Frontend** (`src/`)
  - `App.tsx` — estado del nombre, llama a `invoke("saludar")` y muestra el saludo.
  - `components/FormularioNombre.tsx` — caja de texto + botón (igual que el ejemplo React).
  - `main.tsx` — punto de entrada (`createRoot`).
- **Backend** (`src-tauri/src/`)
  - `lib.rs` — comando `saludar(nombre) -> String` registrado en `generate_handler!`.
  - `main.rs` — punto de entrada que llama a `::run()`.

## Ejecutar

```bash
npm install
npx tauri dev
```

## Dependencias

- Frontend: `react`, `react-dom`, `@tauri-apps/api`, `vite`, `typescript`.
- Backend: `tauri` v2, `serde`, `serde_json` (Rust + Cargo).

**Requisito:** Node.js + Rust + Microsoft C++ Build Tools (Windows) o `build-essential` (Linux).
