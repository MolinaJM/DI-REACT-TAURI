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
npm run tauri dev
```

> ⚠️ **IMPORTANTE — usa `npm run tauri dev`, NO `npm run dev`.**
>
> - `npm run tauri dev` → abre la app en la **ventana nativa de Tauri** (donde `invoke` funciona).
> - `npm run dev` → abre la web en el **navegador** (Chrome/Firefox). En el navegador `invoke` **no existe**, así que el botón fallará con:
>   `TypeError: Cannot read properties of undefined (reading 'invoke')`.
>
> Ese error **no es un bug del código**; es la diferencia entre correr la web sola o dentro de Tauri. Para probar la app, ejecuta siempre `npm run tauri dev`.

## Nota: mirror de Cargo (si `tauri dev` se queda colgado en "Updating crates.io index")

Al compilar por primera vez, Cargo descarga muchas dependencias de Rust. Si se queda parado en
`Updating crates.io index` con un error tipo `spurious network error` o `SSL connect error`, es que tu conexión no alcanza el índice de Cargo (a veces por problemas de red o del antivirus/firewall).

Este proyecto ya incluye la solución en `src-tauri/.cargo/config.toml`: Cargo usa un **espejo (mirror)** en vez del índice oficial. Si sigues teniendo problemas, revisa/añade el mismo contenido en tu config global de Cargo:

- **Windows:** `C:\Users\<tu_usuario>\.cargo\config.toml`
- **Linux/WSL:** `~/.cargo/config.toml`

```toml
[net]
retry = 3

[source.crates-io]
replace-with = "tuna-sparse"

[source.tuna-sparse]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"
```

Si un mirror falla, basta cambiar la URL por otro espejo (p. ej. `https://rsproxy.cn/index/` o `https://mirrors.aliyun.com/crates.io-index/`).

## Dependencias

- Frontend: `react`, `react-dom`, `@tauri-apps/api`, `vite`, `typescript`.
- Backend: `tauri` v2, `serde`, `serde_json` (Rust + Cargo).

**Requisito:** Node.js + Rust + Microsoft C++ Build Tools (Windows) o `build-essential` (Linux).
