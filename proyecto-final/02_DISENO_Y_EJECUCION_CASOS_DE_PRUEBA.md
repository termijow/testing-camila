# Entregable 2: Diseño y Ejecución de Casos de Prueba
**Proyecto Final – Electiva Testing y QA**  
**Empresa Consultora:** NovaQA Quality Solutions  
**Aplicación Auditada:** OpenCart E-Commerce Demo (`http://opencart.abstracta.us/`)  
**Total de Casos Diseñados y Ejecutados:** 35 casos de prueba  
**Fecha de Ejecución:** Octubre 2026  

---

## 1. Resumen Ejecutivo de la Ejecución

Se diseñaron y ejecutaron **35 casos de prueba** distribuidos estratégicamente en cinco técnicas formales de diseño según los estándares de ISTQB:
- **Pruebas Positivas (Happy Path):** 8 casos (100% aprobados).
- **Pruebas Negativas:** 8 casos (4 aprobados, 4 fallidos debido a fallas de validación).
- **Pruebas de Valores Límite (BVA):** 7 casos (6 aprobados, 1 fallido por desbordamiento de cantidad).
- **Pruebas Basadas en Tablas de Decisión:** 6 casos (6 aprobados).
- **Pruebas de Transición de Estados:** 6 casos (4 aprobados, 2 fallidos por alertas erróneas y eliminación no confirmada).

### Cuadro de Métricas de Ejecución

| Técnica de Prueba | Casos Ejecutados | Casos Aprobados (Passed) | Casos Fallidos (Failed) | % Aprobación |
| :--- | :---: | :---: | :---: | :---: |
| **Pruebas Positivas** | 8 | 8 | 0 | 100.0% |
| **Pruebas Negativas** | 8 | 4 | 4 | 50.0% |
| **Valores Límite (BVA)** | 7 | 6 | 1 | 85.7% |
| **Tablas de Decisión** | 6 | 6 | 0 | 100.0% |
| **Transición de Estados** | 6 | 4 | 2 | 66.7% |
| **TOTAL GENERAL** | **35** | **28** | **7** | **80.0%** |

*(Nota: Los 7 casos fallidos revelaron defectos reales y críticos que se detallan en el Entregable 3).*

---

## 2. Matriz Resumen de Casos de Prueba

