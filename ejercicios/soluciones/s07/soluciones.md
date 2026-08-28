# S07 · Soluciones

## 1. Comando en Rust

```rust
#[tauri::command]
fn leer_archivo(ruta: String) -> Result<String, String> {
    std::fs::read_to_string(&ruta).map_err(|e| e.to_string())
}
```

Registro (en `lib.rs`):

```rust
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![saludar, sumar, leer_archivo])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

## 2. Invoke desde React

```tsx
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

export function LeerArchivo({ ruta }: { ruta: string }) {
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function leer() {
    try {
      const texto = await invoke<string>("leer_archivo", { ruta });
      setContenido(texto);
      setError(null);
    } catch (e) {
      setError(String(e));
    }
  }

  return (
    <div>
      <button onClick={leer}>Leer</button>
      {error && <p className="error">{error}</p>}
      <pre>{contenido}</pre>
    </div>
  );
}
```

## 3. Paralelo y secuencial

```ts
import { invoke } from "@tauri-apps/api/core";

async function lee(ruta: string): Promise<string> {
  return invoke<string>("leer_archivo", { ruta });
}

export async function enParalelo(a: string, b: string): Promise<[string, string]> {
  return Promise.all([lee(a), lee(b)]);
}

export async function enSecuencia(a: string, b: string): Promise<[string, string]> {
  const primero = await lee(a);
  const segundo = await lee(b);
  return [primero, segundo];
}
```

## 4. Fetch con timeout

```ts
export async function buscarConTimeout(url: string, ms: number): Promise<Response> {
  const control = new AbortController();
  const temporizador = setTimeout(() => control.abort(), ms);
  try {
    return await fetch(url, { signal: control.signal });
  } finally {
    clearTimeout(temporizador);
  }
}
```

## 5. Plugin fs

```ts
import { readDir } from "@tauri-apps/plugin-fs";

const entradas = await readDir(".");
```

En `src-tauri/capabilities/default.json` hay que incluir (permisos):

```json
{
  "identifier": "default",
  "windows": ["main"],
  "permissions": ["core:default", "fs:allow-read-dir"]
}
```

Los comandos del frontend se autorizan con los permisos del **plugin** (no con `#[tauri::command]`), que se habilitan desde `tauri.conf.json` → `plugins.fs` y las capabilities.