import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

interface ItemInventario {
    nombre: string;
    stock: number;
    precio: number;
}

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
