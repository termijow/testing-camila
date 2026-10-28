import { test, expect } from '@playwright/test';

/**
 * Suite de Pruebas Automatizadas E2E - OpenCart Demo
 * Proyecto Final - Electiva Testing y QA
 * Empresa Consultora: NovaQA Solutions
 * URL Base: http://opencart.abstracta.us/
 */

test.describe('Auditoría QA Automatizada - OpenCart Demo', () => {

  test.beforeEach(async ({ page, context }) => {
    // Configurar contexto para ignorar certificados si se redirige a HTTPS
    await page.goto('http://opencart.abstracta.us/', { waitUntil: 'domcontentloaded' });
  });

  /**
   * CP-AUT-01: Búsqueda de Productos con Término Válido (Prueba Positiva)
   * Técnica: Partición de Equivalencia / Búsqueda Positiva
   * Justificación: Es la funcionalidad principal de descubrimiento de productos en un e-commerce.
   */
  test('CP-AUT-01: Debe buscar productos existentes y mostrar resultados acordes', async ({ page }) => {
    const searchInput = page.locator('input[name="search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('MacBook');
    await page.click('#search button');
    await page.waitForURL(/route=product\/search/, { timeout: 10000 });

    // Validar encabezado y listado de resultados
    const heading = page.locator('#content h1');
    await expect(heading).toContainText('Search - MacBook');

    const products = page.locator('.product-layout');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    // Validar que al menos un producto contenga la palabra clave
    const firstProductTitle = page.locator('.product-layout h4 a').first();
    await expect(firstProductTitle).toContainText('MacBook');
  });

  /**
   * CP-AUT-02: Flujo Completo de Carrito de Compras (End-to-End Positivo)
   * Técnica: Pruebas Funcionales Positivas / Flujo E2E
   * Justificación: Núcleo del modelo de negocio e-commerce; valida interacción de catálogo, adición y carrito.
   */
  test('CP-AUT-02: Debe agregar un producto al carrito y visualizarlo en la orden', async ({ page }) => {
    // Navegar a detalle de producto iPhone
    await page.goto('http://opencart.abstracta.us/index.php?route=product/product&product_id=40');

    // Configurar cantidad válida = 2
    const qtyInput = page.locator('#input-quantity');
    await qtyInput.fill('2');

    // Click en botón agregar al carrito
    await page.click('#button-cart');

    // Verificar notificación flotante de éxito
    const alertSuccess = page.locator('.alert-success');
    await expect(alertSuccess).toBeVisible({ timeout: 5000 });
    await expect(alertSuccess).toContainText('Success: You have added');

    // Navegar al carrito de compras
    await page.goto('http://opencart.abstracta.us/index.php?route=checkout/cart');

    // Validar que la tabla del carrito contenga el producto iPhone
    const cartTable = page.locator('#content form');
    await expect(cartTable).toContainText('iPhone');

    // Validar que la cantidad en el input refleje las 2 unidades
    const cartQty = page.locator('input[name^="quantity"]');
    await expect(cartQty).toHaveValue('2');
  });

  /**
   * CP-AUT-03: Análisis de Valores Límite (BVA) en Formulario de Reseñas
   * Técnica: Boundary Value Analysis (BVA) en longitud de texto (mínimo 25 caracteres)
   * Justificación: Verifica el cumplimiento estricto de las reglas de frontera en validación de inputs.
   */
  test('CP-AUT-03: Debe validar frontera de caracteres en reseña (24 chars rechaza, 25 chars aprueba)', async ({ page }) => {
    await page.goto('http://opencart.abstracta.us/index.php?route=product/product&product_id=40');

    // Abrir pestaña de reseñas
    await page.click('a[href="#tab-review"]');
    await expect(page.locator('#input-name')).toBeVisible();

    await page.fill('#input-name', 'Auditor QA');
    await page.check('input[name="rating"][value="5"]');

    // Caso Límite Inferior Inválido: 24 caracteres (Longitud esperada >= 25)
    await page.fill('#input-review', '123456789012345678901234'); // 24 caracteres
    await page.click('#button-review');

    // Esperar mensaje de advertencia
    const warningAlert = page.locator('#form-review .alert-danger');
    await expect(warningAlert).toBeVisible({ timeout: 5000 });
    await expect(warningAlert).toContainText('Warning: Review Text must be between 25 and 1000 characters!');

    // Caso Límite Inferior Válido: 25 caracteres exactos
    await page.fill('#input-review', '1234567890123456789012345'); // 25 caracteres
    await page.click('#button-review');

    // Esperar mensaje de confirmación exitosa
    const successAlert = page.locator('#form-review .alert-success');
    await expect(successAlert).toBeVisible({ timeout: 5000 });
    await expect(successAlert).toContainText('Thank you for your review');
  });

  /**
   * CP-AUT-04: Validación de Campos Obligatorios en Registro (Prueba Negativa)
   * Técnica: Pruebas Negativas / Validación de Reglas de Negocio
   * Justificación: Previene la corrupción de la base de datos de clientes por datos faltantes o nulos.
   */
  test('CP-AUT-04: Debe rechazar envío de formulario de registro con campos vacíos', async ({ page }) => {
    await page.goto('http://opencart.abstracta.us/index.php?route=account/register');

    // Intentar enviar sin diligenciar nada
    await page.click('input[value="Continue"]');

    // Validar mensaje global de aceptación de términos
    const termsWarning = page.locator('.alert-danger');
    await expect(termsWarning).toBeVisible();
    await expect(termsWarning).toContainText('Warning: You must agree to the Privacy Policy!');

    // Validar mensajes de error específicos por campo obligatorio
    const errorMessages = page.locator('.text-danger');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThanOrEqual(5);

    // Verificar validación de First Name y Password
    await expect(page.locator('#account .text-danger').first()).toContainText('First Name must be between');
  });

  /**
   * CP-AUT-05: Transición de Estados por Cambio Dinámico de Moneda (Transición de Estados)
   * Técnica: State Transition Testing (Estado USD -> Estado EUR -> Verificación de Símbolo y Precios)
   * Justificación: Comprueba la consistencia transaccional y visual del sistema multidivisa.
   */
  test('CP-AUT-05: Debe cambiar dinámicamente el estado de la moneda de USD a EUR', async ({ page }) => {
    // Abrir dropdown de monedas
    const currencyDropdown = page.locator('#form-currency .dropdown-toggle');
    await currencyDropdown.click();

    // Seleccionar Euro (€ EUR)
    await page.click('button[name="EUR"]');

    // Esperar recarga y verificar símbolo activo en la cabecera
    const activeCurrency = page.locator('#form-currency strong');
    await expect(activeCurrency).toHaveText('€');

    // Verificar que los precios de los productos destacados en la Home incluyan el símbolo de Euro (€)
    const firstProductPrice = page.locator('.product-layout .price').first();
    await expect(firstProductPrice).toContainText('€');

    // Restaurar a USD para mantener estado limpio
    await currencyDropdown.click();
    await page.click('button[name="USD"]');
    await expect(page.locator('#form-currency strong')).toHaveText('$');
  });

});
