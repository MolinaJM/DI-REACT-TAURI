# Sesión 1: Instalación del Entorno de Desarrollo

Node.js, NPM, Vite, React, Tailwind CSS, Rust y Tauri

[← Volver al Índice](index.md)

---

## 1. Instalación del Entorno en Windows

Antes de empezar, es necesario instalar las herramientas base en **orden exacto**. Cada paso depende del anterior.

### 1.1. Microsoft C++ Build Tools

Tauri necesita linkar lo que genera Rust con las librerías de Windows para generar un .exe. Las **Microsoft C++ Build Tools** proporcionan el compilador (MSVC) y las librerías del SDK de Windows necesarias.

- Descarga el instalador desde `https://visualstudio.microsoft.com/visual-cpp-build-tools/`
- Ejecuta `vs_BuildTools.exe`
- En el instalador selecciona la caja **"Desarrollo para el Escritorio con C++"**
- A la derecha busca y marca:
            
`MSVC - VS 2022 C++ x64/x86 build tools`
`Windows 10/11 SDK` (la versión más reciente)
  - `MSVC - VS 2022 C++ x64/x86 build tools`
  - `Windows 10/11 SDK` (la versión más reciente)
- Haz clic en **"Instalar"** y espera a que termine
- **Reinicia el ordenador** después de la instalación

```
# No hay comando para verificar, se confirma con la instalacion visual.
# Si necesitas desinstalar, ve a "Configuracion > Aplicaciones > Microsoft C++ Build Tools"
```

### 1.2. Rustup (Rust)

Rustup es el instalador y gestor de versiones de Rust. Tauri usa Rust como lenguaje de backend.

- Descarga el instalador desde `https://rustup.rs`
- Ejecuta `rustup-init.exe`
- Selecciona la opción por defecto: **1) Proceed with standard installation**
- Espera a que termine la descarga e instalación de los componentes
- Si falla, pausar antivirus o crear una excepción para rustup-init.exe. Luego volver a ejecutar `rustup default stable`. Esto vuelve a descargar rust y establece esta versión como opción por defecto.
- Si fuera necesario desinstalar: `rustup self uninstall`

```
# Verificar la instalacion de Rust
rustc --version
# Output: rustc 1.xx.0 (xxxxxxx 2025-xx-xx)

cargo --version
# Output: cargo 1.xx.0 (xxxxxxx 2025-xx-xx)
```

Rustup también instala `cargo`, el gestor de paquetes y herramientas de Rust.

### 1.3. Node.js (con nvm-windows)

Node.js es necesario para ejecutar npm, Vite y el CLI de Tauri. Se recomienda usar **nvm-windows** para gestionar versiones.

- Descarga **nvm-windows** desde `https://github.com/coreybutler/nvm-windows/releases`
- Ejecuta `nvm-setup.exe` y sigue el asistente
- Abre una **nueva terminal** (PowerShell o CMD) y ejecuta:

```
# Instalar Node.js LTS (version recomendada)
nvm install 22

# Seleccionar esa version
nvm use 22

# Verificar que Node y npm estan disponibles
node --version
# Output: v22.x.x

npm --version
# Output: 10.x.x
```

### 1.4. Crear y lanzar un proyecto de Tauri de prueba

Los siguientes ejemplos son independientes del Sistema Operativo (Windows, WSL/Ubuntu, MacOS).

Con todo instalado, crea un proyecto de prueba para confirmar que el entorno funciona correctamente.

```
# Crear un proyecto con Tauri
<code>npm create tauri-app@latest</code> 

# Nos pregunta: nombre, identificador, lenguaje, gestor de paquetes y framework 

cd nombreproyecto
# Instalar dependencias del proyecto (lee package.json)
npm install
# Lanzar (la primera vez tarda porque Cargo se descarga y compila paquetes necesarios)
npm run tauri dev

#Lanza en puerto http://localhost:1420

#Probar a editar el código de App.tsx dentro de la carpeta src
```

```
npm create vite@latest mi-primer-tauri -- --template react-ts
```

