import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Pause,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import territoriesRaw from '../data/territories.json';
import type {
  RouteStop,
  ScopePreset,
  TourWaypoint,
  TradeRoute,
} from '../data/presentationData';
import { SCOPE_VIEWS, TOUR_WAYPOINTS } from '../data/presentationData';

type BasemapKey = 'light' | 'streets' | 'satellite';

const BASEMAPS: Record<
  BasemapKey,
  { label: string; url: string; overlayUrl?: string; attribution: string }
> = {
  light: {
    label: 'Claro',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    overlayUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, HERE, Garmin, OpenStreetMap',
  },
  streets: {
    label: 'Relieve',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, HERE, Garmin, OpenStreetMap',
  },
  satellite: {
    label: 'Satélite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    overlayUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery',
  },
};

interface TerritoryFeatureProps {
  iso: string;
  name: string;
  role: 'cga-core' | 'cga-member' | 'auchan-core' | 'auchan-eu' | 'auchan-other' | 'competitor';
  label: string;
  detail: string;
}

interface TerritoryMapProps {
  routes: TradeRoute[];
  activeRouteIds: string[];
  selectedRouteId: string | null;
  focusedStop: { routeId: string; stop: RouteStop } | null;
  scope: ScopePreset;
  focusTrigger: number;
  tourActive: boolean;
  tourStep: number;
  onSelectRoute: (routeId: string) => void;
  onSelectStop: (routeId: string, stop: RouteStop) => void;
  onTourChange: (active: boolean, step?: number) => void;
  onScopeChange: (scope: ScopePreset) => void;
}

function interpolatePolyline(coords: [number, number][], t: number): [number, number] {
  if (coords.length === 0) return [0, 0];
  if (coords.length === 1) return coords[0];
  const segLengths: number[] = [];
  let total = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const dLat = coords[i + 1][0] - coords[i][0];
    const dLng = coords[i + 1][1] - coords[i][1];
    const len = Math.hypot(dLat, dLng);
    segLengths.push(len);
    total += len;
  }
  if (total === 0) return coords[0];
  let target = ((t % 1) + 1) % 1 * total;
  for (let i = 0; i < segLengths.length; i++) {
    if (target <= segLengths[i] || i === segLengths.length - 1) {
      const localT = segLengths[i] === 0 ? 0 : target / segLengths[i];
      const lat = coords[i][0] + (coords[i + 1][0] - coords[i][0]) * localT;
      const lng = coords[i][1] + (coords[i + 1][1] - coords[i][1]) * localT;
      return [lat, lng];
    }
    target -= segLengths[i];
  }
  return coords[coords.length - 1];
}

function getTerritoryStyle(role: TerritoryFeatureProps['role'], isSatellite: boolean): L.PathOptions {
  switch (role) {
    case 'cga-core':
      return {
        color: '#C85A17',
        weight: 2.2,
        fillColor: '#C85A17',
        fillOpacity: isSatellite ? 0.34 : 0.24,
      };
    case 'cga-member':
      return {
        color: '#1D6342',
        weight: 1.5,
        fillColor: '#1D6342',
        fillOpacity: isSatellite ? 0.28 : 0.17,
      };
    case 'auchan-core':
      return {
        color: '#22487A',
        weight: 2.2,
        fillColor: '#22487A',
        fillOpacity: isSatellite ? 0.34 : 0.24,
      };
    case 'auchan-eu':
      return {
        color: '#4A75AA',
        weight: 1.3,
        fillColor: '#4A75AA',
        fillOpacity: isSatellite ? 0.24 : 0.14,
      };
    case 'auchan-other':
      return {
        color: '#766E62',
        weight: 1.1,
        dashArray: '3 3',
        fillColor: '#766E62',
        fillOpacity: 0.12,
      };
    case 'competitor':
      return {
        color: '#9E2A3B',
        weight: 1.4,
        dashArray: '4 4',
        fillColor: '#9E2A3B',
        fillOpacity: 0.1,
      };
  }
}

function createStopPopupHtml(route: TradeRoute, stop: RouteStop): string {
  return `
    <div class="map-popup-card">
      <div class="map-popup-kicker" style="color:${route.color}">
        ${route.code} · Parada #${stop.order} · ${stop.typeLabel}
      </div>
      <h4 class="map-popup-title">${stop.name}</h4>
      <p class="map-popup-desc">${stop.detail}</p>
      <div class="map-popup-meta">
        <span class="map-popup-pill">${stop.country}</span>
        <span class="map-popup-pill">${stop.coldChain}</span>
        <span class="map-popup-pill">${stop.role}</span>
      </div>
    </div>
  `;
}

