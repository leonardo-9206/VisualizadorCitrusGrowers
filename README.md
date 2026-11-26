# Visualizador Interactivo — CGA × Groupe Auchan

Visualizador web interactivo diseñado para complementar la exposición académica **"Simulación de Negociaciones Internacionales"** (*Multiculturalidad y Protocolo de Negocios* — Lic. en Comercio Internacional, UAA · Equipo 10).

## Vistas principales

1. **Mapa Interactivo de Territorio Sudafricano y Corredores (Leaflet + GeoJSON 50m)**
   - Territorios resaltados con polígonos interactivos: Sudáfrica (sede CGA), los 5 miembros regionales australes (Zimbabue, Eswatini, Mozambique, Namibia, Botsuana), Francia (sede Groupe Auchan) y su red europea.
   - 5 corredores configurables con interruptores ON/OFF, flujos animados en tiempo real (camiones refrigerados y buques portacontenedores), paradas numeradas con popups técnicos, tabla desplegable de detalle de paradas y cadena de frío, y selector de mapa base (Claro / Relieve / Satélite).
   - **Recorrido Guiado (Tour Exposición)** de 6 pasos con transiciones cinematográficas de cámara y soporte de teclado (`←` / `→`).

2. **Simulador de Negociación (7 Fases)**
   - Reproducción interactiva del guion completo (0:00–5:00) con lenguaje verbal, no verbal y expresión por integrante.
   - Gráfica animada de convergencia de precios (`$11.50` CGA vs `$8.50` Auchan → cierre integrador en `$10.15 USD/caja`).
   - Simulador económico interactivo del acuerdo CIF (cálculo dinámico de valor anual, contrato a 3 años, aporte transparente de `$0.15/caja` para productores emergentes CGA-GDC, toneladas y contenedores reefer).

3. **Matriz Cultural (Sudáfrica vs. Francia)**
   - Comparativa cuantitativa de 6 dimensiones culturales, protocolos interactivos (*Ubuntu* vs. debate crítico, puntualidad monócrona vs. regla 5–7 y semana laboral de 35 h), convergencias y mitigación de zonas de fricción.

4. **Perfiles Corporativos e Intereses Cruzados**
   - Líneas de tiempo históricas, misión, visión, valores y matriz de intereses de CGA y Groupe Auchan.

## Desarrollo local y despliegue en Vercel

```bash
npm install
npm run dev
```

Este repositorio está listo para conectarse directamente a **Vercel** (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`) con despliegue automático en cada `git push`.
