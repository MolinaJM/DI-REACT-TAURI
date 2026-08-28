# S11 · Informes PDF con @react-pdf/renderer

Ejercicios para el proyecto PDF. Soluciones en `soluciones/s11/`.

## 1. Documento básico
Escribe un `InformeBasico` que renderice un `<Document>` con `<Page>` + `<View>` + `<Text>`, usando `styles` de `StyleSheet.create`: título centrado y cuerpo con párrafos.

```tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
```

## 2. Tabla en PDF
Crea un componente `TablaPDF({ filas }: { filas: Producto[] })` que dibuje una tabla con `View`-filas y texto: encabezados en negrita y cada fila con `producto`, `precio`, `stock`.

## 3. Visualizador y descarga
Escribe el hook `useDescargaPDF(nombre: string)` que use `pdf()` de `@react-pdf/renderer` (o el método `toBlob()`/`download()`) para descargar un `Document` como `.pdf`.

## 4. Datos dinámicos
Conecta el informe a un estado: genera el PDF con el contenido del carrito (calcula el **total con `reduce`** y márcalo en negrita en la última fila).