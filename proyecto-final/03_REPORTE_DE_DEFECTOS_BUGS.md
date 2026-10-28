# Entregable 3: Reporte de Defectos (Bugs)
**Proyecto Final – Electiva Testing y QA**  
**Empresa Consultora:** NovaQA Quality Solutions  
**Aplicación Auditada:** OpenCart E-Commerce Demo (`http://opencart.abstracta.us/`)  
**Total de Defectos Verificados y Reportados:** 10 defectos reales  
**Fecha de Emisión:** Octubre 2026  

---

## 1. Resumen de Defectos Identificados

Durante la ejecución de las pruebas dinámicas de caja negra y exploración de la aplicación, el equipo identificó **10 defectos reales, reproducibles y verificables** en el storefront de OpenCart. Todos los hallazgos cuentan con evidencia fotográfica capturada directamente en el entorno de pruebas.

### Tabla Resumen de Severidad y Prioridad

| ID Defecto | Título del Defecto | Módulo Afectado | Severidad | Prioridad |
| :--- | :--- | :--- | :---: | :---: |
| **DEF-01** | Falso positivo: Adición de producto con cantidad negativa muestra éxito pero carrito queda vacío | Ficha de Producto / Carrito | **Mayor** | **Alta** |
| **DEF-02** | Alerta engañosa: Mensaje para inicio de sesión en Wishlist utiliza estilo de éxito verde | Lista de Deseos (Wishlist) | **Menor** | **Media** |
| **DEF-03** | Campo 'Telephone' en Registro acepta cadenas alfabéticas y símbolos especiales sin validación | Registro de Clientes | **Mayor** | **Alta** |
| **DEF-04** | Solicitud RMA de Devolución acepta Order ID no numérico e inexistente | Devoluciones (RMA) | **Crítica** | **Alta** |
| **DEF-05** | Certificado de Regalo permite emisor y receptor idénticos (Mismo correo electrónico) | Vouchers de Regalo | **Menor** | **Media** |
| **DEF-06** | Desbordamiento de orden: Permite cantidades astronómicas inflando totales a miles de millones | Carrito de Compras | **Crítica** | **Alta** |
| **DEF-07** | Eliminación abrupta y silenciosa de productos al actualizar la cantidad a 0 en el carrito | Carrito de Compras | **Menor** | **Media** |
| **DEF-08** | Búsqueda con solo espacios en blanco genera encabezado trunco "Search - " sin sanitización | Motor de Búsqueda | **Menor** | **Baja** |
| **DEF-09** | Inconsistencia de formato en posición de símbolo monetario en divisa Euro (€) | Sistema Multidivisa | **Trivial** | **Baja** |
| **DEF-10** | Categorías sin productos carecen de llamado a la acción comercial o sugerencias alternativas | Navegación de Catálogo | **Menor** | **Baja** |

### Distribución por Niveles de Severidad
- **Crítica (2):** DEF-04, DEF-06
- **Mayor (2):** DEF-01, DEF-03
- **Menor (5):** DEF-02, DEF-05, DEF-07, DEF-08, DEF-10
- **Trivial (1):** DEF-09

---

## 2. Fichas Técnicas Detalladas de Defectos

---

### DEF-01: Falso positivo: Adición de producto con cantidad negativa muestra éxito pero carrito queda vacío
- **Identificador:** `DEF-01`
- **Módulo:** Ficha de Producto / Transacciones de Carrito
- **Severidad:** **Mayor** (Falla de lógica de negocio y retroalimentación engañosa)
- **Prioridad:** **Alta**
- **Descripción:** Cuando un usuario ingresa una cantidad negativa (ej. `-5` o `-10`) en el campo de cantidad de la ficha de producto y presiona el botón "Add to Cart", la aplicación genera una notificación flotante verde con estilo `.alert-success` indicando "Success: You have added iPhone to your shopping cart!". No obstante, al ingresar a la página del carrito de compras, la cesta continúa totalmente vacía. No existe validación en el cliente (`min="1"`) ni el controlador backend devuelve un error HTTP 400/422.
- **Pasos para Reproducir:**
  1. Ingresar a `http://opencart.abstracta.us/index.php?route=product/product&product_id=40`.
  2. Localizar el campo de texto de cantidad (`#input-quantity`).
  3. Escribir el valor `"-10"`.
  4. Presionar el botón "Add to Cart" (`#button-cart`).
  5. Observar la alerta verde mostrada en la parte superior.
  6. Hacer click en el enlace del carrito en la cabecera (`route=checkout/cart`).
