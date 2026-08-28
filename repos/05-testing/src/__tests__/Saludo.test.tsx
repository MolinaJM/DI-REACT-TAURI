import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Saludo from '../components/Saludo';

describe('Componente Saludo', () => {
    it('debe mostrar el nombre pasado por props', () => {
        render(<Saludo nombre="Maria" />);
        expect(screen.getByText(/Hola, Maria/i)).toBeInTheDocument();
    });

    it('debe mostrar la edad cuando se proporciona', () => {
        render(<Saludo nombre="Juan" edad={25} />);
        expect(screen.getByText(/25 anios/i)).toBeInTheDocument();
    });

    it('no debe mostrar edad cuando no se proporciona', () => {
        render(<Saludo nombre="Pedro" />);
        expect(screen.queryByText(/anios/i)).not.toBeInTheDocument();
    });
});
