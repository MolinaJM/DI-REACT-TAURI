# Tauri IPC y Sistema de Archivos

![Sesion](https://img.shields.io/badge/Sesion-S07-blue)
![Tauri](https://img.shields.io/badge/Tauri-v2-FFC131?logo=tauri&logoColor=black)
![Rust](https://img.shields.io/badge/Rust-backend-CE422B?logo=rust&logoColor=white)
![React](https://img.shields.io/badge/React-frontend-61DAFB?logo=react&logoColor=black)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto de ejemplo que demuestra la comunicacion IPC entre React (TypeScript) y Rust (Tauri), junto con operaciones de sistema de archivos y consumo de APIs REST.

## Estructura

```
├── src/                        # Frontend (React + TypeScript)
│   ├── main.tsx                # Punto de entrada React
│   ├── App.tsx                 # Componente principal
│   └── components/
│       ├── ComponenteIPC.tsx   # Invocacion de comandos Rust via invoke()
│       └── FetchCRUD.tsx       # Operaciones CRUD con Fetch API
│
└── src-tauri/                  # Backend (Rust)
    ├── src/
    │   ├── main.rs             # Punto de entrada Rust
    │   └── lib.rs              # Comandos Tauri (greet, saludar, sumar, etc.)
    ├── Cargo.toml              # Dependencias Rust
    ├── tauri.conf.json         # Configuracion Tauri
    └── build.rs                # Script de build
```

## Comandos Rust disponibles

| Comando               | Parametros                      | Descripcion                         |
|-----------------------|---------------------------------|-------------------------------------|
| `greet`               | `name: &str`                    | Saludo basico                       |
| `saludar`             | `nombre: &str`                  | Saludo personalizado                |
| `sumar`               | `a: i32, b: i32`               | Suma dos numeros                    |
| `obtener_info_sistema`| (sin parametros)                | Devuelve SO y arquitectura          |
| `leer_archivo`        | `ruta: String`                  | Lee el contenido de un archivo      |
| `escribir_archivo`    | `ruta: String, contenido: String`| Escribe contenido en un archivo    |
| `listar_directorio`   | `ruta: String`                  | Lista los archivos de un directorio |

## Ejecutar

```bash
npm install
npx tauri dev
```
