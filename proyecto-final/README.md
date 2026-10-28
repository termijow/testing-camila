# Proyecto Final – Electiva Testing y QA
## Auditoría Integral de Calidad de Software: OpenCart E-Commerce Demo

**Firma Consultora de QA:** NovaQA Quality Solutions  
**Aplicación Auditada:** OpenCart Community Testing Instance (`http://opencart.abstracta.us/`)  
**Modalidad:** Equipo de 2 Estudiantes  
**Fecha de Entrega:** Octubre 2026  

---

## 📁 Índice General de Entregables

Toda la documentación, evidencias y código fuente se encuentran organizados dentro de este directorio conforme a los requisitos de la electiva:

| Entregable | Documento / Recurso | Descripción Principal |
| :---: | :--- | :--- |
| **Entregable 1** | [**`01_PLAN_DE_PRUEBAS.md`**](./01_PLAN_DE_PRUEBAS.md) | Propósito, alcance (incluidos/excluidos), 12 módulos evaluados, análisis de riesgos de producto y proceso. |
| **Entregable 2** | [**`02_DISENO_Y_EJECUCION_CASOS_DE_PRUEBA.md`**](./02_DISENO_Y_EJECUCION_CASOS_DE_PRUEBA.md) | **35 casos de prueba** diseñados y ejecutados (Positivas, Negativas, BVA, Tablas de Decisión, Transición de Estados). |
| **Entregable 3** | [**`03_REPORTE_DE_DEFECTOS_BUGS.md`**](./03_REPORTE_DE_DEFECTOS_BUGS.md) | **10 defectos reales y verificables** (DEF-01 al DEF-10) con severidad, prioridad, pasos detallados y evidencias. |
| **Entregable 4** | [**`04_AUTOMATIZACION_PRUEBAS.md`**](./04_AUTOMATIZACION_PRUEBAS.md) | Suite automatizada E2E con **Playwright**, justificación de los 5 casos seleccionados, código fuente e instrucciones. |
| **Entregable 5** | [**`05_REPORTE_DE_COBERTURA.md`**](./05_REPORTE_DE_COBERTURA.md) | Cobertura Funcional (**85.71% > 50%**) con Matriz RTM y distinción conceptual frente a cobertura de código. |
| **Entregable 6** | [**`06_INFORME_FINAL_AUDITORIA.md`**](./06_INFORME_FINAL_AUDITORIA.md) | Informe formal de consultoría al cliente. **Dictamen Final: ¿Lista para Producción? -> NO**, con justificación técnica. |
| **Sustentación** | [**`07_GUION_SUSTENTACION_10MIN.md`**](./07_GUION_SUSTENTACION_10MIN.md) | Guion minuto a minuto (10:00 min) para 2 integrantes, estructura de diapositivas y banco de preguntas del jurado. |
| **Diapositivas** | [**`slides.html`**](./slides.html) | Presentación interactiva lista para proyectar en el navegador (con temporizador de 10 min, notas de orador y capturas). |
| **Matriz CSV** | [**`casos_de_prueba.csv`**](./casos_de_prueba.csv) | Exportación en formato tabular/Excel de los 35 casos de prueba completos. |
| **Defectos CSV** | [**`reporte_defectos.csv`**](./reporte_defectos.csv) | Exportación en formato tabular/Excel de los 10 reportes de bugs detallados. |
| **Código Auto** | [**`automation/opencart.spec.ts`**](./automation/opencart.spec.ts) | Scripts de prueba en TypeScript/Playwright (100% aprobados en 41.5 segundos). |
| **Evidencias** | [**`evidencias/`**](./evidencias/) | Capturas de pantalla reales y fechadas de cada defecto y escenario de prueba. |
| **Reporte HTML**| [**`playwright-report/index.html`**](./playwright-report/index.html) | Reporte interactivo nativo generado por Playwright con trazas y pasos. |

---

## 🚀 Guía Rápida de Ejecución de Pruebas Automatizadas

Desde la raíz del proyecto (`testing-camila`), se pueden ejecutar los comandos preconfigurados:

```bash
# 1. Instalar dependencias necesarias
npm install

# 2. Ejecutar la suite de pruebas automatizadas en modo silencioso (Headless)
npm run test:audit

# 3. Ejecutar las pruebas con navegador visible (Modo Headed para Sustentación)
npm run test:audit:headed

# 4. Abrir el reporte HTML interactivo de Playwright
npm run report:audit
```

---

## 📊 Resumen Ejecutivo de Métricas

- **Total de Casos de Prueba Ejecutados:** 35 casos.
  - Aprobados (*Passed*): **28 (80.0%)**
  - Fallidos (*Failed*): **7 (20.0%)**
- **Defectos Críticos y Mayores Abiertos:** 4 defectos (DEF-01, DEF-03, DEF-04, DEF-06).
- **Cobertura Funcional (RTM):** **85.71%** (12 de 14 módulos evaluados).
- **Pruebas Automatizadas:** 5/5 pasadas exitosamente (100%).
- **Concepto Final para Producción:** **NO** (Bloqueado por incumplimiento de *Exit Criteria* ante defectos de severidad Crítica y Mayor en flujos financieros y logísticos).