| ID | Nombre del Caso de Prueba | Técnica | Módulo | Resultado Obtenido | Estado |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **CP-POS-01** | Búsqueda exitosa por palabra clave ("MacBook") | Positiva | Búsqueda | Productos coincidentes mostrados | **Aprobado** |
| **CP-POS-02** | Navegación de catálogo por categoría ("Desktops -> Mac") | Positiva | Catálogo | Página de categoría con 1 ítem | **Aprobado** |
| **CP-POS-03** | Adición de producto con cantidad válida a la cesta | Positiva | Ficha Producto | Mensaje de éxito flotante visible | **Aprobado** |
| **CP-POS-04** | Visualización y cálculo de subtotales en el Carrito | Positiva | Carrito | Subtotal y total calculados bien | **Aprobado** |
| **CP-POS-05** | Registro exitoso de nuevo usuario con datos válidos | Positiva | Cuentas | Cuenta creada satisfactoriamente | **Aprobado** |
| **CP-POS-06** | Comparación de dos productos de la misma categoría | Positiva | Comparador | Tabla comparativa muestra ambos | **Aprobado** |
| **CP-POS-07** | Envío exitoso de consulta en Formulario de Contacto | Positiva | Contacto | Mensaje de confirmación emitido | **Aprobado** |
| **CP-POS-08** | Inicio de sesión exitoso con credenciales registradas | Positiva | Cuentas | Redirección al panel Mi Cuenta | **Aprobado** |
| **CP-NEG-01** | Búsqueda con término inexistente en el catálogo | Negativa | Búsqueda | Mensaje "No hay productos..." | **Aprobado** |
| **CP-NEG-02** | Envío de formulario de Registro totalmente vacío | Negativa | Cuentas | Mensajes de campo obligatorio | **Aprobado** |
| **CP-NEG-03** | Registro con contraseñas que no coinciden | Negativa | Cuentas | Error "Password confirmation does not match" | **Aprobado** |
| **CP-NEG-04** | Registro con correo electrónico en formato inválido | Negativa | Cuentas | Error "E-Mail Address does not appear valid" | **Aprobado** |
| **CP-NEG-05** | Adición de producto con cantidad negativa (`-10`) | Negativa | Ficha Producto | Falso positivo: Alerta verde pero carrito vacío | **FALLIDO** |
| **CP-NEG-06** | Registro con letras y símbolos en el campo Teléfono | Negativa | Cuentas | Acepta letras sin validar formato | **FALLIDO** |
| **CP-NEG-07** | Solicitud RMA de Devolución con Order ID alfanumérico | Negativa | Devoluciones | Acepta Order ID no numérico | **FALLIDO** |
| **CP-NEG-08** | Compra de Certificado de Regalo con emisor = receptor | Negativa | Vouchers | Permite mismo remitente y receptor | **FALLIDO** |
| **CP-BVA-01** | Reseña de producto con 24 caracteres (límite inf. - 1) | Valores Límite | Reseñas | Advertencia: texto debe tener >= 25 chars | **Aprobado** |
| **CP-BVA-02** | Reseña de producto con 25 caracteres (límite inf. exacto) | Valores Límite | Reseñas | Aprobada y enviada a moderación | **Aprobado** |
| **CP-BVA-03** | Contacto: Nombre con 2 caracteres (límite inf. - 1) | Valores Límite | Contacto | Error: nombre debe tener entre 3 y 32 chars | **Aprobado** |
| **CP-BVA-04** | Contacto: Nombre con 3 caracteres (límite inf. exacto) | Valores Límite | Contacto | Campo aceptado sin advertencias | **Aprobado** |
| **CP-BVA-05** | Certificado de Regalo con monto de $0.50 USD | Valores Límite | Vouchers | Error: monto debe ser entre $1 y $1000 | **Aprobado** |
| **CP-BVA-06** | Certificado de Regalo con monto de $1000.01 USD | Valores Límite | Vouchers | Error: monto debe ser entre $1 y $1000 | **Aprobado** |
| **CP-BVA-07** | Cantidad en Carrito con valor astronómico (999,999,999) | Valores Límite | Carrito | Carrito suma $123 mil millones sin control | **FALLIDO** |
| **CP-TAB-01** | Regla 1: Registro (Datos Válidos + Términos Sí) | Tabla Decisión | Cuentas | Registro Exitoso | **Aprobado** |
| **CP-TAB-02** | Regla 2: Registro (Datos Válidos + Términos No) | Tabla Decisión | Cuentas | Bloqueo por falta de términos | **Aprobado** |
| **CP-TAB-03** | Regla 3: Registro (Datos Inválidos + Términos Sí) | Tabla Decisión | Cuentas | Bloqueo por validación de campos | **Aprobado** |
| **CP-TAB-04** | Regla 4: Reseña (Nombre OK + Rating OK + Texto >= 25) | Tabla Decisión | Reseñas | Reseña enviada con éxito | **Aprobado** |
| **CP-TAB-05** | Regla 5: Reseña (Nombre OK + Rating NO + Texto >= 25) | Tabla Decisión | Reseñas | Bloqueo por selección de rating | **Aprobado** |
| **CP-TAB-06** | Regla 6: Reseña (Nombre Vacío + Rating OK + Texto >= 25) | Tabla Decisión | Reseñas | Bloqueo por nombre faltante | **Aprobado** |
| **CP-EST-01** | Transición: Carrito Vacío -> Agregar Producto -> Con Ítem | Trans. Estados | Carrito | Carrito pasa de 0 a 1 ítem | **Aprobado** |
| **CP-EST-02** | Transición: Carrito Con Ítem -> Cantidad 0 -> Carrito Vacío | Trans. Estados | Carrito | Eliminación silenciosa sin confirmación | **FALLIDO** |
| **CP-EST-03** | Transición: Invitado -> Agregar a Wishlist -> Login | Trans. Estados | Wishlist | Alerta verde de éxito para advertir login | **FALLIDO** |
| **CP-EST-04** | Transición: Divisa USD ($) -> Divisa EUR (€) | Trans. Estados | Multidivisa | Precios actualizados a símbolo € | **Aprobado** |
| **CP-EST-05** | Transición: Divisa EUR (€) -> Divisa GBP (£) | Trans. Estados | Multidivisa | Precios actualizados a símbolo £ | **Aprobado** |
| **CP-EST-06** | Transición: Comparador 0 ítems -> 1 ítem -> 2 ítems | Trans. Estados | Comparador | Contador sube a (2) y tabla carga | **Aprobado** |

