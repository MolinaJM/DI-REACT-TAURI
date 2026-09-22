# Completar sección 1.3 Interfaces y Type Aliases

## Objetivo
Añadir una nota al final de la sección "Interfaces y Type Aliases" en `sesiones/apuntes/s02/01_SintaxisBasica.md` indicando qué características de `interface`/`type` son raras o innecesarias en React y Tauri.

## Cambio
Insertar un bloque `[!NOTE]` después de la línea 313 (después del TIP sobre `interface` vs `type`) con las siguientes características raras:

- **Index signatures** — en React/Tauri los datos suelen tener estructura conocida; usar `Record<K, V>` en su lugar
- **`Readonly<T>`** — rara vez se usa explícitamente; `as const` cubre la mayoría de casos
- **Declaration Merging** — interesante pero no es un patrón de diseño, ocurre automáticamente
- **`Pick<T, K>` y `Omit<T, K>`** — se usan poco en React; más claro definir la interfaz completa
- **Propiedades `readonly`** — se usan de vez en cuando para IDs y claves, pero no es frecuente

## Archivo a editar
- `sesiones/apuntes/s02/01_SintaxisBasica.md` línea 313

## Ubicación exacta
Después de la línea:
```
> [!TIP]
> Usa `interface` para entidades y props de React; usa `type` para uniones, tuplas y alias. Ni `interface` ni `type` generan código en runtime (sintaxis *erasable-only*), así que puedes usarlos sin restricción.
```

Antes de la línea:
```
---
### 📦 Ejemplo completo-resumen 
```
