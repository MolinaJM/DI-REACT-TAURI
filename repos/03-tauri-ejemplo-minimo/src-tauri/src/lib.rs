// Comando que el frontend invoca con invoke("saludar", { nombre }).
// Es el "puente" que sustituye al estado local del ejemplo React puro:
// en vez de componer el saludo en React, lo devuelve el backend Rust.
#[tauri::command]
fn saludar(nombre: String) -> String {
    format!("¡Hola, {}! (saludo creado en Rust)", nombre)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![saludar])
        .run(tauri::generate_context!())
        .expect("error al ejecutar Tauri");
}
