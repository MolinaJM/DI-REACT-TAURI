/**
 * Card.tsx - Props children pattern con ReactNode
 * Fuente: Sesión 04 - Props Children
 */
import { ReactNode } from 'react';

interface CardProps {
    titulo: string;
    children: ReactNode;
    className?: string;
}

function Card({ titulo, children, className = "" }: CardProps) {
    return (
        <div className={`bg-white shadow-md rounded-xl p-6 ${className}`}>
            <h3 className="text-lg font-semibold mb-3">{titulo}</h3>
            {children}
        </div>
    );
}

export default Card;
