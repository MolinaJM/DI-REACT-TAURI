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
