# S01 · Instalación del Entorno (teoría/comandos)

Responde razonando; comprueba en tu terminal cuando se pida.

1. **nvm.** ¿Qué es nvm y por qué es recomendable frente a instalar Node.js directamente? Escribe los comandos para: instalar una versión concreta, usar la 24 LTS por defecto y ver la versión activa.
2. **Rust.** Escribe los comandos para instalar Rust (`rustup`) y comprobar `rustc` y `cargo`. ¿Qué versión de Rust instala `rustup` por defecto (estable/nightly/beta)?
3. **Build Tools.** ¿Qué requisito adicional necesita Tauri en Windows (Microsoft C++ Build Tools) y en Linux (paquete `build-essential`)? ¿Para qué sirve?
4. **Vite + React.** ¿Qué comando crea un proyecto Vite con plantilla React y TypeScript? ¿Qué comando arranca el servidor de desarrollo?
5. **Comprobación.** Ejecuta y anota las versiones: `node -v`, `npm -v`, `tsc --version` (o `npx tsc --version`), `rustc --version`, `cargo --version`.
6. **Desinstalación.** ¿Cómo se elimina una versión de Node instalada con nvm? ¿Qué hace `cargo clean`? ¿Por qué conviene no borrar `node_modules` a mano si puedes usar `npm ci`?

> El comando para crear el proyecto es: `npm create vite@latest mi-proyecto -- --template react-ts`. Después: `cd mi-proyecto && npm install && npm run dev`.