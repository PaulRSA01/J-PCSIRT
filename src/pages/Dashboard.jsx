import { useMemo } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ShieldAlert, TrendingUp, FileText } from 'lucide-react';
import { GROUPS, SIM3_PARAMETERS, computeScores, maturityLabel } from '../data/sim3';
import { SEVERITY_LEVELS, INCIDENT_STATUSES } from '../data/playbooks';

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color + '22', color }}>
        <Icon size={22} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

export default function Dashboard({ incidents, assessment }) {
  const scores = useMemo(() => computeScores(assessment), [assessment]);

  const radarData = GROUPS.map(g => ({
    group: g.short,
    score: scores[g.key]?.pct ?? 0,
    fullMark: 100,
  }));

  const barData = GROUPS.map(g => ({
    name: g.label,
    score: scores[g.key]?.pct ?? 0,
    color: g.color,
  }));

  const openIncidents = incidents.filter(i => !['Resolved', 'Closed'].includes(i.status));
  const critical = openIncidents.filter(i => i.severity === 'Critical');
  const resolved = incidents.filter(i => ['Resolved', 'Closed'].includes(i.status));

  const { label: matLabel, color: matColor } = maturityLabel(scores.overall.pct);

  const severityCounts = SEVERITY_LEVELS.map(s => ({
    ...s,
    count: incidents.filter(i => i.severity === s.label).length,
  })).filter(s => s.count > 0);

  const recentIncidents = [...incidents]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const statusCounts = INCIDENT_STATUSES.map(s => ({
    ...s,
    count: incidents.filter(i => i.status === s.label).length,
  })).filter(s => s.count > 0);

  return (
    <div className="page">
      <h1 className="page-title">CSIRT Dashboard</h1>
      <p className="page-sub">Security Incident Management Maturity Model (SIM3) — Operational Overview</p>

      {/* KPI row */}
      <div className="stats-grid">
        <StatCard icon={ShieldAlert}   label="Open Incidents"     value={openIncidents.length} sub={`${critical.length} critical`} color="#ef4444" />
        <StatCard icon={CheckCircle}   label="Resolved"           value={resolved.length}       sub="total closed"                  color="#22c55e" />
        <StatCard icon={TrendingUp}    label="Overall SIM3"       value={`${scores.overall.pct}%`} sub={matLabel}                   color={matColor} />
        <StatCard icon={FileText}      label="Parameters Rated"   value={`${Object.keys(assessment).length}/${SIM3_PARAMETERS.length}`} sub="SIM3 parameters" color="#6366f1" />
      </div>

      {/* Charts row */}
      <div className="charts-row">
        <div className="card chart-card">
          <h2 className="card-title">SIM3 Maturity by Domain</h2>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="group" tick={{ fill: '#374151', fontSize: 13, fontWeight: 600 }} />
              <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h2 className="card-title">Domain Scores (%)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} layout="vertical" margin={{ left: 16, right: 24 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
              <Tooltip formatter={v => `${v}%`} />
              <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="charts-row">
        {/* Domain details */}
        <div className="card" style={{ flex: 1 }}>
          <h2 className="card-title">Domain Summary</h2>
          <div className="domain-list">
            {GROUPS.map(g => {
              const s = scores[g.key];
              const { label, color } = maturityLabel(s.pct);
              return (
                <div key={g.key} className="domain-row">
                  <div className="domain-badge" style={{ background: g.color + '22', color: g.color }}>{g.short}</div>
                  <div className="domain-info">
                    <span className="domain-name">{g.label}</span>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${s.pct}%`, background: g.color }} />
                    </div>
                  </div>
                  <div className="domain-score" style={{ color }}>
                    {s.pct}% <span className="domain-level">({label})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent incidents */}
        <div className="card" style={{ flex: 1 }}>
          <h2 className="card-title">Recent Incidents</h2>
          {recentIncidents.length === 0 ? (
            <p className="empty-state">No incidents recorded yet.</p>
          ) : (
            <div className="incident-list">
              {recentIncidents.map(inc => {
                const sev = SEVERITY_LEVELS.find(s => s.label === inc.severity);
                const sta = INCIDENT_STATUSES.find(s => s.label === inc.status);
                return (
                  <div key={inc.id} className="incident-row">
                    <div className="inc-id">{inc.id}</div>
                    <div className="inc-title">{inc.title}</div>
                    <span className="badge" style={{ background: sev?.bg, color: sev?.color }}>{inc.severity}</span>
                    <span className="badge" style={{ background: sta?.color + '22', color: sta?.color }}>{inc.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
