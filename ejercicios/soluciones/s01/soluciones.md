# S01 · Soluciones

1. **nvm** = Node Version Manager: permite instalar varias versiones de Node y cambiar entre ellas sin tocar el sistema.

   ```bash
   nvm install 24          # instala la 24.x
   nvm alias default 24    # usa la 24 por defecto
   nvm ls                  # lista versiones
   node -v                 # versión activa
   ```

2. **Rust**:

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   rustc --version
   cargo --version
   ```

   `rustup` instala el **canal estable** por defecto.

3. **Build Tools:** en Windows, *Microsoft C++ Build Tools* (toolchain MSVC) porque Tauri necesita compilar Rust contra la CRT de Microsoft. En Linux se instala `build-essential` (gcc, g++ y utilidades) como dependencia del toolchain.

4. **Vite + React (TS)**:

   ```bash
   npm create vite@latest mi-proyecto -- --template react-ts
   cd mi-proyecto
   npm install
   npm run dev
   ```

5. **Comprobación:** con un entorno recién instalado deberías ver algo como `v24.x.x`, `npm` 10/11, `tsc` 5.x, `rustc` 1.8x y `cargo` 1.8x. Los números menores son normales; lo importante es que todos respondan.

6. **Desinstalación:** `nvm uninstall <version>` elimina la versión. `cargo clean` borra `target/` (artefactos de compilación) para liberar espacio sin tocar dependencias. `npm ci` instala desde `package-lock.json` de forma reproducible y determinista, mejor que borrar `node_modules` a mano.