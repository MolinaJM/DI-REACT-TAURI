// main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// Layout con navegacion
function Layout() {
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 flex gap-4">
                <Link to="/" className="hover:text-blue-300">Inicio</Link>
                <Link to="/productos" className="hover:text-blue-300">Productos</Link>
                <Outlet />
            </nav>
            <main className="container mx-auto p-4"><Outlet/></main>
        </div>
    );
}

function Inicio() {
    return <h1 className="text-2xl font-bold">Inicio</h1>;
}

function Productos() {
    return <h1 className="text-2xl font-bold">Productos</h1>;
}

function DetalleProducto() {
    return <h1 className="text-2xl font-bold">Detalle de Producto</h1>;
}

function NoEncontrado() {
    return <h1 className="text-2xl font-bold">404 - No encontrado</h1>;
}

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Inicio/>} />
                <Route path="productos" element={<Productos/>} />
                <Route path="productos/:id" element={<DetalleProducto/>} />
                <Route path="*" element={<NoEncontrado/>} />
            </Route>
        </Routes>
    </BrowserRouter>
);