---

## 3. Detalle Completo de Casos de Prueba por Técnica

### 3.1 Pruebas Positivas (Happy Path)

#### CP-POS-01: Búsqueda exitosa por palabra clave de producto existente
- **Objetivo:** Verificar que el motor de búsqueda encuentre productos existentes en el catálogo.
- **Precondiciones:** La tienda se encuentra accesible en la página principal.
- **Pasos de Ejecución:**
  1. Ingresar al portal principal (`/`).
  2. Localizar el campo de búsqueda `input[name="search"]`.
  3. Escribir el término `"MacBook"`.
  4. Presionar la tecla Enter o clickear el botón de lupa.
- **Datos de Prueba:** Término = `"MacBook"`.
- **Resultado Esperado:** Se visualiza la página de resultados con el encabezado "Search - MacBook" y al menos un producto listado con título, imagen y precio.
- **Resultado Obtenido:** Se desplegaron 3 productos de la línea MacBook.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/search_macbook.png`

#### CP-POS-02: Navegación de catálogo por categoría con productos
- **Objetivo:** Validar que la navegación jerárquica presente adecuadamente los productos asociados.
- **Precondiciones:** El usuario está en la página principal.
- **Pasos de Ejecución:**
  1. Desplegar el menú superior "Desktops".
  2. Hacer click en la subcategoría "Mac (1)".
  3. Validar el contenido de la página.
- **Datos de Prueba:** Categoría ID = `20_27`.
- **Resultado Esperado:** La página exhibe el producto iMac con su miniatura, precio y botón de agregar.
- **Resultado Obtenido:** La subcategoría cargó correctamente con el producto correspondiente.
- **Estado:** **Aprobado**

#### CP-POS-03: Adición de producto con cantidad válida a la cesta
- **Objetivo:** Comprobar que un cliente pueda agregar un producto al carrito indicando una cantidad válida.
- **Precondiciones:** Estar en la página de detalle de un producto disponible (ej. iPhone).
- **Pasos de Ejecución:**
  1. Navegar a `route=product/product&product_id=40`.
  2. Limpiar el campo `#input-quantity` e ingresar `"2"`.
  3. Presionar el botón `#button-cart`.
- **Datos de Prueba:** Product ID = `40`, Cantidad = `2`.
- **Resultado Esperado:** Aparece un banner verde `.alert-success` indicando "Success: You have added iPhone to your shopping cart!".
- **Resultado Obtenido:** Banner de confirmación visible y carrito superior actualizado.
- **Estado:** **Aprobado**

#### CP-POS-04: Visualización detallada y cálculo de subtotales en el Carrito
- **Objetivo:** Validar que el carrito de compras totalice adecuadamente los productos adicionados.
- **Precondiciones:** Haber agregado al menos un producto al carrito.
- **Pasos de Ejecución:**
  1. Navegar a la página del carrito (`route=checkout/cart`).
  2. Inspeccionar la tabla de productos, cantidad, precio unitario y total.
- **Datos de Prueba:** Producto iPhone (2 x $123.20).
- **Resultado Esperado:** La tabla muestra 2 unidades, precio unitario de $123.20 y subtotal correspondiente a $246.40.
- **Resultado Obtenido:** Tabla de productos y subtotales coherentes con los datos adicionados.
- **Estado:** **Aprobado**

#### CP-POS-05: Registro exitoso de nuevo usuario con datos íntegros y válidos
- **Objetivo:** Verificar la creación de una cuenta de usuario cuando se cumplen todos los requisitos.
- **Precondiciones:** Estar en el formulario de registro (`route=account/register`).
- **Pasos de Ejecución:**
  1. Diligenciar First Name, Last Name, Email único, Telephone numérico, Password y Confirm Password iguales.
  2. Marcar la casilla "I have read and agree to the Privacy Policy".
  3. Click en "Continue".
- **Datos de Prueba:** Nombre: "Juan", Apellido: "Valdez", Email: `user_${Date.now()}@qa.com`, Tel: "3104567890", Pwd: "Password123!".
- **Resultado Esperado:** Redirección a la URL `route=account/success` con el título "Your Account Has Been Created!".
- **Resultado Obtenido:** Cuenta creada satisfactoriamente.
- **Estado:** **Aprobado**

