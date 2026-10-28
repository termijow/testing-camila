# Entregable 1: Plan de Pruebas de Calidad de Software
**Proyecto Final – Electiva Testing y QA**  
**Empresa Consultora:** NovaQA Quality Solutions  
**Aplicación Auditada:** OpenCart E-Commerce Demo (`http://opencart.abstracta.us/`)  
**Versión del Documento:** 1.0  
**Fecha:** Octubre 2026  
**Modalidad:** Equipo de 2 Auditores QA  

---

## 1. Introducción y Contexto

El presente documento constituye el **Plan de Pruebas de Calidad de Software** diseñado por la firma consultora **NovaQA Quality Solutions** para llevar a cabo una auditoría integral sobre la plataforma de comercio electrónico **OpenCart** (versión de referencia comunitaria/demo estable).

OpenCart es una de las plataformas de comercio electrónico de código abierto más extendidas a nivel mundial para pequeñas y medianas empresas. El propósito de esta auditoría es evaluar el grado de madurez, estabilidad, consistencia de datos, seguridad en la capa de interfaz y experiencia de usuario (UX/UI), verificando si el producto cumple con los estándares mínimos requeridos para una salida a producción comercialmente viable.

---

## 2. Objetivo de la Auditoría

El objetivo general es **planificar, diseñar y ejecutar un proceso riguroso de pruebas funcionales y no funcionales** sobre los módulos críticos de OpenCart Demo, empleando técnicas formales de diseño de pruebas (ISTQB / ISO/IEC/IEEE 29119), identificando defectos reales y reproducibles, implementando un conjunto automatizado de regresión con Playwright, midiendo la cobertura funcional y emitiendo un concepto técnico vinculante sobre su preparación para producción (*Production Readiness*).

### Objetivos Específicos:
1. Definir con precisión las fronteras del alcance de pruebas (módulos incluidos y excluidos).
2. Diseñar y ejecutar una batería exhaustiva de más de 30 casos de prueba que cubran pruebas positivas, negativas, de valores límite (BVA), tablas de decisión y transición de estados.
3. Descubrir, aislar y documentar formalmente un mínimo de 10 defectos reales y verificables con evidencias fotográficas y registros técnicos.
4. Implementar una suite de pruebas automatizadas End-to-End (E2E) con Playwright que valide los flujos esenciales del negocio.
5. Medir y justificar la cobertura de pruebas funcional y de requerimientos, asegurando un porcentaje superior al 50%.
6. Sintetizar los hallazgos en un informe final de auditoría con un dictamen categórico (Sí / No) respecto al paso a producción.

---

## 3. Alcance de las Pruebas

### 3.1 Funcionalidades Incluidas (In-Scope)

La auditoría se enfoca en los módulos y componentes del Storefront (interfaz del cliente) que impactan directamente el embudo de conversión, la captura de datos y la transacción comercial:

1. **Catálogo y Navegación:**
   - Exploración de categorías y subcategorías (Desktops, Laptops, Components, Tablets, Software).
   - Manejo de categorías vacías y mensajes informativos.
   - Paginación, ordenamiento y visualización de productos.
2. **Descubrimiento y Búsqueda de Productos:**
   - Búsqueda por palabra clave exacta y parcial.
   - Búsqueda con entradas inválidas, espacios en blanco y caracteres especiales.
   - Búsqueda de productos inexistentes y mensajes al usuario.
3. **Ficha de Detalle de Producto:**
   - Visualización de precios, descripción, especificaciones y stock.
   - Control de cantidades (valores positivos, negativos, cero y límites superiores).
   - Selector de variantes y opciones de producto.
4. **Reseñas y Calificaciones (Product Reviews):**
   - Validación de campos obligatorios (nombre, texto de reseña, rating).
   - Evaluación de límites de caracteres (regla de negocio: mínimo 25 y máximo 1000 caracteres).
5. **Carrito de Compras (Shopping Cart):**
   - Adición de productos desde catálogo y desde página de producto.
   - Modificación de cantidades y actualización dinámica de totales e impuestos.
   - Eliminación de ítems del carrito.
   - Aplicación de cupones de descuento y certificados de regalo.
6. **Gestión de Cuentas de Usuario:**
   - Registro de nuevos clientes (validación de campos obligatorios, formatos y contraseñas).
   - Inicio y cierre de sesión.
   - Gestión de Lista de Deseos (*Wishlist*) para usuarios invitados vs. autenticados.
