# Sesión 11: Creación de Informes en PDF con React

@react-pdf/renderer, documentos PDF, tablas y descarga

[← Volver al Índice](index.md)

---

> 💻 **Código:** [`repos/04-react-avanzado`](../repos/04-react-avanzado/) · ✏️ **Práctica:** [ejercicios/s11](../ejercicios/)


## Introduccion a @react-pdf/renderer

La libreria @react-pdf/renderer permite generar documentos PDF utilizando componentes de React con un enfoque declarativo.

```bash
# Instalacion
npm install @react-pdf/renderer
```

## Documento PDF Basico

> 📦 **Este componente está en el repositorio:** `repos/04-react-avanzado/src/pdf/InformePDF.tsx`

```tsx
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

interface ProductoVendido {
    nombre: string;
    cantidad: number;
    total: number;
}

interface DatosInforme {
    productos: ProductoVendido[];
}

// Estilos para PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a365d',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        color: '#2d3748',
    },
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f7fafc',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    label: {
        fontSize: 12,
        color: '#718096',
    },
    value: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 10,
        color: '#a0aec0',
    },
});

// Componente del informe
const InformePDF = ({ datos }: { datos: DatosInforme }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Informe de Ventas</Text>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Resumen</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Total Ventas:</Text>
                    <Text style={styles.value}>$45,678.00</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Numero de Pedidos:</Text>
                    <Text style={styles.value}>234</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Clientes Nuevos:</Text>
                    <Text style={styles.value}>56</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Productos mas Vendidos</Text>
                {datos.productos.map((p: ProductoVendido, i: number) => (
                    <View style={styles.row} key={i}>
                        <Text style={styles.label}>{p.nombre}</Text>
                        <Text style={styles.value}>{p.cantidad} uds - ${p.total}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.footer}>
                Generado el {new Date().toLocaleDateString()} - Sistema de Reportes
            </Text>
        </Page>
    </Document>
);

export default InformePDF;
```

## Visualizador y Descarga

> 📦 **El componente `ReportesPage` está en el repositorio:** `repos/04-react-avanzado/src/pdf/PDFViewer.tsx`

```tsx
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import InformePDF from './InformePDF';

function ReportesPage() {
    const datos = {
        productos: [
            { nombre: "Portatil Pro", cantidad: 45, total: 44955 },
            { nombre: "Raton Inalambrico", cantidad: 120, total: 3600 },
            { nombre: "Teclado Mecanico", cantidad: 78, total: 5460 },
        ]
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Generar Informe PDF</h2>

            {/* Visor incrustado */}
            <div className="h-[600px] border rounded-lg overflow-hidden">
                <PDFViewer width="100%" height="100%">
                    <InformePDF datos={datos} />
                </PDFViewer>
            </div>

            {/* Enlace de descarga */}
            <PDFDownloadLink document={<InformePDF datos={datos} />} fileName="informe-ventas.pdf">
                {({ loading }) => (
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg
                        hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={loading}>
                        {loading ? "Generando PDF..." : "Descargar PDF"}
                    </button>
                )}
            </PDFDownloadLink>
        </div>
    );
}

export default ReportesPage;
```

## PDF con Tablas y Graficos

> 📦 **Este componente está en el repositorio:** `repos/04-react-avanzado/src/pdf/InformeTablas.tsx`

```tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface ItemInventario {
    nombre: string;
    stock: number;
    precio: number;
}

const tableStyles = StyleSheet.create({
    table: { width: '100%', marginVertical: 10 },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#2d3748',
        color: 'white',
        padding: 8,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        padding: 8,
    },
    col1: { width: '40%' },
    col2: { width: '20%', textAlign: 'center' },
    col3: { width: '20%', textAlign: 'center' },
    col4: { width: '20%', textAlign: 'right' },
});

const InformeTablas = ({ items }: { items: ItemInventario[] }) => (
    <Document>
        <Page size="A4" style={{ padding: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                Inventario de Productos
            </Text>

            <View style={tableStyles.table}>
                {/* Header */}
                <View style={tableStyles.tableHeader}>
                    <Text style={tableStyles.col1}>Producto</Text>
                    <Text style={tableStyles.col2}>Stock</Text>
                    <Text style={tableStyles.col3}>Precio</Text>
                    <Text style={tableStyles.col4}>Total</Text>
                </View>

                {/* Filas */}
                {items.map((item: ItemInventario, i: number) => (
                    <View style={tableStyles.tableRow} key={i}>
                        <Text style={tableStyles.col1}>{item.nombre}</Text>
                        <Text style={tableStyles.col2}>{item.stock}</Text>
                        <Text style={tableStyles.col3}>${item.precio}</Text>
                        <Text style={tableStyles.col4}>${item.stock * item.precio}</Text>
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 20, borderTopWidth: 2, borderTopColor: '#2d3748', paddingTop: 10 }}>
                <Text style={{ fontSize: 14, textAlign: 'right' }}>
                    Valor Total del Inventario: $
                    {items.reduce((acc: number, i: ItemInventario) => acc + (i.stock * i.precio), 0).toLocaleString()}
                </Text>
            </View>
        </Page>
    </Document>
);

export default InformeTablas;
```

---


## 🧪 Autoevaluación

Marca lo que ya eres capaz de hacer por ti mismo/a:

- [ ] Genero un documento PDF con `@react-pdf/renderer`.
- [ ] Pinto una tabla con datos reales de la app.
- [ ] Permito la descarga/guardado del PDF desde el frontend.
- [ ] Estructuro el informe por secciones reutilizables.

> **Reto de la sesión:** Informe PDF con tabla de pedidos, cabecera y pie, descargable desde el botón de la app.

> 📌 La práctica completa está en [`../ejercicios/`](../ejercicios/) (soluciones en el entorno de clase).
[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