#### CP-POS-06: Comparación de dos productos de la misma categoría
- **Objetivo:** Validar que el comparador agregue dos productos y despliegue sus características lado a lado.
- **Precondiciones:** Productos visibles en catálogo.
- **Pasos de Ejecución:**
  1. Click en el botón de comparar en el producto 1 (iPhone).
  2. Click en el botón de comparar en el producto 2 (MacBook).
  3. Navegar a `route=product/compare`.
- **Datos de Prueba:** Productos ID 40 y 43.
- **Resultado Esperado:** Tabla comparativa con dos columnas de producto y especificaciones técnicas.
- **Resultado Obtenido:** Tabla desplegada con las especificaciones de ambos productos.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/product_compare_table.png`

#### CP-POS-07: Envío exitoso de consulta a través del formulario de Contacto
- **Objetivo:** Verificar el envío adecuado de un mensaje de soporte al administrador.
- **Precondiciones:** Acceder a `route=information/contact`.
- **Pasos de Ejecución:**
  1. Ingresar nombre: "Carlos Perez".
  2. Ingresar email: "carlos@test.com".
  3. Ingresar consulta: "Solicito información acerca del tiempo estimado de despacho para Bogotá.".
  4. Presionar "Submit".
- **Datos de Prueba:** Nombre válido, email válido, mensaje de 78 caracteres.
- **Resultado Esperado:** Redirección a página de confirmación con mensaje de agradecimiento.
- **Resultado Obtenido:** Formulario procesado exitosamente.
- **Estado:** **Aprobado**

#### CP-POS-08: Inicio de sesión exitoso con credenciales previamente registradas
- **Objetivo:** Verificar que un usuario registrado pueda autenticarse y abrir sesión.
- **Precondiciones:** Existencia de cuenta activa en la base de datos.
- **Pasos de Ejecución:**
  1. Ir a `route=account/login`.
  2. Diligenciar correo electrónico y contraseña correctos.
  3. Click en "Login".
- **Datos de Prueba:** Email y clave válidos.
- **Resultado Esperado:** Redirección a `route=account/account` con el menú de usuario autenticado.
- **Resultado Obtenido:** Sesión iniciada y enlaces de cuenta habilitados.
- **Estado:** **Aprobado**

---

### 3.2 Pruebas Negativas

#### CP-NEG-01: Búsqueda con término inexistente en el catálogo
- **Objetivo:** Evaluar la respuesta del sistema ante búsquedas sin coincidencias.
- **Precondiciones:** Portal en página de inicio.
- **Pasos de Ejecución:**
  1. Ingresar en el buscador `"XYZNONEXISTENT123"`.
  2. Presionar Enter.
- **Datos de Prueba:** `"XYZNONEXISTENT123"`.
- **Resultado Esperado:** Mensaje informativo: "There is no product that matches the search criteria.".
- **Resultado Obtenido:** Mensaje desplegado correctamente.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/search_not_found.png`

#### CP-NEG-02: Envío de formulario de Registro totalmente vacío
- **Objetivo:** Verificar el bloqueo de registro cuando no se suministran datos.
- **Precondiciones:** Página de registro (`route=account/register`).
- **Pasos de Ejecución:**
  1. Dejar todos los campos en blanco.
  2. Desmarcar términos y condiciones.
  3. Click en "Continue".
