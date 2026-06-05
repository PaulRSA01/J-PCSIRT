export const MATURITY_LEVELS = [
  { level: 0, label: 'Not Defined', color: '#ef4444', description: 'No documentation or awareness exists' },
  { level: 1, label: 'Defined (Policy)', color: '#f97316', description: 'Documented at policy level' },
  { level: 2, label: 'Defined (Process)', color: '#eab308', description: 'Documented at process level' },
  { level: 3, label: 'Defined (Procedure)', color: '#22c55e', description: 'Documented at procedure level with specifics' },
  { level: 4, label: 'Measured / Audited', color: '#3b82f6', description: 'Actively measured, checked, or audited' },
];

export const SIM3_PARAMETERS = [
  // ── Organisation (O) ─────────────────────────────────────────────────────
  {
    id: 'O1', group: 'Organisation', code: 'O1',
    name: 'Constituency Definition',
    description: 'The constituency (the group of organisations/users the CSIRT serves) is clearly defined.',
    guidance: 'Define who you serve: sector, geography, size. Make it publicly accessible and internally agreed upon.',
    indicators: ['Written constituency document exists', 'Constituency communicated to stakeholders', 'Regular review of constituency scope'],
  },
  {
    id: 'O2', group: 'Organisation', code: 'O2',
    name: 'Mission Statement',
    description: 'The CSIRT has a formal, approved mission statement describing its purpose and goals.',
    guidance: 'Mission should be approved by management, published, and reviewed annually.',
    indicators: ['Mission statement document exists', 'Management approved', 'Publicly available', 'Reviewed within 12 months'],
  },
  {
    id: 'O3', group: 'Organisation', code: 'O3',
    name: 'Services Definition',
    description: 'The services offered by the CSIRT are formally defined and communicated to the constituency.',
    guidance: 'List reactive, proactive, and value-added services. Use the FIRST taxonomy as a reference.',
    indicators: ['Service catalogue document', 'Services communicated externally', 'Service-level expectations set'],
  },
  {
    id: 'O4', group: 'Organisation', code: 'O4',
    name: 'Funding',
    description: 'The CSIRT has secured, documented funding to sustain operations.',
    guidance: 'Funding source, amount, and approval chain should be formalised. Budget reviews occur annually.',
    indicators: ['Budget document exists', 'Multi-year funding secured', 'Budget review process in place'],
  },
  {
    id: 'O5', group: 'Organisation', code: 'O5',
    name: 'Authority',
    description: 'The CSIRT has formally granted authority to act on security incidents within its constituency.',
    guidance: 'Authority letter or policy signed by senior management. Scope of authority is clear.',
    indicators: ['Authority document signed', 'Scope of authority defined', 'Authority communicated to constituency'],
  },
  {
    id: 'O6', group: 'Organisation', code: 'O6',
    name: 'Reporting Structure',
    description: 'The CSIRT has a clear internal and external reporting structure.',
    guidance: 'Org chart showing where CSIRT sits. Escalation path to senior management documented.',
    indicators: ['Org chart published', 'Reporting lines defined', 'Escalation path to leadership documented'],
  },
  {
    id: 'O7', group: 'Organisation', code: 'O7',
    name: 'Rules & Regulations',
    description: 'Internal rules of procedure and code of conduct govern CSIRT operations.',
    guidance: 'Rules of engagement, code of ethics, operational security requirements documented.',
    indicators: ['Rules of procedure document', 'Code of conduct signed by staff', 'OpSec requirements defined'],
  },
  {
    id: 'O8', group: 'Organisation', code: 'O8',
    name: 'Jurisdiction & Legal Framework',
    description: 'Legal boundaries and applicable laws are identified and addressed.',
    guidance: 'Data protection laws, cybercrime statutes, cross-border considerations documented.',
    indicators: ['Legal review completed', 'Applicable laws listed', 'Legal counsel engaged'],
  },
  {
    id: 'O9', group: 'Organisation', code: 'O9',
    name: 'Privacy Policy',
    description: 'A privacy policy exists governing how personal data is handled during incident handling.',
    guidance: 'Must comply with relevant data-protection regulations (e.g., GDPR). Reviewed by legal.',
    indicators: ['Privacy policy document', 'GDPR/data-protection compliance reviewed', 'Policy communicated to staff'],
  },
  {
    id: 'O10', group: 'Organisation', code: 'O10',
    name: 'Information Classification Policy',
    description: 'An information classification policy governs how incident data is labelled and shared.',
    guidance: 'Use TLP (Traffic Light Protocol) or equivalent. Policy applied to all incident communications.',
    indicators: ['Classification policy exists', 'TLP or equivalent adopted', 'Staff trained on classification'],
  },
  {
    id: 'O11', group: 'Organisation', code: 'O11',
    name: 'CSIRT Risk Management',
    description: 'The CSIRT assesses and manages risks to its own operations.',
    guidance: 'Risk register for CSIRT operations. Business continuity and CSIRT resilience considered.',
    indicators: ['CSIRT risk register maintained', 'Business continuity plan exists', 'Risks reviewed annually'],
  },

  // ── Human (H) ────────────────────────────────────────────────────────────
  {
    id: 'H1', group: 'Human', code: 'H1',
    name: 'Staff Selection',
    description: 'Formal criteria and processes exist for selecting and hiring CSIRT staff.',
    guidance: 'Job descriptions, competency requirements, and interview processes are documented.',
    indicators: ['Job descriptions exist for all roles', 'Competency framework defined', 'Structured interview/selection process'],
  },
  {
    id: 'H2', group: 'Human', code: 'H2',
    name: 'Training Programme',
    description: 'A structured training programme keeps CSIRT staff skills current.',
    guidance: 'Annual training plan per role. Mix of technical, procedural, and soft-skills training.',
    indicators: ['Annual training plan produced', 'Training budget allocated', 'Training records maintained'],
  },
  {
    id: 'H3', group: 'Human', code: 'H3',
    name: 'Staff Awareness',
    description: 'CSIRT staff maintain awareness of current threats, tools, and community developments.',
    guidance: 'Threat-intel subscriptions, conference attendance, CTI sharing participation.',
    indicators: ['Threat-intel feeds subscribed', 'Conference/training attendance tracked', 'Internal briefing cadence'],
  },
  {
    id: 'H4', group: 'Human', code: 'H4',
    name: 'Background Checks',
    description: 'Background checks are performed on CSIRT personnel appropriate to their access level.',
    guidance: 'Proportionate to sensitivity of data accessed. Renewed periodically.',
    indicators: ['Background check policy exists', 'Checks performed on all new hires', 'Periodic renewal process'],
  },
  {
    id: 'H5', group: 'Human', code: 'H5',
    name: 'Expertise Management',
    description: 'The CSIRT tracks staff expertise and identifies capability gaps.',
    guidance: 'Skills matrix maintained. Gaps addressed through hiring, training, or partnerships.',
    indicators: ['Skills matrix maintained', 'Gap analysis performed', 'Remediation plan for gaps'],
  },
  {
    id: 'H6', group: 'Human', code: 'H6',
    name: 'Team Management',
    description: 'Effective team management practices sustain CSIRT performance and well-being.',
    guidance: 'On-call rota, burn-out prevention, succession planning, and performance reviews.',
    indicators: ['On-call rota formally managed', 'Performance review process', 'Succession/coverage planning'],
  },
  {
    id: 'H7', group: 'Human', code: 'H7',
    name: 'Escalation Procedures',
    description: 'Clear escalation paths exist for incidents exceeding CSIRT capacity or authority.',
    guidance: 'Named escalation contacts at management level. Crisis escalation path documented.',
    indicators: ['Escalation procedure document', 'Named escalation contacts', 'Escalation criteria defined'],
  },
  {
    id: 'H8', group: 'Human', code: 'H8',
    name: 'External Contacts & Networking',
    description: 'The CSIRT maintains active relationships with external CSIRT communities and trusted partners.',
    guidance: 'FIRST, TF-CSIRT or national CSIRT network membership. Bilateral trust relationships established.',
    indicators: ['Community memberships held', 'Trusted contact list maintained', 'Regular community engagement'],
  },

  // ── Tools (T) ────────────────────────────────────────────────────────────
  {
    id: 'T1', group: 'Tools', code: 'T1',
    name: 'Secure Communications',
    description: 'Encrypted communication channels are available for sensitive incident coordination.',
    guidance: 'Email encryption (S/MIME or PGP), encrypted messaging (Signal/XMPP+OMEMO), VPN.',
    indicators: ['PGP/S-MIME keys published', 'Encrypted messaging platform deployed', 'Secure voice option available'],
  },
  {
    id: 'T2', group: 'Tools', code: 'T2',
    name: 'Encrypted Storage',
    description: 'Incident data and sensitive artifacts are stored in encrypted repositories.',
    guidance: 'Full-disk encryption, encrypted file shares, encrypted database for case data.',
    indicators: ['Encrypted storage in use', 'Key management process defined', 'Backup encryption policy'],
  },
  {
    id: 'T3', group: 'Tools', code: 'T3',
    name: 'Incident Tracking System',
    description: 'A dedicated ticketing/case management system tracks all incidents end-to-end.',
    guidance: 'Each incident gets a unique ID, owner, timestamps, and audit trail. Integrated with workflows.',
    indicators: ['Case management system deployed', 'All incidents logged in system', 'Audit trail maintained'],
  },
  {
    id: 'T4', group: 'Tools', code: 'T4',
    name: 'Incident Classification',
    description: 'A taxonomy/classification scheme is implemented and consistently applied.',
    guidance: 'Use eCSIRT.net or MISP taxonomy. Severity levels defined. Classification documented per case.',
    indicators: ['Classification taxonomy adopted', 'Severity scale defined', 'Classification applied to all cases'],
  },
  {
    id: 'T5', group: 'Tools', code: 'T5',
    name: 'Incident Reporting Mechanism',
    description: 'A clearly defined mechanism allows the constituency to report incidents.',
    guidance: 'Web form, email alias, phone hotline. Reporting instructions publicly available.',
    indicators: ['Reporting channel(s) defined', 'Reporting instructions published', 'Acknowledgement SLA in place'],
  },
  {
    id: 'T6', group: 'Tools', code: 'T6',
    name: 'Vulnerability Management Tools',
    description: 'Tools support the identification, tracking, and management of vulnerabilities.',
    guidance: 'CVE feeds, vulnerability scanner, internal vulnerability database or tracker.',
    indicators: ['CVE/NVD feeds subscribed', 'Vulnerability tracker in use', 'Patch status tracked'],
  },
  {
    id: 'T7', group: 'Tools', code: 'T7',
    name: 'Artifact Handling',
    description: 'Malware samples and digital evidence are handled with appropriate tools and procedures.',
    guidance: 'Sandboxed analysis environment, chain-of-custody process, secure artefact storage.',
    indicators: ['Sandbox/malware analysis environment', 'Chain-of-custody documented', 'Secure artefact repository'],
  },
  {
    id: 'T8', group: 'Tools', code: 'T8',
    name: 'Knowledge Base',
    description: 'A knowledge base stores TTPs, past case lessons, and procedural references.',
    guidance: 'Internal wiki, MITRE ATT&CK integration, searchable case history.',
    indicators: ['Knowledge base platform deployed', 'ATT&CK mapping in use', 'Searchable case history maintained'],
  },
  {
    id: 'T9', group: 'Tools', code: 'T9',
    name: 'Reporting Hotline / Intake',
    description: 'A 24/7 or defined-hours hotline/intake point exists for emergency incident reports.',
    guidance: 'Phone, email or portal with documented availability hours and response SLAs.',
    indicators: ['Hotline number/contact published', 'Availability hours documented', 'Response SLA defined'],
  },
  {
    id: 'T10', group: 'Tools', code: 'T10',
    name: 'Web Presence',
    description: 'The CSIRT maintains a public web presence with contact info, PGP keys, and advisories.',
    guidance: 'HTTPS website, PGP key published, advisories/notices publicly available.',
    indicators: ['Website live and HTTPS', 'PGP key published', 'Advisories section maintained'],
  },
  {
    id: 'T11', group: 'Tools', code: 'T11',
    name: 'Escalation Contact Points',
    description: 'A maintained directory of escalation contacts (internal and external) is available.',
    guidance: 'Contact list with roles, numbers, and trust levels. Reviewed at least quarterly.',
    indicators: ['Contact directory maintained', 'Trust levels assigned', 'Quarterly review process'],
  },
  {
    id: 'T12', group: 'Tools', code: 'T12',
    name: 'Early Warning / CTI Feed',
    description: 'The CSIRT receives and acts on early warning information and threat intelligence feeds.',
    guidance: 'Subscriptions to ISAC, CERT feeds, MISP instances, commercial CTI.',
    indicators: ['CTI feeds subscribed and ingested', 'Alerting on high-priority indicators', 'Feed quality reviewed'],
  },
  {
    id: 'T13', group: 'Tools', code: 'T13',
    name: 'Statistics Collection',
    description: 'Incident statistics are systematically collected, stored, and maintained.',
    guidance: 'Monthly/quarterly reports. Metrics: volume, type, severity, time-to-close.',
    indicators: ['Statistics collected per incident', 'Regular reports generated', 'Historical data retained'],
  },
  {
    id: 'T14', group: 'Tools', code: 'T14',
    name: 'Trend Analysis',
    description: 'Statistical data is analysed to identify trends and inform proactive actions.',
    guidance: 'Quarterly trend reviews. Output feeds into awareness bulletins and risk updates.',
    indicators: ['Trend analysis performed regularly', 'Output shared with constituency', 'Informs proactive measures'],
  },

  // ── Processes (P) ────────────────────────────────────────────────────────
  {
    id: 'P1', group: 'Processes', code: 'P1',
    name: 'Incident Reporting Process',
    description: 'A formal process governs how incidents are received, logged, and acknowledged.',
    guidance: 'Intake form or structured email template. SLA for acknowledgement. Unique ID assigned.',
    indicators: ['Intake process documented', 'Acknowledgement SLA met', 'Unique ID scheme in use'],
  },
  {
    id: 'P2', group: 'Processes', code: 'P2',
    name: 'Triage & Information Handling',
    description: 'A triage process prioritises incidents and routes them to the right handler.',
    guidance: 'Triage criteria (severity, impact, urgency). TLP applied. Data minimisation in handling.',
    indicators: ['Triage criteria documented', 'TLP applied at intake', 'Routing/assignment process'],
  },
  {
    id: 'P3', group: 'Processes', code: 'P3',
    name: 'Incident Analysis',
    description: 'A structured analysis process determines scope, root cause, and impact.',
    guidance: 'Use kill chain or ATT&CK framework. Document hypotheses, evidence, and conclusions.',
    indicators: ['Analysis methodology documented', 'ATT&CK/kill-chain in use', 'Analysis findings recorded'],
  },
  {
    id: 'P4', group: 'Processes', code: 'P4',
    name: 'Solution & Workaround',
    description: 'The CSIRT provides or coordinates remediation guidance and workarounds.',
    guidance: 'Recommendations documented per incident. Tracked until constituent confirms resolution.',
    indicators: ['Remediation guidance produced', 'Resolution tracked', 'Constituent confirmation obtained'],
  },
  {
    id: 'P5', group: 'Processes', code: 'P5',
    name: 'Incident Closure',
    description: 'A formal closure process ensures incidents are reviewed and properly closed.',
    guidance: 'Closure checklist, sign-off by case owner, documentation archived.',
    indicators: ['Closure criteria defined', 'Closure checklist used', 'Cases archived on close'],
  },
  {
    id: 'P6', group: 'Processes', code: 'P6',
    name: 'Crisis Management',
    description: 'A crisis management process addresses large-scale or high-impact incidents.',
    guidance: 'Crisis declaration criteria, command structure, stakeholder communication plan.',
    indicators: ['Crisis plan documented', 'Crisis declaration criteria defined', 'Tabletop exercise conducted'],
  },
  {
    id: 'P7', group: 'Processes', code: 'P7',
    name: 'Vulnerability Handling Process',
    description: 'A process manages the receipt, analysis, coordination, and disclosure of vulnerabilities.',
    guidance: 'CVD (Coordinated Vulnerability Disclosure) policy. CVSS scoring applied. Disclosure timeline.',
    indicators: ['CVD policy published', 'CVSS scoring applied', 'Disclosure timeline adhered to'],
  },
  {
    id: 'P8', group: 'Processes', code: 'P8',
    name: 'Alerts & Announcements',
    description: 'A process produces and distributes security advisories and alerts to the constituency.',
    guidance: 'Template for advisories, approval chain, distribution list, TLP applied.',
    indicators: ['Advisory template in use', 'Approval chain documented', 'Distribution list maintained'],
  },
  {
    id: 'P9', group: 'Processes', code: 'P9',
    name: 'Situational Awareness',
    description: 'The CSIRT actively monitors the threat landscape relevant to its constituency.',
    guidance: 'Regular threat-intel review, dark-web monitoring, cross-CSIRT information sharing.',
    indicators: ['Threat landscape reviewed regularly', 'Information sharing active', 'SA reports produced'],
  },
  {
    id: 'P10', group: 'Processes', code: 'P10',
    name: 'Quality Management',
    description: 'Quality management processes measure and improve CSIRT service delivery.',
    guidance: 'SLA tracking, peer review of major cases, constituent satisfaction surveys.',
    indicators: ['SLAs defined and tracked', 'Case peer-review process', 'Satisfaction survey conducted'],
  },
  {
    id: 'P11', group: 'Processes', code: 'P11',
    name: 'Lessons Learned',
    description: 'Lessons learned are systematically captured and fed back into process improvement.',
    guidance: 'Post-incident review for all major incidents. Lessons tracked to closure. Improvement backlog.',
    indicators: ['Post-incident review conducted', 'Lessons tracked to action', 'Process improvement backlog'],
  },
];

