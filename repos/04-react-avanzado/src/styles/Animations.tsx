import { useState } from 'react';

function AnimacionesEjemplo() {
    const [visible, setVisible] = useState(false);

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

export { AnimacionesEjemplo, Badge };
