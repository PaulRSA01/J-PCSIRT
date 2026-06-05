export const PLAYBOOKS = [
  {
    id: 'PB-001',
    title: 'Ransomware Response',
    category: 'Malware',
    severity: 'Critical',
    description: 'Step-by-step response for ransomware incidents affecting endpoints or servers.',
    tags: ['ransomware', 'malware', 'encryption', 'business-continuity'],
    phases: [
      {
        name: 'Detection & Initial Triage',
        steps: [
          'Receive alert/report from user, EDR, or SIEM.',
          'Confirm ransomware indicators: encrypted files, ransom note, unusual process activity.',
          'Identify the affected host(s) and user accounts.',
          'Assign severity: Critical if domain controllers or production systems are affected.',
          'Create incident ticket and assign lead handler.',
        ],
      },
      {
        name: 'Containment',
        steps: [
          'Isolate affected hosts from the network immediately (physical or NAC quarantine).',
          'Disable compromised user accounts and reset credentials.',
          'Block known ransomware C2 IPs/domains at perimeter firewall.',
          'Snapshot affected VMs before any remediation (preserve evidence).',
          'Notify stakeholders: IT management, legal, comms.',
        ],
      },
      {
        name: 'Analysis',
        steps: [
          'Identify ransomware family (ID Ransomware, VirusTotal, sandbox analysis).',
          'Determine initial access vector (phishing, RDP brute-force, vulnerability).',
          'Map lateral movement using EDR telemetry and Windows event logs.',
          'Check for data exfiltration indicators before encryption.',
          'Document timeline and scope of compromise.',
        ],
      },
      {
        name: 'Eradication',
        steps: [
          'Re-image or restore affected hosts from clean backups.',
          'Patch the exploited vulnerability or vector.',
          'Reset all privileged credentials and service accounts.',
          'Deploy updated endpoint protection signatures.',
          'Verify no persistence mechanisms remain (scheduled tasks, registry keys, startup items).',
        ],
      },
      {
        name: 'Recovery',
        steps: [
          'Restore data from verified clean backups.',
          'Reconnect hosts to network in phased manner with monitoring.',
          'Validate business operations are restored.',
          'Increase monitoring thresholds for 30 days post-incident.',
          'Update backup verification schedule.',
        ],
      },
      {
        name: 'Post-Incident',
        steps: [
          'Conduct post-incident review within 5 business days.',
          'Document root cause, timeline, and actions taken.',
          'Identify process/control gaps and assign remediation owners.',
          'Update playbook with lessons learned.',
          'Notify regulators/authorities if required (data breach thresholds).',
        ],
      },
    ],
  },
  {
    id: 'PB-002',
    title: 'Phishing / Business Email Compromise',
    category: 'Social Engineering',
    severity: 'High',
    description: 'Response procedure for phishing campaigns and business email compromise (BEC) incidents.',
    tags: ['phishing', 'bec', 'email', 'credential-theft'],
    phases: [
      {
        name: 'Detection & Initial Triage',
        steps: [
          'Receive report via hotline, email, or automated alert.',
          'Collect original phishing email with full headers (do NOT click links).',
          'Determine: credential-harvesting, malware delivery, or BEC attempt.',
          'Identify target population: single user, department, or mass campaign.',
          'Create ticket and classify severity.',
        ],
      },
      {
        name: 'Containment',
        steps: [
          'Block sender domain/IP at email gateway.',
          'Recall malicious emails from all mailboxes (if M365/Google Workspace admin).',
          'Reset credentials of any users who clicked or submitted data.',
          'Enable MFA for affected accounts immediately.',
          'Block phishing URL at DNS/proxy level.',
        ],
      },
      {
        name: 'Analysis',
        steps: [
          'Analyse email headers to identify sending infrastructure.',
          'Extract and safely detonate any attachments in sandbox.',
          'Check URL reputation (VirusTotal, URLScan.io).',
          'Review authentication logs for suspicious logins from affected accounts.',
          'Determine if financial fraud occurred (BEC wire-transfer scenario).',
        ],
      },
      {
        name: 'Eradication',
        steps: [
          'Remove malicious email from all mailboxes.',
          'Remediate compromised accounts (password reset, session revocation, MFA enrol).',
          'Block phishing infrastructure (IPs, domains, URLs) in all controls.',
          'Submit IOCs to threat-intel sharing platforms (MISP).',
          'Report phishing site to hosting provider and registrar for takedown.',
        ],
      },
      {
        name: 'Recovery',
        steps: [
          'Restore access to affected accounts after credential reset.',
          'If BEC: contact bank immediately; initiate fraud recall process.',
          'Send user advisory with indicators and how to report similar emails.',
          'Validate email gateway rules are effective.',
        ],
      },
      {
        name: 'Post-Incident',
        steps: [
          'Conduct lessons-learned session.',
          'Run targeted phishing simulation to measure residual risk.',
          'Update email security controls based on gaps identified.',
          'Report statistics to management.',
        ],
      },
    ],
  },
  {
    id: 'PB-003',
    title: 'Data Breach / Unauthorised Access',
    category: 'Data Exfiltration',
    severity: 'Critical',
    description: 'Response for suspected or confirmed unauthorised access to sensitive data.',
    tags: ['data-breach', 'exfiltration', 'unauthorized-access', 'gdpr'],
    phases: [
      {
        name: 'Detection & Initial Triage',
        steps: [
          'Identify the alert source: DLP, SIEM, user report, third-party notification.',
          'Classify data type involved: PII, financial, health, IP, classified.',
          'Estimate number of records/individuals potentially affected.',
          'Engage legal/privacy officer immediately.',
          'Create high-priority incident ticket.',
        ],
      },
      {
        name: 'Containment',
        steps: [
          'Revoke access of suspected compromised account(s).',
          'Block exfiltration channel (email, cloud storage, FTP) at perimeter.',
          'Preserve evidence before remediation (logs, memory dumps).',
          'Restrict access to affected data repositories.',
          'Notify CISO and legal.',
        ],
      },
      {
        name: 'Analysis',
        steps: [
          'Identify access vector and timeline of compromise.',
          'Enumerate all data accessed/exfiltrated using DLP and access logs.',
          'Determine if data was exfiltrated externally or accessed internally.',
          'Assess regulatory breach notification obligations (GDPR: 72-hour clock).',
          'Document chain of custody for forensic evidence.',
        ],
      },
      {
        name: 'Eradication',
        steps: [
          'Remove attacker access and persistence mechanisms.',
          'Rotate all credentials and API keys for affected systems.',
          'Patch exploited vulnerabilities.',
          'Implement additional controls on sensitive data repositories.',
        ],
      },
      {
        name: 'Recovery',
        steps: [
          'Restore systems from clean backups if integrity compromised.',
          'Increase monitoring on affected systems for 90 days.',
          'Conduct tabletop exercise to validate controls.',
          'Communicate with affected individuals if required by law.',
        ],
      },
      {
        name: 'Post-Incident',
        steps: [
          'Submit regulatory notifications within required timelines.',
          'Conduct thorough post-incident review.',
          'Update data classification and DLP policies.',
          'Implement data minimisation measures.',
          'Report to board/senior management.',
        ],
      },
    ],
  },
  {
    id: 'PB-004',
    title: 'DDoS Attack',
    category: 'Availability',
    severity: 'High',
    description: 'Response for Distributed Denial-of-Service attacks affecting internet-facing services.',
    tags: ['ddos', 'availability', 'network', 'amplification'],
    phases: [
      {
        name: 'Detection & Initial Triage',
        steps: [
          'Identify service degradation via monitoring alerts or user reports.',
          'Confirm DDoS (high traffic volume, unusual source patterns, service unavailable).',
          'Classify attack type: volumetric, protocol, or application-layer.',
          'Estimate business impact: revenue loss, reputational damage.',
          'Activate incident response team and notify ISP/CDN provider.',
        ],
      },
      {
        name: 'Containment',
        steps: [
          'Engage ISP for upstream traffic scrubbing or blackholing.',
          'Activate CDN DDoS mitigation (Cloudflare, Akamai, etc.).',
          'Rate-limit suspicious source IP ranges at perimeter.',
          'Enable geo-blocking for attacking regions if appropriate.',
          'Redirect traffic through DDoS mitigation service if not already in place.',
        ],
      },
      {
        name: 'Analysis',
        steps: [
          'Capture netflow data for traffic analysis.',
          'Identify attack vectors: UDP flood, SYN flood, HTTP flood, amplification.',
          'Identify source IP ranges (likely spoofed for volumetric attacks).',
          'Determine if attack is targeted or part of broader campaign.',
          'Check for simultaneous intrusion attempts exploiting the distraction.',
        ],
      },
      {
        name: 'Eradication',
        steps: [
          'Implement permanent block rules for identified attack infrastructure.',
          'Request ISP to apply ACLs upstream.',
          'Report attacking infrastructure to abuse contacts.',
          'Harden service configuration (connection limits, timeouts).',
        ],
      },
      {
        name: 'Recovery',
        steps: [
          'Gradually restore normal operations as attack subsides.',
          'Validate service availability from multiple locations.',
          'Monitor for resumption of attack.',
          'Review and optimise DDoS mitigation configuration.',
        ],
      },
      {
        name: 'Post-Incident',
        steps: [
          'Calculate total business impact (downtime, cost).',
          'Review DDoS mitigation strategy and contracts.',
          'Update runbook with lessons learned.',
          'Test DDoS mitigation in scheduled tabletop.',
        ],
      },
    ],
  },
  {
    id: 'PB-005',
    title: 'Insider Threat',
    category: 'Insider Threat',
    severity: 'High',
    description: 'Response for suspected malicious or negligent insider activity.',
    tags: ['insider', 'data-theft', 'sabotage', 'hr'],
    phases: [
      {
        name: 'Detection & Initial Triage',
        steps: [
          'Receive alert from UEBA, DLP, manager report, or whistleblower.',
          'Assess: malicious intent vs. negligence.',
          'Engage HR and legal before any direct contact with suspect.',
          'Preserve evidence discreetly — do NOT alert the suspect.',
          'Create confidential incident ticket with restricted access.',
        ],
      },
      {
        name: 'Containment',
        steps: [
          'Silently increase monitoring on suspect account (coordinate with legal).',
          'Restrict access to sensitive data without alerting suspect.',
          'Preserve all relevant logs with legal hold.',
          'Prepare for emergency access revocation.',
        ],
      },
      {
        name: 'Analysis',
        steps: [
          'Review access logs, data transfers, email, and UEBA alerts.',
          'Document timeline of suspicious activities.',
          'Identify data accessed or exfiltrated.',
          'Quantify potential business impact.',
          'Brief legal and HR with evidence package.',
        ],
      },
      {
        name: 'Eradication',
        steps: [
          'HR/management coordinates with IT to revoke access at agreed time.',
          'Collect and preserve devices (chain of custody).',
          'Change credentials for shared accounts the suspect had access to.',
          'Audit all actions taken by the account over its lifetime.',
        ],
      },
      {
        name: 'Recovery',
        steps: [
          'Restore any damaged/deleted data.',
          'Review and tighten access controls (least-privilege audit).',
          'Brief remaining team on acceptable use policies.',
          'Implement additional controls to detect similar future behaviour.',
        ],
      },
      {
        name: 'Post-Incident',
        steps: [
          'Support HR/legal in any disciplinary or legal action.',
          'Conduct access review across all departing/high-risk staff.',
          'Update offboarding procedures.',
          'Review UEBA detection rules.',
        ],
      },
    ],
  },
];

export const INCIDENT_CATEGORIES = [
  'Malware', 'Ransomware', 'Phishing', 'Social Engineering', 'Data Breach',
  'Unauthorised Access', 'DDoS', 'Availability', 'Vulnerability', 'Insider Threat',
  'Supply Chain', 'Physical Security', 'Other',
];

export const SEVERITY_LEVELS = [
  { label: 'Critical', color: '#ef4444', bg: '#fef2f2' },
  { label: 'High',     color: '#f97316', bg: '#fff7ed' },
  { label: 'Medium',   color: '#eab308', bg: '#fefce8' },
  { label: 'Low',      color: '#22c55e', bg: '#f0fdf4' },
  { label: 'Info',     color: '#6b7280', bg: '#f9fafb' },
];

export const INCIDENT_STATUSES = [
  { label: 'New',         color: '#6366f1' },
  { label: 'In Progress', color: '#f97316' },
  { label: 'Contained',   color: '#eab308' },
  { label: 'Eradicated',  color: '#8b5cf6' },
  { label: 'Resolved',    color: '#22c55e' },
  { label: 'Closed',      color: '#6b7280' },
];
