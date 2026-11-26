import { useState } from 'react';
import { Compass, Maximize2, Minimize2 } from 'lucide-react';
import { RoutePlannerView } from './components/RoutePlannerView';

export default function App() {
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
            className={`topbar-btn ${tourActive ? 'active' : 'primary'}`}
            onClick={handleStartPresentationTour}
          >
            <Compass size={14} />
            <span>{tourActive ? 'Tour en curso' : 'Recorrido Guiado'}</span>
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

      {/* Main Full-Width Map Workspace */}
      <div className="shell-body">
        <main className="main-stage">
          <RoutePlannerView
            tourActive={tourActive}
            tourStep={tourStep}
            onTourChange={handleTourChange}
          />
        </main>
      </div>
    </div>
  );
}