- **Resultado Esperado:** El sistema debe impedir el envío en el cliente o devolver una alerta de advertencia `.alert-danger` que indique: *"Quantity must be a positive integer greater than zero"*, sin emitir mensajes de éxito.
- **Resultado Obtenido:** Se despliega el mensaje de éxito "Success: You have added iPhone to your shopping cart!", pero el carrito no almacena nada.
- **Evidencia:** `evidencias/DEF-01_cantidad_negativa_exito_falso.png`

---

### DEF-02: Alerta engañosa: Mensaje para inicio de sesión en Wishlist utiliza estilo de éxito verde
- **Identificador:** `DEF-02`
- **Módulo:** Lista de Deseos (Wishlist) / Experiencia de Usuario (UX)
- **Severidad:** **Menor** (Inconsistencia de diseño y semántica visual)
- **Prioridad:** **Media**
- **Descripción:** Al navegar como usuario invitado (no autenticado) y presionar el botón de agregar a la lista de deseos ("Add to Wish List"), la aplicación genera un banner de alerta con la clase CSS `alert alert-success alert-dismissible` (fondo verde, típicamente reservado para acciones culminadas con éxito). El texto del mensaje es: *"You must login or create an account to save iPhone to your wish list!"*. Utilizar un color verde de éxito para una acción no completada que requiere una acción bloqueante (iniciar sesión) confunde al usuario, quien asume a simple vista que el producto ya quedó guardado.
- **Pasos para Reproducir:**
  1. Abrir un navegador en modo incógnito o cerrar sesión activa.
  2. Navegar a cualquier producto (ej. `route=product/product&product_id=40`).
  3. Hacer click en el botón de corazón "Add to Wish List" (`button[data-original-title="Add to Wish List"]`).
  4. Inspeccionar la alerta emergente.
- **Resultado Esperado:** La notificación debe poseer estilo de advertencia o informativo (clase `.alert-info` o `.alert-warning` en color azul o amarillo), comunicando claramente que el guardado está pendiente de autenticación.
- **Resultado Obtenido:** Se muestra un recuadro verde de éxito (`.alert-success`) con un texto que condiciona la acción a un inicio de sesión previo.
- **Evidencia:** `evidencias/DEF-02_wishlist_alerta_exitosa_requiere_login.png`

---

### DEF-03: Campo 'Telephone' en Registro acepta cadenas alfabéticas y símbolos especiales sin validación
- **Identificador:** `DEF-03`
- **Módulo:** Registro de Clientes y Gestión de Cuentas
- **Severidad:** **Mayor** (Corrupción de integridad de datos transaccionales)
- **Prioridad:** **Alta**
- **Descripción:** El formulario de registro de nuevos clientes (`route=account/register`) cuenta con una regla de validación de longitud para el campo "Telephone" (mínimo 3 caracteres), pero carece por completo de validación de tipo numérico o expresión regular. Esto permite registrar clientes con teléfonos que contienen exclusivamente texto, insultos o caracteres especiales como `"NOT-A-PHONE-NUMBER-123!@#$%"`. En un entorno e-commerce, esto imposibilita las notificaciones logísticas por SMS y la comunicación de las empresas de mensajería para las entregas.
- **Pasos para Reproducir:**
  1. Ir a `http://opencart.abstracta.us/index.php?route=account/register`.
  2. Diligenciar First Name: "TestBug", Last Name: "Quality".
  3. Diligenciar un correo electrónico válido único.
  4. En el campo Telephone ingresar: `"NOT-A-PHONE-NUMBER-123!@#$%"`.
  5. Ingresar contraseñas válidas y marcar la casilla de políticas de privacidad.
  6. Presionar "Continue".
