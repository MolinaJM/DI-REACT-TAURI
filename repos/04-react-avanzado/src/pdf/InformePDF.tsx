import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
