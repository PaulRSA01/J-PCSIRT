import { useState } from 'react';
import { Shield, LayoutDashboard, ClipboardList, AlertOctagon, BookOpen, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Incidents from './pages/Incidents';
import Playbooks from './pages/Playbooks';
import Reports from './pages/Reports';
import { SIM3_PARAMETERS } from './data/sim3';

const INIT_ASSESSMENT = Object.fromEntries(SIM3_PARAMETERS.map(p => [p.id, 0]));

const NAV = [
  { key: 'dashboard',  label: 'Dashboard',       icon: LayoutDashboard },
  { key: 'assessment', label: 'SIM3 Assessment',  icon: ClipboardList },
  { key: 'incidents',  label: 'Incidents',        icon: AlertOctagon },
  { key: 'playbooks',  label: 'Playbooks',        icon: BookOpen },
  { key: 'reports',    label: 'Reports',          icon: BarChart2 },
];

export default function App() {
  const [page, setPage]           = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [assessment, setAssessment] = useLocalStorage('csirt-assessment', INIT_ASSESSMENT);
  const [incidents,  setIncidents]  = useLocalStorage('csirt-incidents',  []);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':  return <Dashboard  incidents={incidents} assessment={assessment} />;
      case 'assessment': return <Assessment assessment={assessment} setAssessment={setAssessment} />;
      case 'incidents':  return <Incidents  incidents={incidents} setIncidents={setIncidents} />;
      case 'playbooks':  return <Playbooks />;
      case 'reports':    return <Reports    incidents={incidents} assessment={assessment} />;
      default:           return <Dashboard  incidents={incidents} assessment={assessment} />;
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
            <div className="footer-text">SIM3 Framework v2</div>
            <div className="footer-sub">OpenCSIRT Foundation</div>
          </div>
        )}
      </aside>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
