# Sesión 10: Usabilidad. Estilización Avanzada y Diseño de Interfaces con Tailwind CSS

Layouts responsive, animaciones y componentes estilizados

[← Volver al Índice](index.md)

---

## Usabilidad y Pautas de Diseño

Antes de escribir una sola línea de Tailwind hay que pensar en el usuario. La **usabilidad** determina lo fácil e intuitivo que resulta usar una interfaz, y las **pautas de diseño** son las reglas que garantizan interfaces claras, consistentes y accesibles.

Algunas pautas fundamentales:

- **Consistencia:** mantener los mismos patrones, colores, tipografías y comportamientos en toda la aplicación.
- **Jerarquía visual:** destacar la información importante con tamaño, color y espacio.
- **Feedback:** toda acción del usuario debe tener respuesta visible (hover, transiciones, mensajes, estados de carga).
- **Accesibilidad:** contraste suficiente, tamaños legibles, soporte de teclado y textos alternativos.
- **Simplicidad:** evitar sobrecargar las pantallas; menos elementos, menos errores.
- **Responsive:** adaptar el diseño a distintos tamaños de pantalla.

Estas pautas se entregarán a la **IA** como referencia del proyecto para que las **interprete y aplique** al generar el diseño y el código de las interfaces. Cuanto mejor redactadas estén las pautas, mejor será el resultado.

---

## Layouts y Diseño con Tailwind

```tsx
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
```

## Responsive Design

```tsx
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
```

## Animaciones y Transiciones

```tsx
function AnimacionesEjemplo() {
    const [visible, setVisible] = useState(false);
    const [hover, setHover] = useState(false);

    return (
        <div className="space-y-8 p-8">

            {/* Transicion de opacidad */}
            <button onClick={() => setVisible(!visible)}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Toggle
            </button>
            <div className={`transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
                <p className="bg-blue-100 p-4 rounded">Contenido con fade</p>
            </div>

            {/* Escala al hover */}
            <div className="flex gap-4">
                <div className="w-24 h-24 bg-red-400 rounded-lg
                    transition-transform duration-300 hover:scale-110
                    hover:shadow-xl cursor-pointer">
                </div>
                <div className="w-24 h-24 bg-green-400 rounded-lg
                    transition-all duration-300 hover:rotate-12
                    hover:shadow-xl cursor-pointer">
                </div>
                <div className="w-24 h-24 bg-purple-400 rounded-lg
                    transition-all duration-300 hover:skew-x-6
                    hover:shadow-xl cursor-pointer">
                </div>
            </div>

            {/* Animacion con keyframes (via Tailwind config) */}
            <div className="animate-bounce bg-yellow-400 w-16 h-16 rounded-full
                flex items-center justify-center text-white font-bold">
                Bounce
            </div>

            {/* Spinner personalizado */}
            <div className="animate-spin rounded-full h-12 w-12
                border-b-2 border-blue-500 mx-auto"></div>
        </div>
    );
}
```

## Componentes con Estilos Condicionales

```tsx
function Badge({ estado }: { estado: "activo" | "inactivo" | "pendiente" }) {
    const colores = {
        activo: "bg-green-100 text-green-800 border-green-300",
        inactivo: "bg-red-100 text-red-800 border-red-300",
        pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full
            text-sm font-medium border ${colores[estado]}`}>
            <span className={`w-2 h-2 rounded-full mr-2
                ${estado === "activo" ? "bg-green-500" :
                  estado === "inactivo" ? "bg-red-500" : "bg-yellow-500"}`}>
            </span>
            {estado}
        </span>
    );
}

// Uso
<Badge estado="activo" />
<Badge estado="pendiente" />
<Badge estado="inactivo" />
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
