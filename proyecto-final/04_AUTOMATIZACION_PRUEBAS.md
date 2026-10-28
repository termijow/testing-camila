# Entregable 4: Automatización de Pruebas
**Proyecto Final – Electiva Testing y QA**  
**Empresa Consultora:** NovaQA Quality Solutions  
**Aplicación Auditada:** OpenCart E-Commerce Demo (`http://opencart.abstracta.us/`)  
**Herramienta Seleccionada:** Playwright Test Framework (TypeScript / Node.js)  
**Total de Casos Automatizados:** 5 casos clave E2E  
**Tasa de Éxito en Automatización:** 100% (5/5 Pasados)  
**Fecha de Emisión:** Octubre 2026  

---

## 1. Selección de Herramienta y Justificación Técnica

Entre las herramientas avaladas en la electiva (**Selenium**, **Playwright** y **Cypress**), la firma consultora seleccionó **Playwright** por las siguientes razones técnicas y de arquitectura:

1. **Arquitectura Moderna y Velocidad:** Playwright opera comunicándose directamente a través del protocolo DevTools (Chrome DevTools Protocol - CDP) sin requerir intermediarios WebDriver pesados como Selenium, logrando tiempos de ejecución notablemente inferiores y menor consumo de memoria.
2. **Auto-Waiting Nativo:** Playwright espera automáticamente a que los elementos DOM sean interactuables, visibles y estables antes de ejecutar clics o entradas de texto, eliminando prácticamente los errores por asincronía y peticiones AJAX en OpenCart sin necesidad de pausas estáticas arbitrarias (`sleep`).
3. **Soporte Multi-Browser y Modo Headless/Headed:** Permite ejecutar sobre motores Chromium, WebKit (Safari) y Firefox de forma homogénea con configuración unificada.
4. **Trazabilidad y Reportes Enriquecidos:** Genera informes interactivos en HTML nativo con capturas de pantalla automáticas, pasos detallados y grabación de trazas (*trace viewer*) para depurar cualquier falla de manera gráfica.
5. **Compatibilidad Nativa con TypeScript:** Brinda tipado estático estricto y autocompletado para el desarrollo robusto de scripts de prueba.

---

## 2. Casos de Prueba Seleccionados y Justificación

Se seleccionaron **5 casos de prueba estratégicos** que representan flujos críticos del negocio y cubren diferentes técnicas de diseño probadas en el Entregable 2:

| Identificador | Caso de Prueba Correspondiente | Enfoque / Técnica de Prueba | Módulo Evaluado |
| :---: | :--- | :--- | :--- |
| **CP-AUT-01** | CP-POS-01 (Búsqueda de Productos con Término Válido) | Prueba Positiva | Motor de Búsqueda |
| **CP-AUT-02** | CP-POS-03 & CP-POS-04 (Flujo Integral de Carrito) | Prueba Funcional E2E | Ficha de Producto y Carrito |
| **CP-AUT-03** | CP-BVA-01 & CP-BVA-02 (Valores Límite en Reseñas) | Boundary Value Analysis (BVA) | Formulario de Reseñas |
| **CP-AUT-04** | CP-NEG-02 (Validación de Campos Obligatorios) | Prueba Negativa | Registro de Usuarios |
| **CP-AUT-05** | CP-EST-04 (Cambio Dinámico de Divisa a EUR) | Transición de Estados | Sistema Multidivisa |

### Justificación Detallada de la Selección:

1. **CP-AUT-01 (Búsqueda de Productos - Positiva):**
   - *Justificación de Negocio:* El motor de búsqueda es el punto de entrada primario para la conversión de clientes en una tienda virtual; automatizarlo garantiza que los productos clave continúen siendo descubribles tras cualquier cambio en el catálogo.
2. **CP-AUT-02 (Flujo de Carrito de Compras - E2E Positivo):**
   - *Justificación de Negocio:* El flujo de adición y cálculo de la orden es el núcleo monetario de OpenCart. Su automatización asegura que la navegación entre la ficha de producto y la tabla del carrito preserve los identificadores, cantidades y cálculos de subtotales.
3. **CP-AUT-03 (Análisis de Valores Límite - BVA en Reseñas):**
   - *Justificación de Técnica:* Demuestra la validación de frontera en la entrada de datos: con 24 caracteres (límite inferior inválido) debe rechazar el formulario, mientras que con 25 caracteres (límite inferior válido) debe procesarlo exitosamente. Este caso demuestra la capacidad de automatizar reglas numéricas de negocio complejas.
