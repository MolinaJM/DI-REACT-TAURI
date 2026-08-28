# Scaffolding de un Proyecto Tauri con React y Rust

Estructura completa de archivos y carpetas, y qué hace cada uno

[← Volver al Índice](index.md)

---

## 1. Estructura completa del proyecto

Al crear un proyecto con `npm create vite@latest` y luego ejecutar `npx tauri init`, se genera la siguiente estructura:

```
mi-app/
├── index.html                  # Punto de entrada HTML (Vite lo usa como base)
├── package.json                # Dependencias JS, scripts y metadatos del proyecto
├── package-lock.json           # Lockfile: versiones exactas de todas las dependencias
├── tsconfig.json               # Configuracion de TypeScript
├── vite.config.ts              # Configuracion del bundler Vite
├── tailwind.config.js          # Configuracion de Tailwind CSS (si se usa)
├── postcss.config.js           # Configuracion de PostCSS (necesario para Tailwind)
│
├── src/                        # Codigo fuente del FRONTEND (React/TypeScript)
│   ├── main.tsx                # Punto de entrada: renderiza el componente raiz
│   ├── App.tsx                 # Componente principal de la aplicacion
│   ├── App.css                 # Estilos del componente App
│   ├── index.css               # Estilos globales (directivas de Tailwind aqui)
│   └── assets/                 # Recursos estaticos (imagenes, fuentes, etc.)
│
├── public/                     # Archivos publicos copiados tal cual al build
│   └── vite.svg
│
└── src-tauri/                  # Codigo fuente del BACKEND (Rust + configuracion Tauri)
    ├── Cargo.toml              # Manifesto de Rust: dependencias y metadata del crate
    ├── Cargo.lock              # Lockfile de Rust: versiones exactas de crates
    ├── tauri.conf.json         # Configuracion central de Tauri (ventana, permisos, build)
    ├── capabilities/           # Permisos de la aplicacion (Tauri v2)
    │   └── default.json        # Permisos por defecto de la ventana
    ├── icons/                  # Iconos de la aplicacion (para menu, escritorio, etc.)
    │   ├── icon.png
    │   ├── icon.ico
    │   └── ...
    ├── src/                    # Codigo Rust del backend
    │   ├── main.rs             # Punto de entrada: configura y lanza la ventana
    │   └── lib.rs              # Logica principal: comandos, eventos, estado
    └── target/                 # (generado) Compilacion de Rust (pesado, no commitear)
```

## 2. Archivos clave del FRONTEND (src/)

### index.html

Punto de entrada que Vite procesa. Contiene un `<div id="root">` donde React monta la aplicación.

```
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi App Tauri</title>
  </head>
  <body>
    <div id="root"></div>          <!-- React monta aqui -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### src/main.tsx

Primero en ejecutarse. Renderiza `<App />` dentro del div root.

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### src/App.tsx

Componente raiz. Aqui va la interfaz principal de tu aplicación.

```
function App() {
  return (
    <div>
      <h1>Mi App Tauri</h1>
    </div>
  )
}

export default App
```

### src/index.css

Estilos globales. Si usas Tailwind, aqui van las directivas:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 3. Archivos clave del BACKEND (src-tauri/)

### Cargo.toml

Equivalente al `package.json` pero para Rust. Define las dependencias (crates) y la metadata del proyecto.

```
[package]
name = "mi-app"
version = "0.1.0"
description = "Una app Tauri"
authors = ["tu"]
edition = "2021"

[dependencies]
tauri = { version = "2", features = [] }    # Framework Tauri v2
tauri-plugin-opener = "2"                   # Plugin para abrir URLs y archivos
serde = { version = "1", features = ["derive"] }  # Serializacion/deserializacion JSON
serde_json = "1"                            # Soporte JSON

[build-dependencies]
tauri-build = { version = "2", features = [] }

