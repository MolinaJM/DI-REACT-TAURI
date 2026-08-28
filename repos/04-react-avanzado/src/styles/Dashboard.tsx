function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                    <nav className="flex gap-6">
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition">Inicio</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition">Reportes</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition">Configuracion</a>
                    </nav>
                </div>
            </header>

            {/* Grid de tarjetas */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <p className="text-sm text-gray-500">Usuarios</p>
                        <p className="text-3xl font-bold text-gray-800">1,234</p>
                        <p className="text-xs text-green-500 mt-2">+12% vs mes anterior</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <p className="text-sm text-gray-500">Ventas</p>
                        <p className="text-3xl font-bold text-gray-800">$45,678</p>
                        <p className="text-xs text-red-500 mt-2">-3% vs mes anterior</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;