- **Resultado Esperado:** El sistema debe rechazar el formulario y mostrar el error: *"Telephone does not appear to be valid. Please enter numbers only."*.
- **Resultado Obtenido:** La aplicación registra al usuario, crea la sesión y redirige a `route=account/success` con el título "Your Account Has Been Created!".
- **Evidencia:** `evidencias/DEF-03_registro_telefono_sin_validacion_numerica.png`

---

### DEF-04: Solicitud RMA de Devolución acepta Order ID no numérico e inexistente
- **Identificador:** `DEF-04`
- **Módulo:** Módulo de Devoluciones (Product Returns - RMA)
- **Severidad:** **Crítica** (Falla de integridad referencial y lógica de negocio)
- **Prioridad:** **Alta**
- **Descripción:** En el formulario público de devoluciones de producto (`route=account/return/add`), el campo obligatorio "Order ID" no valida que el valor ingresado sea numérico ni comprueba si la orden existe en la base de datos de OpenCart. Se ingresó la cadena alfanumérica `"ORDEN-NO-NUMERICA-TOTALMENTE-INVALIDA"` y la solicitud fue aceptada y radicada en el sistema, generando un número de caso RMA para una orden ficticia.
- **Pasos para Reproducir:**
  1. Navegar a `http://opencart.abstracta.us/index.php?route=account/return/add`.
  2. Diligenciar nombre, apellido, correo y teléfono de contacto.
  3. En el campo "Order ID" (`#input-order-id`) escribir: `"ORDEN-NO-NUMERICA-TOTALMENTE-INVALIDA"`.
  4. Llenar los datos del producto (Nombre: "MacBook Air", Model: "Air-2020").
  5. Seleccionar cualquier motivo de devolución (ej. "Dead On Arrival").
  6. Presionar el botón "Submit".
- **Resultado Esperado:** El sistema debe validar que el Order ID sea un entero positivo y verificar contra la base de datos que la orden exista y corresponda al cliente. Si no es válido, emitir el error: *"Order ID not found or invalid"*.
- **Resultado Obtenido:** La aplicación procesa la solicitud sin validar la existencia de la orden y redirige a `route=account/return/success` ("Product Returns - Thank you for submitting your return request").
- **Evidencia:** `evidencias/DEF-04_devoluciones_order_id_no_numerico.png`

---

### DEF-05: Certificado de Regalo permite emisor y receptor idénticos (Mismo correo electrónico)
- **Identificador:** `DEF-05`
- **Módulo:** Certificados de Regalo (Gift Vouchers)
- **Severidad:** **Menor** (Falla en reglas de negocio comerciales)
- **Prioridad:** **Media**
- **Descripción:** El formulario de compra de certificados de regalo (`route=account/voucher`) solicita el nombre y correo tanto del destinatario como del remitente. Sin embargo, no contiene ninguna regla de negocio que restrinja que el correo del emisor y del receptor sean exactamente iguales. Se pudo generar un voucher con emisor `"clon@test.com"` y receptor `"clon@test.com"`. En términos comerciales, un certificado de regalo está diseñado para ser transferido a un tercero; permitir la auto-emisión abre puertas a inconsistencias en promociones y auditoría contable.
- **Pasos para Reproducir:**
  1. Navegar a `http://opencart.abstracta.us/index.php?route=account/voucher`.
  2. Ingresar Recipient's Name: "Mismo Usuario", Recipient's E-mail: `"clon@test.com"`.
  3. Ingresar Your Name: "Mismo Usuario", Your E-mail: `"clon@test.com"`.
  4. Seleccionar tema "Birthday", ingresar monto de $50.00 y marcar términos.
  5. Click en "Continue".
