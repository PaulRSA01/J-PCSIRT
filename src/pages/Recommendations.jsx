import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, ArrowRight, Filter } from 'lucide-react';
import { SIM3_PARAMETERS, GROUPS, MATURITY_LEVELS } from '../data/sim3';
import { NEXT_STEPS, PRIORITY_CONFIG } from '../data/recommendations';

function RecommendationCard({ param, score, group }) {
  const [open, setOpen] = useState(false);

  const priority = PRIORITY_CONFIG[score];
  const nextLevel = MATURITY_LEVELS[Math.min(score + 1, 4)];
  const currentLevel = MATURITY_LEVELS[score];
  const action = NEXT_STEPS[param.id]?.[score];
  const complete = score === 4;

  return (
    <div className={`rec-card ${complete ? 'rec-card-complete' : ''}`}>
      <div className="rec-card-header" onClick={() => setOpen(o => !o)}>
        <div className="rec-card-left">
          <span className="domain-badge" style={{ background: group.color + '22', color: group.color, width: 28, height: 28, fontSize: 12 }}>
            {group.short}
          </span>
          <div>
            <div className="rec-param-title">
              <span className="param-code">{param.code}</span>
              <span className="rec-param-name">{param.name}</span>
            </div>
            {!complete && (
              <div className="rec-level-row">
                <span className="level-badge" style={{ background: currentLevel.color + '22', color: currentLevel.color, border: `1px solid ${currentLevel.color}44`, fontSize: 11 }}>
                  L{score} {currentLevel.label}
                </span>
                <ArrowRight size={13} style={{ color: '#9ca3af' }} />
                <span className="level-badge" style={{ background: nextLevel.color + '22', color: nextLevel.color, border: `1px solid ${nextLevel.color}44`, fontSize: 11 }}>
                  L{score + 1} {nextLevel.label}
                </span>
              </div>
            )}
            {complete && (
              <div className="rec-level-row">
                <CheckCircle2 size={14} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>Fully mature — L4 Measured / Audited</span>
              </div>
            )}
          </div>
        </div>
        <div className="rec-card-right">
          <span className="badge" style={{ background: priority.bg, color: priority.color }}>{priority.label}</span>
          {open ? <ChevronUp size={15} style={{ color: '#9ca3af' }} /> : <ChevronDown size={15} style={{ color: '#9ca3af' }} />}
        </div>
      </div>

      {open && (
        <div className="rec-card-body">
          {!complete && action && (
            <div className="rec-action-box">
              <div className="rec-action-label">Recommended Action</div>
              <p className="rec-action-text">{action}</p>
            </div>
          )}
          {complete && (
            <div className="rec-action-box" style={{ background: '#f0fdf4', borderColor: '#86efac' }}>
              <div className="rec-action-label" style={{ color: '#15803d' }}>Achievement Confirmed</div>
              <p className="rec-action-text" style={{ color: '#166534' }}>
                This parameter has reached the highest maturity level. Maintain current practices and include in regular audit cycles.
              </p>
            </div>
          )}
          <div className="rec-indicators">
            <div className="rec-indicators-title">
              {complete ? 'Audit indicators to maintain:' : 'Verify completion with:'}
            </div>
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

const FILTER_OPTIONS = [
  { key: 'all',      label: 'All',           scores: [0, 1, 2, 3, 4] },
  { key: 'critical', label: 'Critical',       scores: [0] },
  { key: 'high',     label: 'High',           scores: [1] },
  { key: 'medium',   label: 'Medium',         scores: [2] },
  { key: 'low',      label: 'Low',            scores: [3] },
  { key: 'complete', label: 'Complete',       scores: [4] },
];

export default function Recommendations({ record }) {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');

  const { companyName, auditorName, assessment } = record;

  const stats = useMemo(() => {
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
    SIM3_PARAMETERS.forEach(p => {
      const score = assessment[p.id] ?? 0;
      counts[score]++;
    });
    return counts;
  }, [assessment]);

  const filtered = useMemo(() => {
    const allowedScores = FILTER_OPTIONS.find(f => f.key === priorityFilter)?.scores ?? [0,1,2,3,4];
    return SIM3_PARAMETERS
      .filter(p => {
        const score = assessment[p.id] ?? 0;
        const domainOk = domainFilter === 'all' || p.group === domainFilter;
        return allowedScores.includes(score) && domainOk;
      })
      .sort((a, b) => (assessment[a.id] ?? 0) - (assessment[b.id] ?? 0));
  }, [assessment, priorityFilter, domainFilter]);

  const needsAction = stats[0] + stats[1] + stats[2] + stats[3];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Recommendations</h1>
          <p className="page-sub">
            {companyName}
            {auditorName ? ` · Auditor: ${auditorName}` : ''}
            {' · '}{needsAction} parameter{needsAction !== 1 ? 's' : ''} need action
          </p>
        </div>
      </div>

      {/* Summary stat pills */}
      <div className="rec-summary-row">
        {[0, 1, 2, 3, 4].map(level => {
          const cfg = PRIORITY_CONFIG[level];
          return (
            <div key={level} className="rec-stat-pill" style={{ background: cfg.bg, borderColor: cfg.color + '44' }}>
              <span style={{ color: cfg.color, fontWeight: 700, fontSize: 22 }}>{stats[level]}</span>
              <span style={{ color: cfg.color, fontSize: 12, fontWeight: 600 }}>{cfg.label}</span>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="rec-filters">
        <div className="rec-filter-group">
          <Filter size={14} style={{ color: '#6b7280', flexShrink: 0 }} />
          {FILTER_OPTIONS.map(f => (
            <button
              key={f.key}
              className={`rec-filter-btn ${priorityFilter === f.key ? 'rec-filter-active' : ''}`}
              onClick={() => setPriorityFilter(f.key)}
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="rec-filter-count">
                  {f.scores.reduce((sum, s) => sum + stats[s], 0)}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="rec-filter-group">
          {[{ key: 'all', label: 'All Domains' }, ...GROUPS.map(g => ({ key: g.key, label: g.label }))].map(d => (
            <button
              key={d.key}
              className={`rec-filter-btn ${domainFilter === d.key ? 'rec-filter-active' : ''}`}
              onClick={() => setDomainFilter(d.key)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-card" style={{ marginTop: 16 }}>
          No parameters match the selected filters.
        </div>
      ) : (
        <div className="rec-list">
          {filtered.map(p => {
            const group = GROUPS.find(g => g.key === p.group);
            return (
              <RecommendationCard
                key={p.id}
                param={p}
                score={assessment[p.id] ?? 0}
                group={group}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
