import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Info, ArrowLeft, Lock, RotateCcw } from 'lucide-react';
import { SIM3_PARAMETERS, GROUPS, MATURITY_LEVELS, computeScores, maturityLabel } from '../data/sim3';

const STATUS_CONFIG = {
  'in-progress':  { label: 'In Progress',  color: '#f97316', bg: '#fff7ed' },
  'implementing': { label: 'Implementing', color: '#8b5cf6', bg: '#f5f3ff' },
  'completed':    { label: 'Completed',    color: '#22c55e', bg: '#f0fdf4' },
};

function LevelBadge({ level }) {
  const ml = MATURITY_LEVELS[level];
  return (
    <span className="level-badge" style={{ background: ml.color + '22', color: ml.color, border: `1px solid ${ml.color}44` }}>
      L{level} — {ml.label}
    </span>
  );
}

function ParameterCard({ param, score, onChange, readonly }) {
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
                style={{
                  ...(score === ml.level
                    ? { background: ml.color, color: '#fff', borderColor: ml.color }
                    : { borderColor: ml.color + '66', color: ml.color }),
                  ...(readonly ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
                }}
                onClick={() => !readonly && onChange(param.id, ml.level)}
                title={readonly ? 'Assessment is completed — reopen to edit' : undefined}
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

export default function Assessment({ record, onScoreChange, onStatusChange, onBack }) {
  const [activeGroup, setActiveGroup] = useState('Organisation');

  const { companyName, auditorName, status, assessment, createdAt, updatedAt } = record;
  const readonly = status === 'completed';
  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['in-progress'];

  const scores = useMemo(() => computeScores(assessment), [assessment]);

  const filtered = SIM3_PARAMETERS.filter(p => p.group === activeGroup);
  const groupInfo = GROUPS.find(g => g.key === activeGroup);

  const resetGroup = () => {
    filtered.forEach(p => onScoreChange(p.id, 0));
  };

  const ovScore = scores[activeGroup];
  const { label: matLabel, color: matColor } = maturityLabel(ovScore.pct);

  const createdDate = new Date(createdAt).toLocaleDateString();
  const updatedDate = updatedAt && updatedAt !== createdAt ? new Date(updatedAt).toLocaleDateString() : null;

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> All Assessments
      </button>

      <div className="asm-header-bar">
        <div className="asm-header-info">
          <div className="asm-header-company">{companyName}</div>
          {auditorName && <div className="asm-header-meta">Auditor: {auditorName}</div>}
          <div className="asm-header-meta">
            Created {createdDate}{updatedDate ? ` · Updated ${updatedDate}` : ''}
          </div>
        </div>
        <div className="asm-header-right">
          <span className="badge badge-lg" style={{ background: statusCfg.bg, color: statusCfg.color }}>
            {statusCfg.label}
          </span>
          <div className="asm-status-actions">
            {status === 'in-progress' && (
              <>
                <button className="btn-ghost btn-sm" onClick={() => onStatusChange('implementing')}>
                  Mark as Implementing
                </button>
                <button
                  className="btn-ghost btn-sm"
                  style={{ color: '#22c55e', borderColor: '#86efac' }}
                  onClick={() => onStatusChange('completed')}
                >
                  <Lock size={13} /> Complete &amp; Lock
                </button>
              </>
            )}
            {status === 'implementing' && (
              <>
                <button className="btn-ghost btn-sm" onClick={() => onStatusChange('in-progress')}>
                  <RotateCcw size={13} /> Back to In Progress
                </button>
                <button
                  className="btn-ghost btn-sm"
                  style={{ color: '#22c55e', borderColor: '#86efac' }}
                  onClick={() => onStatusChange('completed')}
                >
                  <Lock size={13} /> Complete &amp; Lock
                </button>
              </>
            )}
            {status === 'completed' && (
              <button className="btn-ghost btn-sm" onClick={() => onStatusChange('implementing')}>
                <RotateCcw size={13} /> Reopen for Editing
              </button>
            )}
          </div>
        </div>
      </div>

      {readonly && (
        <div className="readonly-banner">
          <Lock size={14} />
          This assessment is completed and locked. Click "Reopen for Editing" above to make changes.
        </div>
      )}

      <h1 className="page-title">SIM3 Assessment</h1>
      <p className="page-sub">Rate each of the 44 parameters from L0 (not defined) to L4 (measured / audited).</p>

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

      <div className="group-header" style={{ borderLeft: `4px solid ${groupInfo.color}` }}>
        <div>
          <div className="group-header-title">{groupInfo.label} Domain</div>
          <div className="group-header-sub">
            {filtered.length} parameters · Score: <strong style={{ color: matColor }}>{ovScore.pct}% ({matLabel})</strong>
          </div>
        </div>
        {!readonly && (
          <button className="btn-ghost" onClick={resetGroup}>Reset group to L0</button>
        )}
      </div>

      <div className="progress-bar-bg" style={{ marginBottom: 20 }}>
        <div className="progress-bar-fill" style={{ width: `${ovScore.pct}%`, background: groupInfo.color }} />
      </div>

      <div className="param-list">
        {filtered.map(p => (
          <ParameterCard
            key={p.id}
            param={p}
            score={assessment[p.id] ?? 0}
            onChange={onScoreChange}
            readonly={readonly}
          />
        ))}
      </div>
    </div>
  );
}