export const GROUPS = [
  { key: 'Organisation', label: 'Organisation', color: '#6366f1', bg: '#eef2ff', short: 'O' },
  { key: 'Human',        label: 'Human',        color: '#8b5cf6', bg: '#f5f3ff', short: 'H' },
  { key: 'Tools',        label: 'Tools',        color: '#0ea5e9', bg: '#f0f9ff', short: 'T' },
  { key: 'Processes',    label: 'Processes',    color: '#10b981', bg: '#f0fdf4', short: 'P' },
];

export function computeScores(assessmentData) {
  const scores = {};
  GROUPS.forEach(g => {
    const params = SIM3_PARAMETERS.filter(p => p.group === g.key);
    const total = params.reduce((sum, p) => sum + (assessmentData[p.id] ?? 0), 0);
    const max = params.length * 4;
    scores[g.key] = { total, max, pct: max > 0 ? Math.round((total / max) * 100) : 0 };
  });
  const overall = Object.values(scores).reduce((acc, s) => ({ total: acc.total + s.total, max: acc.max + s.max }), { total: 0, max: 0 });
  scores.overall = { ...overall, pct: overall.max > 0 ? Math.round((overall.total / overall.max) * 100) : 0 };
  return scores;
}

export function maturityLabel(pct) {
  if (pct >= 90) return { label: 'Optimising', color: '#3b82f6' };
  if (pct >= 70) return { label: 'Managed',    color: '#22c55e' };
  if (pct >= 50) return { label: 'Defined',    color: '#eab308' };
  if (pct >= 25) return { label: 'Developing', color: '#f97316' };
  return { label: 'Initial',   color: '#ef4444' };
}
