import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FormularioLogin from '../components/FormularioLogin';

describe('FormularioLogin', () => {
    it('debe mostrar errores de validacion al enviar vacio', async () => {
        render(<FormularioLogin />);

        fireEvent.click(screen.getByText('Iniciar Sesion'));

        await waitFor(() => {
            expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
            expect(screen.getByText(/La contrasenia es obligatoria/i)).toBeInTheDocument();
        });
    });

    it('debe enviar el formulario con datos validos', async () => {
        const onSubmit = vi.fn();
        render(<FormularioLogin onSubmit={onSubmit} />);

        await userEvent.type(screen.getByLabelText(/usuario/i), 'admin');
        await userEvent.type(screen.getByLabelText(/contrasenia/i), '123456');
        fireEvent.click(screen.getByText('Iniciar Sesion'));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                usuario: 'admin',
                password: '123456'
            });
        });
    });
});