- **Resultado Esperado:** El sistema debe impedir la auto-emisión o advertir: *"Recipient and Sender email cannot be the same"*.
- **Resultado Obtenido:** El certificado es generado, cargado al carrito y se redirige a `route=account/voucher/success`.
- **Evidencia:** `evidencias/DEF-05_voucher_mismo_remitente_destinatario.png`

---

### DEF-06: Desbordamiento de orden: Permite cantidades astronómicas inflando totales a miles de millones
- **Identificador:** `DEF-06`
- **Módulo:** Carrito de Compras / Gestión de Inventario y Totales
- **Severidad:** **Crítica** (Riesgo financiero de desbordamiento de enteros y evasión de stock)
- **Prioridad:** **Alta**
- **Descripción:** El sistema carece de un límite máximo de unidades por producto en la adición y cálculo de la orden. Al solicitar `999,999,999` unidades del producto iPhone, la aplicación procesa la adición, calcula el total multiplicando la cantidad por el precio unitario y exhibe un total en el carrito de **$123,199,999,876.80** (más de 123 mil millones de dólares). No se aplica ninguna regla de inventario máximo disponible, ni tope comercial por transacción B2C, lo que puede provocar bloqueos de pasarelas de pago y desbordamientos en campos de base de datos numéricos limitados.
- **Pasos para Reproducir:**
  1. Ir a `http://opencart.abstracta.us/index.php?route=product/product&product_id=40`.
  2. En el campo `#input-quantity` ingresar: `"999999999"`.
  3. Click en "Add to Cart".
  4. Abrir la página del carrito (`route=checkout/cart`).
  5. Inspeccionar la columna "Total" de la tabla.
- **Resultado Esperado:** El sistema debe limitar la cantidad máxima por pedido (ej. máximo 5 o 10 unidades por consumidor final) o validar contra el stock real: *"Maximum allowed quantity per order exceeded (Max: 10)"*.
- **Resultado Obtenido:** La aplicación acepta la cantidad y muestra un monto astronómico de $123,199,999,876.80 sin restricciones.
- **Evidencia:** `evidencias/DEF-06_cantidad_astronomica_sin_limite.png`

---

### DEF-07: Eliminación abrupta y silenciosa de productos al actualizar la cantidad a 0 en el carrito
- **Identificador:** `DEF-07`
- **Módulo:** Carrito de Compras / Interacción de Usuario
- **Severidad:** **Menor** (Defecto de usabilidad y riesgo de pérdida accidental)
- **Prioridad:** **Media**
- **Descripción:** En la vista del carrito de compras (`route=checkout/cart`), cada producto tiene un campo numérico de cantidad acompañado de un botón de actualizar ("Update") y uno de eliminar ("Remove"). Si el usuario edita el campo de texto ingresando el número `"0"` y presiona el botón "Update", el sistema elimina inmediatamente el ítem de la orden sin solicitar confirmación mediante un diálogo modal o alerta de advertencia. Si la acción fue producto de un error tipográfico del usuario, sus productos configurados se pierden sin posibilidad de deshacer.
- **Pasos para Reproducir:**
  1. Agregar un producto al carrito.
  2. Navegar a `route=checkout/cart`.
  3. Cambiar el valor del campo de cantidad a `"0"`.
  4. Presionar el botón azul de actualizar ("Update").
- **Resultado Esperado:** La aplicación debe desplegar un diálogo modal: *"Setting quantity to 0 will remove this item from your cart. Do you want to proceed?"* o en su defecto impedir el valor 0 en el botón de actualización y requerir el uso explícito del botón de remover.
- **Resultado Obtenido:** El producto es borrado inmediatamente de la sesión sin ningún aviso previo.
- **Evidencia:** `evidencias/DEF-07_eliminacion_silenciosa_carrito_cero.png`

---

