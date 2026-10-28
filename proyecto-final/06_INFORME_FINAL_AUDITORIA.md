# Entregable 6: Informe Final de Auditoría de Calidad
**Proyecto Final – Electiva Testing y QA**  
**Documento Oficial de Entrega de Consultoría QA**  

```
  ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗      ██████╗  █████╗ 
  ████╗  ██║██╔═══██╗██║   ██║██╔══██╗    ██╔═══██╗██╔══██╗
  ██╔██╗ ██║██║   ██║██║   ██║███████║    ██║   ██║███████║
  ██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║    ██║▄▄ ██║██╔══██║
  ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║    ╚██████╔╝██║  ██║
  ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝     ╚══▀▀═╝ ╚═╝  ╚═╝
              QUALITY SOLUTIONS & AUDITING
```

**Para:** Junta Directiva y Dirección de Tecnología (Cliente)  
**De:** NovaQA Quality Solutions (Equipo de Consultoría y Testing)  
**Proyecto:** Auditoría de Calidad y Preparación para Producción (*Production Readiness*)  
**Plataforma Evaluada:** OpenCart E-Commerce Platform (`http://opencart.abstracta.us/`)  
**Fecha de Emisión:** Octubre 2026  
**Versión:** 1.0 - Dictamen Final  

---

## 1. Resumen Ejecutivo

La firma consultora **NovaQA Quality Solutions** fue contratada para llevar a cabo una auditoría integral e independiente de aseguramiento de calidad sobre la plataforma de comercio electrónico **OpenCart** (versión de referencia comunitaria). El propósito central del compromiso fue evaluar la madurez técnica, la consistencia transaccional, la robustez de las validaciones y la experiencia de usuario (UX), con el fin de emitir un dictamen técnico vinculante sobre su viabilidad para salir a producción.

Durante el proceso de auditoría se diseñó y ejecutó una batería de **35 casos de prueba** estructurados en cinco técnicas formales de ISTQB, complementada con una suite automatizada de regresión en **Playwright** y una medición de cobertura funcional del **85.71%**.

### Hallazgos Principales:
- **Tasa de Aprobación Global:** Se ejecutaron 35 casos, de los cuales **28 fueron aprobados (80.0%)** y **7 resultaron fallidos (20.0%)**.
- **Defectos Identificados:** Se aislaron y verificaron **10 defectos reales**, entre los cuales destacan **2 defectos de Severidad Crítica** y **2 de Severidad Mayor**.
- **Riesgos Transaccionales Críticos:** El sistema adolece de controles básicos de integridad numérica en el carrito de compras (permite agregar cantidades astronómicas de $123 mil millones y emite alertas de éxito falsas con cantidades negativas), permite radicar devoluciones de garantía sobre órdenes inexistentes y no valida el formato telefónico de los clientes para despachos logísticos.

---

## 2. Aplicación y Funcionalidades Evaluadas

La auditoría se concentró en la capa de interacción del cliente (*Storefront*) y en los componentes transaccionales neurálgicos:

1. **Motor de Búsqueda:** Búsqueda por términos exactos, coincidencias parciales, cadenas de espacios en blanco y términos no existentes.
2. **Catálogo y Navegación:** Exploración de categorías multinivel y tratamiento de estados sin inventario.
3. **Ficha de Detalle de Producto:** Selección de especificaciones, control de cantidades y adición a la cesta.
4. **Reseñas y Opiniones:** Validación de límites de caracteres (regla de 25 a 1000 chars) y captura de calificación.
5. **Carrito de Compras:** Cálculo de subtotales, impuestos, actualización dinámica y remoción de ítems.
6. **Gestión de Cuentas:** Registro de clientes, inicio de sesión, validación de contraseñas y Lista de Deseos (Wishlist).
7. **Certificados de Regalo (Vouchers):** Emisión, reglas de montos ($1 a $1000) y control de destinatarios.
8. **Módulo de Devoluciones (RMA):** Radicación de garantías y validación de identificador de orden.
9. **Formulario de Contacto:** Envío de mensajes de soporte y validación de campos obligatorios.
10. **Sistema Multidivisa:** Alternancia dinámica entre USD ($), EUR (€) y GBP (£).
11. **Comparador de Productos:** Contraste técnico de especificaciones entre productos.

---

## 3. Metodología de Pruebas Utilizada