```
cd mi-primer-tauri
npm install
npm install -D @tauri-apps/cli @tauri-apps/api
npx tauri init
npx tauri dev
```

Al ejecutar `npx tauri dev`, Tauri compilará el backend en Rust (puede tardar la primera vez) y abrirá una ventana nativa con el frontend de React dentro.

### 1.5. Preguntas de tauri init

Durante `tauri init` se te preguntará:

> Para entender en detalle la estructura completa de un proyecto Tauri con React y Rust, consulta la guía de [Scaffolding de un proyecto Tauri](sesion01_scaffolding.md).

## 2. Instalación del Entorno en Linux (Ubuntu / Debian)

### 2.1. Dependencias del sistema y compilador C++

En Linux no se instalan los Build Tools de Visual Studio. Se usan los paquetes del sistema:

```
# Actualizar repositorios
sudo apt update && sudo apt upgrade -y

# Instalar compilador C++ y dependencias de build de Tauri
sudo apt install -y \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  libjavascriptcoregtk-4.1-dev \
  libsoup-3.0-dev \
  pkg-config

# build-essential incluye: gcc, g++, make, libc-dev
```

`build-essential` es el equivalente a los Microsoft C++ Build Tools en Linux. Los demás paquetes son dependencias necesarias para compilar las librerías nativas de Tauri (webkit2gtk para el renderer, appindicator para la bandeja del sistema, librsvg para iconos SVG).

### 2.2. Rustup (Rust)

```
# Instalar rustup (igual que en Windows, pero desde terminal)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Seguir las instrucciones en pantalla (opcion 1 por defecto)

# Recargar el PATH en la sesion actual
source "$HOME/.cargo/env"

# Verificar
rustc --version
cargo --version
```

### 2.3. Node.js (con nvm)

```
# Instalar nvm desde el repositorio oficial
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Recargar la terminal
source ~/.bashrc

# Instalar Node.js LTS
nvm install 22
nvm use 22
nvm alias default 22

# Verificar
node --version
npm --version
```

> En WSL, nvm funciona igual que en Linux nativo. Asegúrate de tener `curl` instalado (`sudo apt install curl`).

### 2.4. Configurar WSLg para Tauri (Windows 11 / Windows 10 22H2+)

En WSL, las aplicaciones Tauri **no pueden ejecutarse gráficamente** a menos que uses WSLg (incluido en Windows 11 y Windows 10 con actualizaciones recientes).

```
# WSLg viene preinstalado con WSL2 en Windows 11.
# Verificar que WSLg esta activo:
wsl.exe --version

# Si no tienes WSL2 actualizado:
wsl.exe --update

# Probar que la GUI funciona (deberia abrir una ventana):
export DISPLAY=:0
echo "DISPLAY=$DISPLAY"

# Lanzar Tauri (requiere las dependencias del sistema instaladas)
npx tauri dev
```

> En WSL sin WSLg, `npx tauri dev` fallará al abrir la ventana. Soluciones: (1) usa Windows Terminal + WSLg, (2) compila en WSL y ejecuta el .exe en Windows, o (3) instala un servidor X como VcXsrv en Windows y exporta `DISPLAY=:0`.

> En WSL, los archivos de Windows en /mnt/c/ pueden tener problemas de permisos. Se recomienda trabajar siempre dentro del sistema de archivos de Linux (~/projects).

## 3. Instalación del Entorno en macOS

### 3.1. Xcode Command Line Tools y dependencias

En macOS, Apple proporciona las herramientas de compilación a través de Xcode Command Line Tools:

```
# Instalar Xcode Command Line Tools (abre un dialogo de instalacion)
xcode-select --install

# Si se necesita instalar tambien Rosetta (Apple Silicon ejecutando apps x86)
# softwareupdate --install-rosetta

# Instalar Homebrew (gestor de paquetes para macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar dependencias de Tauri via Homebrew
brew install curl wget openssl
```

`xcode-select --install` es el equivalente a los Build Tools en macOS. Instala clang, make, y las librerías de desarrollo del SDK.

### 3.2. Rustup (Rust)

