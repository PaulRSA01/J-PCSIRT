import { useMemo } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend,
} from 'recharts';
import { SIM3_PARAMETERS, GROUPS, MATURITY_LEVELS, computeScores, maturityLabel } from '../data/sim3';
import { SEVERITY_LEVELS, INCIDENT_CATEGORIES } from '../data/playbooks';

function ScoreGauge({ pct, label, color }) {
  return (
    <div className="gauge-card">
      <svg width={120} height={120} viewBox="0 0 120 120">
        <circle cx={60} cy={60} r={50} fill="none" stroke="#e5e7eb" strokeWidth={12} />
        <circle
          cx={60} cy={60} r={50} fill="none" stroke={color} strokeWidth={12}
          strokeDasharray={`${(pct / 100) * 314.16} 314.16`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x={60} y={65} textAnchor="middle" fontSize={22} fontWeight={700} fill={color}>{pct}%</text>
      </svg>
      <div className="gauge-label">{label}</div>
    </div>
  );
}

export default function Reports({ incidents, assessment, record }) {
  const scores = useMemo(() => computeScores(assessment), [assessment]);

  const radarData = GROUPS.map(g => ({ group: g.label, score: scores[g.key]?.pct ?? 0 }));

  const paramBarData = SIM3_PARAMETERS.map(p => ({
    code: p.code,
    score: assessment[p.id] ?? 0,
    group: p.group,
    color: GROUPS.find(g => g.key === p.group)?.color ?? '#6366f1',
  }));

  const gapData = paramBarData
    .filter(p => p.score < 3)
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  const sevPie = SEVERITY_LEVELS.map(s => ({
    name: s.label, value: incidents.filter(i => i.severity === s.label).length, color: s.color,
  })).filter(s => s.value > 0);

  const catBar = INCIDENT_CATEGORIES.map(c => ({
    name: c, count: incidents.filter(i => i.category === c).length,
  })).filter(c => c.count > 0).sort((a, b) => b.count - a.count);

  const { label: matLabel, color: matColor } = maturityLabel(scores.overall.pct);

  const ratedCount = Object.keys(assessment).length;
  const avgLevel = ratedCount > 0
    ? (Object.values(assessment).reduce((a, b) => a + b, 0) / ratedCount).toFixed(1)
    : 0;

  const exportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      company: record?.companyName ?? 'Unknown',
      auditor: record?.auditorName ?? '',
      status: record?.status ?? 'unknown',
      sim3Scores: scores,
      assessment,
      incidents,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = record
      ? `csirt-report-${record.companyName.replace(/\s+/g, '-').toLowerCase()}.json`
      : 'csirt-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-sub">
            {record
              ? `${record.companyName}${record.auditorName ? ` · Auditor: ${record.auditorName}` : ''}`
              : 'SIM3 maturity analysis and incident trend reporting.'}
          </p>
        </div>
        <button className="btn-primary" onClick={exportJSON}>Export JSON</button>
      </div>

      {/* Overall gauges */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h2 className="card-title">Overall CSIRT Maturity</h2>
        <div className="gauges-row">
          <ScoreGauge pct={scores.overall.pct} label="Overall" color={matColor} />
          {GROUPS.map(g => {
            const s = scores[g.key];
            const { color } = maturityLabel(s.pct);
            return <ScoreGauge key={g.key} pct={s.pct} label={g.label} color={color} />;
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <span className="badge badge-lg" style={{ background: matColor + '22', color: matColor }}>
            Maturity Level: {matLabel}
          </span>
          <span style={{ marginLeft: 16, color: '#6b7280', fontSize: 14 }}>
            {ratedCount}/{SIM3_PARAMETERS.length} parameters rated · Average L{avgLevel}
          </span>
        </div>
      </div>

      {/* Radar */}
      <div className="charts-row">
        <div className="card chart-card">
          <h2 className="card-title">SIM3 Radar</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="group" tick={{ fontSize: 12, fill: '#374151' }} />
              <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {sevPie.length > 0 && (
          <div className="card chart-card">
            <h2 className="card-title">Incidents by Severity</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={sevPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                  {sevPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Top gaps */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h2 className="card-title">Top 10 Maturity Gaps (parameters below L3)</h2>
        {gapData.length === 0 ? (
          <p className="empty-state">All parameters are at L3 or above — excellent maturity!</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={gapData} layout="vertical" margin={{ left: 16, right: 24 }}>
              <XAxis type="number" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="code" tick={{ fontSize: 12 }} width={40} />
              <Tooltip formatter={v => `L${v}`} />
              <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                {gapData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Incidents by category */}
      {catBar.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h2 className="card-title">Incidents by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={catBar} layout="vertical" margin={{ left: 24, right: 24 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={110} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Parameter detail table */}
      <div className="card">
        <h2 className="card-title">Parameter Detail</h2>
        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Code</th><th>Parameter</th><th>Domain</th><th>Level</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SIM3_PARAMETERS.map(p => {
                const score = assessment[p.id] ?? 0;
                const ml = MATURITY_LEVELS[score];
                const g = GROUPS.find(g => g.key === p.group);
                return (
                  <tr key={p.id}>
                    <td><strong>{p.code}</strong></td>
                    <td>{p.name}</td>
                    <td><span className="badge" style={{ background: g?.color + '22', color: g?.color }}>{p.group}</span></td>
                    <td>L{score}</td>
                    <td><span className="badge" style={{ background: ml.color + '22', color: ml.color }}>{ml.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
