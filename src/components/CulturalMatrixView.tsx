import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Compass,
  Scale,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  CONVERGENCE_POINTS,
  CULTURAL_DIMENSIONS,
  CULTURAL_TOPICS,
  FRICTION_ZONES,
} from '../data/presentationData';

export function CulturalMatrixView() {
  const [selectedTopicId, setSelectedTopicId] = useState(CULTURAL_TOPICS[0].id);

  const activeTopic =
    CULTURAL_TOPICS.find((t) => t.id === selectedTopicId) ?? CULTURAL_TOPICS[0];

  return (
    <div className="page-scroll">
      <div className="page-container">
        <div className="section-header-bar">
          <div>
            <div className="section-kicker">Multiculturalidad y Protocolo de Negocios</div>
            <h2 className="section-title">Matriz Cultural: Sudáfrica (CGA) vs. Francia (Auchan)</h2>
            <p className="section-desc">
              Contraste estructurado entre la filosofía comunitaria sudafricana (<em>Ubuntu</em> y cultura de tarea)
              y la formalidad institucional francesa (debate intelectual, <em>cadre</em> y centralización en el <em>PDG</em>).
            </p>
          </div>
        </div>

        {/* Top Row: Quantitative Cultural Profile + Protocol Switcher */}
        <div className="culture-grid-2">
          {/* Cultural Dimensions Bars */}
          <div className="surface-card">
            <div className="card-title-row">
              <h3 className="card-title">
                <Scale size={16} color="var(--citrus-orange)" />
                Perfiles Culturales Comparados
              </h3>
              <div style={{ display: 'flex', gap: 12, fontSize: '11.5px', fontWeight: 700 }}>
                <span style={{ color: 'var(--citrus-orange)' }}>● Sudáfrica</span>
                <span style={{ color: 'var(--france-navy)' }}>● Francia</span>
              </div>
            </div>

            <div>
              {CULTURAL_DIMENSIONS.map((dim) => (
                <div key={dim.id} className="dim-row">
                  <div className="dim-header">
                    <span>{dim.label}</span>
                  </div>
                  <div className="dim-bars">
                    <div className="dim-bar-line">
                      <span style={{ fontWeight: 600, color: '#b45309' }}>Sudáfrica</span>
                      <div className="dim-track">
                        <div
                          className="dim-fill"
                          style={{ width: `${dim.southAfricaScore}%`, background: 'var(--citrus-orange)' }}
                        />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, textAlign: 'right' }}>
                        {dim.southAfricaScore}
                      </span>
                    </div>
                    <div className="dim-bar-line">
                      <span style={{ fontWeight: 600, color: '#1e40af' }}>Francia</span>
                      <div className="dim-track">
                        <div
                          className="dim-fill"
                          style={{ width: `${dim.franceScore}%`, background: 'var(--france-navy)' }}
                        />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, textAlign: 'right' }}>
                        {dim.franceScore}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span>ZA: {dim.southAfricaTag}</span>
                    <span>FR: {dim.franceTag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Protocol Comparison */}
          <div className="surface-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-title-row">
              <h3 className="card-title">
                <Compass size={16} color="var(--france-navy)" />
                Protocolo de Negocios por Dimensión
              </h3>
            </div>

            <div className="protocol-tabs" role="tablist">
              {CULTURAL_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  role="tab"
                  aria-selected={topic.id === selectedTopicId}
                  className={`protocol-tab ${topic.id === selectedTopicId ? 'active' : ''}`}
                  onClick={() => setSelectedTopicId(topic.id)}
                >
                  {topic.title}
                </button>
              ))}
            </div>

            <div className="compare-split" style={{ flex: 1 }}>
              <div className="country-panel za">
                <h4 style={{ color: '#b45309' }}>Sudáfrica · CGA</h4>
                <div style={{ fontSize: '12.5px', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
                  {activeTopic.southAfrica.headline}
                </div>
                <p>{activeTopic.southAfrica.summary}</p>
                <ul>
                  {activeTopic.southAfrica.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="country-panel fr">
                <h4 style={{ color: '#1e40af' }}>Francia · Groupe Auchan</h4>
                <div style={{ fontSize: '12.5px', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
                  {activeTopic.france.headline}
                </div>
                <p>{activeTopic.france.summary}</p>
                <ul>
                  {activeTopic.france.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Convergence & Pareto Strategy Banner */}
        <div className="culture-grid-2">
          <div className="surface-card" style={{ borderLeft: '4px solid var(--orchard-green)' }}>
            <div className="card-title-row" style={{ marginBottom: 10 }}>
              <h3 className="card-title">
                <CheckCircle2 size={17} color="var(--orchard-green)" />
                Puntos de Convergencia
              </h3>
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: '13px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
              }}
            >
              {CONVERGENCE_POINTS.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div
            className="surface-card"
            style={{
              background: 'var(--bg-topbar)',
              color: '#f8fafc',
              borderColor: 'transparent',
            }}
          >
            <div className="card-title-row" style={{ marginBottom: 10 }}>
              <h3 className="card-title" style={{ color: '#ffffff' }}>
                <Sparkles size={17} color="#fb923c" />
                Lineamiento Estratégico Paretiano (Ganar-Ganar)
              </h3>
            </div>
            <p style={{ fontSize: '13.2px', lineHeight: 1.65, color: '#cbd5e1', margin: 0 }}>
              Combinar la <strong style={{ color: '#ffffff' }}>calidez transparente y cooperativa</strong> que valora
              la CGA (<em>Ubuntu</em>) con la <strong style={{ color: '#ffffff' }}>formalidad protocolaria y respaldo documental escrito</strong>{' '}
              que exige Auchan: asumir cada objeción francesa como oportunidad para demostrar dominio técnico (CRI) y
              respetar tanto los tiempos de validación directiva como los horarios laborales franceses (semana de 35h).
            </p>
          </div>
        </div>

        {/* 3 Main Cultural Friction Zones */}
        <div className="surface-card">
          <div className="card-title-row">
            <h3 className="card-title">
              <ShieldAlert size={17} color="var(--auchan-crimson)" />
              Principales Riesgos y Zonas de Fricción Cultural
            </h3>
          </div>
          <div className="friction-grid">
            {FRICTION_ZONES.map((zone) => (
              <div key={zone.title} className="friction-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, fontSize: '13.5px' }}>
                  <AlertCircle size={15} color="var(--auchan-crimson)" />
                  <span>{zone.title}</span>
                </div>
                <p style={{ fontSize: '12.3px', lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Riesgo:</strong> {zone.risk}
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: 'var(--orchard-green-soft)',
                    fontSize: '12px',
                    lineHeight: 1.45,
                    color: '#166534',
                  }}
                >
                  <strong>Solución táctica:</strong> {zone.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
