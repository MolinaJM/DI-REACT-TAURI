# S07 · El Puente de Comunicación Tauri (IPC)

Realiza estos ejercicios en `repos/03-tauri-ipc-filesystem` (o el repo Tauri de trabajo). Soluciones en `soluciones/s07/`.

## 1. Comando en Rust
Crea en `src-tauri/src/lib.rs` un comando `#[tauri::command]` que reciba una ruta de texto y devuelva el **contenido** de ese fichero usando `std::fs::read_to_string`. Devuelve `Result<String, String>` para controlar el error. Regístralo en `generate_handler!`.

```rust
#[tauri::command]
fn leer_archivo(ruta: String) -> Result<String, String> {
    // TODO: std::fs::read_to_string(&ruta).map_err(|e| e.to_string())
}
```

## 2. Invoke desde React
Un botón "Leer" llama a `invoke<{ contenido: string }>("leer_archivo", { ruta })` y guarda el resultado en estado. Escribe el componente completo con `useState` y `useEffect`/evento de clic, incluyendo gestión del error en `catch`.

## 3. Llamadas en paralelo y secuencial
Escribe una función `trazarRutina()` que llame a `invoke("leer_archivo", { ruta })` para dos ficheros **en paralelo** con `Promise.all`, y otra que los lea **secuencialmente** (uno tras otro).

## 4. Fetch + AbortController
Crea `buscarConTimeout(url, ms)` que haga `fetch(url)` y lo cancele con `AbortController` si tarda más de `ms`. Devuelve `Promise<Response>` (lanza el error del abort).

## 5. Sistema de archivos
Investiga y escribe cómo invocar el plugin `fs` de Tauri v2 para listar el directorio actual (`readDir`), indicando el permiso/capability necesario en `tauri.conf.json`.