# Sesión 7: El Puente de Comunicación (Tauri IPC) y Sistema de Archivos

Comandos Tauri, invoke, eventos y manejo de archivos

[← Volver al Índice](index.md)

---

## Arquitectura de Comunicación Tauri

Tauri permite la comunicacion bidireccional entre el frontend (React) y el backend (Rust) mediante IPC (Inter-Process Communication).

```
// Diagrama de flujo:
// React (TypeScript)  <-->  IPC (invoke/eventos)  <-->  Rust (Tauri)

// Flujo tipico:
// 1. Frontend llama a invoke("comando", { args })
// 2. Tauri envia la peticion al backend Rust
// 3. Rust ejecuta la funcion anotada con #[tauri::command]
// 4. Rust devuelve el resultado al frontend
```

## Comandos Básicos en Rust

```rust
// src-tauri/src/lib.rs
use tauri::Manager;

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

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![saludar, sumar, obtener_info_sistema])
        .run(tauri::generate_context!())
        .expect("error al ejecutar tauri");
}
```

## Llamar Comandos desde React (invoke)

```tsx
import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';

function ComponenteIPC() {
    const [mensaje, setMensaje] = useState("");
    const [resultado, setResultado] = useState<number | null>(null);

    const llamarSaludar = async () => {
        try {
            const response: string = await invoke("saludar", { nombre: "Ana" });
            setMensaje(response);
        } catch (error) {
            console.error("Error IPC:", error);
        }
    };

    const llamarSumar = async () => {
        const res: number = await invoke("sumar", { a: 10, b: 20 });
        setResultado(res);
    };

    return (
        <div className="space-y-4">
            <button onClick={llamarSaludar}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Saludar
            </button>
            {mensaje && <p className="text-green-400">{mensaje}</p>}
            <button onClick={llamarSumar}
                className="bg-green-500 text-white px-4 py-2 rounded ml-2">
                Sumar 10 + 20
            </button>
            {resultado !== null && <p>Resultado: {resultado}</p>}
        </div>
    );
}
```

## Manejo del Sistema de Archivos

```rust
// src-tauri/src/lib.rs
use std::fs;
use tauri::Manager;

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
```

## Consumo de APIs con Fetch y TypeScript

### Operaciones CRUD completas

```typescript
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

// GET
async function obtenerPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as Post[];
}

// GET by ID
async function obtenerPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as Post;
}

// POST
async function crearPost(datos: Omit<Post, "id">): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return (await res.json()) as Post;
}

// PUT (reemplazar completo)
async function actualizarPost(id: number, datos: Post): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return (await res.json()) as Post;
}

// DELETE
async function eliminarPost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}

// Uso
async function ejemplo(): Promise<void> {
  const posts = await obtenerPosts();
  console.log(`Obtenidos ${posts.length} posts`);

  const nuevo = await crearPost({
    userId: 1,
    title: "Nuevo post",
    body: "Contenido del post",
  });
  console.log("Creado:", nuevo.id);
}
```

### Múltiples peticiones en paralelo y secuencial

```typescript
async function paralelo(): Promise<void> {
  const resultados = await Promise.all([
    fetch(`${BASE_URL}/posts/1`).then((r) => r.json() as Promise<Post>),
    fetch(`${BASE_URL}/posts/2`).then((r) => r.json() as Promise<Post>),
    fetch(`${BASE_URL}/posts/3`).then((r) => r.json() as Promise<Post>),
  ]);
  console.log("Tres posts en paralelo:", resultados);
}

async function secuencial(): Promise<void> {
  const post1 = await obtenerPost(1);
  console.log("Post 1:", post1.title);

  const post2 = await obtenerPost(2);
  console.log("Post 2:", post2.title);
}

async function conCarrera(): Promise<void> {
  const masRapido = await Promise.race([
    fetch(`${BASE_URL}/posts/1`).then((r) => r.json()),
    fetch(`${BASE_URL}/posts/2`).then((r) => r.json()),
  ]);
  console.log("El más rápido fue:", masRapido);
}

// Manejo de errores
async function fetchSeguro(url: string): Promise<Post | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as Post;
  } catch (error) {
    console.error("Error en fetch:", (error as Error).message);
    return null;
  }
}
```

### Cancelación de peticiones con AbortController

```typescript
function fetchConTimeout(url: string, timeoutMs: number = 3000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal: controller.signal }).finally(() => {
    clearTimeout(timeoutId);
  });
}

// Uso
async function ejemploTimeout(): Promise<void> {
  try {
    const res = await fetchConTimeout("https://api.lenta.com/data", 2000);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      console.error("Petición cancelada por timeout");
    } else {
      console.error("Error:", error);
    }
  }
}
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
