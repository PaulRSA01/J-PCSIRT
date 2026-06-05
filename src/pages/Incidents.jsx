import { useState } from 'react';
import { Plus, Search, Filter, X, ChevronDown, ChevronUp, Clock, User, Tag } from 'lucide-react';
import { SEVERITY_LEVELS, INCIDENT_STATUSES, INCIDENT_CATEGORIES } from '../data/playbooks';

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString();
}

function genId(incidents) {
  const num = incidents.length + 1;
  return `INC-${String(num).padStart(4, '0')}`;
}

const EMPTY_FORM = {
  title: '', description: '', severity: 'Medium', category: 'Other',
  status: 'New', affectedSystems: '', reporter: '', assignee: '', notes: '',
};

function IncidentModal({ incident, onSave, onClose }) {
  const [form, setForm] = useState(incident || EMPTY_FORM);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>{incident?.id ? `Edit ${incident.id}` : 'New Incident'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <label>Title *</label>
            <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Short incident title" />
          </div>
          <div className="form-grid-2">
            <div className="form-row">
              <label>Severity</label>
              <select className="form-input" value={form.severity} onChange={e => set('severity', e.target.value)}>
                {SEVERITY_LEVELS.map(s => <option key={s.label}>{s.label}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label>Category</label>
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)}>
                {INCIDENT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-row">
              <label>Status</label>
              <select className="form-input" value={form.status} onChange={e => set('status', e.target.value)}>
                {INCIDENT_STATUSES.map(s => <option key={s.label}>{s.label}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label>Assignee</label>
              <input className="form-input" value={form.assignee} onChange={e => set('assignee', e.target.value)} placeholder="Handler name" />
            </div>
          </div>
          <div className="form-row">
            <label>Reporter</label>
            <input className="form-input" value={form.reporter} onChange={e => set('reporter', e.target.value)} placeholder="Who reported this?" />
          </div>
          <div className="form-row">
            <label>Affected Systems</label>
            <input className="form-input" value={form.affectedSystems} onChange={e => set('affectedSystems', e.target.value)} placeholder="e.g. web-server-01, finance-db" />
          </div>
          <div className="form-row">
            <label>Description</label>
            <textarea className="form-input" rows={4} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe what happened..." />
          </div>
          <div className="form-row">
            <label>Notes / Actions taken</label>
            <textarea className="form-input" rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Actions taken, timeline, links..." />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Incident</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function IncidentCard({ inc, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_LEVELS.find(s => s.label === inc.severity);
  const sta = INCIDENT_STATUSES.find(s => s.label === inc.status);

  return (
    <div className="inc-card">
      <div className="inc-card-header" onClick={() => setExpanded(e => !e)}>
        <div className="inc-card-left">
          <span className="inc-card-id">{inc.id}</span>
          <div>
            <div className="inc-card-title">{inc.title}</div>
            <div className="inc-card-meta">
              <Clock size={12} /> {formatDate(inc.createdAt)}
              {inc.assignee && <><User size={12} /> {inc.assignee}</>}
              <Tag size={12} /> {inc.category}
            </div>
          </div>
        </div>
        <div className="inc-card-right">
          <span className="badge" style={{ background: sev?.bg, color: sev?.color }}>{inc.severity}</span>
          <span className="badge" style={{ background: sta?.color + '22', color: sta?.color }}>{inc.status}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {expanded && (
        <div className="inc-card-body">
          {inc.description && <p className="inc-desc">{inc.description}</p>}
          {inc.affectedSystems && (
            <div className="inc-detail-row">
              <span className="inc-detail-label">Affected Systems:</span>
              <span>{inc.affectedSystems}</span>
            </div>
          )}
          {inc.reporter && (
            <div className="inc-detail-row">
              <span className="inc-detail-label">Reporter:</span>
              <span>{inc.reporter}</span>
            </div>
          )}
          {inc.notes && (
            <div className="inc-notes">
              <div className="inc-detail-label">Notes / Actions:</div>
              <pre className="inc-notes-pre">{inc.notes}</pre>
            </div>
          )}
          <div className="inc-actions">
            <button className="btn-ghost" onClick={() => onEdit(inc)}>Edit</button>
            <button className="btn-danger" onClick={() => { if (window.confirm(`Delete ${inc.id}?`)) onDelete(inc.id); }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Incidents({ incidents, setIncidents }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [search, setSearch]     = useState('');
  const [filterSev, setFilterSev] = useState('');
  const [filterSta, setFilterSta] = useState('');

  const openNew = () => { setEditing(null); setShowModal(true); };
  const openEdit = inc => { setEditing(inc); setShowModal(true); };

  const handleSave = form => {
    if (editing?.id) {
      setIncidents(prev => prev.map(i => i.id === editing.id ? { ...i, ...form, updatedAt: new Date().toISOString() } : i));
    } else {
      const newInc = { ...form, id: genId(incidents), createdAt: new Date().toISOString() };
      setIncidents(prev => [newInc, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = id => setIncidents(prev => prev.filter(i => i.id !== id));

  const filtered = incidents.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = !q || i.title.toLowerCase().includes(q) || i.id.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
    const matchSev = !filterSev || i.severity === filterSev;
    const matchSta = !filterSta || i.status === filterSta;
    return matchSearch && matchSev && matchSta;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Incident Management</h1>
          <p className="page-sub">Track, manage, and resolve security incidents.</p>
        </div>
        <button className="btn-primary" onClick={openNew}><Plus size={16} /> New Incident</button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={16} />
          <input placeholder="Search incidents…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-input filter-sel" value={filterSev} onChange={e => setFilterSev(e.target.value)}>
          <option value="">All Severities</option>
          {SEVERITY_LEVELS.map(s => <option key={s.label}>{s.label}</option>)}
        </select>
        <select className="form-input filter-sel" value={filterSta} onChange={e => setFilterSta(e.target.value)}>
          <option value="">All Statuses</option>
          {INCIDENT_STATUSES.map(s => <option key={s.label}>{s.label}</option>)}
        </select>
        {(filterSev || filterSta || search) && (
          <button className="btn-ghost" onClick={() => { setSearch(''); setFilterSev(''); setFilterSta(''); }}>
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Summary pills */}
      <div className="status-pills">
        {INCIDENT_STATUSES.map(s => {
          const count = incidents.filter(i => i.status === s.label).length;
          return (
            <div key={s.label} className="status-pill" style={{ borderColor: s.color }}>
              <span className="pill-dot" style={{ background: s.color }} />
              {s.label}: <strong>{count}</strong>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-card">
          <p>No incidents found. <button className="link-btn" onClick={openNew}>Create the first one.</button></p>
        </div>
      ) : (
        <div className="inc-list">
          {filtered.map(inc => (
            <IncidentCard key={inc.id} inc={inc} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showModal && (
        <IncidentModal
          incident={editing}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