```
# Instalar rustup (mismo comando que en Linux)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Recargar el PATH
source "$HOME/.cargo/env"

# Verificar
rustc --version
cargo --version
```

### 3.3. Node.js (con nvm)

```
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Recargar la terminal
source ~/.zshrc

# Instalar Node.js LTS
nvm install 22
nvm use 22
nvm alias default 22

# Verificar
node --version
npm --version
```

## 4. Otras Distribuciones Linux

### Fedora

```
# Dependencias del sistema
sudo dnf install -y \
  gcc-c++ \
  webkit2gtk4.1-devel \
  gtk3-devel \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  pkg-config

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

# Node.js
sudo dnf install nodejs npm
```

### Arch Linux

```
# Dependencias del sistema
sudo pacman -S --needed \
  base-devel \
  webkit2gtk-4.1 \
  gtk3 \
  libappindicator-gtk3 \
  librsvg \
  pkg-config

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

# Node.js
sudo pacman -S nodejs npm
```

## 5. Desinstalación Completa del Entorno

Si necesitas eliminar por completo todo el entorno de desarrollo instalado, sigue estos pasos en orden inverso al de instalación.

### 5.1. Eliminar un proyecto Tauri + React

```
# Dentro del directorio del proyecto
rm -rf node_modules package-lock.json

# Eliminar el cache de npm
rm -rf ~/.npm

# Si ademas quieres borrar el proyecto entero
rm -rf mi-app mi-app-tauri
```

### 5.2. Eliminar dependencias Rust del proyecto (src-tauri)

```
# Dentro del proyecto, eliminar la carpeta src-tauri
rm -rf src-tauri

# Limpiar cache de compilacion de Rust (pesa varios GB)
cargo clean

# Cache global de Cargo (~350 MB)
rm -rf ~/.cargo/registry
```

### 5.3. Desinstalar Rust (rustup, rustc, cargo)

```
# Desinstalacion completa de rustup
rustup self uninstall

# Responde "y" cuando pregunte "Are you sure?"

# Opcional: eliminar archivos residuales
rm -rf ~/.rustup
rm -rf ~/.cargo
```

> `rustup self uninstall` eliminará todas las toolchains, targets y componentes instalados. Si solo quieres liberar espacio sin perder las herramientas, considera ejecutar `rustup toolchain remove stable` en su lugar.

### 5.4. Desinstalar Node.js

#### Si usaste nvm (recomendado)

```
# Eliminar la versión de Node instalada con nvm
nvm uninstall --lts

# Eliminar nvm
rm -rf ~/.nvm

# Limpiar el shell rc (bashrc o zshrc)
# Abre ~/.bashrc o ~/.zshrc y elimina las lineas que contengan "NVM"

# Recargar la terminal
exec bash  # o exec zsh
```

#### Si instalaste Node.js con el gestor de paquetes del sistema

```
# Debian / Ubuntu / WSL
sudo apt remove --purge -y nodejs npm
sudo apt autoremove -y
sudo apt autoclean

# Fedora
sudo dnf remove -y nodejs npm

# Arch Linux
sudo pacman -Rns nodejs npm
```

### 5.5. Desinstalar dependencias del sistema (Tauri)

```
# Debian / Ubuntu / WSL
sudo apt remove --purge -y \
  build-essential \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  libjavascriptcoregtk-4.1-dev \
  libsoup-3.0-dev \
  pkg-config
sudo apt autoremove -y
sudo apt autoclean

# Fedora
sudo dnf remove -y \
  gcc-c++ \
  webkit2gtk4.1-devel \
  gtk3-devel \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  pkg-config

# Arch Linux
sudo pacman -Rns \
  base-devel \
  webkit2gtk-4.1 \
  gtk3 \
  libappindicator-gtk3 \
  librsvg \
  pkg-config
```

### 5.6. Resumen de espacios liberados

