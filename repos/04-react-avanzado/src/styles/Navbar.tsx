import { useState } from 'react';

function ResponsiveNav() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <span className="text-xl font-bold">Logo</span>

                    {/* Menu desktop */}
                    <div className="hidden md:flex space-x-8">
                        <a href="#" className="hover:text-blue-400 transition">Inicio</a>
                        <a href="#" className="hover:text-blue-400 transition">Servicios</a>
                        <a href="#" className="hover:text-blue-400 transition">Contacto</a>
                    </div>

                    {/* Boton hamburguesa (movil) */}
                    <button className="md:hidden" onClick={() => setMenuAbierto(!menuAbierto)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d={menuAbierto ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                {/* Menu movil */}
                {menuAbierto && (
                    <div className="md:hidden pb-4 space-y-2">
                        <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Inicio</a>
                        <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Servicios</a>
                        <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Contacto</a>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default ResponsiveNav;
