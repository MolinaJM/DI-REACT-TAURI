import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contador from '../components/Contador';

describe('Componente Contador', () => {
    it('debe renderizar el valor inicial en 0', () => {
        render(<Contador />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('debe incrementar el valor al hacer clic en "+"', () => {
        render(<Contador />);
        const boton = screen.getByText('+');
        fireEvent.click(boton);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('debe decrementar el valor al hacer clic en "-"', () => {
        render(<Contador />);
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('-'));
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('debe resetear el valor al hacer clic en "Reset"', () => {
        render(<Contador />);
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('Reset'));
        expect(screen.getByText('0')).toBeInTheDocument();
    });
});
