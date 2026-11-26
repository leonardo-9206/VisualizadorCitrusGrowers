import { useState } from 'react';
import {
  Building2,
  Compass,
  Globe2,
  Handshake,
  Map as MapIcon,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { RoutePlannerView } from './components/RoutePlannerView';
import { NegotiationSimulatorView } from './components/NegotiationSimulatorView';
import { CulturalMatrixView } from './components/CulturalMatrixView';
import { ActorsProfileView } from './components/ActorsProfileView';

type ActiveTab = 'map' | 'negotiation' | 'culture' | 'actors';

const NAV_ITEMS: { id: ActiveTab; label: string; icon: typeof MapIcon }[] = [
  { id: 'map', label: 'Mapa y Rutas CGA', icon: MapIcon },
  { id: 'negotiation', label: 'Simulador 7 Fases', icon: Handshake },
  { id: 'culture', label: 'Matriz Cultural ZA × FR', icon: Globe2 },
  { id: 'actors', label: 'Perfiles CGA y Auchan', icon: Building2 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('map');
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fallback ignored if fullscreen is blocked by browser iframe policy
    }
  };

  const handleStartPresentationTour = () => {
    setActiveTab('map');
    if (tourActive) {
      setTourActive(false);
    } else {
      setTourStep(0);
      setTourActive(true);
    }
  };

  const handleTourChange = (active: boolean, step?: number) => {
    setTourActive(active);
    if (typeof step === 'number') {
      setTourStep(step);
    }
  };

  return (
    <div className="app-shell">
      {/* Top Executive Navigation Header */}
      <header className="topbar">
        <div className="topbar-brand">
          <div className="brand-mark" aria-hidden="true">
            CGA
          </div>
          <div className="brand-titles">
            <div className="brand-title-row">
              <h1 className="brand-title">Citrus Growers&apos; Association × Groupe Auchan</h1>
              <span className="brand-divider">|</span>
              <span className="brand-tag">Visualizador Comercial</span>
            </div>
            <span className="brand-subtitle">
              Simulación de Negociaciones Internacionales · Sudáfrica — Francia · Incoterm CIF
            </span>
          </div>
        </div>

        <div className="topbar-actions">
          <span className="team-chip">UAA · Equipo 10 · Comercio Internacional</span>

          <button
            type="button"
            className={`topbar-btn ${tourActive && activeTab === 'map' ? 'active' : 'primary'}`}
            onClick={handleStartPresentationTour}
          >
            <Compass size={14} />
            <span>{tourActive && activeTab === 'map' ? 'Tour en curso' : 'Recorrido Guiado'}</span>
          </button>

          <button
            type="button"
            className="topbar-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Modo presentación pantalla completa'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? 'Salir' : 'Presentar'}</span>
          </button>
        </div>
      </header>

      {/* Main App Body: Left Icon Navigation Rail + Active Workspace */}
      <div className="shell-body">
        <nav className="nav-rail" aria-label="Vistas del visualizador">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`rail-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="rail-tooltip">{item.label}</span>
              </button>
            );
          })}
          <div className="rail-spacer" />
        </nav>

        <main className="main-stage">
          {activeTab === 'map' && (
            <RoutePlannerView
              tourActive={tourActive}
              tourStep={tourStep}
              onTourChange={handleTourChange}
            />
          )}
          {activeTab === 'negotiation' && <NegotiationSimulatorView />}
          {activeTab === 'culture' && <CulturalMatrixView />}
          {activeTab === 'actors' && <ActorsProfileView />}
        </main>
      </div>
    </div>
  );
}
