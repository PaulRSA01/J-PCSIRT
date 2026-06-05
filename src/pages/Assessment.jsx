import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { SIM3_PARAMETERS, GROUPS, MATURITY_LEVELS, computeScores, maturityLabel } from '../data/sim3';

function LevelBadge({ level }) {
  const ml = MATURITY_LEVELS[level];
  return (
    <span className="level-badge" style={{ background: ml.color + '22', color: ml.color, border: `1px solid ${ml.color}44` }}>
      L{level} — {ml.label}
    </span>
  );
}

function ParameterCard({ param, score, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`param-card ${open ? 'param-open' : ''}`}>
      <div className="param-header" onClick={() => setOpen(o => !o)}>
        <div className="param-left">
          <span className="param-code">{param.code}</span>
          <span className="param-name">{param.name}</span>
        </div>
        <div className="param-right">
          <LevelBadge level={score} />
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {open && (
        <div className="param-body">
          <p className="param-desc">{param.description}</p>
          <div className="param-guidance">
            <Info size={14} style={{ flexShrink: 0 }} />
            <span>{param.guidance}</span>
          </div>

          <div className="level-selector">
            {MATURITY_LEVELS.map(ml => (
              <button
                key={ml.level}
                className={`level-btn ${score === ml.level ? 'level-active' : ''}`}
                style={score === ml.level ? { background: ml.color, color: '#fff', borderColor: ml.color } : { borderColor: ml.color + '66', color: ml.color }}
                onClick={() => onChange(param.id, ml.level)}
              >
                <span className="level-num">L{ml.level}</span>
                <span className="level-name">{ml.label}</span>
              </button>
            ))}
          </div>

          <div className="indicators">
            <div className="indicators-title">Assessment indicators:</div>
            <ul>
              {param.indicators.map((ind, i) => (
                <li key={i}>{ind}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Assessment({ assessment, setAssessment }) {
  const [activeGroup, setActiveGroup] = useState('Organisation');

  const scores = useMemo(() => computeScores(assessment), [assessment]);

  const filtered = SIM3_PARAMETERS.filter(p => p.group === activeGroup);
  const groupInfo = GROUPS.find(g => g.key === activeGroup);

  const handleChange = (id, level) => {
    setAssessment(prev => ({ ...prev, [id]: level }));
  };

  const resetGroup = () => {
    const updates = {};
    filtered.forEach(p => { updates[p.id] = 0; });
    setAssessment(prev => ({ ...prev, ...updates }));
  };

  const ovScore = scores[activeGroup];
  const { label: matLabel, color: matColor } = maturityLabel(ovScore.pct);

  return (
    <div className="page">
      <h1 className="page-title">SIM3 Assessment</h1>
      <p className="page-sub">Rate each of the 44 parameters from L0 (not defined) to L4 (measured / audited).</p>

      {/* Maturity level legend */}
      <div className="card legend-card">
        <div className="legend-row">
          {MATURITY_LEVELS.map(ml => (
            <div key={ml.level} className="legend-item">
              <span className="legend-dot" style={{ background: ml.color }} />
              <div>
                <div className="legend-level">L{ml.level} — {ml.label}</div>
                <div className="legend-desc">{ml.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group tabs */}
      <div className="group-tabs">
        {GROUPS.map(g => {
          const s = scores[g.key];
          const { color: gc } = maturityLabel(s.pct);
          return (
            <button
              key={g.key}
              className={`group-tab ${activeGroup === g.key ? 'group-tab-active' : ''}`}
              style={activeGroup === g.key ? { borderBottom: `3px solid ${g.color}`, color: g.color } : {}}
              onClick={() => setActiveGroup(g.key)}
            >
              <span className="tab-badge" style={{ background: g.color + '22', color: g.color }}>{g.short}</span>
              {g.label}
              <span className="tab-score" style={{ color: gc }}>{s.pct}%</span>
            </button>
          );
        })}
      </div>

      {/* Group header */}
      <div className="group-header" style={{ borderLeft: `4px solid ${groupInfo.color}` }}>
        <div>
          <div className="group-header-title">{groupInfo.label} Domain</div>
          <div className="group-header-sub">
            {filtered.length} parameters · Score: <strong style={{ color: matColor }}>{ovScore.pct}% ({matLabel})</strong>
          </div>
        </div>
        <button className="btn-ghost" onClick={resetGroup}>Reset group to L0</button>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-bg" style={{ marginBottom: 20 }}>
        <div className="progress-bar-fill" style={{ width: `${ovScore.pct}%`, background: groupInfo.color }} />
      </div>

      {/* Parameters */}
      <div className="param-list">
        {filtered.map(p => (
          <ParameterCard
            key={p.id}
            param={p}
            score={assessment[p.id] ?? 0}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}
