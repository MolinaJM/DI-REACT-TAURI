# S01-S · Soluciones

1. **Estructura:**

| Carpeta | Contenido |
|---|---|
| `src/` | Frontend React (componentes, `App.tsx`, `main.tsx`) |
| `src-tauri/` | Proyecto Rust + configuración del backend |
| `src-tauri/src/` | Código Rust: `main.rs` (arranque) y `lib.rs` (lógica, comandos) |
| `src-tauri/capabilities/` | Permisos otorgados al frontend (p. ej. `core:default`) |
| `src-tauri/icons/` | Iconos de la app para cada plataforma |

2. **`tauri.conf.json`:** `productName` (nombre visible), `identifier` (identificador único, p. ej. `com.tuapp.app`), `build` (carpeta frontend, `devUrl`, `beforeDevCommand`), `app` (ventanas, `windows`), y `plugins`/`bundle` (empaquetado).

3. **Comando Rust:**

   ```rust
   use serde::Serialize;

   #[tauri::command]
   fn sumar(a: i32, b: i32) -> i32 {
       a + b
   }
   ```

   Se registra en el `Builder`:

   ```rust
   #[cfg_attr(mobile, tauri::mobile_entry_point)]
   pub fn run() {
       tauri::Builder::default()
           .invoke_handler(tauri::generate_handler![saludar, sumar])
           .run(tauri::generate_context!())
           .expect("error while running tauri application");
   }
   ```

4. **Frontend:**

   ```ts
   import { invoke } from "@tauri-apps/api/core";

   const resultado = await invoke<number>("sumar", { a: 2, b: 3 });
   console.log(resultado); // 5
   ```

5. **Errores con `Result`:**

   ```rust
   #[tauri::command]
   fn dividir(a: i32, b: i32) -> Result<i32, String> {
       if b == 0 {
           return Err("division por cero".into());
       }
       Ok(a / b)
   }
   ```

   ```ts
   try {
     const r = await invoke<number>("dividir", { a: 10, b: 0 });
   } catch (error) {
     console.error("El comando falló:", error);
   }
   ```

6. `tauri::generate_handler![saludar, sumar]` junta todos los comandos y se inyecta en `.invoke_handler(...)`. Normalmente vive en `src-tauri/src/lib.rs`.