export function TerritoryMap({
  routes,
  activeRouteIds,
  selectedRouteId,
  focusedStop,
  scope,
  focusTrigger,
  tourActive,
  tourStep,
  onSelectRoute,
  onSelectStop,
  onTourChange,
  onScopeChange,
}: TerritoryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayTileLayerRef = useRef<L.TileLayer | null>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const routesGroupRef = useRef<L.LayerGroup | null>(null);
  const vehiclesGroupRef = useRef<L.LayerGroup | null>(null);
  const stopMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const vehicleMarkersRef = useRef<Map<string, { marker: L.Marker; route: TradeRoute; offset: number }>>(
    new Map()
  );

  const [basemap, setBasemap] = useState<BasemapKey>('light');
  const [showTerritories, setShowTerritories] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<1 | 2 | 3>(1);

  const activeRoutes = useMemo(
    () => routes.filter((r) => activeRouteIds.includes(r.id)),
    [routes, activeRouteIds]
  );

  // Initialize Leaflet map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialView = SCOPE_VIEWS['south-africa'];
    const map = L.map(mapContainerRef.current, {
      center: initialView.center,
      zoom: initialView.zoom,
      minZoom: 1.75,
      maxZoom: 11,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      zoomControl: false,
      worldCopyJump: true,
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);

    routesGroupRef.current = L.layerGroup().addTo(map);
    vehiclesGroupRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update tile layer when basemap changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }
    if (overlayTileLayerRef.current) {
      map.removeLayer(overlayTileLayerRef.current);
      overlayTileLayerRef.current = null;
    }

    const cfg = BASEMAPS[basemap];
    tileLayerRef.current = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: 16,
    }).addTo(map);
    tileLayerRef.current.bringToBack();

    if (cfg.overlayUrl) {
      overlayTileLayerRef.current = L.tileLayer(cfg.overlayUrl, {
        maxZoom: 16,
        opacity: 0.9,
        pane: 'tilePane',
      }).addTo(map);
    }
  }, [basemap]);

  // Render interactive 50m GeoJSON territories
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (geoLayerRef.current) {
      map.removeLayer(geoLayerRef.current);
      geoLayerRef.current = null;
    }

    if (!showTerritories) return;

    const isSat = basemap === 'satellite';
    const layer = L.geoJSON(territoriesRaw as GeoJSON.FeatureCollection, {
      style: (feature) => {
        const props = feature?.properties as TerritoryFeatureProps | undefined;
        return getTerritoryStyle(props?.role ?? 'cga-member', isSat);
      },
      onEachFeature: (feature, featureLayer) => {
        const props = feature.properties as TerritoryFeatureProps;
        featureLayer.bindTooltip(
          `<div style="font-family:var(--font-body);max-width:240px;">
            <strong style="font-size:12.5px;color:#0f172a;">${props.label}</strong>
            <div style="font-size:11px;color:#475569;margin-top:2px;line-height:1.35;">${props.detail}</div>
          </div>`,
          { sticky: true, direction: 'top', opacity: 0.96 }
        );
        featureLayer.on({
          mouseover: (e) => {
            const target = e.target as L.Path;
            target.setStyle({ fillOpacity: 0.42, weight: 2.6 });
          },
          mouseout: (e) => {
            layer.resetStyle(e.target as L.Path);
          },
        });
      },
    }).addTo(map);

    geoLayerRef.current = layer;
  }, [showTerritories, basemap]);

  // Render active polylines, animated flow dashes, stop markers, and moving vehicle markers
  useEffect(() => {
    const routesGroup = routesGroupRef.current;
    const vehiclesGroup = vehiclesGroupRef.current;
    if (!routesGroup || !vehiclesGroup) return;

    routesGroup.clearLayers();
    vehiclesGroup.clearLayers();
    stopMarkersRef.current.clear();
    vehicleMarkersRef.current.clear();

    activeRoutes.forEach((route, rIdx) => {
      const isSelected = selectedRouteId === route.id;

      // White casing under polyline for legibility
      L.polyline(route.pathCoords, {
        color: '#ffffff',
        weight: isSelected ? 8 : 6,
        opacity: 0.78,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(routesGroup);

      // Primary colored corridor line
      const mainLine = L.polyline(route.pathCoords, {
        color: route.color,
        weight: isSelected ? 4.4 : 3.2,
        opacity: isSelected ? 0.96 : 0.82,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(routesGroup);

      mainLine.on('click', () => onSelectRoute(route.id));

      // Animated directional dash overlay
      if (isPlaying) {
        L.polyline(route.pathCoords, {
          color: '#ffffff',
          weight: isSelected ? 2 : 1.6,
          opacity: 0.85,
          dashArray: '6 16',
          className: 'route-flow-dash',
          interactive: false,
        }).addTo(routesGroup);
      }

      // Stop markers
      route.stops.forEach((stop) => {
        const iconHtml = `
          <div class="stop-pin ${stop.isHub ? 'is-hub' : ''}" style="--pin-color:${route.color}; position:relative;">
            ${stop.isHub ? `<span class="hub-pulse-ring" style="--pin-color:${route.color};"></span>` : ''}
            <span>${stop.order}</span>
          </div>
        `;
        const icon = L.divIcon({
          html: iconHtml,
          className: '',
          iconSize: stop.isHub ? [28, 28] : [24, 24],
          iconAnchor: stop.isHub ? [14, 14] : [12, 12],
        });

        const marker = L.marker(stop.coords, {
          icon,
          zIndexOffset: stop.isHub ? 500 : 250,
        }).addTo(routesGroup);

        marker.bindPopup(createStopPopupHtml(route, stop), {
          maxWidth: 290,
          offset: [0, -8],
        });

        marker.on('click', () => {
          onSelectStop(route.id, stop);
        });

        stopMarkersRef.current.set(`${route.id}:${stop.id}`, marker);
      });

      // Moving cargo vehicle / vessel marker
      const glyph =
        route.mode === 'terrestre'
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></svg>`;

      const vehicleIcon = L.divIcon({
        html: `<div class="moving-vessel-badge" style="background:${route.color};" title="${route.shortName}">${glyph}</div>`,
        className: '',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const startPos = interpolatePolyline(route.pathCoords, (rIdx * 0.23) % 1);
      const vMarker = L.marker(startPos, {
        icon: vehicleIcon,
        zIndexOffset: 700,
        interactive: false,
      }).addTo(vehiclesGroup);

      vehicleMarkersRef.current.set(route.id, {
        marker: vMarker,
        route,
        offset: (rIdx * 0.23) % 1,
      });
    });
  }, [activeRoutes, selectedRouteId, isPlaying, onSelectRoute, onSelectStop]);

  // Smooth requestAnimationFrame loop for moving cargo trucks & ships
  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let lastTime = performance.now();
    let progress = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      progress += dt * 0.055 * speed;

      vehicleMarkersRef.current.forEach(({ marker, route, offset }) => {
        const pos = interpolatePolyline(route.pathCoords, progress + offset);
        marker.setLatLng(pos);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, speed, activeRoutes]);

  // Fly camera when scope preset changes (unless tour is controlling camera)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || tourActive) return;
    const view = SCOPE_VIEWS[scope];
    if (view.bounds) {
      map.flyToBounds(view.bounds, { padding: [36, 36], duration: 1.05, easeLinearity: 0.25 });
    } else {
      map.flyTo(view.center, view.zoom, { duration: 1.05, easeLinearity: 0.25 });
    }
  }, [scope, tourActive]);

  // Fly camera to selected route bounds when user clicks "Enfocar en mapa"
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedRouteId || focusTrigger === 0) return;
    const route = routes.find((r) => r.id === selectedRouteId);
    if (!route) return;
    const bounds = L.latLngBounds(route.pathCoords);
    map.flyToBounds(bounds, { padding: [55, 55], maxZoom: 7, duration: 1.1 });
  }, [focusTrigger, selectedRouteId, routes]);

  // Fly camera & open popup when user clicks a stop in the bottom table
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !focusedStop) return;
    map.flyTo(focusedStop.stop.coords, Math.max(map.getZoom(), 6), { duration: 0.9 });
    const marker = stopMarkersRef.current.get(`${focusedStop.routeId}:${focusedStop.stop.id}`);
    if (marker) {
      setTimeout(() => marker.openPopup(), 350);
    }
  }, [focusedStop]);

  // Fly camera during Guided Presentation Tour
  const currentTourWaypoint: TourWaypoint | null = tourActive
    ? TOUR_WAYPOINTS[tourStep] ?? TOUR_WAYPOINTS[0]
    : null;

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !currentTourWaypoint) return;
    map.flyTo(currentTourWaypoint.center, currentTourWaypoint.zoom, {
      duration: 1.25,
      easeLinearity: 0.25,
    });
  }, [currentTourWaypoint]);

  // Keyboard support for Guided Tour (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    if (!tourActive) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && tourStep < TOUR_WAYPOINTS.length - 1) {
        onTourChange(true, tourStep + 1);
      } else if (e.key === 'ArrowLeft' && tourStep > 0) {
        onTourChange(true, tourStep - 1);
      } else if (e.key === 'Escape') {
        onTourChange(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [tourActive, tourStep, onTourChange]);

  return (
    <div className="map-viewport">
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Top-Right Floating Map Controls */}
      <div className="map-toolbar-top">
        <div className="map-floating-group">
          <button
            type="button"
            className={`map-ctrl-btn ${isPlaying ? 'play-active' : ''}`}
            onClick={() => setIsPlaying((p) => !p)}
            title={isPlaying ? 'Pausar animación de flujos' : 'Reanudar animación de flujos'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Flujo activo' : 'Pausado'}</span>
          </button>
          <button
            type="button"
            className="map-ctrl-btn"
            onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 3 : 1))}
            title="Cambiar velocidad de animación"
          >
            <span style={{ fontFamily: 'var(--font-mono)' }}>{speed}x</span>
          </button>
        </div>

        <div className="map-floating-group">
          <button
            type="button"
            className={`map-ctrl-btn ${showTerritories ? 'active' : ''}`}
            onClick={() => setShowTerritories((t) => !t)}
            title="Mostrar u ocultar polígonos territoriales"
          >
            <Layers size={13} />
            <span>Territorios</span>
          </button>
        </div>

        <div className="map-floating-group">
          {(Object.keys(BASEMAPS) as BasemapKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`map-ctrl-btn ${basemap === key ? 'active' : ''}`}
              onClick={() => setBasemap(key)}
            >
              {BASEMAPS[key].label}
            </button>
          ))}
        </div>

        <div className="map-floating-group">
          <button
            type="button"
            className={`map-ctrl-btn ${tourActive ? 'active' : ''}`}
            onClick={() => {
              if (tourActive) {
                onTourChange(false);
              } else {
                onTourChange(true, 0);
              }
            }}
            title="Iniciar recorrido guiado paso a paso para exposición"
          >
            <Compass size={13} />
            <span>{tourActive ? 'Salir del Tour' : 'Tour Exposición'}</span>
          </button>
        </div>
      </div>

      {/* Bottom-Left Compact Territory Legend */}
      <div className="map-legend-card">
        <div className="legend-title">Territorios y Actores</div>
        <div className="legend-items">
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: '#C85A17' }} />
            Sudáfrica (CGA)
          </span>
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: '#1D6342' }} />
            Miembros Australes
          </span>
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: '#22487A' }} />
            Francia (Auchan)
          </span>
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: '#4A75AA' }} />
            Red Europea
          </span>
        </div>
      </div>

      {/* Guided Presentation Tour Overlay */}
      {tourActive && currentTourWaypoint && (
        <div className="tour-overlay-card" role="dialog" aria-label="Recorrido guiado de exposición">
          <div className="tour-header">
            <span className="tour-step-badge">{currentTourWaypoint.kicker}</span>
            <button
              type="button"
              className="tour-close-btn"
              onClick={() => onTourChange(false)}
              aria-label="Cerrar recorrido guiado"
            >
              <X size={14} />
            </button>
          </div>
          <h3 className="tour-title">{currentTourWaypoint.title}</h3>
          <p className="tour-text">{currentTourWaypoint.description}</p>
          <div className="tour-highlight-pill">
            <Sparkles size={13} />
            <span>{currentTourWaypoint.highlight}</span>
          </div>
          <div className="tour-footer">
            <div className="tour-dots">
              {TOUR_WAYPOINTS.map((wp, idx) => (
                <button
                  key={wp.id}
                  type="button"
                  className={`tour-dot ${idx === tourStep ? 'active' : ''}`}
                  onClick={() => {
                    onScopeChange(wp.scope);
                    onTourChange(true, idx);
                  }}
                  aria-label={`Ir al paso ${idx + 1}`}
                />
              ))}
            </div>
            <div className="tour-nav-btns">
              <button
                type="button"
                className="tour-nav-btn"
                disabled={tourStep === 0}
                onClick={() => {
                  const prev = tourStep - 1;
                  onScopeChange(TOUR_WAYPOINTS[prev].scope);
                  onTourChange(true, prev);
                }}
              >
                <ChevronLeft size={14} />
                Anterior
              </button>
              <button
                type="button"
                className="tour-nav-btn next"
                onClick={() => {
                  if (tourStep < TOUR_WAYPOINTS.length - 1) {
                    const next = tourStep + 1;
                    onScopeChange(TOUR_WAYPOINTS[next].scope);
                    onTourChange(true, next);
                  } else {
                    onTourChange(false);
                  }
                }}
              >
                {tourStep < TOUR_WAYPOINTS.length - 1 ? (
                  <>
                    Siguiente
                    <ChevronRight size={14} />
                  </>
                ) : (
                  'Finalizar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