| Componente | Espacio típico |
| --- | --- |
| node_modules (un proyecto) | 200-500 MB |
| Cache npm (~/.npm) | 5-15 GB |
| nvm + versiones Node | 1-2 GB |
| Rust toolchain (rustup + cargo) | 2-4 GB |
| Cache Cargo (~/.cargo/registry) | 300-500 MB |
| target/ (compilación Rust) | 1-5 GB por proyecto |
| Dependencias del sistema Tauri | 200-400 MB |

> Si planeas retomar el desarrollo más adelante, considera solo eliminar los `node_modules` y ejecutar `cargo clean` en lugar de desinstalar todo. Así conservas las herramientas base y solo pierdes el cache compilado, que se regenera con `npm install` y `npx tauri build`.

## Repositorios de Ejercicios

Para acompañar la asignatura, se han creado una serie de repositorios con ejemplos y ejercicios prácticos. Cada repositorio esta asociado a una o varias sesiones y contiene todo el codigo necesario para seguir el curso paso a paso.

La asignatura construye el conocimiento desde los cimientos: primero se aprende **TypeScript** como base para programar componentes de **React**, y finalmente se introducen en **Tauri** para aprovechar la potencia de **Rust** como backend nativo.

| Repositorio | Sesiones | Tecnologías |
| --- | --- | --- |
| `01-typescript-fundamentos` | S02 + S03 | TypeScript puro (16 ficheros .ts) |
| `02-react-componentes` | S04 + S05 + S06 | React, Vite, componentes, hooks, formularios |
| `03-tauri-ipc-filesystem` | S07 | Tauri v2, Rust, IPC, Fetch CRUD |
| `04-react-avanzado` | S08 + S09 + S10 + S11 | Zustand, React Router, Tailwind CSS, @react-pdf/renderer |
| `05-testing` | S12 | Vitest, Testing Library, Playwright E2E |

> **Cada repositorio es independiente** y se puede clonar y ejecutar por separado. Solo el repositorio `03-tauri-ipc-filesystem` requiere el entorno completo de Tauri (Rust + Build Tools). Los demás solo necesitan Node.js.

## Anexo: Terminologia de comandos

Para seguir la asignatura se usan varios comandos en terminal. Aqui se explican los más habituales:

| Comando | Qué es | Para qué sirve |
| --- | --- | --- |
| `npm` | Node Package Manager. Gestor de paquetes oficial de Node.js y el más grande del mundo. | Instalar, actualizar y desinstalar librerías y herramientas de código abierto (React, Tailwind, etc.). Gestiona las dependencias del proyecto mediante `package.json`. Se usa con `npm install <paquete>` o `npm run <script>`. |
| `npx` | Node Package Execute. Viene preinstalado con npm (a partir de la versión 5.2). | Ejecutar paquetes de Node.js sin instalarlos globalmente. Si quieres usar una herramienta puntual (como `create-react-app`), `npx` descarga temporalmente el paquete, lo ejecuta y luego lo borra. Evita llenar el disco con herramientas que solo usas una vez. |
| `tsx` | TypeScript Execute. Herramienta moderna y ultrarrápida para ejecutar archivos TypeScript (.ts o .tsx) directamente. | Compila el código al vuelo en memoria (usando esbuild) y lo ejecuta con Node.js en un solo paso, sin pasar por `tsc`. Es el sustituto moderno de `ts-node`. |
| `tsc` | TypeScript Compiler. Compilador oficial de TypeScript. | Compila archivos `.ts` a JavaScript `.js`. Se usa para verificar tipos (`tsc --noEmit`) o para generar la version compilada del código. |
| `cargo` | Gestor de paquetes y sistema de build de Rust. | Crear, compilar y ejecutar proyectos Rust. Equivalente a `npm` pero para el ecosistema Rust. Se usa en el backend de Tauri. |
| `pnpm` | Performant npm. Alternativa a npm más rápida y eficiente en espacio. | Misma función que `npm` pero usa un almacenamiento global de paquetes para ahorrar disco. Opcional en esta asignatura. |

> **Truco:** La mayoria de comandos se ejecutan desde la raíz del proyecto. Si un comando no se encuentra, verifica que estás en el directorio correcto con `pwd` (Linux/Mac) o `cd` (Windows).

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
