# Guion y Estructura de Sustentación (10 Minutos)
**Proyecto Final – Electiva Testing y QA**  
**Rol:** Empresa Consultora NovaQA Solutions ante la Junta Directiva del Cliente  
**Modalidad:** Pareja (Estudiante 1 y Estudiante 2)  
**Tiempo Total:** 10:00 minutos cronometrados  

---

## 1. Cronograma de Tiempos y Distribución de Roles

```
[00:00 - 01:30] -> Integrante 1: Introducción, Rol de Consultora, Aplicación y Alcance
[01:30 - 03:30] -> Integrante 2: Estrategia de Pruebas, Técnicas ISTQB y Casos de Prueba
[03:30 - 06:00] -> Integrante 1: Hallazgos Críticos y Reporte de Defectos con Evidencias
[06:00 - 08:00] -> Integrante 2: Demostración de Automatización (Playwright) y Cobertura
[08:00 - 10:00] -> Ambos: Concepto Final (NO para producción), Riesgos y Recomendaciones
```

---

## 2. Guion Diapositiva por Diapositiva (Minuto a Minuto)

---

### Diapositiva 1: Portada y Presentación de la Consultora (00:00 - 00:45)
- **Orador:** Integrante 1
- **Contenido en pantalla:**
  - Logo NovaQA Solutions.
  - Título: *Auditoría Integral de Calidad de Software: OpenCart E-Commerce*.
  - Nombres de los consultores (Estudiante 1 y Estudiante 2).
- **Guion Integrante 1:**
  > *"Muy buenos días a todos los miembros de la junta evaluadora y directivos. Somos NovaQA Solutions, una firma consultora especializada en aseguramiento de calidad de software. Durante las últimas semanas, nuestro equipo fue comisionado para ejecutar una auditoría técnica rigurosa e independiente sobre la plataforma de comercio electrónico OpenCart. Hoy les presentaremos los hallazgos de nuestra auditoría, los resultados de la automatización y nuestro dictamen técnico definitivo sobre si la plataforma está lista para salir al mercado."*

---

### Diapositiva 2: Aplicación Evaluada y Alcance de la Auditoría (00:45 - 01:30)
- **Orador:** Integrante 1
- **Contenido en pantalla:**
  - Portal Storefront de OpenCart.
  - Alcance Incluido (In-Scope): 12 módulos funcionales (Búsqueda, Catálogo, Ficha de Producto, Reseñas, Carrito, Registro, Vouchers, Devoluciones RMA, Multidivisa, Contacto, Comparador, Wishlist).
  - Alcance Excluido (Out-of-Scope): Pasarelas de pago bancarias con cobro real, acceso SSH al servidor backend y pruebas de carga masiva.
- **Guion Integrante 1:**
  > *"OpenCart es una solución de tienda virtual ampliamente utilizada. Nuestro alcance auditó los 12 módulos más críticos de la experiencia del comprador: desde el descubrimiento del producto mediante el buscador y el catálogo, pasando por la ficha técnica y las reseñas, hasta la lógica transaccional del carrito de compras, el registro de clientes y el módulo de devoluciones. Excluimos deliberadamente pasarelas de pago bancarias con tarjetas de crédito reales para concentrarnos en la integridad y consistencia del software antes de involucrar servicios financieros de terceros."*

---

### Diapositiva 3: Estrategia de Pruebas y Técnicas ISTQB (01:30 - 02:30)
- **Orador:** Integrante 2
- **Contenido en pantalla:**
  - Diagrama de las 5 técnicas ISTQB empleadas.
  - Total: 35 casos de prueba ejecutados.
  - Pruebas Positivas (8), Negativas (8), Valores Límite - BVA (7), Tablas de Decisión (6), Transición de Estados (6).
- **Guion Integrante 2:**
  > *"Para garantizar que la auditoría no se quedara en una simple navegación superficial, adoptamos la metodología estándar internacional ISTQB e ISO 29119. Diseñamos una batería de 35 casos de prueba exhaustivos. No nos limitamos a los caminos felices (pruebas positivas); aplicamos pruebas negativas para verificar la robustez del sistema, análisis de valores límite (BVA) en las fronteras numéricas y de caracteres, tablas de decisión para reglas complejas en registro y reseñas, y pruebas de transición de estados para verificar cómo reacciona la tienda cuando el carrito cambia de vacío a lleno o cuando se cambia de divisa."*