7. **Certificados de Regalo (Gift Vouchers):**
   - Formulario de compra de certificados (límites de $1.00 a $1,000.00).
   - Reglas de destinatario y emisor.
8. **Devoluciones de Producto (RMA - Product Returns):**
   - Formulario de solicitud de devolución y validación de identificador de orden (Order ID).
9. **Formulario de Contacto (Contact Us):**
   - Validación de longitud de consulta (Enquiry: 10 a 3000 caracteres) y formato de correo.
10. **Comparador de Productos (Product Compare):**
    - Adición, contraste de especificaciones y remoción de ítems.
11. **Sistema Multidivisa:**
    - Cambio dinámico de divisas (USD, EUR, GBP) y actualización de símbolos y totales.

### 3.2 Funcionalidades Excluidas (Out-of-Scope)

Para acotar el alcance al tiempo disponible y a las restricciones de un entorno demo público:

1. **Pasarelas de Pago Financieras Reales:**
   - No se procesarán cargos en tarjetas de crédito reales ni integraciones de producción con procesadores bancarios (se evalúa la lógica del carrito y checkout simulado).
2. **Infraestructura de Servidor y Back-Office Privado:**
   - Modificación del código fuente PHP en el servidor remoto o administración de la base de datos MySQL en producción.
   - Acceso al panel administrativo para alterar configuraciones globales que impacten a otros estudiantes.
3. **Pruebas de Carga y Estrés Masivo:**
   - No se realizarán ataques de denegación de servicio (DoS) ni pruebas de rendimiento con más de 100 usuarios concurrentes para no degradar el servicio compartido.
4. **Pruebas en Dispositivos Móviles Físicos:**
   - Las pruebas de adaptabilidad se limitarán a emuladores y viewports estándar de navegadores Chromium/WebKit.

---

## 4. Funcionalidades por Evaluar: Módulos, Procesos y Flujos

A continuación se detalla la matriz de componentes y flujos seleccionados para la auditoría:

| Módulo / Componente | Procesos Clave | Tipo de Flujo | Criterio de Aceptación General |
| :--- | :--- | :--- | :--- |
| **M01: Búsqueda** | Búsqueda simple, avanzada y por descripción | Entrada / Salida | Retornar productos coincidentes; mostrar mensaje informativo claro si no hay resultados o si la entrada es inválida. |
| **M02: Catálogo** | Navegación por categorías y visualización de listas | Navegación | Presentar productos con imagen, título y precio correcto. Las categorías vacías deben informar su estado de forma transparente. |
| **M03: Ficha de Producto** | Selección de opciones, cantidad y adición al carrito | Transaccional | Validar que la cantidad sea un entero positivo (>= 1). Notificar adecuadamente el éxito o bloqueo al usuario. |
| **M04: Reseñas** | Envío de opiniones y asignación de estrellas | Interacción / Entrada | Exigir entre 25 y 1000 caracteres en la reseña; rating de 1 a 5 obligatorio; prevenir envío de datos nulos. |
| **M05: Carrito** | Actualización de cantidades, recálculo y eliminación | Cálculo / Estado | Recalcular subtotales e impuestos inmediatamente. Evitar inconsistencias numéricas o totales absurdos. |
| **M06: Registro** | Alta de cliente, validación de campos y contraseñas | Identidad / Seguridad | Validar formato de correo, teléfonos válidos, coincidencia estricta de contraseña y aceptación de políticas. |
| **M07: Vouchers** | Emisión de certificados de regalo | Comercial | Aceptar montos entre 1.00 y 1000.00; exigir correos válidos y distintos para emisor y receptor. |
| **M08: Devoluciones** | Radicación de solicitud RMA | Posventa | Validar que el Order ID sea numérico y coherente; validar campos obligatorios del producto y motivo. |
| **M09: Contacto** | Envío de mensajes al soporte | Comunicación | Validar nombre (3-32 chars), email válido y mensaje (10-3000 chars). |
| **M10: Multidivisa** | Cambio de moneda activa (USD / EUR / GBP) | Visual / Conversión | Actualizar el símbolo monetario y convertir los precios de acuerdo a la tasa configurada en todo el sitio. |
| **M11: Comparador** | Comparación técnica entre dos o más artículos | Visual / Atributos | Mostrar tabla comparativa estructurada; permitir remover productos de la comparación. |
| **M12: Wishlist** | Guardado de artículos favoritos | Persistencia / Sesión | Advertir amigablemente a usuarios no autenticados que deben iniciar sesión sin generar confusión de estado. |

