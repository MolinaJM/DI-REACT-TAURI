import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useCarritoStore } from './store/carritoStore';
import GestionUsuarios from './api/crud';
import DashboardLayout from './styles/Dashboard';
import ResponsiveNav from './styles/Navbar';
import { AnimacionesEjemplo, Badge } from './styles/Animations';

// Code-splitting: el bundle de @react-pdf/renderer solo se descarga al entrar aqui
const ReportesPage = lazy(() => import('./pdf/PDFViewer'));

// S08 - Estado global con Zustand + persist (localStorage)
function CarritoPage() {
    const { items, agregarItem, eliminarItem, vaciarCarrito, total } = useCarritoStore();
    const catalogo = [
        { id: 1, nombre: "Raton Inalambrico", precio: 30 },
        { id: 2, nombre: "Teclado Mecanico", precio: 70 },
        { id: 3, nombre: "Monitor 24\"", precio: 180 },
    ];

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <h2 className="text-2xl font-bold">Carrito (S08 - Zustand + persist)</h2>
            <p className="text-sm text-gray-600">
                El estado se mantiene entre recargas gracias a <code>persist</code> de Zustand.
            </p>

            <div className="space-y-2">
                {catalogo.map(p => (
                    <div key={p.id} className="flex items-center justify-between bg-white rounded-lg border p-3">
                        <span>{p.nombre} - ${p.precio}</span>
                        <button onClick={() => agregarItem(p)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                            Añadir
                        </button>
                    </div>
                ))}
            </div>

            <ul className="space-y-1">
                {items.map(i => (
                    <li key={i.id} className="flex justify-between bg-gray-100 rounded p-2">
                        <span>{i.nombre} x{i.cantidad}</span>
                        <div className="space-x-2">
                            <span>${i.precio * i.cantidad}</span>
                            <button onClick={() => eliminarItem(i.id)} className="text-red-500">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between">
                <p className="font-bold">Total: ${total()}</p>
                <button onClick={vaciarCarrito} className="bg-gray-700 text-white px-4 py-1 rounded">
                    Vaciar
                </button>
            </div>
        </div>
    );
}

function CrudPage() {
    return (
        <div>
            <GestionUsuarios />
            <p className="text-xs text-gray-500 mt-4 text-center">
                Requiere un backend de prueba en http://localhost:3001 (por ejemplo json-server).
            </p>
        </div>
    );
}

function DashboardPage() {
    return <DashboardLayout />;
}

function NavbarPage() {
    return (
        <div className="space-y-8">
            <ResponsiveNav />
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Estilos y animaciones (S10)</h2>
                <div className="space-x-2 mb-6">
                    <Badge estado="activo" />
                    <Badge estado="inactivo" />
                    <Badge estado="pendiente" />
                </div>
                <AnimacionesEjemplo />
            </div>
        </div>
    );
}

function Layout() {
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 flex flex-wrap gap-4">
                <Link to="/" className="hover:text-blue-300">Inicio</Link>
                <Link to="/carrito" className="hover:text-blue-300">S08 · Carrito</Link>
                <Link to="/crud" className="hover:text-blue-300">S09 · CRUD</Link>
                <Link to="/dashboard" className="hover:text-blue-300">S10 · Dashboard</Link>
                <Link to="/estilos" className="hover:text-blue-300">S10 · Estilos</Link>
                <Link to="/pdf" className="hover:text-blue-300">S11 · PDF</Link>
            </nav>
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}

function Inicio() {
    return (
        <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">React Avanzado - S08 a S11</h1>
            <p className="text-gray-600">
                Estado global (Zustand), API tipada y CRUD, Tailwind CSS y generación de informes PDF.
            </p>
        </div>
    );
}

function NoEncontrado() {
    return <h1 className="text-2xl font-bold">404 - No encontrado</h1>;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Inicio />} />
                        <Route path="carrito" element={<CarritoPage />} />
                        <Route path="crud" element={<CrudPage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="estilos" element={<NavbarPage />} />
                        <Route path="pdf" element={
                            <Suspense fallback={<p className="p-4 text-gray-500">Cargando generador PDF...</p>}>
                                <ReportesPage />
                            </Suspense>
                        } />
                        <Route path="*" element={<NoEncontrado />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}