- **Datos de Prueba:** Campos nulos / strings vacíos.
- **Resultado Esperado:** Alerta de rechazo por política de privacidad y textos rojos `.text-danger` bajo cada campo obligatorio.
- **Resultado Obtenido:** 5 mensajes `.text-danger` y 1 alerta global mostrados.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/register_empty_errors.png`

#### CP-NEG-03: Registro con contraseñas no coincidentes
- **Objetivo:** Validar que el sistema rechace registros si Password != Password Confirm.
- **Precondiciones:** Página de registro.
- **Pasos de Ejecución:**
  1. Diligenciar campos personales.
  2. Password = `"ClaveSegura123"`.
  3. Password Confirm = `"Diferente456"`.
  4. Click en "Continue".
- **Datos de Prueba:** Claves dispares.
- **Resultado Esperado:** Mensaje de error: "Password confirmation does not match password!".
- **Resultado Obtenido:** El sistema bloqueó el registro y mostró la advertencia esperada.
- **Estado:** **Aprobado**

#### CP-NEG-04: Registro con correo electrónico en formato inválido
- **Objetivo:** Verificar la validación de formato RFC de correo electrónico en registro.
- **Precondiciones:** Página de registro.
- **Pasos de Ejecución:**
  1. En el campo E-Mail ingresar `"correo_invalido_sin_arroba"`.
  2. Click en "Continue".
- **Datos de Prueba:** `"correo_invalido_sin_arroba"`.
- **Resultado Esperado:** Mensaje de error: "E-Mail Address does not appear to be valid!".
- **Resultado Obtenido:** Error mostrado adecuadamente.
- **Estado:** **Aprobado**

#### CP-NEG-05: Intento de agregar producto al carrito con cantidad negativa (`-10`)
- **Objetivo:** Comprobar que el sistema rechace cantidades negativas en la adición de productos.
- **Precondiciones:** Estar en la página de producto iPhone (`product_id=40`).
- **Pasos de Ejecución:**
  1. Ingresar `"-10"` en `#input-quantity`.
  2. Presionar `#button-cart`.
  3. Revisar alerta y revisar el carrito de compras.
- **Datos de Prueba:** Cantidad = `"-10"`.
- **Resultado Esperado:** El sistema debe bloquear la acción con un mensaje de validación ("Quantity must be greater than zero") y no mostrar confirmación de éxito.
- **Resultado Obtenido (DEFECTO):** El sistema muestra un banner verde que dice "Success: You have added iPhone to your shopping cart!", pero al ir al carrito este se encuentra vacío. Se engaña al usuario con un falso positivo.
- **Estado:** **FALLIDO** (Reportado en DEF-01) | **Evidencia:** `evidencias/DEF-01_cantidad_negativa_exito_falso.png`

#### CP-NEG-06: Registro de usuario con caracteres alfabéticos y símbolos en el teléfono
- **Objetivo:** Verificar que el campo Telephone rechace letras y caracteres especiales.
- **Precondiciones:** Formulario de registro.
- **Pasos de Ejecución:**
  1. Diligenciar nombre y email válidos.
  2. En Telephone ingresar `"NOT-A-PHONE-NUMBER-123!@#$%"`.
  3. Diligenciar contraseñas y aceptar términos.
  4. Click en "Continue".
- **Datos de Prueba:** Telephone = `"NOT-A-PHONE-NUMBER-123!@#$%"`.
- **Resultado Esperado:** Bloqueo con mensaje de error exigiendo un formato telefónico numérico válido.
- **Resultado Obtenido (DEFECTO):** La cuenta se creó exitosamente y la aplicación aceptó la cadena arbitraria con caracteres especiales sin validar formato.
- **Estado:** **FALLIDO** (Reportado en DEF-03) | **Evidencia:** `evidencias/DEF-03_registro_telefono_sin_validacion_numerica.png`

#### CP-NEG-07: Solicitud RMA de Devolución con Order ID alfanumérico
- **Objetivo:** Comprobar que el formulario de devoluciones exija un Order ID numérico válido.
- **Precondiciones:** Formulario de devolución (`route=account/return/add`).
- **Pasos de Ejecución:**
  1. Llenar campos de cliente.
  2. En Order ID ingresar `"ORDEN-NO-NUMERICA-TOTALMENTE-INVALIDA"`.
  3. Seleccionar motivo de devolución y presionar "Submit".
- **Datos de Prueba:** Order ID = `"ORDEN-NO-NUMERICA-TOTALMENTE-INVALIDA"`.
- **Resultado Esperado:** Mensaje de error indicando que el Order ID debe ser un número entero válido existente.
- **Resultado Obtenido (DEFECTO):** El sistema procesó la devolución exitosamente redirigiendo a `route=account/return/success`.
- **Estado:** **FALLIDO** (Reportado en DEF-04) | **Evidencia:** `evidencias/DEF-04_devoluciones_order_id_no_numerico.png`

#### CP-NEG-08: Emisión de Certificado de Regalo con emisor y receptor idénticos
- **Objetivo:** Validar que el sistema impida emitir un certificado de regalo hacia uno mismo.
- **Precondiciones:** Formulario de Vouchers (`route=account/voucher`).
- **Pasos de Ejecución:**
  1. Ingresar Recipient Email = `"clon@test.com"`.
  2. Ingresar Sender Email = `"clon@test.com"`.
  3. Monto = $50.00 y continuar.
