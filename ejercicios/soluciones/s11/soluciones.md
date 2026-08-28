# S11 · Soluciones

## 1. Documento básico

```tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  pagina: { padding: 30 },
  titulo: { fontSize: 20, textAlign: "center", marginBottom: 16 },
  parrafo: { fontSize: 12, marginBottom: 8, lineHeight: 1.5 },
});

export function InformeBasico() {
  return (
    <Document>
      <Page size="A4" style={styles.pagina}>
        <View>
          <Text style={styles.titulo}>Informe de ventas</Text>
          <Text style={styles.parrafo}>Resumen del periodo…</Text>
        </View>
      </Page>
    </Document>
  );
}
```

## 2. Tabla en PDF

```tsx
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Producto } from "../types";

const estilos = StyleSheet.create({
  fila: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc", paddingVertical: 4 },
  cabecera: { flexDirection: "row", borderBottomWidth: 1, paddingVertical: 4, fontWeight: "bold" },
  col1: { flex: 3 },
  col2: { flex: 1, textAlign: "right" },
  col3: { flex: 1, textAlign: "right" },
});

export function TablaPDF({ filas }: { filas: Producto[] }) {
  return (
    <View>
      <View style={estilos.cabecera}>
        <Text style={estilos.col1}>Producto</Text>
        <Text style={estilos.col2}>Precio</Text>
        <Text style={estilos.col3}>Stock</Text>
      </View>
      {filas.map((p) => (
        <View key={p.id} style={estilos.fila}>
          <Text style={estilos.col1}>{p.nombre}</Text>
          <Text style={estilos.col2}>{p.precio.toFixed(2)} €</Text>
          <Text style={estilos.col3}>{p.stock}</Text>
        </View>
      ))}
    </View>
  );
}
```

## 3. Descarga

```tsx
import { pdf } from "@react-pdf/renderer";

export async function descargarPDF(elemento: React.ReactElement, nombre: string): Promise<void> {
  const blob = await pdf(elemento).toBlob();
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = `${nombre}.pdf`;
  enlace.click();
  URL.revokeObjectURL(url);
}
```

## 4. Datos dinámicos con total

```tsx
const total = carrito.reduce((acc, l) => acc + l.precio * l.cantidad, 0);

<View style={estilos.fila}>
  <Text style={estilos.col1}>TOTAL</Text>
  <Text style={[estilos.col3, { fontWeight: "bold" }]}>{total.toFixed(2)} €</Text>
</View>
```