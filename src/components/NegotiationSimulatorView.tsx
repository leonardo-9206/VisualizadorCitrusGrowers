import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Handshake,
  Pause,
  Play,
  Scale,
  Ship,
  Sparkles,
  Users,
} from 'lucide-react';
import { NEGOTIATION_PHASES } from '../data/presentationData';

const CHART_W = 580;
const CHART_H = 220;
const PAD_L = 52;
const PAD_R = 26;
const PAD_T = 22;
const PAD_B = 34;

const MIN_PRICE = 8.0;
const MAX_PRICE = 12.0;

function priceToY(price: number): number {
  const ratio = (price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE);
  return CHART_H - PAD_B - ratio * (CHART_H - PAD_T - PAD_B);
}

function phaseToX(index: number): number {
  const usable = CHART_W - PAD_L - PAD_R;
  return PAD_L + (index / (NEGOTIATION_PHASES.length - 1)) * usable;
}

export function NegotiationSimulatorView() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [annualBoxes, setAnnualBoxes] = useState(500000);

  const phase = NEGOTIATION_PHASES[activeIdx];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => {
        if (prev >= NEGOTIATION_PHASES.length - 1) {
          setAutoPlay(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  // Build SVG polyline points up to the active phase
  const cgaPoints = NEGOTIATION_PHASES.slice(0, activeIdx + 1)
    .map((p, idx) => (p.cgaOffer !== null ? `${phaseToX(idx)},${priceToY(p.cgaOffer)}` : null))
    .filter(Boolean)
    .join(' ');

  const auchanPoints = NEGOTIATION_PHASES.slice(0, activeIdx + 1)
    .map((p, idx) => (p.auchanOffer !== null ? `${phaseToX(idx)},${priceToY(p.auchanOffer)}` : null))
    .filter(Boolean)
    .join(' ');

  // Economic calculator derived from agreed deal terms ($10.00 base + $0.15 emerging growers = $10.15)
  const baseValue = annualBoxes * 10.0;
  const socialFund = annualBoxes * 0.15;
  const totalDealValue = annualBoxes * 10.15;
  const threeYearValue = totalDealValue * 3;
  const metricTons = Math.round((annualBoxes * 15) / 1000);
  const reeferContainers = Math.ceil(annualBoxes / 1600);

  const formatUsd = (n: number) =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="page-scroll">
      <div className="page-container">
        <div className="section-header-bar">
          <div>
            <div className="section-kicker">Simulación en vivo · Guion Equipo 10 (5 minutos)</div>
            <h2 className="section-title">Evolución de la Negociación: CGA × Groupe Auchan</h2>
            <p className="section-desc">
              Recorrido interactivo por las 7 fases del protocolo comercial, desde la brecha inicial de $3.00 USD/caja
              hasta el acuerdo integrador de $10.15 USD/caja bajo Incoterm CIF a 3 años.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              className="btn-link-focus"
              disabled={activeIdx === 0}
              onClick={() => {
                setAutoPlay(false);
                setActiveIdx((i) => Math.max(0, i - 1));
              }}
            >
              <ChevronLeft size={14} />
              Anterior
            </button>
            <button
              type="button"
              className="btn-link-focus"
              style={{
                background: autoPlay ? 'var(--orchard-green)' : 'var(--citrus-orange)',
                color: '#ffffff',
                borderColor: 'transparent',
              }}
              onClick={() => {
                if (!autoPlay && activeIdx === NEGOTIATION_PHASES.length - 1) {
                  setActiveIdx(0);
                }
                setAutoPlay((p) => !p);
              }}
            >
              {autoPlay ? <Pause size={14} /> : <Play size={14} />}
              {autoPlay ? 'Pausar secuencia' : 'Reproducir 7 fases'}
            </button>
            <button
              type="button"
              className="btn-link-focus"
              disabled={activeIdx === NEGOTIATION_PHASES.length - 1}
              onClick={() => {
                setAutoPlay(false);
                setActiveIdx((i) => Math.min(NEGOTIATION_PHASES.length - 1, i + 1));
              }}
            >
              Siguiente
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* 7-Phase Interactive Timeline Selector */}
        <div className="phase-timeline-bar" role="tablist" aria-label="Fases de la negociación">
          {NEGOTIATION_PHASES.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIdx}
              className={`phase-step-btn ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => {
                setAutoPlay(false);
                setActiveIdx(idx);
              }}
            >
              <span className="phase-step-num">FASE {p.id}</span>
              <span className="phase-step-name">{p.shortTitle}</span>
              <span className="phase-step-time">{p.timeRange}</span>
            </button>
          ))}
        </div>

        <div className="neg-grid">
          {/* Left Column: Active Phase Live Script & Body Language */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="surface-card">
              <div className="card-title-row">
                <div>
                  <h3 className="card-title">
                    <Handshake size={17} color="var(--citrus-orange)" />
                    {phase.title}
                  </h3>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: 4 }}>
                    {phase.objective}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 99,
                    background: '#f1f5f9',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {phase.timeRange}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '9px 12px',
                  borderRadius: 9,
                  background: '#f8fafc',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: 14,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '12.5px', fontWeight: 600 }}>
                  <Sparkles size={14} color="var(--citrus-orange)" />
                  <span>{phase.keyMilestone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '11.5px' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Tensión en mesa:</span>
                  <div
                    style={{
                      width: 82,
                      height: 7,
                      background: '#e2e8f0',
                      borderRadius: 99,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${phase.tensionLevel}%`,
                        height: '100%',
                        background:
                          phase.tensionLevel > 65
                            ? 'var(--auchan-crimson)'
                            : phase.tensionLevel > 35
                              ? 'var(--amber-gold)'
                              : 'var(--orchard-green)',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {phase.tensionLevel}%
                  </span>
                </div>
              </div>

              <div className="dialogue-stack">
                {phase.turns.map((turn, i) => (
                  <article key={`${phase.id}-${i}`} className={`dialogue-card ${turn.delegation}`}>
                    <div className="dialogue-speaker-row">
                      <span className="dialogue-speaker">
                        {turn.student} — {turn.speaker}
                      </span>
                      <span className={`delegation-pill ${turn.delegation}`}>{turn.role}</span>
                    </div>
                    <p className="dialogue-quote">{turn.verbal}</p>
                    <div className="dialogue-cues">
                      <div className="dialogue-cue">
                        <strong>Lenguaje no verbal:</strong> {turn.nonVerbal}
                      </div>
                      <div className="dialogue-cue">
                        <strong>Expresión:</strong> {turn.expression}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Animated Price Convergence SVG + Economic Impact Simulator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="surface-card">
              <div className="card-title-row">
                <h3 className="card-title">
                  <Scale size={16} color="var(--france-navy)" />
                  Convergencia de Precio (USD / caja 15 kg)
                </h3>
              </div>

              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
                role="img"
                aria-label="Gráfica de convergencia de precio entre CGA y Auchan"
              >
                {/* Horizontal price grid lines */}
                {[8.5, 9.5, 10.15, 11.0, 11.5].map((p) => {
                  const y = priceToY(p);
                  const isAgreed = p === 10.15;
                  return (
                    <g key={p}>
                      <line
                        x1={PAD_L}
                        x2={CHART_W - PAD_R}
                        y1={y}
                        y2={y}
                        stroke={isAgreed ? '#168053' : '#e2e8f0'}
                        strokeWidth={isAgreed ? 1.4 : 1}
                        strokeDasharray={isAgreed ? '5 4' : undefined}
                      />
                      <text
                        x={PAD_L - 8}
                        y={y + 4}
                        textAnchor="end"
                        fontSize="10.5"
                        fontFamily="var(--font-mono)"
                        fontWeight={isAgreed ? '700' : '500'}
                        fill={isAgreed ? '#168053' : '#64748b'}
                      >
                        ${p.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis phase labels */}
                {NEGOTIATION_PHASES.map((p, idx) => (
                  <text
                    key={p.id}
                    x={phaseToX(idx)}
                    y={CHART_H - 10}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontFamily="var(--font-mono)"
                    fontWeight={idx === activeIdx ? '700' : '500'}
                    fill={idx === activeIdx ? '#111b2b' : '#64748b'}
                  >
                    F{p.id}
                  </text>
                ))}

                {/* Active phase vertical guide */}
                <line
                  x1={phaseToX(activeIdx)}
                  x2={phaseToX(activeIdx)}
                  y1={PAD_T}
                  y2={CHART_H - PAD_B}
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* CGA Offer Line */}
                {cgaPoints && (
                  <polyline
                    fill="none"
                    stroke="#E86F1F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={cgaPoints}
                  />
                )}

                {/* Auchan Offer Line */}
                {auchanPoints && (
                  <polyline
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={auchanPoints}
                  />
                )}

                {/* Data nodes */}
                {NEGOTIATION_PHASES.slice(0, activeIdx + 1).map((p, idx) => (
                  <g key={`pts-${p.id}`}>
                    {p.cgaOffer !== null && (
                      <circle
                        cx={phaseToX(idx)}
                        cy={priceToY(p.cgaOffer)}
                        r={idx === activeIdx ? 6 : 4.5}
                        fill={p.agreedPrice ? '#168053' : '#E86F1F'}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    )}
                    {p.auchanOffer !== null && !p.agreedPrice && (
                      <circle
                        cx={phaseToX(idx)}
                        cy={priceToY(p.auchanOffer)}
                        r={idx === activeIdx ? 6 : 4.5}
                        fill="#1D4ED8"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                ))}
              </svg>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 8,
                  paddingTop: 10,
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '11.5px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                  <span className="legend-swatch" style={{ background: '#E86F1F' }} />
                  Oferta CGA ({phase.cgaOffer ? `$${phase.cgaOffer.toFixed(2)}` : 'Sin cifra aún'})
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                  <span className="legend-swatch" style={{ background: '#1D4ED8' }} />
                  Oferta Auchan ({phase.auchanOffer ? `$${phase.auchanOffer.toFixed(2)}` : 'Sin cifra aún'})
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#168053' }}>
                  <CheckCircle2 size={13} />
                  Cierre: $10.15
                </span>
              </div>
            </div>

            {/* Interactive CIF Contract & Social Impact Simulator */}
            <div className="surface-card">
              <div className="card-title-row">
                <h3 className="card-title">
                  <Ship size={16} color="var(--orchard-green)" />
                  Simulador Económico del Acuerdo CIF
                </h3>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Volumen anual simulado (cajas de 15 kg):
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--citrus-orange)' }}>
                  {annualBoxes.toLocaleString('es-MX')} cajas
                </span>
              </div>

              <input
                type="range"
                min={50000}
                max={2000000}
                step={50000}
                value={annualBoxes}
                onChange={(e) => setAnnualBoxes(Number(e.target.value))}
                className="calc-slider"
                aria-label="Volumen anual de cajas de cítricos"
              />

              <div className="calc-metrics-grid">
                <div className="calc-metric-box">
                  <div className="calc-metric-label">Valor Anual CIF ($10.15/caja)</div>
                  <div className="calc-metric-num">{formatUsd(totalDealValue)}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>
                    Base: {formatUsd(baseValue)}
                  </div>
                </div>

                <div
                  className="calc-metric-box"
                  style={{
                    background: 'var(--orchard-green-soft)',
                    borderColor: 'var(--orchard-green-border)',
                  }}
                >
                  <div className="calc-metric-label" style={{ color: '#166534' }}>
                    Fondo Emergentes CGA-GDC ($0.15)
                  </div>
                  <div className="calc-metric-num" style={{ color: '#166534' }}>
                    {formatUsd(socialFund)}
                  </div>
                  <div style={{ fontSize: '11px', color: '#15803d', marginTop: 2 }}>
                    100% auditable por Auchan
                  </div>
                </div>

                <div className="calc-metric-box">
                  <div className="calc-metric-label">Contrato Marco (3 años)</div>
                  <div className="calc-metric-num">{formatUsd(threeYearValue)}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>
                    Pago a 30 días · Tope revisión 5%
                  </div>
                </div>

                <div className="calc-metric-box">
                  <div className="calc-metric-label">Logística Marítima Reefer</div>
                  <div className="calc-metric-num">{reeferContainers.toLocaleString('es-MX')} TEU-40</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>
                    {metricTons.toLocaleString('es-MX')} toneladas métricas
                  </div>
                </div>
              </div>
            </div>

            {/* Cast Quick Reference */}
            <div className="surface-card">
              <div className="card-title-row" style={{ marginBottom: 10 }}>
                <h3 className="card-title">
                  <Users size={16} color="var(--text-primary)" />
                  Claves de Representación (Equipo 10)
                </h3>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: '12.3px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                }}
              >
                <li>
                  <strong>Liz (Thandi · CGA):</strong> Calidez, confianza y firmeza (filosofía <em>Ubuntu</em>).
                </li>
                <li>
                  <strong>Mich (Amahle · CGA):</strong> Especialista técnica segura de la calidad y trazabilidad.
                </li>
                <li>
                  <strong>Andy (Camille · Auchan):</strong> Formal y reservada al inicio; apertura gradual al acuerdo.
                </li>
                <li>
                  <strong>Ilse (Élodie · Auchan):</strong> Analítica, seria y enfocada en cláusulas comerciales y legales.
                </li>
                <li>
                  <strong>Em (Marie-Claire · Mediadora):</strong> Neutralidad, calma y puente paretiano entre delegaciones.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