- **Datos de Prueba:** Mismo correo para remitente y receptor.
- **Resultado Esperado:** Validación que impida que el emisor se auto-envíe el certificado o advierta la duplicidad.
- **Resultado Obtenido (DEFECTO):** El voucher fue creado y cargado al carrito sin restricción alguna.
- **Estado:** **FALLIDO** (Reportado en DEF-05) | **Evidencia:** `evidencias/DEF-05_voucher_mismo_remitente_destinatario.png`

---

### 3.3 Pruebas de Valores Límite (Boundary Value Analysis - BVA)

#### CP-BVA-01: Reseña de producto con 24 caracteres (Límite inferior - 1)
- **Objetivo:** Comprobar rechazo cuando el texto de reseña tiene exactamente 1 carácter menos del mínimo requerido (25 chars).
- **Precondiciones:** Ficha de producto en pestaña Reseñas.
- **Pasos de Ejecución:**
  1. Diligenciar nombre: "Auditor QA".
  2. Texto reseña: `"123456789012345678901234"` (24 caracteres).
  3. Rating = 5 estrellas.
  4. Click en "Continue".
- **Datos de Prueba:** String de longitud = 24.
- **Resultado Esperado:** Advertencia: "Warning: Review Text must be between 25 and 1000 characters!".
- **Resultado Obtenido:** Rechazo efectivo con la alerta correspondiente.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/review_bva_24_chars.png`

#### CP-BVA-02: Reseña de producto con 25 caracteres (Límite inferior exacto)
- **Objetivo:** Comprobar aprobación cuando el texto de reseña cumple exactamente el valor de frontera mínimo (25 chars).
- **Precondiciones:** Ficha de producto en pestaña Reseñas.
- **Pasos de Ejecución:**
  1. Diligenciar nombre: "Auditor QA".
  2. Texto reseña: `"1234567890123456789012345"` (25 caracteres exactos).
  3. Rating = 5 estrellas.
  4. Click en "Continue".
- **Datos de Prueba:** String de longitud = 25.
- **Resultado Esperado:** Mensaje de éxito: "Thank you for your review. It has been submitted to the webmaster for approval.".
- **Resultado Obtenido:** Formulario aceptado y enviado a moderación.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/review_bva_25_chars.png`

#### CP-BVA-03: Formulario de Contacto - Campo Nombre con 2 caracteres (Límite inferior - 1)
- **Objetivo:** Verificar rechazo en el campo Nombre si tiene menos de 3 caracteres.
- **Precondiciones:** Formulario de contacto (`route=information/contact`).
- **Pasos de Ejecución:**
  1. Nombre = `"AB"` (2 caracteres).
  2. Email y mensaje válidos.
  3. Click en "Submit".
- **Datos de Prueba:** Longitud de nombre = 2.
- **Resultado Esperado:** Mensaje de error bajo el campo: "Name must be between 3 and 32 characters!".
- **Resultado Obtenido:** Error desplegado correctamente.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/contact_boundary_errors.png`

#### CP-BVA-04: Formulario de Contacto - Campo Nombre con 3 caracteres (Límite inferior exacto)
- **Objetivo:** Validar aceptación en la frontera inferior permitida (3 caracteres).
- **Precondiciones:** Formulario de contacto.
- **Pasos de Ejecución:**
  1. Nombre = `"Ana"` (3 caracteres).
  2. Email y mensaje válidos.
  3. Click en "Submit".
- **Datos de Prueba:** Longitud de nombre = 3.
- **Resultado Esperado:** El campo es aceptado sin presentar texto de advertencia.
- **Resultado Obtenido:** No se generaron errores para el campo Nombre.
- **Estado:** **Aprobado**

#### CP-BVA-05: Certificado de Regalo con monto de $0.50 USD (Límite inferior - $0.50)
- **Objetivo:** Verificar rechazo de montos de certificado menores al límite permitido de $1.00 USD.
- **Precondiciones:** Formulario de Vouchers.
- **Pasos de Ejecución:**
  1. Llenar destinatario y remitente.
  2. En Amount ingresar `"0.50"`.
  3. Aceptar términos y continuar.
- **Datos de Prueba:** Monto = `0.50`.
- **Resultado Esperado:** Mensaje: "Amount must be between $1.00 and $1,000.00!".
- **Resultado Obtenido:** Bloqueo correcto con el mensaje esperado.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/voucher_bva_low.png`

