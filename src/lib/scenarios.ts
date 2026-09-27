import { Scenario } from "./types";

export const scenarios: Scenario[] = [
  {
    id: "sc-001",
    title: "Phishing to Credential Theft",
    description: "A developer's workstation has started making unusual outbound connections. Investigate the compromise.",
    difficulty: "Beginner",
    affectedAsset: "DEV-042",
    attackTechniques: ["T1566.001", "T1059.001", "T1003", "T1071.001"],
    learningObjectives: ["Identify phishing emails", "Analyze encoded PowerShell", "Detect credential access", "Trace C2 beacons"],
    events: [
      {
        id: "evt-1",
        timestamp: "09:41:12",
        description: "Suspicious email attachment opened",
        type: "Initial Access",
        evidenceIds: ["ev-1", "ev-2"]
      },
      {
        id: "evt-2",
        timestamp: "09:41:18",
        description: "PowerShell process spawned",
        type: "Execution",
        evidenceIds: ["ev-3"]
      },
      {
        id: "evt-3",
        timestamp: "09:41:24",
        description: "Credential file accessed",
        type: "Credential Access",
        evidenceIds: ["ev-4"]
      },
      {
        id: "evt-4",
        timestamp: "09:41:31",
        description: "External connection established",
        type: "C2",
        evidenceIds: ["ev-5"]
      }
    ],
    evidence: [
      {
        id: "ev-1",
        timestamp: "09:41:10",
        type: "File",
        source: "Outlook",
        content: "Filename: Q3_Bonus_Schedule.pdf.exe\nHash: 8d265a95... (Malicious)",
        importance: "Critical",
        mitreTactic: "T1566.001",
        relatedEvents: ["evt-1"]
      },
      {
        id: "ev-2",
        timestamp: "09:41:12",
        type: "Process",
        source: "Sysmon",
        content: "Process Create: \nImage: C:\\Windows\\explorer.exe\nCommandLine: explorer.exe \"C:\\Users\\dev\\Downloads\\Q3_Bonus_Schedule.pdf.exe\"",
        importance: "High",
        relatedEvents: ["evt-1"]
      },
      {
        id: "ev-3",
        timestamp: "09:41:18",
        type: "Terminal",
        source: "PowerShell Logs",
        content: "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -EncodedCommand JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAE0AZQBtAG8AcgB5AFMAdAByAGUAYQBtACgAWwBDAG8AbgB2AGUAcgB0AF0AOgA6AEYAcgBvAG0AQgBhAHMAZQA2ADQAUwB0AHIAaQBuAGcAKAAiAEgA...",
        importance: "Critical",
        mitreTactic: "T1059.001",
        relatedEvents: ["evt-2"]
      },
      {
        id: "ev-4",
        timestamp: "09:41:24",
        type: "System",
        source: "Security Event Log",
        content: "Event ID 4624: Logon\nEvent ID 4656: A handle to an object was requested.\nObject Name: C:\\Windows\\System32\\lsass.exe",
        importance: "High",
        mitreTactic: "T1003.001",
        relatedEvents: ["evt-3"]
      },
      {
        id: "ev-5",
        timestamp: "09:41:31",
        type: "Network",
        source: "Firewall",
        content: "Outbound TCP Connection\nSource: 192.168.1.42 (DEV-042)\nDestination: 104.21.44.112:443\nBytes Sent: 4502\nBytes Received: 124",
        importance: "Critical",
        mitreTactic: "T1071.001",
        relatedEvents: ["evt-4"]
      },
      {
        id: "ev-6",
        timestamp: "09:42:00",
        type: "DNS",
        source: "DNS Server",
        content: "Query: updates-ms-sync-srv.com\nResponse: 104.21.44.112",
        importance: "Medium"
      }
    ]
  }
];