---

### Diapositiva 4: Resultados Generales de la Ejecución (02:30 - 03:30)
- **Orador:** Integrante 2
- **Contenido en pantalla:**
  - Gráfico de dona o barras de resultados: 35 casos ejecutados (28 aprobados = 80%, 7 fallidos = 20%).
  - Tabla por técnica evidenciando que las fallas se concentraron en pruebas negativas, valores límite y transición de estados.
- **Guion Integrante 2:**
  > *"De los 35 casos ejecutados, 28 fueron aprobados exitosamente, logrando un 80% de conformidad en flujos convencionales. Sin embargo, 7 casos resultaron fallidos. Es de vital importancia resaltar que el 100% de estos fallos se descubrieron precisamente en las pruebas negativas y de frontera. Esto comprueba una regla de oro del testing: cuando un usuario opera la tienda con datos perfectos, parece funcionar; pero cuando ocurren anomalías o errores tipográficos, la aplicación exhibe fallas severas de lógica de negocio."*

---

### Diapositiva 5: Defectos Críticos y Mayores Identificados (03:30 - 06:00)
- **Orador:** Integrante 1
- **Contenido en pantalla:**
  - Resumen de los 10 defectos encontrados.
  - Capturas de pantalla ampliadas de los 4 defectos más graves:
    1. **DEF-06 (Crítico):** Carrito con cantidad de 999,999,999 e importe de $123 mil millones.
    2. **DEF-04 (Crítico):** Devolución radicada con Order ID alfanumérico ficticio.
    3. **DEF-01 (Mayor):** Adición con cantidad negativa (`-10`) muestra mensaje de éxito falso.
    4. **DEF-03 (Mayor):** Teléfono de cliente con texto y caracteres especiales aceptado sin validación.
- **Guion Integrante 1:**
  > *"Identificamos 10 defectos reales, reproducibles y documentados con evidencia. Me gustaría llamar su atención sobre los cuatro más alarmantes:*
  > *Primero, el defecto DEF-06, de severidad Crítica: el carrito de compras carece de validación de desbordamiento de orden o stock máximo. Al ingresar 999 millones de unidades, el sistema calculó una orden por más de 123 mil millones de dólares. Esto paralizaría cualquier pasarela de pagos y desbordaría los tipos de datos en la base de datos.*
  > *Segundo, DEF-04, también Crítico: en el formulario de garantías y devoluciones, el sistema aceptó un Order ID ficticio con texto alfanumérico, radicando una solicitud legal sin validar si la orden realmente existía.*
  > *Tercero, DEF-01, de severidad Mayor: al intentar ingresar una cantidad negativa en la ficha de producto, la interfaz muestra un banner verde diciendo '¡Éxito: agregaste el producto!', pero al abrir el carrito está completamente vacío. Es un falso positivo que engaña al consumidor.*
  > *Y cuarto, DEF-03: en el registro de usuarios, el campo de teléfono admite letras y caracteres especiales, lo que arruinaría las entregas de los transportistas al no contar con un número real de contacto."*

---

### Diapositiva 6: Demostración en Vivo de Pruebas Automatizadas con Playwright (06:00 - 07:15)
- **Orador:** Integrante 2
- **Acción:** Abrir la terminal o mostrar la ejecución de Playwright y el reporte HTML.
- **Comando a ejecutar / mostrar:**
  ```bash
  npm run test:audit
  ```
- **Contenido en pantalla:**
  - Ejecución en consola mostrando los 5 tests en verde (41.5 segundos).
  - Captura / vista del reporte HTML de Playwright con trazas interactivas.
- **Guion Integrante 2:**
  > *"Para proteger al cliente contra futuras regresiones, construimos una suite automatizada End-to-End con Playwright sobre TypeScript. Seleccionamos Playwright por su velocidad, su auto-waiting inteligente y su capacidad de emitir trazas completas. Automatizamos 5 escenarios vitales: la búsqueda de productos, el flujo completo de adición y carrito, el análisis de valores límite en reseñas verificando que con 24 caracteres rechace y con 25 apruebe, la validación de campos obligatorios en el registro y el cambio de divisa a euros. Como pueden apreciar en la terminal y en el reporte HTML interactivo, la suite se ejecuta en solo 41 segundos con una tasa de éxito del 100%."*

---