---

## 5. Análisis y Gestión de Riesgos

La gestión de riesgos identifica los factores que amenazan tanto la calidad del software auditado como la ejecución del proyecto de consultoría:

### 5.1 Riesgos del Producto (Software Quality Risks)

| ID | Riesgo del Producto | Probabilidad | Impacto | Estrategia de Mitigación / Prueba |
| :--- | :--- | :--- | :--- | :--- |
| **RP-01** | **Corrupción de datos transaccionales:** Aceptación de cantidades negativas, cero o desbordamientos en el carrito. | Alta | Crítico | Diseñar casos de valores límite y pruebas negativas específicas en la adición y actualización del carrito. |
| **RP-02** | **Fallas en la integridad de datos de clientes:** Almacenamiento de números telefónicos o identificadores con caracteres alfabéticos o scripts. | Alta | Alto | Ejecutar casos de prueba negativos con datos no numéricos y caracteres especiales en los formularios de registro y checkout. |
| **RP-03** | **Experiencia de usuario engañosa (Dark UX / Misleading Alerts):** Mensajes de éxito mostrados cuando la operación realmente no se completó o cuando se requiere inicio de sesión. | Alta | Medio | Inspeccionar las clases CSS de las alertas (`.alert-success` vs `.alert-warning`) y validar la persistencia real de los datos. |
| **RP-04** | **Vulnerabilidad a Spam en Reseñas y Formularios:** Carencia de CAPTCHA o Rate Limiting en el envío de opiniones de productos. | Alta | Alto | Auditar la presencia de controles anti-automatización en formularios públicos. |
| **RP-05** | **Inconsistencia de precios multidivisa:** Errores de redondeo o ubicación inadecuada de los símbolos de moneda según estándares internacionales. | Media | Medio | Validar visual y funcionalmente la conversión de precios en el catálogo y carrito al cambiar de divisa. |

### 5.2 Riesgos del Proceso de Pruebas (Test Process Risks)

| ID | Riesgo del Proceso | Probabilidad | Impacto | Estrategia de Mitigación |
| :--- | :--- | :--- | :--- | :--- |
| **RT-01** | **Inestabilidad del entorno demo público:** Modificaciones concurrentes de datos por otros usuarios externos o caídas temporales del servidor. | Media | Alto | Diseñar pruebas con datos dinámicos únicos (marcas de tiempo en emails como `test_${Date.now()}@test.com`), y reintentos automáticos. |
| **RT-02** | **Bloqueos por cortafuegos o WAF (Cloudflare):** Detección de herramientas de automatización que bloquean las pruebas con códigos HTTP 403. | Alta | Crítico | Seleccionar la instancia de prueba accesible (`opencart.abstracta.us`), configurar cabeceras estándar de navegador y omitir validación estricta de SSL en Playwright. |
| **RT-03** | **Tiempos de respuesta lentos en la red:** Falsos negativos en las pruebas automatizadas por timeouts en peticiones AJAX. | Media | Medio | Implementar esperas explícitas basadas en estado (`waitForSelector`, `toBeVisible`) en lugar de pausas estáticas fijas en el código de Playwright. |

---

## 6. Metodología y Entorno de Pruebas

- **Normas de Referencia:** ISTQB (*International Software Testing Qualifications Board*) y estándar ISO/IEC/IEEE 29119 (*Software Testing*).
- **Enfoque:** Pruebas dinámicas de caja negra (*Black-box testing*).
- **Herramientas Utilizadas:**
  - **Automatización E2E:** Playwright Test Framework (TypeScript/JavaScript, Node.js v26+).
  - **Navegadores de Ejecución:** Chromium (Desktop Chrome Engine).
  - **Gestión de Evidencias:** Capturas de pantalla automáticas y reporte interactivo HTML de Playwright.
  - **Entorno de Pruebas Web:** `http://opencart.abstracta.us/` (OpenCart 2.3/3.0 Community Testing Instance).
