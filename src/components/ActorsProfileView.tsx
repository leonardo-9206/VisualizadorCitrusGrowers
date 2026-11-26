import { useState } from 'react';
import { Building2, GraduationCap, Layers, Sprout, Target } from 'lucide-react';
import {
  AUCHAN_PROFILE,
  CGA_PROFILE,
  NEGOTIATION_INTERESTS,
  TEAM_INFO,
} from '../data/presentationData';

export function ActorsProfileView() {
  const [selectedPillarIdx, setSelectedPillarIdx] = useState(0);
  const activePillar = NEGOTIATION_INTERESTS[selectedPillarIdx];

  return (
    <div className="page-scroll">
      <div className="page-container">
        <div className="section-header-bar">
          <div>
            <div className="section-kicker">Investigación Corporativa y Estrategia</div>
            <h2 className="section-title">Actores de la Negociación: CGA y Groupe Auchan</h2>
            <p className="section-desc">
              Trayectoria histórica, misión, visión, valores corporativos e intereses cruzados en los cuatro ejes
              clave de la mesa comercial internacional.
            </p>
          </div>
        </div>

        {/* Two-Column Company Profiles */}
        <div className="culture-grid-2">
          {/* CGA Column */}
          <div className="surface-card" style={{ borderTop: '4px solid var(--citrus-orange)' }}>
            <div className="card-title-row">
              <div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--citrus-orange)' }}>
                  OFERTA · EXPORTADOR AUSTRAL · {CGA_PROFILE.founded}
                </div>
                <h3 className="card-title" style={{ marginTop: 3 }}>
                  <Sprout size={17} color="var(--citrus-orange)" />
                  {CGA_PROFILE.name}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#fffaf5', border: '1px solid var(--citrus-orange-border)', borderRadius: 9, padding: '10px 12px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: '#b45309' }}>Misión</div>
                <p style={{ margin: '3px 0 0', fontSize: '12.5px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                  {CGA_PROFILE.mission}
                </p>
              </div>
              <div style={{ background: '#f7fdf9', border: '1px solid var(--orchard-green-border)', borderRadius: 9, padding: '10px 12px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: '#166534' }}>Visión 260 (Meta 2032)</div>
                <p style={{ margin: '3px 0 0', fontSize: '12.5px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                  {CGA_PROFILE.vision}
                </p>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
              Hitos Históricos
            </div>
            <div className="timeline-list">
              {CGA_PROFILE.timeline.map((item) => (
                <div key={item.year} className="timeline-entry">
                  <span className="timeline-dot" style={{ background: 'var(--citrus-orange)' }} />
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-heading">{item.title}</div>
                  <p className="timeline-text">{item.text}</p>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 16 }}>
              Valores Corporativos
            </div>
            <div className="values-wrap">
              {CGA_PROFILE.values.map((v) => (
                <span key={v} className="value-chip za">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Auchan Column */}
          <div className="surface-card" style={{ borderTop: '4px solid var(--france-navy)' }}>
            <div className="card-title-row">
              <div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--france-navy)' }}>
                  DEMANDA · RETAIL EUROPEO · {AUCHAN_PROFILE.founded}
                </div>
                <h3 className="card-title" style={{ marginTop: 3 }}>
                  <Building2 size={17} color="var(--france-navy)" />
                  {AUCHAN_PROFILE.name}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#f5f9ff', border: '1px solid var(--france-navy-border)', borderRadius: 9, padding: '10px 12px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: '#1e40af' }}>Misión</div>
                <p style={{ margin: '3px 0 0', fontSize: '12.5px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                  {AUCHAN_PROFILE.mission}
                </p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: 9, padding: '10px 12px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: '#334155' }}>Visión (2023)</div>
                <p style={{ margin: '3px 0 0', fontSize: '12.5px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                  {AUCHAN_PROFILE.vision}
                </p>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
              Hitos Históricos
            </div>
            <div className="timeline-list">
              {AUCHAN_PROFILE.timeline.map((item) => (
                <div key={item.year} className="timeline-entry">
                  <span className="timeline-dot" style={{ background: 'var(--france-navy)' }} />
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-heading">{item.title}</div>
                  <p className="timeline-text">{item.text}</p>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 16 }}>
              Valores del Código de Ética
            </div>
            <div className="values-wrap">
              {AUCHAN_PROFILE.values.map((v) => (
                <span key={v} className="value-chip fr">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Negotiation Interests Matrix */}
        <div className="surface-card">
          <div className="card-title-row">
            <h3 className="card-title">
              <Target size={17} color="var(--orchard-green)" />
              Intereses y Estrategias Cruzadas en la Mesa
            </h3>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              CGA crea acceso a mercado y calidad · Exportadores cierran contratos
            </span>
          </div>

          <div className="protocol-tabs" role="tablist">
            {NEGOTIATION_INTERESTS.map((item, idx) => (
              <button
                key={item.pillar}
                type="button"
                role="tab"
                aria-selected={idx === selectedPillarIdx}
                className={`protocol-tab ${idx === selectedPillarIdx ? 'active' : ''}`}
                onClick={() => setSelectedPillarIdx(idx)}
              >
                <Layers size={12} style={{ marginRight: 5, verticalAlign: '-1px' }} />
                {item.pillar}
              </button>
            ))}
          </div>

          <div className="compare-split">
            <div className="country-panel za">
              <h4 style={{ color: '#b45309' }}>Intereses de CGA (Sudáfrica)</h4>
              <ul>
                {activePillar.cga.map((line, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="country-panel fr">
              <h4 style={{ color: '#1e40af' }}>Intereses de Groupe Auchan (Francia)</h4>
              <ul>
                {activePillar.auchan.map((line, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Academic Credits Footer Banner */}
        <div className="team-banner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fb923c', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <GraduationCap size={15} />
              <span>{TEAM_INFO.university} · {TEAM_INFO.teamName}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginTop: 4 }}>
              {TEAM_INFO.course} — {TEAM_INFO.degree}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: 3 }}>
              Docente: {TEAM_INFO.professor} · {TEAM_INFO.date}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 520 }}>
            {TEAM_INFO.members.map((m) => (
              <span
                key={m.name}
                style={{
                  fontSize: '11.5px',
                  padding: '4px 10px',
                  borderRadius: 99,
                  background: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#e2e8f0',
                }}
              >
                {m.name} · <strong style={{ color: '#5eead4' }}>{m.character}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
