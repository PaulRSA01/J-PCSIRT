import { useState } from 'react';
import { Plus, Trash2, ChevronRight, Calendar, User, X, FolderOpen } from 'lucide-react';
import { computeScores, maturityLabel, SIM3_PARAMETERS } from '../data/sim3';

const STATUS_CONFIG = {
  'in-progress':  { label: 'In Progress',  color: '#f97316', bg: '#fff7ed' },
  'implementing': { label: 'Implementing', color: '#8b5cf6', bg: '#f5f3ff' },
  'completed':    { label: 'Completed',    color: '#22c55e', bg: '#f0fdf4' },
};

function CreateModal({ onCreate, onClose }) {
  const [companyName, setCompanyName] = useState('');
  const [auditorName, setAuditorName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    onCreate({ companyName: companyName.trim(), auditorName: auditorName.trim() });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Assessment</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <label>Company Name *</label>
              <input
                className="form-input"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corporation"
                autoFocus
              />
            </div>
            <div className="form-row">
              <label>Auditor Name</label>
              <input
                className="form-input"
                value={auditorName}
                onChange={e => setAuditorName(e.target.value)}
                placeholder="e.g. John Smith"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={!companyName.trim()}>
                Create Assessment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AssessmentList({ assessments, onCreate, onOpen, onDelete }) {
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = (data) => {
    onCreate(data);
    setShowCreate(false);
  };

  const handleDelete = (id, companyName) => {
    if (window.confirm(`Delete assessment for "${companyName}"? This cannot be undone.`)) {
      onDelete(id);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Assessments</h1>
          <p className="page-sub">SIM3 maturity assessments organised by company. Open one to view or edit it.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New Assessment
        </button>
      </div>

      {assessments.length === 0 ? (
        <div className="empty-card" style={{ marginTop: 32, padding: '60px 40px', textAlign: 'center' }}>
          <FolderOpen size={48} style={{ color: '#d1d5db', display: 'block', margin: '0 auto 16px' }} />
          <p style={{ marginBottom: 20 }}>No assessments yet. Create one to get started.</p>
          <button className="btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={16} /> New Assessment
          </button>
        </div>
      ) : (
        <div className="asmlist-grid">
          {assessments.map(rec => {
            const scores = computeScores(rec.assessment);
            const { label: matLabel, color: matColor } = maturityLabel(scores.overall.pct);
            const cfg = STATUS_CONFIG[rec.status] ?? STATUS_CONFIG['in-progress'];
            const rated = Object.values(rec.assessment).filter(v => v > 0).length;
            return (
              <div key={rec.id} className="asmlist-card">
                <div className="asmlist-card-top">
                  <div className="asmlist-company">{rec.companyName}</div>
                  <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                </div>
                {rec.auditorName && (
                  <div className="asmlist-meta"><User size={12} />&nbsp;{rec.auditorName}</div>
                )}
                <div className="asmlist-meta"><Calendar size={12} />&nbsp;Created {new Date(rec.createdAt).toLocaleDateString()}</div>

                <div style={{ marginTop: 14 }}>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${scores.overall.pct}%`, background: matColor }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 12 }}>
                    <span style={{ color: '#9ca3af' }}>{rated}/{SIM3_PARAMETERS.length} rated</span>
                    <span style={{ color: matColor, fontWeight: 600 }}>{scores.overall.pct}% — {matLabel}</span>
                  </div>
                </div>

                <div className="asmlist-card-actions">
                  <button className="btn-danger" onClick={() => handleDelete(rec.id, rec.companyName)}>
                    <Trash2 size={14} />
                  </button>
                  <button className="btn-primary" onClick={() => onOpen(rec.id)}>
                    Open <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCreate && <CreateModal onCreate={handleCreate} onClose={() => setShowCreate(false)} />}
    </div>
  );
}
