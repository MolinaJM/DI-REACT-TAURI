import { test, expect } from '@playwright/test';

test('debe mostrar la pagina principal', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toContainText('Bienvenido');
});

test('debe navegar a productos y ver la lista', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Productos');
    await expect(page).toHaveURL(/.*productos/);
    await expect(page.locator('.producto')).toHaveCount(10);
});

test('debe agregar un producto al carrito', async ({ page }) => {
    await page.goto('http://localhost:3000/productos');
    await page.click('.producto:first-child .btn-agregar');
    await expect(page.locator('.badge-carrito')).toContainText('1');
});