### DEF-08: Búsqueda con solo espacios en blanco genera encabezado trunco "Search - " sin sanitización
- **Identificador:** `DEF-08`
- **Módulo:** Motor de Búsqueda
- **Severidad:** **Menor** (Falta de sanitización y presentación descuidada)
- **Prioridad:** **Baja**
- **Descripción:** Cuando se introduce una cadena compuesta únicamente por espacios en blanco (ej. `"   "`) en la barra de búsqueda y se ejecuta la consulta, la aplicación no aplica la función de recorte de cadenas (`trim()`) en el controlador. Como consecuencia, redirige a una URL de búsqueda y genera un encabezado principal `<h1>` que muestra literalmente `"Search - "` sin ningún término visible ni advertencia al usuario solicitando que ingrese un criterio válido.
- **Pasos para Reproducir:**
  1. En la barra de búsqueda superior ingresar tres espacios: `"   "`.
  2. Presionar Enter.
  3. Observar el encabezado `<h1>` y el formulario de búsqueda avanzada.
- **Resultado Esperado:** La aplicación debe sanitizar la entrada; si la cadena está vacía tras aplicar trim, debe mantenerse en la página actual o mostrar un mensaje claro: *"Please enter a search term"*.
- **Resultado Obtenido:** Se genera una vista con encabezado roto "Search - " y mensaje genérico de criterios.
- **Evidencia:** `evidencias/DEF-08_busqueda_espacios_en_blanco.png`

---

### DEF-09: Inconsistencia de formato en posición de símbolo monetario en divisa Euro (€)
- **Identificador:** `DEF-09`
- **Módulo:** Sistema Multidivisa e Internacionalización
- **Severidad:** **Trivial** (Estándar visual y tipográfico de moneda)
- **Prioridad:** **Baja**
- **Descripción:** Al alternar la divisa de la tienda a Euros (€ EUR), los precios de los productos se formatean colocando el símbolo al final sin espacio separador respecto al valor numérico (ej. `472.33€`), en contraposición al formato en Dólares donde el símbolo se posiciona al inicio (`$602.00`). Además de la falta de uniformidad estética entre monedas, la norma tipográfica europea sugiere colocar un espacio fino entre la cifra y el símbolo o mantener el estándar seleccionado en la plantilla.
- **Pasos para Reproducir:**
  1. Ir al selector de monedas en la barra superior izquierda.
  2. Seleccionar "€ Euro".
  3. Inspeccionar el precio mostrado en los productos destacados.
- **Resultado Esperado:** Formato uniforme y legible acorde a los lineamientos de localización internacional.
- **Resultado Obtenido:** Precios desplegados con formato comprimido sin espacios (`472.33€`).
- **Evidencia:** `evidencias/DEF-09_formato_posicion_simbolo_moneda.png`

---

### DEF-10: Categorías sin productos carecen de llamado a la acción comercial o sugerencias alternativas
- **Identificador:** `DEF-10`
- **Módulo:** Navegación de Catálogo y Experiencia de Usuario
- **Severidad:** **Menor** (Fuga en el embudo de ventas - Broken Journey)
- **Prioridad:** **Baja**
- **Descripción:** Al acceder a categorías o subcategorías que no cuentan con inventario asignado (como `Desktops -> PC` en `index.php?route=product/category&path=20_26`), la interfaz despliega únicamente el título "PC", un texto plano indicando "There are no products to list in this category." y un botón solitario de "Continue" que redirige a la página principal. No se ofrecen recomendaciones de productos similares, enlaces a categorías populares ni un motor de sugerencias, convirtiendo la página en un "callejón sin salida" (*Dead End*) que deteriora la retención del cliente.
- **Pasos para Reproducir:**
  1. Desplegar el menú "Desktops".
  2. Seleccionar "PC (0)".
  3. Revisar el contenido desplegado.
- **Resultado Esperado:** Presentar módulos de recomendación ("Quizás te interese", productos más vendidos) y enlaces a categorías activas para evitar la salida del usuario.
- **Resultado Obtenido:** Contenedor vacío sin incentivos comerciales ni productos sugeridos.
- **Evidencia:** `evidencias/DEF-10_categoria_vacia_sin_cta_apropiado.png`