#### CP-BVA-06: Certificado de Regalo con monto de $1000.01 USD (Límite superior + $0.01)
- **Objetivo:** Verificar rechazo de montos superiores a la frontera máxima de $1,000.00 USD.
- **Precondiciones:** Formulario de Vouchers.
- **Pasos de Ejecución:**
  1. En Amount ingresar `"1000.01"`.
  2. Click en Continue.
- **Datos de Prueba:** Monto = `1000.01`.
- **Resultado Esperado:** Mensaje: "Amount must be between $1.00 and $1,000.00!".
- **Resultado Obtenido:** Bloqueo correcto con la advertencia esperada.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/voucher_bva_high.png`

#### CP-BVA-07: Cantidad en Carrito con valor astronómico de 999,999,999 unidades
- **Objetivo:** Evaluar el comportamiento ante cantidades que superan cualquier límite razonable de inventario.
- **Precondiciones:** Página de producto iPhone.
- **Pasos de Ejecución:**
  1. Ingresar en cantidad `"999999999"`.
  2. Agregar al carrito y revisar el carrito.
- **Datos de Prueba:** Cantidad = `999999999`.
- **Resultado Esperado:** Restricción de cantidad máxima por pedido o alerta de inventario insuficiente.
- **Resultado Obtenido (DEFECTO):** Se permitió agregar la cantidad y el total del carrito ascendió a **$123,199,999,876.80** sin ningún tipo de límite comercial o validación de desbordamiento.
- **Estado:** **FALLIDO** (Reportado en DEF-06) | **Evidencia:** `evidencias/DEF-06_cantidad_astronomica_sin_limite.png`

---

### 3.4 Pruebas Basadas en Tablas de Decisión

#### Tabla de Decisión 1: Formulario de Registro de Usuario

| Condiciones / Factores | Regla 1 (CP-TAB-01) | Regla 2 (CP-TAB-02) | Regla 3 (CP-TAB-03) |
| :--- | :---: | :---: | :---: |
| Datos Personales Válidos | **V** | **V** | **F** |
| Contraseña y Confirmación Coinciden | **V** | **V** | **V** |
| Casilla de Términos Aceptada | **V** | **F** | **V** |
| **Acción / Resultado Esperado** | **Registro Exitoso** | **Alerta: Aceptar Términos** | **Errores en Campos** |
| **Estado de Ejecución** | **Aprobado** | **Aprobado** | **Aprobado** |

- **CP-TAB-01 (Regla 1):** Ejecutado con datos válidos y casilla marcada -> Cuenta creada exitosamente (**Aprobado**).
- **CP-TAB-02 (Regla 2):** Ejecutado con datos válidos pero desmarcando términos -> Alerta "Warning: You must agree to the Privacy Policy!" (**Aprobado**).
- **CP-TAB-03 (Regla 3):** Ejecutado con email inválido y términos marcados -> Error en campo E-Mail (**Aprobado**).

#### Tabla de Decisión 2: Formulario de Reseñas de Producto

| Condiciones / Factores | Regla 4 (CP-TAB-04) | Regla 5 (CP-TAB-05) | Regla 6 (CP-TAB-06) |
| :--- | :---: | :---: | :---: |
| Nombre del Autor Suministrado | **V** | **V** | **F** |
| Calificación (Rating) Seleccionada | **V** | **F** | **V** |
| Longitud Texto Reseña (25 a 1000 chars) | **V** | **V** | **V** |
| **Acción / Resultado Esperado** | **Reseña Enviada** | **Error: Seleccionar Rating** | **Error: Nombre Requerido** |
| **Estado de Ejecución** | **Aprobado** | **Aprobado** | **Aprobado** |

- **CP-TAB-04 (Regla 4):** Nombre OK, Rating 4 estrellas, Texto de 30 chars -> Reseña recibida (**Aprobado**).
- **CP-TAB-05 (Regla 5):** Nombre OK, Rating omitido, Texto de 30 chars -> Alerta "Warning: Please select a review rating!" (**Aprobado**).
- **CP-TAB-06 (Regla 6):** Nombre en blanco, Rating 5 estrellas, Texto de 30 chars -> Alerta "Warning: Review Name must be between 3 and 25 characters!" (**Aprobado**).

---

### 3.5 Pruebas de Transición de Estados

#### CP-EST-01: Estado Carrito Vacío -> Agregar Producto -> Estado Carrito con Ítem
- **Objetivo:** Comprobar la transición entre el estado de cesta vacía y cesta con elementos activos.
- **Precondiciones:** Carrito inicialmente vacío (`items = 0`).
- **Pasos:** Agregar 1 unidad de iPhone. Verificar el botón de carrito en el encabezado.
- **Resultado Esperado:** El botón de carrito cambia su estado de `"0 item(s) - $0.00"` a `"1 item(s) - $123.20"`.
- **Resultado Obtenido:** Transición de estado ejecutada limpiamente.
- **Estado:** **Aprobado**

#### CP-EST-02: Estado Carrito con Ítem -> Modificar Cantidad a 0 -> Estado Carrito Vacío
- **Objetivo:** Evaluar la transición de estado cuando un usuario cambia la cantidad de un ítem a cero.
- **Precondiciones:** Carrito con 1 producto.
- **Pasos:**
  1. En el campo de cantidad escribir `"0"`.
  2. Presionar el botón azul de actualizar ("Update").
- **Resultado Esperado:** El sistema debe solicitar confirmación de eliminación o notificar explícitamente que el ítem fue retirado de la orden.
- **Resultado Obtenido (DEFECTO):** El sistema borra el ítem de forma instantánea y silenciosa sin emitir ningún diálogo modal de confirmación ni advertencia al usuario.
- **Estado:** **FALLIDO** (Reportado en DEF-07) | **Evidencia:** `evidencias/DEF-07_eliminacion_silenciosa_carrito_cero.png`

#### CP-EST-03: Estado Usuario Invitado -> Click en Wishlist -> Notificación de Inicio de Sesión
- **Objetivo:** Evaluar el estado de la Lista de Deseos para usuarios anónimos.
- **Precondiciones:** Usuario no autenticado en la plataforma.
- **Pasos:** En la ficha de producto clickear el botón "Add to Wish List".
- **Resultado Esperado:** Notificación informativa o de advertencia comunicando que se requiere autenticación para guardar en la lista.
- **Resultado Obtenido (DEFECTO):** Se genera un banner con clase CSS `.alert-success` (fondo verde con ícono de visto bueno) indicando que debe iniciar sesión. El uso de estilos de éxito para una acción bloqueada o condicionada representa un defecto de usabilidad e inconsistencia de estados.
- **Estado:** **FALLIDO** (Reportado en DEF-02) | **Evidencia:** `evidencias/DEF-02_wishlist_alerta_exitosa_requiere_login.png`

#### CP-EST-04: Transición de Divisa Base (USD) a Divisa Euro (EUR)
- **Objetivo:** Verificar la transición global de estado monetario de USD a EUR.
- **Precondiciones:** Moneda activa en USD ($).
- **Pasos:** Click en selector de moneda -> Seleccionar EUR (€).
- **Resultado Esperado:** El símbolo activo en el encabezado cambia a "€" y los precios en catálogo se recalculan con la tasa de conversión.
- **Resultado Obtenido:** Transición completada con éxito.
- **Estado:** **Aprobado** | **Evidencia:** `evidencias/currency_eur.png`

#### CP-EST-05: Transición de Divisa Euro (EUR) a Libra Esterlina (GBP)
- **Objetivo:** Verificar la transición de estado monetario a GBP (£).
- **Precondiciones:** Moneda activa en EUR.
- **Pasos:** Seleccionar "Pound Sterling" (£ GBP).
- **Resultado Esperado:** Precios y símbolo de encabezado actualizados a "£".
- **Resultado Obtenido:** Estado actualizado correctamente.
- **Estado:** **Aprobado**

#### CP-EST-06: Transición: Comparador 0 ítems -> 1 ítem -> 2 ítems
- **Objetivo:** Validar la acumulación de estado en la memoria de sesión del comparador de productos.
- **Precondiciones:** Comparador vacío ("Product Compare (0)").
- **Pasos:** Agregar iPhone -> verificar "Product Compare (1)". Agregar MacBook -> verificar "Product Compare (2)". Abrir comparador.
- **Resultado Esperado:** La tabla comparativa lista exactamente 2 columnas correspondientes a los productos acumulados.
- **Resultado Obtenido:** Ambos productos preservados en el estado de sesión.
- **Estado:** **Aprobado**
