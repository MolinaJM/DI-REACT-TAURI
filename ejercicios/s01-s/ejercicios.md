# S01-S · Scaffolding de un Proyecto Tauri (teoría + Rust)

1. **Estructura.** Explica qué contiene cada carpeta de un proyecto Tauri estándar: `src/`, `src-tauri/`, `src-tauri/src/`, `src-tauri/capabilities/`, `src-tauri/icons/`.
2. **`tauri.conf.json`.** Nombra 4 secciones clave de este fichero y qué configura cada una (p. ej. `productName`, `identifier`, `build`, `app`/`plugins`).
3. **Comando Rust.** Escribe un comando `#[tauri::command]` llamado `sumar(a: i32, b: i32) -> i32`. ¿En qué función se registra (`tauri::Builder` / `.invoke_handler`)?
4. **`invoke()`.** Escribe el código TypeScript del frontend que llama a ese comando.
5. **Errores.** ¿Cómo devuelve un comando un error controlado al frontend (p. ej. división por cero)? Escribe la versión con `Result` y cómo la gestiona el frontend.
6. **`generate_handler`.** Registra `saludar` y `sumar` en el mismo handler e indica en qué fichero suele estar (`lib.rs` para apps multi-proceso).

> Pista para la pregunta 3: los comandos se llaman con `#[tauri::command]` y se registran con `.invoke_handler(tauri::generate_handler![saludar, sumar])`.