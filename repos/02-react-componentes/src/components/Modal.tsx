/**
 * Modal.tsx - Componente Modal
 * Fuente: Sesión 07 - Creación de Componentes Personalizados
 * Modal con abierto/onCerrar/titulo/children, useEffect para body overflow
 */
import { ReactNode, useEffect } from 'react';

interface ModalProps {
    abierto: boolean;
    onCerrar: () => void;
    titulo: string;
    children: ReactNode;
    tamano?: "sm" | "md" | "lg";
}

function Modal({ abierto, onCerrar, titulo, children, tamano: _tamano = "md" }: ModalProps) {
    useEffect(() => {
        if (abierto) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [abierto]);

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onCerrar}></div>
            <div className={`relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{titulo}</h2>
                    <button onClick={onCerrar}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
