# Sesión 13: Distribución Multiplataforma con Tauri

Instaladores nativos, configuración de bundle, GitHub Actions y actualizaciones

[← Volver al Índice](index.md)

---

## Introducción a la Distribución Multiplataforma

Tauri compila la aplicación en un binario nativo pequeño que se empaqueta en instaladores específicos para cada sistema operativo:

| Sistema | Formato de instalador |
|---|---|
| **Windows** | MSI (WiX), NSIS (EXE) |
| **macOS** | Bundles `.app`, `.dmg`, `.pkg` |
| **Linux** | `.deb`, `.rpm`, AppImage |

La plantilla de Tauri genera un instalador **para el sistema operativo en el que se ejecuta el build**. Para publicar en las tres plataformas se recomienda compilar en cada una de ellas (por ejemplo, con GitHub Actions en lugar de intentar compilaciones cruzadas).

## Configuración del Bundle (tauri.conf.json)

```
// src-tauri/tauri.conf.json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "AppCine",
  "version": "1.0.0",
  "identifier": "com.molina.appcine",
  "build": {
    "beforeDevCommand": "npm run dev",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "npm run build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [{ "title": "AppCine", "width": 1024, "height": 768 }],
    "security": { "csp": null }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "publisher": "José María Molina",
    "category": "DeveloperTool",
    "shortDescription": "Gestor de películas",
    "longDescription": "Aplicación de escritorio para gestionar un catálogo de películas."
  }
}
```

### Instaladores específicos por sistema

```
// Windows: MSI (WiX) y NSIS
"bundle": {
  "windows": {
    "wix": {
      "language": "es-ES",
      "shortcutFolder": "AppCine"
    },
    "nsis": {
      "installMode": "currentUser",
      "languages": ["Spanish", "English"]
    }
  }
}
```

```
// Linux: DEB, RPM y AppImage
"bundle": {
  "linux": {
    "deb": { "depends": ["libwebkit2gtk-4.1-0"] },
    "rpm": { "depends": ["webkit2gtk4.1"] },
    "appimage": { "bundleMediaFramework": false }
  }
}
```

## Compilar la Aplicación

```
# Compila release + instala dependencias + genera el instalador del SO actual
npm run tauri build
```

```
# Elegir los formatos deseados en Windows
npm run tauri build -- --bundles msi nsis
```

```
# Elegir los formatos deseados en Linux
npm run tauri build -- --bundles deb appimage
```

Los instaladores se generan en la carpeta `src-tauri/target/release/bundle/`.

## Dependencias del Sistema (Linux)

Para compilar en Ubuntu/Debian hace falta instalar las librerías de WebKitGTK y utilidades de empaquetado:

```
# Ubuntu / Debian
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
```

## Flujo de Release con GitHub Actions

La forma más sencilla de generar instaladores para las tres plataformas es usar una acción de lanzamiento: al crear una etiqueta `v*` se ejecutan tantos jobs como sistemas operativos y se publica un Release con los artefactos.

```
# .github/workflows/release.yml
name: "release"

on:
  push:
    tags:
      - "v*"

jobs:
  publish-tauri:
    permissions:
      contents: write
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-22.04, windows-latest]
    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Configurar Rust estable
        uses: dtolnay/rust-toolchain@stable

      - name: Dependencias (solo Linux)
        if: matrix.platform == 'ubuntu-22.04'
        run: |
          sudo apt-get update
          sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf

      - name: Instalar dependencias JS
        run: npm ci

      - name: Compilar y publicar app
        uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__
          releaseName: "App v__VERSION__"
          releaseBody: "Ver el README para más información."
          releaseDraft: true
          prerelease: false
```

## Actualizaciones Automáticas (Updater)

Tauri incluye un plugin de actualizaciones que descarga e instala nuevas versiones sin que el usuario reinstale manualmente.

```
# 1. Añadir el plugin (Rust)
cargo add tauri-plugin-updater
```

```
# 2. Registrar el plugin en src-tauri/src/lib.rs
use tauri_plugin_updater::UpdaterExt;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .run(tauri::generate_context!())
        .expect("error al ejecutar tauri");
}
```

```
# 3. Configurar el endpoint del servidor de actualizaciones (tauri.conf.json)
"plugins": {
  "updater": {
    "endpoints": ["https://ejemplo.com/updates/{{target}}/{{arch}}/{{current_version}}"],
    "pubkey": "CHULAVEGJPLJVEFAULT..."
  }
}
```

```
// 4. Comprobar y aplicar la actualización desde React
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

async function comprobarActualizacion() {
    const update = await check();
    if (update) {
        await update.downloadAndInstall();
        await relaunch();
    }
}
```

Para generar la clave pública de firma se usa la herramienta integrada en la CLI:

```
npm run tauri signer generate -w ~/.tauri/dirt.key
```

## Firmado y Notarización

| Sistema | Herramienta | Descripción |
|---|---|---|
| **Windows** | `signtool` (código de firma) | Firma de los ejecutables MSI/EXE con certificado de la organización. |
| **macOS** | `codesign` + `notarytool` | Firma de la app y notarización ante Apple para evitar avisos de seguridad. |
| **Linux** | `dpkg-sig` / `rpm --addsign` | Firmado GPG opcional para repositorios DEB/RPM. |

## Tamaño y Optimización

- Un binario Tauri de release suele ocupar entre **2 y 8 MB** (frente a los 150+ MB de las alternativas basadas en Chromium).
- El instalador puede reducirse eliminando iconos y recursos no usados del bundle y comprimiendo los assets del frontend.

## Práctica: Distribuir AppCine Multiplataforma

Paso a paso para completar la sesión:

1. Configurar `tauri.conf.json` (bundle, identificador, icono y categoría).
2. Compilar en local: `npm run tauri build` y localizar los artefactos en `target/release/bundle/`.
3. Instalar el instalador en una máquina limpia del mismo SO y comprobar el arranque.
4. Crear el repositorio remoto, añadir el workflow `release.yml` y subir una etiqueta `v1.0.0`.
5. Descargar y comprobar los instaladores generados para Windows, macOS y Linux en el Release.
6. (Opcional) Configurar el plugin Updater con un endpoint y probar una actualización de `1.0.0` a `1.0.1`.

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md) [S13](sesion13.md)