4. **CP-AUT-04 (Validación de Formulario de Registro - Negativa):**
   - *Justificación de Integridad:* Verifica que el backend y frontend impidan el envío de datos nulos en procesos de alta de usuario, protegiendo la base de datos contra registros corruptos y asegurando mensajes de error comprensibles para el usuario.
5. **CP-AUT-05 (Cambio Dinámico de Divisa - Transición de Estados):**
   - *Justificación de Arquitectura:* Evalúa la capacidad del sistema para transicionar entre estados globales de sesión (moneda USD a EUR), verificando que la cabecera y las tarjetas de productos recalculen sus etiquetas de precio en tiempo real.

---

## 3. Código Fuente de las Pruebas Automatizadas

El archivo fuente se encuentra implementado en el repositorio en la ruta:  
`proyecto-final/automation/opencart.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

/**
 * Suite de Pruebas Automatizadas E2E - OpenCart Demo
 * Proyecto Final - Electiva Testing y QA
 * Empresa Consultora: NovaQA Solutions
 * URL Base: http://opencart.abstracta.us/
 */

test.describe('Auditoría QA Automatizada - OpenCart Demo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://opencart.abstracta.us/', { waitUntil: 'domcontentloaded' });
  });

  /**
   * CP-AUT-01: Búsqueda de Productos con Término Válido (Prueba Positiva)
   */
  test('CP-AUT-01: Debe buscar productos existentes y mostrar resultados acordes', async ({ page }) => {
    const searchInput = page.locator('input[name="search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('MacBook');
    await searchInput.press('Enter');

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
```

---

## 4. Instrucciones para Instalación y Ejecución

### 4.1 Requisitos Previos
- Node.js versión 18 o superior instalado en el sistema operativo.
- Gestor de paquetes `npm`.
- Conexión a internet para alcanzar la URL de pruebas `http://opencart.abstracta.us/`.

### 4.2 Instalación de Dependencias
Situarse en la raíz del proyecto (`testing-camila`) y ejecutar:
```bash
npm install
```
*(Opcional) Si se requiere instalar los navegadores de Playwright por primera vez:*
```bash
npx playwright install chromium
```

### 4.3 Comandos de Ejecución de Pruebas

Para mayor comodidad del evaluador, se configuraron scripts directos en el archivo `package.json`:

1. **Ejecución de la suite de auditoría en modo silencioso (Headless):**
   ```bash
   npm run test:audit
   ```
   *Comando alternativo directo:*
   ```bash
   npx playwright test -c proyecto-final/playwright.config.ts
   ```

2. **Ejecución con navegador visible (Modo Headed / Demostración en Vivo):**
   ```bash
   npm run test:audit:headed
   ```

3. **Visualización interactiva del Reporte HTML de Playwright:**
   ```bash
   npm run report:audit
   ```

---

## 5. Evidencias de Ejecución y Resultados Obtenidos

### 5.1 Salida de Terminal (Execution Log)

```text
Running 5 tests using 1 worker

     1 …CP-AUT-01: Debe buscar productos existentes y mostrar resultados acordes
  ✓  1 …01: Debe buscar productos existentes y mostrar resultados acordes (7.7s)
     2 …P-AUT-02: Debe agregar un producto al carrito y visualizarlo en la orden
  ✓  2 …2: Debe agregar un producto al carrito y visualizarlo en la orden (8.4s)
     3 …ar frontera de caracteres en reseña (24 chars rechaza, 25 chars aprueba)
  ✓  3 …tera de caracteres en reseña (24 chars rechaza, 25 chars aprueba) (7.4s)
     4 …-AUT-04: Debe rechazar envío de formulario de registro con campos vacíos
  ✓  4 … Debe rechazar envío de formulario de registro con campos vacíos (10.2s)
     5 …P-AUT-05: Debe cambiar dinámicamente el estado de la moneda de USD a EUR
  ✓  5 …5: Debe cambiar dinámicamente el estado de la moneda de USD a EUR (5.2s)

  5 passed (41.5s)
```

### 5.2 Resumen de Resultados
- **Total de Pruebas Automatizadas:** 5
- **Pruebas Aprobadas (Passed):** 5 (100%)
- **Pruebas Fallidas (Failed):** 0 (0%)
- **Tiempo Total de Ejecución:** 41.5 segundos.
- **Evidencia Visual del Reporte:** `evidencias/playwright_html_report.png`
- **Reporte Interactivo Completo:** `proyecto-final/playwright-report/index.html`
