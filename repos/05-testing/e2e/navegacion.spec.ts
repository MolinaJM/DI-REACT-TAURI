import { test, expect } from '@playwright/test';

test('muestra la pagina principal', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Bienvenido');
});

test('el contador suma y resetea', async ({ page }) => {
    await page.goto('/');
    const contador = page.locator('span').first();
    await expect(contador).toHaveText('0');
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await expect(contador).toHaveText('2');
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(contador).toHaveText('0');
});

test('el formulario valida errores y actualiza el saludo', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Iniciar Sesion' }).click();
    await expect(page.getByText('El nombre es obligatorio')).toBeVisible();
    await expect(page.getByText('La contrasenia es obligatoria')).toBeVisible();

    await page.getByLabel('Usuario').fill('Ada');
    await page.getByLabel('Contrasenia').fill('secreto');
    await page.getByRole('button', { name: 'Iniciar Sesion' }).click();

    await expect(page.getByText('Hola, Ada')).toBeVisible();
    await expect(page.getByText('El nombre es obligatorio')).toBeHidden();
});