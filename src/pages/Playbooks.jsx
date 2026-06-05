import { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Tag, AlertTriangle, CheckSquare, Square } from 'lucide-react';
import { PLAYBOOKS, SEVERITY_LEVELS } from '../data/playbooks';

function PhaseBlock({ phase, phaseIdx }) {
  const [checked, setChecked] = useState({});

  const toggle = i => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="phase-block">
      <div className="phase-header">
        <div className="phase-num">{phaseIdx + 1}</div>
        <div className="phase-name">{phase.name}</div>
        <div className="phase-progress">{done}/{phase.steps.length}</div>
      </div>
      <div className="phase-steps">
        {phase.steps.map((step, i) => (
          <div key={i} className={`phase-step ${checked[i] ? 'step-done' : ''}`} onClick={() => toggle(i)}>
            <div className="step-check">
              {checked[i] ? <CheckSquare size={16} color="#22c55e" /> : <Square size={16} color="#9ca3af" />}
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaybookDetail({ pb, onBack }) {
  const sev = SEVERITY_LEVELS.find(s => s.label === pb.severity);
  const [activePhase, setActivePhase] = useState(null);

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Back to Playbooks</button>
      <div className="pb-detail-header">
        <div>
          <div className="pb-detail-id">{pb.id}</div>
          <h1 className="page-title">{pb.title}</h1>
          <p className="page-sub">{pb.description}</p>
        </div>
        <span className="badge badge-lg" style={{ background: sev?.bg, color: sev?.color }}>{pb.severity}</span>
      </div>

      <div className="pb-tags">
        {pb.tags.map(t => (
          <span key={t} className="tag"># {t}</span>
        ))}
      </div>

      <div className="pb-phases">
        {pb.phases.map((phase, i) => (
          <PhaseBlock key={i} phase={phase} phaseIdx={i} />
        ))}
      </div>

      <div className="card" style={{ marginTop: 24, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <p style={{ margin: 0, color: '#166534', fontSize: 14 }}>
          <strong>Tip:</strong> Check off each step as you complete it. Steps reset when you close the playbook — save your progress notes in the Incident record.
        </p>
      </div>
    </div>
  );
}

export default function Playbooks() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('');

  if (selected) return <PlaybookDetail pb={selected} onBack={() => setSelected(null)} />;

  const filtered = PLAYBOOKS.filter(pb =>
    !filter || pb.category === filter || pb.severity === filter || pb.title.toLowerCase().includes(filter.toLowerCase())
  );

  const categories = [...new Set(PLAYBOOKS.map(p => p.category))];

  return (
    <div className="page">
      <h1 className="page-title">Incident Response Playbooks</h1>
      <p className="page-sub">Select a playbook to guide your team through a structured response with interactive checklists.</p>

      <div className="filters-bar" style={{ marginBottom: 24 }}>
        <select className="form-input filter-sel" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="pb-grid">
        {filtered.map(pb => {
          const sev = SEVERITY_LEVELS.find(s => s.label === pb.severity);
          return (
            <div key={pb.id} className="pb-card" onClick={() => setSelected(pb)}>
              <div className="pb-card-header">
                <div className="pb-card-id">{pb.id}</div>
                <span className="badge" style={{ background: sev?.bg, color: sev?.color }}>{pb.severity}</span>
              </div>
              <div className="pb-card-title">{pb.title}</div>
              <div className="pb-card-cat">
                <Tag size={12} /> {pb.category}
              </div>
              <p className="pb-card-desc">{pb.description}</p>
              <div className="pb-card-meta">
                <span><BookOpen size={12} /> {pb.phases.length} phases</span>
                <ChevronRight size={14} />
              </div>
              <div className="pb-tags" style={{ marginTop: 12 }}>
                {pb.tags.slice(0, 3).map(t => <span key={t} className="tag"># {t}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
