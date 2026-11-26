# Visualizador Interactivo — CGA × Groupe Auchan

Visualizador geográfico interactivo diseñado para complementar la exposición académica **"Simulación de Negociaciones Internacionales"** (*Multiculturalidad y Protocolo de Negocios* — Lic. en Comercio Internacional, UAA · Equipo 10).

## Características principales

- **Mapa interactivo del territorio sudafricano y corredores comerciales (Leaflet + GeoJSON 50m):**
  - Territorios resaltados con polígonos interactivos: Sudáfrica (sede CGA), los 5 miembros regionales australes (Zimbabue, Eswatini, Mozambique, Namibia, Botsuana), Francia (sede Groupe Auchan) y su red europea.
  - 5 corredores configurables con interruptores ON/OFF, flujos animados en tiempo real (camiones refrigerados y buques portacontenedores), paradas numeradas con popups técnicos, tabla desplegable de detalle de paradas y cadena de frío, y selector de mapa base (Claro / Relieve / Satélite).
  - **Recorrido Guiado (Tour Exposición)** de 6 pasos con transiciones automáticas de cámara y soporte de teclado (`←` / `→`).
  - **Barra de KPIs** y modo **Presentar** en pantalla completa.

## Desarrollo local y despliegue en Vercel

```bash
npm install
npm run dev
```

Este repositorio está listo para conectarse directamente a **Vercel** (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`) con despliegue automático en cada `git push`.
