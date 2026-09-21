import { test, expect } from '@playwright/test';

test('home shows hero and calculator', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Encuentra profesionales');
  await page.getByRole('button', { name: 'Calcular intervalo' }).click();
  await expect(page.getByText('Obtén presupuestos adaptados a tu edificio')).toBeVisible();
});

test('geo page has unique h1 and sponsored cta', async ({ page }) => {
  await page.goto('/rehabilitacion-edificios/madrid/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const cta = page.locator('a[rel="sponsored noopener"]').first();
  await expect(cta).toHaveAttribute('href', /clickref=madrid_hero/);
});

test('rejecting cookies still allows calculator', async ({ page }) => {
  await page.goto('/calculadora/');
  await page.getByRole('button', { name: 'Rechazar' }).click();
  await expect(page.getByRole('button', { name: 'Calcular intervalo' })).toBeVisible();
});