### Diapositiva 7: Cobertura de Pruebas (Functional Coverage vs Code Coverage) (07:15 - 08:00)
- **Orador:** Integrante 2
- **Contenido en pantalla:**
  - Métrica de Cobertura Funcional: **85.71%**.
  - Matriz de Trazabilidad de Requisitos (RTM).
  - Explicación de por qué en caja negra no se reporta cobertura de código blanco (falta de instrumentación con Xdebug en servidor ajeno).
- **Guion Integrante 2:**
  > *"En cuanto a la cobertura de pruebas, queremos hacer una precisión metodológica fundamental: como auditores externos de caja negra en un servidor remoto de pruebas, no es viable instrumentar el código PHP del servidor con Xdebug para medir cobertura de líneas de código. En su lugar, medimos la Cobertura de Requisitos Funcionales mediante una Matriz de Trazabilidad (RTM). Evaluamos 12 de los 14 módulos globales de la arquitectura de la tienda, alcanzando una cobertura funcional del 85.71%, superando ampliamente el 50% solicitado."*

---

### Diapositiva 8: Concepto Final Técnico y Recomendaciones (08:00 - 10:00)
- **Orador:** Integrante 1 (Concepto Final) y luego Integrante 2 (Recomendaciones)
- **Contenido en pantalla:**
  - Veredicto en letras grandes y rojas: **¿LISTA PARA PRODUCCIÓN? -> NO**.
  - Justificación basada en Criterios de Salida (Exit Criteria).
  - Hoja de ruta de remediación (Sprint 1 Hotfixes, Sprint 2 UX, Sprint 3 Comercial).
- **Guion Integrante 1:**
  > *"Llegamos al punto determinante de la auditoría: ¿está la aplicación lista para salir a producción? Nuestra respuesta como consultores de calidad es categórica: NO. Los estándares de ingeniería de software establecen que ningún software puede salir a producción con defectos Críticos o Mayores abiertos. OpenCart presenta actualmente 2 defectos Críticos y 2 Mayores que amenazan la integridad financiera de la compañía, posibilitan fraudes en devoluciones y degradan la confianza del comprador."*
- **Guion Integrante 2:**
  > *"Nuestra recomendación para el cliente no es abandonar la plataforma, sino ejecutar un plan de remediación en tres fases: primero, un sprint inmediato de hotfixes que restrinja las cantidades máximas y mínimas en el carrito, exija un Order ID numérico en devoluciones y valide el formato del teléfono; segundo, un pase de UX para corregir alertas engañosas y pedir confirmación antes de borrar productos; y tercero, una corrida de regresión con nuestra suite de Playwright para certificar el cierre de los defectos. Con estas medidas, OpenCart podrá alcanzar el estándar de calidad que sus clientes merecen. Quedamos a su entera disposición para responder cualquier pregunta. Muchas gracias."*

---

## 3. Preguntas Frecuentes Preparadas para el Jurado

| Pregunta Probable del Evaluador | Respuesta Sugerida del Equipo |
| :--- | :--- |
| **¿Por qué seleccionaron Playwright en lugar de Selenium o Cypress?** | Playwright opera a través del protocolo DevTools sin depender de controladores WebDriver pesados, cuenta con auto-waiting nativo que elimina esperas estáticas innecesarias, soporta TypeScript de fábrica y genera reportes HTML con grabaciones de trazas mucho más completas que Cypress o Selenium. |
| **¿Por qué el concepto final es NO si el 80% de los casos de prueba fueron aprobados?** | Porque en QA la calidad no se mide únicamente por el porcentaje de aprobación, sino por la **severidad de los defectos abiertos**. Un solo defecto crítico que permita una transacción fraudulenta o corrupta invalida la salida a producción (*Exit Criteria*). |
| **¿Por qué reportaron cobertura funcional y no cobertura de código?** | La cobertura de código (Statement/Branch) requiere instrumentación en el servidor backend (como Xdebug en PHP). En una auditoría externa de caja negra sobre una aplicación web pública desplegada en un servidor remoto de pruebas sin acceso administrativo SSH, la métrica estándar y auditable es la cobertura de requisitos funcionales mediante una Matriz RTM. |
| **¿Cómo demostraron que los defectos reportados son reales y no inventados?** | Cada defecto fue reproducido paso a paso en el entorno real `http://opencart.abstracta.us/`, validado con scripts automatizados y respaldado con capturas de pantalla fechadas en la carpeta de evidencias (`evidencias/DEF-XX_...`). |
