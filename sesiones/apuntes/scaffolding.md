# Scaffolding de un Proyecto Tauri con React y Rust

Estructura completa de archivos y carpetas, y qué hace cada uno

> 🧭 **Sesión donde se aplica:** S01-S (arranque de un proyecto Tauri). Es complementario a la instalación del entorno.

[← Volver al Índice](../../README.md#5-distribución-temporal-y-contenidos-s00s13)

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
    ├── src/                    # Codigo Rust del backend
    │   ├── main.rs             # Punto de entrada: configura y lanza la ventana
    │   └── lib.rs              # Logica principal: comandos, eventos, estado
    └── target/                 # (generado) Compilacion de Rust (pesado, no commitear)
```

## 2. Archivos clave del FRONTEND (src/)

### index.html

Punto de entrada que Vite procesa. Contiene un `<div id="root">` donde React monta la aplicación.

```html
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

```tsx
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

```tsx
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

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 3. Archivos clave del BACKEND (src-tauri/)

### Cargo.toml

Equivalente al `package.json` pero para Rust. Define las dependencias (crates) y la metadata del proyecto.

```toml
[package]
name = "tauri-ipc-filesystem"
version = "0.1.0"
edition = "2021"

[dependencies]
tauri = { version = "2", features = [] }    # Framework Tauri v2
serde = { version = "1", features = ["derive"] }  # Serializacion/deserializacion JSON
serde_json = "1"                            # Soporte JSON

[build-dependencies]
tauri-build = { version = "2", features = [] }

[lib]
name = "tauri_ipc_filesystem"
crate-type = ["lib", "cdylib", "staticlib"]  # Tipos de binario que genera
```

### tauri.conf.json

Configuración central de la aplicación Tauri. Define la ventana, el build, los permisos y mas.

```json
{
  "$schema": "https://raw.githubusercontent.com/nicktomlin/tauri/v2/core/tauri-config-schema/schema.json",
  "productName": "tauri-ipc-filesystem",
  "version": "0.1.0",
  "identifier": "com.tauri-ipc-filesystem.dev",
  "build": {
    "frontendDist": "../dist",           # Donde Vite deja el build del frontend
    "devUrl": "http://localhost:5173",    # URL del servidor de desarrollo de Vite
    "beforeDevCommand": "npm run dev",   # Comando antes de `tauri dev`
    "beforeBuildCommand": "npm run build" # Comando antes de `tauri build`
  },
  "app": {
    "windows": [
      {
        "title": "Tauri IPC y Sistema de Archivos",
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

```rust
// Prevencion de ventana de consola en Windows en produccion
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri_ipc_filesystem::run()
}
```

### src/lib.rs

Lógica principal. Aquí se registran los comandos, eventos y el estado de la aplicacion.

```rust
use std::fs;
use tauri::Manager;

// Comando personalizado que el frontend puede llamar
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hola desde Rust, {}!", name)
}

#[tauri::command]
fn saludar(nombre: &str) -> String {
    format!("Hola, {}! Bienvenido a Tauri.", nombre)
}

#[tauri::command]
fn sumar(a: i32, b: i32) -> i32 {
    a + b
}

#[tauri::command]
fn obtener_info_sistema() -> Result<String, String> {
    let os = std::env::consts::OS;
    let arch = std::env::consts::ARCH;
    Ok(format!("SO: {}, Arquitectura: {}", os, arch))
}

#[tauri::command]
fn leer_archivo(ruta: String) -> Result<String, String> {
    fs::read_to_string(&ruta).map_err(|e| e.to_string())
}

#[tauri::command]
fn escribir_archivo(ruta: String, contenido: String) -> Result<(), String> {
    fs::write(&ruta, &contenido).map_err(|e| e.to_string())
}

#[tauri::command]
fn listar_directorio(ruta: String) -> Result<Vec<String>, String> {
    let entries = fs::read_dir(&ruta).map_err(|e| e.to_string())?;
    let mut archivos = Vec::new();
    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        archivos.push(entry.file_name().to_string_lossy().to_string());
    }
    Ok(archivos)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            saludar,
            sumar,
            obtener_info_sistema,
            leer_archivo,
            escribir_archivo,
            listar_directorio
        ])  # Registra los comandos del backend
        .run(tauri::generate_context!())
        .expect("error al ejecutar Tauri");
}
```

### capabilities/default.json

Define los permisos que tiene la aplicación (Tauri v2 usa un sistema de permisos por capas).

```json
{
  "identifier": "default",
  "description": "Permisos por defecto de la ventana principal",
  "windows": ["main"],
  "permissions": [
    "core:default"
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

```typescript
import { invoke } from '@tauri-apps/api/core'

// Llama al comando "greet" definido en lib.rs
const mensaje = await invoke('greet', { name: 'Estudiante' })
console.log(mensaje) // "Hola desde Rust, Estudiante!"
```

### Definir un comando en Rust

```rust
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

[Volver al índice general](../../README.md#5-distribución-temporal-y-contenidos-s00s13)
