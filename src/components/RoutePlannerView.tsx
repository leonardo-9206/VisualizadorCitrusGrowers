import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Anchor,
  ChevronDown,
  ChevronUp,
  Clock,
  Crosshair,
  Globe2,
  MapPin,
  Package,
  Route as RouteIcon,
  ShieldCheck,
  Sprout,
  TrendingUp,
} from 'lucide-react';
import type { RouteStop, ScopePreset } from '../data/presentationData';
import { SCOPE_VIEWS, TOUR_WAYPOINTS, TRADE_ROUTES } from '../data/presentationData';
import { TerritoryMap } from './TerritoryMap';

interface RoutePlannerViewProps {
  tourActive: boolean;
  tourStep: number;
  onTourChange: (active: boolean, step?: number) => void;
}

export function RoutePlannerView({
  tourActive,
  tourStep,
  onTourChange,
}: RoutePlannerViewProps) {
  const [scope, setScope] = useState<ScopePreset>('south-africa');
  const [activeRouteIds, setActiveRouteIds] = useState<string[]>([
    'ruta-za-w',
    'ruta-za-e',
    'ruta-cif-eu',
  ]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('ruta-za-w');
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>('ruta-za-w');
  const [focusTrigger, setFocusTrigger] = useState(0);
  const [focusedStop, setFocusedStop] = useState<{ routeId: string; stop: RouteStop } | null>(null);
  const [drawerExpanded, setDrawerExpanded] = useState(true);

  const handleScopeChange = (nextScope: ScopePreset) => {
    setScope(nextScope);
    if (nextScope === 'south-africa') {
      setActiveRouteIds(['ruta-za-w', 'ruta-za-e', 'ruta-cif-eu']);
      setSelectedRouteId('ruta-za-w');
      setExpandedRouteId('ruta-za-w');
    } else if (nextScope === 'corridor-eu') {
      setActiveRouteIds(['ruta-za-w', 'ruta-za-e', 'ruta-cif-eu']);
      setSelectedRouteId('ruta-cif-eu');
      setExpandedRouteId('ruta-cif-eu');
    } else {
      setActiveRouteIds(TRADE_ROUTES.map((r) => r.id));
      setSelectedRouteId('ruta-cif-eu');
      setExpandedRouteId('ruta-cif-eu');
    }
  };

  const handleTourChange = (active: boolean, step?: number) => {
    onTourChange(active, step);
    if (active && typeof step === 'number') {
      const wp = TOUR_WAYPOINTS[step];
      if (wp) {
        setScope(wp.scope);
        if (wp.scope === 'global') {
          setActiveRouteIds(TRADE_ROUTES.map((r) => r.id));
        } else {
          setActiveRouteIds(['ruta-za-w', 'ruta-za-e', 'ruta-cif-eu']);
        }
        if (wp.focusRouteId) {
          setSelectedRouteId(wp.focusRouteId);
          setExpandedRouteId(wp.focusRouteId);
        }
      }
    }
  };

  const toggleRoute = (routeId: string) => {
    setActiveRouteIds((prev) =>
      prev.includes(routeId) ? prev.filter((id) => id !== routeId) : [...prev, routeId]
    );
  };

  const handleFocusRoute = (routeId: string) => {
    if (!activeRouteIds.includes(routeId)) {
      setActiveRouteIds((prev) => [...prev, routeId]);
    }
    setSelectedRouteId(routeId);
    setExpandedRouteId(routeId);
    setFocusTrigger((n) => n + 1);
  };

  const selectedRoute = useMemo(
    () => TRADE_ROUTES.find((r) => r.id === selectedRouteId) ?? TRADE_ROUTES[0],
    [selectedRouteId]
  );

  const tableRows = useMemo(() => {
    if (selectedRoute && activeRouteIds.includes(selectedRoute.id)) {
      return selectedRoute.stops.map((stop) => ({ route: selectedRoute, stop }));
    }
    return TRADE_ROUTES.filter((r) => activeRouteIds.includes(r.id)).flatMap((route) =>
      route.stops.map((stop) => ({ route, stop }))
    );
  }, [selectedRoute, activeRouteIds]);

  return (
    <>
      {/* Top Executive KPI Telemetry Strip */}
      <section className="kpi-strip" aria-label="Indicadores clave de exportación y acuerdo">
        <div className="kpi-item">
          <div className="kpi-icon" style={{ background: 'var(--citrus-orange-soft)', color: 'var(--citrus-orange)' }}>
            <Sprout size={16} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Productores CGA</span>
            <span className="kpi-value">
              1,400+ <span className="kpi-sub">6 países australes</span>
            </span>
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-icon" style={{ background: 'var(--orchard-green-soft)', color: 'var(--orchard-green)' }}>
            <TrendingUp size={16} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Meta Visión 260</span>
            <span className="kpi-value">
              260M <span className="kpi-sub">cajas · 2032</span>
            </span>
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-icon" style={{ background: 'var(--ocean-teal-soft)', color: 'var(--ocean-teal)' }}>
            <Globe2 size={16} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Alcance Global</span>
            <span className="kpi-value">
              120+ <span className="kpi-sub">países · #2 mundial</span>
            </span>
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-icon" style={{ background: 'var(--france-navy-soft)', color: 'var(--france-navy)' }}>
            <Package size={16} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Acuerdo Auchan</span>
            <span className="kpi-value">
              $10.15 <span className="kpi-sub">USD/caja (15 kg)</span>
            </span>
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-icon" style={{ background: 'var(--amber-gold-soft)', color: 'var(--amber-gold)' }}>
            <ShieldCheck size={16} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Fondo Emergentes</span>
            <span className="kpi-value">
              +$0.15 <span className="kpi-sub">CGA-GDC · 3 años</span>
            </span>
          </div>
        </div>

        <div className="kpi-item">
          <div className="kpi-icon" style={{ background: '#f1f5f9', color: '#334155' }}>
            <Anchor size={16} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Incoterm · UE/RU</span>
            <span className="kpi-value">
              CIF <span className="kpi-sub">30%–40% destino</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Split Workspace: Left Route Panel + Right Interactive Map & Detail Drawer */}
      <div className="planner-layout">
        <aside className="routes-sidebar" aria-label="Planificación de corredores y rutas">
          <div className="sidebar-header">
            <div className="sidebar-title-row">
              <h2 className="sidebar-title">Corredores Citrícolas y Rutas</h2>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--orchard-green)',
                }}
              >
                {activeRouteIds.length}/{TRADE_ROUTES.length} activas
              </span>
            </div>

            {/* Map Scope Preset Switcher */}
            <div className="scope-pills" role="tablist" aria-label="Enfoque geográfico">
              {(Object.keys(SCOPE_VIEWS) as ScopePreset[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={scope === key}
                  className={`scope-pill ${scope === key ? 'active' : ''}`}
                  onClick={() => handleScopeChange(key)}
                >
                  {SCOPE_VIEWS[key].label}
                </button>
              ))}
            </div>
          </div>

          <div className="routes-list">
            {TRADE_ROUTES.map((route) => {
              const isActive = activeRouteIds.includes(route.id);
              const isExpanded = expandedRouteId === route.id;
              const isSelected = selectedRouteId === route.id;

              return (
                <div
                  key={route.id}
                  className={`route-card ${isSelected ? 'selected' : ''} ${!isActive ? 'inactive' : ''}`}
                  style={{ ['--route-color' as string]: route.color }}
                >
                  <div
                    className="route-card-head"
                    onClick={() => {
                      setSelectedRouteId(route.id);
                      setExpandedRouteId(isExpanded ? null : route.id);
                    }}
                  >
                    <span className="route-dot" style={{ background: route.color }} />

                    <div className="route-head-info">
                      <div className="route-code-row">
                        <span className="route-code">{route.code}</span>
                        <span className="route-scope-badge">
                          {route.mode === 'terrestre' ? 'Terrestre ZA' : 'Marítimo'}
                        </span>
                      </div>
                      <div className="route-name" title={route.name}>
                        {route.shortName}
                      </div>
                      <div className="route-mini-metrics">
                        <span>
                          <MapPin size={11} />
                          {route.stops.length} nodos
                        </span>
                        <span>
                          <RouteIcon size={11} />
                          {route.distanceLabel}
                        </span>
                        <span>
                          <Clock size={11} />
                          {route.transitTime.split(' ')[0]} {route.transitTime.split(' ')[1]}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`toggle-switch ${isActive ? 'on' : ''}`}
                      style={{ ['--route-color' as string]: route.color }}
                      aria-label={`${isActive ? 'Ocultar' : 'Mostrar'} ruta ${route.shortName}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRoute(route.id);
                      }}
                    >
                      <span className="toggle-knob" />
                    </button>

                    <span style={{ color: 'var(--text-muted)', display: 'grid', placeItems: 'center' }}>
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="route-card-body">
                      <div className="route-summary-grid">
                        <div className="route-stat-cell">
                          <span className="route-stat-label">Origen</span>
                          <span className="route-stat-val">{route.origin}</span>
                        </div>
                        <div className="route-stat-cell">
                          <span className="route-stat-label">Destino</span>
                          <span className="route-stat-val">{route.destination}</span>
                        </div>
                        <div className="route-stat-cell">
                          <span className="route-stat-label">Distancia</span>
                          <span className="route-stat-val" style={{ fontFamily: 'var(--font-mono)' }}>
                            {route.distanceLabel}
                          </span>
                        </div>
                        <div className="route-stat-cell">
                          <span className="route-stat-label">Tránsito</span>
                          <span className="route-stat-val">{route.transitTime}</span>
                        </div>
                      </div>

                      <div className="capacity-bar-wrap">
                        <div className="capacity-bar-head">
                          <span>Peso estratégico del corredor</span>
                          <span style={{ fontFamily: 'var(--font-mono)', color: route.color }}>
                            {route.shareLabel}
                          </span>
                        </div>
                        <div className="capacity-track">
                          <div
                            className="capacity-fill"
                            style={{ width: `${route.sharePercent}%`, background: route.color }}
                          />
                        </div>
                      </div>

                      <div className="varieties-row">
                        {route.varieties.map((v) => (
                          <span key={v} className="variety-tag">
                            {v}
                          </span>
                        ))}
                      </div>

                      <div className="route-note" style={{ ['--route-color' as string]: route.color }}>
                        {route.summary}
                      </div>

                      {route.alert && (
                        <div className="route-alert">
                          <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                          <span>{route.alert}</span>
                        </div>
                      )}

                      <div className="route-card-actions">
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Clic en cualquier parada del mapa para detalle
                        </span>
                        <button
                          type="button"
                          className="btn-link-focus"
                          onClick={() => handleFocusRoute(route.id)}
                        >
                          <Crosshair size={13} />
                          Enfocar ruta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Live Interactive Map + Detalle de Rutas Bottom Drawer */}
        <div className="map-column">
          <TerritoryMap
            routes={TRADE_ROUTES}
            activeRouteIds={activeRouteIds}
            selectedRouteId={selectedRouteId}
            focusedStop={focusedStop}
            scope={scope}
            focusTrigger={focusTrigger}
            tourActive={tourActive}
            tourStep={tourStep}
            onSelectRoute={(id) => {
              setSelectedRouteId(id);
              setExpandedRouteId(id);
            }}
            onSelectStop={(routeId, stop) => {
              setSelectedRouteId(routeId);
              setFocusedStop({ routeId, stop });
            }}
            onTourChange={handleTourChange}
            onScopeChange={handleScopeChange}
          />

          {/* Collapsible Bottom Table: Detalle de rutas y cadena de frío */}
          <section
            className={`detail-drawer ${drawerExpanded ? 'expanded' : 'collapsed'}`}
            aria-label="Detalle de rutas y paradas"
          >
            <div
              className="drawer-header"
              onClick={() => setDrawerExpanded((e) => !e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setDrawerExpanded((v) => !v);
              }}
            >
              <div className="drawer-header-left">
                <span
                  className="route-dot"
                  style={{ background: selectedRoute?.color ?? 'var(--citrus-orange)' }}
                />
                <span className="drawer-title">
                  Detalle de paradas — {selectedRoute ? selectedRoute.name : 'Todas las rutas activas'}
                </span>
                <span className="drawer-count">{tableRows.length} puntos</span>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}
              >
                {drawerExpanded ? 'Minimizar tabla' : 'Expandir detalle'}
                {drawerExpanded ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
              </span>
            </div>

            {drawerExpanded && (
              <div className="drawer-body">
                <table className="stops-table">
                  <thead>
                    <tr>
                      <th style={{ width: 46 }}>#</th>
                      <th>Nodo / Ubicación</th>
                      <th>Tipo</th>
                      <th>Cadena de frío</th>
                      <th>Función logística y negociación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map(({ route, stop }) => {
                      const isRowFocused =
                        focusedStop?.routeId === route.id && focusedStop?.stop.id === stop.id;
                      return (
                        <tr
                          key={`${route.id}-${stop.id}`}
                          className={isRowFocused ? 'active-row' : ''}
                          onClick={() => {
                            if (!activeRouteIds.includes(route.id)) {
                              setActiveRouteIds((prev) => [...prev, route.id]);
                            }
                            setFocusedStop({ routeId: route.id, stop });
                          }}
                        >
                          <td>
                            <span
                              className="stop-num-cell"
                              style={{ background: route.color }}
                            >
                              {stop.order}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                              {stop.name}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              {stop.country} · {route.code}
                            </div>
                          </td>
                          <td>
                            <span className="node-type-badge">{stop.typeLabel}</span>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 600 }}>
                            {stop.coldChain}
                          </td>
                          <td style={{ maxWidth: 380, color: 'var(--text-secondary)' }}>
                            {stop.detail}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
