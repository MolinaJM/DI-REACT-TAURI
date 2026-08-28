# S00 · Soluciones

1. **Virtual DOM:** React mantiene una copia ligera del árbol de la UI en memoria. Cuando cambian los datos, reconstruye ese árbol, lo compara con el anterior (diffing) y aplica solo los cambios mínimos al DOM real. Evita así los costosos reflows/repaints de tocar el DOM directamente.

2. **SSR vs SPA:** En el modelo tradicional cada acción genera una petición HTTP y el servidor reenvía el HTML completo (recarga total). En una SPA la primera carga descarga la app (JS + HTML mínimo) y a partir de ahí la UI se actualiza en el cliente sin recargar la página.

3. **Ecosistema:**

| Herramienta | Papel en el curso |
|---|---|
| Node.js | Entorno de ejecución de JS (herramientas de desarrollo) |
| npm | Gestor de dependencias del proyecto |
| Vite | Empaquetador y servidor de desarrollo con recarga en caliente |
| React | Librería de UI: componentes, estado y reactividad |
| Tailwind CSS | Framework de CSS utilitario (clases en el HTML/JSX) |
| Rust | Backend nativo de Tauri (seguridad en memoria, velocidad) |
| Tauri | Puente web ↔ sistema: expone API segura en Rust al frontend |

4. **Frontend/Backend:** `src/` contiene la app React (frontend). `src-tauri/` contiene el backend Rust (`src/main.rs`, `src/lib.rs`), la configuración (`tauri.conf.json`), capabilities e iconos.

5. **dependencies vs devDependencies:** `dependencies` son necesarias en ejecución (p. ej. `react`, `@tauri-apps/api`). `devDependencies` solo para desarrollar/build (p. ej. `typescript`, `vite`, `@vitejs/plugin-react`).

6. **Comandos:** `npm install -D <paquete>` (o `--save-dev`) instala en `devDependencies`; `npm run <script>` ejecuta un script definido en `package.json`.