La auditoría se rigió por los lineamientos internacionales del **ISTQB (International Software Testing Qualifications Board)** y el estándar **ISO/IEC/IEEE 29119**:

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                     CICLO METODOLÓGICO DE AUDITORÍA NOVAQA                        │
├─────────────────┬─────────────────┬───────────────────┬───────────────────────────┤
│ 1. Planificación│ 2. Diseño       │ 3. Ejecución &    │ 4. Automatización         │
│    & Alcance    │    Riguroso     │    Descubrimiento │    & Reporte Final        │
│ • Objetivos     │ • Positivas     │ • 35 casos        │ • Playwright Suite        │
│ • Riesgos       │ • Negativas     │ • Aislamiento de  │ • Matriz RTM (85.7%)      │
│ • Fronteras     │ • BVA / Límites │   10 defectos     │ • Dictamen Go / No-Go     │
│ • Entorno Demo  │ • Tablas / Dec. │ • Captura de      │ • Plan de Remediación     │
│                 │ • Estados       │   evidencias      │                           │
└─────────────────┴─────────────────┴───────────────────┴───────────────────────────┘
```

- **Enfoque:** Pruebas dinámicas de caja negra funcional (*Dynamic Functional Black-Box Testing*).
- **Técnicas de Diseño Aplicadas:**
  1. *Equivalence Partitioning & Positive Testing* (Happy Path).
  2. *Negative Testing & Error Guessing* (Pruebas de robustez y datos anómalos).
  3. *Boundary Value Analysis (BVA)* (Evaluación estricta en fronteras numéricas y de caracteres).
  4. *Decision Table Testing* (Lógica combinatoria de reglas de negocio en registro y reseñas).
  5. *State Transition Testing* (Verificación de consistencia ante cambios de estado de sesión y carrito).

---

## 4. Resultados Generales de la Ejecución

Se diseñaron y ejecutaron 35 casos de prueba formalmente documentados:

```
Resultados de Ejecución de Casos de Prueba (N = 35)
████████████████████████████████ Aprobados (28) -> 80.0%
████████ Fallidos (7) -> 20.0%
```

| Módulo Evaluado | Casos Asignados | Aprobados | Fallidos | Tasa de Éxito |
| :--- | :---: | :---: | :---: | :---: |
| Motor de Búsqueda | 3 | 3 | 0 | 100.0% |
| Catálogo y Navegación | 2 | 2 | 0 | 100.0% |
| Ficha de Producto | 3 | 2 | 1 | 66.7% |
| Reseñas de Producto | 5 | 5 | 0 | 100.0% |
| Carrito de Compras | 4 | 2 | 2 | 50.0% |
| Registro y Cuentas | 8 | 7 | 1 | 87.5% |
| Certificados de Regalo | 3 | 2 | 1 | 66.7% |
| Devoluciones (RMA) | 1 | 0 | 1 | 0.0% |
| Formulario de Contacto | 3 | 3 | 0 | 100.0% |
| Sistema Multidivisa | 2 | 2 | 0 | 100.0% |
| Comparador de Productos | 1 | 1 | 0 | 100.0% |
| TOTAL | **35** | **28** | **7** | **80.0%** |

---

## 5. Principales Defectos Identificados y su Impacto

Se identificaron y evidenciaron **10 defectos reales**. A continuación se exponen los hallazgos con mayor potencial de daño financiero, operativo y reputacional:

### 1. DEF-06 (Severidad: CRÍTICA | Prioridad: ALTA)
- **Problema:** Desbordamiento de orden permitiendo cantidades astronómicas (999,999,999 unidades) por más de $123 mil millones sin límite comercial ni validación de inventario.
- **Impacto Financiero/Técnico:** Puede saturar pasarelas de pago externas al enviar totales que exceden tipos de datos enteros/flotantes estándar en APIs bancarias, abrir vectores de denegación de servicio transaccional y bloquear el inventario de la tienda.

### 2. DEF-04 (Severidad: CRÍTICA | Prioridad: ALTA)
- **Problema:** Radicación de devoluciones de producto (RMA) aceptando Order IDs inexistentes y alfanuméricos como `"ORDEN-NO-NUMERICA-TOTALMENTE-INVALIDA"`.
- **Impacto Operativo:** El departamento de servicio posventa y garantías recibirá reclamos fraudulentos o falsos sin correlación con ventas reales, generando sobrecostos operativos y colapso de la mesa de soporte.

### 3. DEF-01 (Severidad: MAYOR | Prioridad: ALTA)
- **Problema:** Adición de productos con cantidad negativa (ej. `-10`) emite un mensaje de éxito verde ("Success: You have added...") pero la orden permanece vacía.
- **Impacto en el Cliente:** Falso positivo de interfaz que engaña al consumidor haciéndole creer que sus productos fueron reservados o agregados, resultando en carritos abandonados y frustración en el checkout.

### 4. DEF-03 (Severidad: MAYOR | Prioridad: ALTA)
- **Problema:** El campo obligatorio "Telephone" en el registro de clientes admite texto alfabético y símbolos (`"NOT-A-PHONE-NUMBER-123!@#$%"`) sin validar formato numérico.
- **Impacto Logístico:** Las empresas de logística y transportadoras no podrán contactar al comprador para la entrega final de los paquetes ni se podrán despachar notificaciones automáticas vía SMS/WhatsApp.

---

## 6. Resultados de Automatización y Cobertura

### 6.1 Automatización de Pruebas con Playwright
- Se implementó un conjunto de pruebas automatizadas E2E que cubrió **5 flujos vitales**:
  1. Búsqueda de productos en el catálogo.
  2. Flujo completo de adición y carrito de compras.
  3. Validación de valores límite (BVA) en el formulario de reseñas (24 vs 25 caracteres).
  4. Validación de campos obligatorios en el registro de clientes.
  5. Transición dinámica de estados por cambio de divisa (USD a EUR).
- **Métricas:** 5 pruebas ejecutadas en 41.5 segundos con **100% de aprobación**. Se cuenta con reportes gráficos interactivos y trazas completas generadas por Playwright (`playwright-report/index.html`).

### 6.2 Cobertura de Pruebas
- **Cobertura Funcional (RTM):** Se evaluaron **12 de los 14 módulos** existentes en la arquitectura de OpenCart, alcanzando una cobertura funcional del **85.71%**, superando ampliamente el umbral del 50% exigido.
- **Cobertura de Casos:** 100% de los 35 casos planificados fueron ejecutados.

---

## 7. Riesgos Pendientes de Mitigación

Antes de cualquier despliegue en un entorno comercial, la organización debe resolver los siguientes riesgos abiertos:

1. **Riesgo de Fraude y Abuso Transaccional:** Falta de límites en montos de compras y emisión de certificados hacia uno mismo.
2. **Riesgo de Pérdida de Datos en Carrito:** Al colocar cantidad `0`, el producto se borra de inmediato sin confirmación previa, provocando pérdidas de compras de usuarios indecisos o con errores tipográficos.
3. **Riesgo de Reputación por Dark UX:** Alertas de color verde utilizadas para comunicar restricciones de autenticación en la Lista de Deseos (Wishlist).
4. **Vulnerabilidad a Spam Automatizado:** El formulario de reseñas públicas no posee CAPTCHA visible ni protección de Rate Limiting en la instancia evaluada.

---

## 8. Recomendaciones de Mejora

NovaQA Quality Solutions sugiere el siguiente **Plan de Remediación Priorizado**:

1. **Sprint Inmediato (Hotfix - Bloqueantes de Producción):**
   - Configurar atributo `min="1"` y `max="100"` en todos los campos de cantidad (`#input-quantity` y carrito). Añadir validación backend estricta en `catalog/controller/checkout/cart.php` que retorne error si `quantity <= 0`.
   - Modificar la validación de `catalog/controller/account/return.php` para exigir que el campo `order_id` sea estrictamente un entero numérico y exista en la tabla `oc_order`.
   - Implementar expresión regular en el campo de teléfono (`/^[0-9+\s()-]{7,20}$/`) tanto en Javascript como en PHP.
