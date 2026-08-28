use std::fs;
use tauri::Manager;

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
        ])
        .run(tauri::generate_context!())
        .expect("error al ejecutar Tauri");
}