[lib]
name = "mi_app_lib"
crate-type = ["lib", "cdylib", "staticlib"]  # Tipos de binario que genera
```

### tauri.conf.json

Configuración central de la aplicación Tauri. Define la ventana, el build, los permisos y mas.

```
{
  "$schema": "https://raw.githubusercontent.com/nicktomlin/tauri/v2/core/tauri-config-schema/schema.json",
  "productName": "mi-app",
  "version": "0.1.0",
  "identifier": "com.mi-app.dev",
  "build": {
    "frontendDist": "../dist",           # Donde Vite deja el build del frontend
    "devUrl": "http://localhost:5173",    # URL del servidor de desarrollo de Vite
    "beforeDevCommand": "npm run dev",   # Comando antes de `tauri dev`
    "beforeBuildCommand": "npm run build" # Comando antes de `tauri build`
  },
  "app": {
    "windows": [
      {
        "title": "Mi App Tauri",
        "width": 800,
        "height": 600
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
```

### src/main.rs

Punto de entrada del backend. Configura y lanza la ventana Tauri.

```
// Prevencion de ventana de consola en Windows en produccion
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    mi_app_lib::run()
}
```

### src/lib.rs

Lógica principal. Aquí se registran los comandos, eventos y el estado de la aplicacion.

```
use tauri::Manager;

// Comando personalizado que el frontend puede llamar
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hola desde Rust, {}!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])  # Registra el comando greet
        .run(tauri::generate_context!())
        .expect("error al ejecutar Tauri");
}
```

### capabilities/default.json

Define los permisos que tiene la aplicación (Tauri v2 usa un sistema de permisos por capas).

```
{
  "identifier": "default",
  "description": "Permisos por defecto de la ventana principal",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "opener:default"
  ]
}
```

## 4. Flujo de ejecución: qué pasa cuando lanzas la app

### Con `npx tauri dev` (modo desarrollo)

- Tauri ejecuta `beforeDevCommand`: `npm run dev` (arranca el servidor Vite en `localhost:5173`)
- Rust compila `src/main.rs` y `src/lib.rs` en un binario nativo
- El binario abre una ventana nativa que carga el frontend desde `http://localhost:5173`
- Cambios en el frontend (React/TS): Vite recarga al instante (HMR)
- Cambios en el backend (Rust): Tauri recompila automaticamente

### Con `npx tauri build` (produccion)

- Tauri ejecuta `beforeBuildCommand`: `npm run build` (Vite genera `dist/`)
- Rust compila en modo release (optimizado, más lento)
- El frontend de `dist/` se incrusta **dentro del binario** (no necesita servidor)
- Se genera un instalador nativo: `.msi` (Windows), `.dmg` (macOS), `.deb`/`.AppImage` (Linux)
- El binario final estara en `src-tauri/target/release/`

> En producción, el frontend se sirve desde el propio binario. No hay servidor web, no hay Node.js. Todo está empaquetado en un único ejecutable.

## 5. Comunicacion Frontend ↔ Backend

Tauri permite que React (TypeScript) llame a funciones Rust de forma sencilla usando el sistema de **comandos**.

### Llamar a un comando Rust desde TypeScript

```
import { invoke } from '@tauri-apps/api/core'

// Llama al comando "greet" definido en lib.rs
const mensaje = await invoke('greet', { name: 'Estudiante' })
console.log(mensaje) // "Hola desde Rust, Estudiante!"
```

### Definir un comando en Rust

```
// lib.rs
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hola desde Rust, {}!", name)
}

// No olvides registrar el comando en Builder:
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error al ejecutar Tauri");
}
```

> El nombre del comando en `invoke('greet')` debe coincidir exactamente con el nombre de la función Rust. Si cambias el nombre en Rust, cámbialo también en TypeScript.

## 6. Resumen visual

```
  ┌─────────────────────────────────────────────────────┐
  │                  APLICACION TAURI                    │
  │                                                     │
  │  ┌───────────────────┐    ┌───────────────────────┐ │
  │  │   FRONTEND (Web)  │    │   BACKEND (Nativo)    │ │
  │  │                   │    │                       │ │
  │  │  src/             │    │  src-tauri/src/       │ │
  │  │  ├── main.tsx     │    │  ├── main.rs          │ │
  │  │  ├── App.tsx      │◄──►│  └── lib.rs           │ │
  │  │  └── index.css    │IPC │                       │ │
  │  │                   │    │  Cargo.toml           │ │
  │  │  React + TS       │    │  tauri.conf.json      │ │
  │  │  Tailwind CSS     │    │  Rust                 │ │
  │  └───────────────────┘    └───────────────────────┘ │
  │                                                     │
  │  Vite sirve el frontend en dev (localhost:5173)     │
  │  En build, el frontend se incrusta en el binario    │
  └─────────────────────────────────────────────────────┘
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