2. **Segundo Sprint (Mejoras de Usabilidad y UX):**
   - Corregir la clase de alerta en el controlador de Wishlist cambiando `.alert-success` por `.alert-warning` o `.alert-info` cuando el usuario no esté autenticado.
   - Agregar un diálogo modal de confirmación (*"¿Desea eliminar este producto de la cesta?"*) cuando el usuario actualice la cantidad a 0.
   - Sanitizar la entrada de búsqueda aplicando `trim()` para no generar encabezados con espacios vacíos.
3. **Tercer Sprint (Alineación Comercial):**
   - Enriquecer las páginas de categorías vacías con un carrusel de productos recomendados o más vendidos.
   - Unificar la presentación de monedas internacionales con espacios apropiados según normas ISO.

---

## 9. Concepto Final: ¿La aplicación está lista para producción?

### DICTAMEN TÉCNICO VINCULANTE:

# **NO**

---

### Justificación de la Decisión:

La aplicación **NO se encuentra preparada para salir a producción**.

Esta decisión se fundamenta objetivamente en los principios universales de aseguramiento de calidad y en las siguientes evidencias no negociables:

1. **Incumplimiento de Criterios de Salida (*Exit Criteria*):** En cualquier estándar formal de ingeniería de software, el criterio de salida estipula que **no debe existir ningún defecto de Severidad Crítica ni Mayor abierto** en la fase previa al lanzamiento. OpenCart presenta actualmente **2 defectos Críticos (DEF-04, DEF-06)** y **2 defectos Mayores (DEF-01, DEF-03)** en sus flujos transaccionales centrales.
2. **Compromiso de la Integridad Financiera y Logística:** Lanzar a producción una plataforma que permite órdenes de compra de $123 mil millones, que admite devoluciones de mercancía con códigos de orden ficticios y que registra clientes con teléfonos imposibles de contactar expone a la empresa a pérdidas económicas severas, fraudes y reprocesos operativos insostenibles.
3. **Erosión de la Confianza del Consumidor:** La existencia de alertas engañosas (falsos éxitos al ingresar cantidades negativas o mensajes verdes para acciones no completadas en Wishlist) degrada la experiencia del usuario y eleva drásticamente la tasa de rebote y abandono del carrito.

### Ruta hacia la Certificación:
NovaQA emitirá un **Concepto Favorable (SÍ)** únicamente cuando el equipo de desarrollo implemente los correctivos del **Sprint Inmediato**, se aplique una corrida de regresión con la suite automatizada de Playwright y se verifique el cierre definitivo de los defectos DEF-01, DEF-03, DEF-04 y DEF-06.

---

**Firma de la Auditoría:**  
*NovaQA Quality Solutions*  
*División de Aseguramiento de Calidad y Testing de Software*  
*Proyecto Final - Electiva Testing y QA*
