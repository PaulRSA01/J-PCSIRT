import { useState } from 'react';
import {
  Shield, LayoutDashboard, ClipboardList, AlertOctagon,
  BookOpen, BarChart2, ChevronLeft, ChevronRight, FolderOpen,
} from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import AssessmentList from './pages/AssessmentList';
import Incidents from './pages/Incidents';
import Playbooks from './pages/Playbooks';
import Reports from './pages/Reports';
import { SIM3_PARAMETERS } from './data/sim3';

const INIT_ASSESSMENT = Object.fromEntries(SIM3_PARAMETERS.map(p => [p.id, 0]));

function nanoid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

const NAV = [
  { key: 'assessments', label: 'Assessments',    icon: FolderOpen },
  { key: 'dashboard',   label: 'Dashboard',       icon: LayoutDashboard },
  { key: 'assessment',  label: 'SIM3 Assessment', icon: ClipboardList },
  { key: 'incidents',   label: 'Incidents',        icon: AlertOctagon },
  { key: 'playbooks',   label: 'Playbooks',        icon: BookOpen },
  { key: 'reports',     label: 'Reports',          icon: BarChart2 },
];

export default function App() {
  const [page, setPage]           = useState('assessments');
  const [collapsed, setCollapsed] = useState(false);
  const [assessments, setAssessments] = useLocalStorage('csirt-assessments', []);
  const [activeId, setActiveId]       = useLocalStorage('csirt-active-assessment', null);
  const [incidents, setIncidents]     = useLocalStorage('csirt-incidents', []);

  const activeRecord = assessments.find(a => a.id === activeId) ?? null;

  const handleCreate = ({ companyName, auditorName }) => {
    const now = new Date().toISOString();
    const rec = {
      id: nanoid(),
      companyName,
      auditorName,
      createdAt: now,
      updatedAt: now,
      status: 'in-progress',
      assessment: { ...INIT_ASSESSMENT },
    };
    setAssessments(prev => [...prev, rec]);
    setActiveId(rec.id);
    setPage('assessment');
  };

  const handleOpen = (id) => {
    setActiveId(id);
    setPage('assessment');
  };

  const handleDelete = (id) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const handleScoreChange = (paramId, level) => {
    if (!activeRecord || activeRecord.status === 'completed') return;
    setAssessments(prev => prev.map(a =>
      a.id === activeId
        ? { ...a, assessment: { ...a.assessment, [paramId]: level }, updatedAt: new Date().toISOString() }
        : a
    ));
  };

  const handleStatusChange = (newStatus) => {
    setAssessments(prev => prev.map(a =>
      a.id === activeId
        ? { ...a, status: newStatus, updatedAt: new Date().toISOString() }
        : a
    ));
  };

  const renderPage = () => {
    switch (page) {
      case 'assessments':
        return (
          <AssessmentList
            assessments={assessments}
            onCreate={handleCreate}
            onOpen={handleOpen}
            onDelete={handleDelete}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            incidents={incidents}
            assessment={activeRecord?.assessment ?? INIT_ASSESSMENT}
            companyName={activeRecord?.companyName}
          />
        );
      case 'assessment':
        if (!activeRecord) return (
          <AssessmentList
            assessments={assessments}
            onCreate={handleCreate}
            onOpen={handleOpen}
            onDelete={handleDelete}
          />
        );
        return (
          <Assessment
            record={activeRecord}
            onScoreChange={handleScoreChange}
            onStatusChange={handleStatusChange}
            onBack={() => setPage('assessments')}
          />
        );
      case 'incidents':
        return <Incidents incidents={incidents} setIncidents={setIncidents} />;
      case 'playbooks':
        return <Playbooks />;
      case 'reports':
        return (
          <Reports
            incidents={incidents}
            assessment={activeRecord?.assessment ?? INIT_ASSESSMENT}
            record={activeRecord}
          />
        );
      default:
        return (
          <Dashboard
            incidents={incidents}
            assessment={activeRecord?.assessment ?? INIT_ASSESSMENT}
            companyName={activeRecord?.companyName}
          />
        );
    }
  };

  return (
    <div className="app-layout">
      <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-icon"><Shield size={20} /></div>
            {!collapsed && (
              <div>
                <div className="brand-name">J&amp;P CSIRT</div>
                <div className="brand-sub">Incident Response</div>
              </div>
            )}
          </div>
          <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(item => {
            const Icon = item.icon;
            const active = page === item.key;
            return (
              <button
                key={item.key}
                className={`nav-item ${active ? 'nav-active' : ''}`}
                onClick={() => setPage(item.key)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="sidebar-footer">
            {activeRecord ? (
              <>
                <div className="footer-text">{activeRecord.companyName}</div>
                <div className="footer-sub">{activeRecord.auditorName || 'No auditor set'}</div>
              </>
            ) : (
              <>
                <div className="footer-text">SIM3 Framework v2</div>
                <div className="footer-sub">OpenCSIRT Foundation</div>
              </>
            )}
          </div>
        )}
      </aside>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
