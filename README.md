# ShellSentry

**"Learn cybersecurity by investigating the attack."**

ShellSentry is an interactive cybersecurity incident-response simulator built for the 305 HackShells Edition September 2026 hackathon.

## Problem
Traditional cybersecurity education relies on passive reading (READ → WATCH → QUIZ). Students learn what attacks look like in theory, but lack the practical context to investigate them in reality.

## Solution
ShellSentry flips the educational model: **DETECT → INVESTIGATE → REASON → VALIDATE → RESPOND → LEARN**.
It drops users directly into a simulated security incident and requires them to forensically piece together the attacker's path using an AI Copilot.

## Key Features
- **Live Investigation Workspace:** Analyze terminal logs, network traffic, and system events.
- **Interactive Threat Timeline:** A structured sequence of the attack.
- **Attack Graph Visualization:** Visually construct the attacker's path using `reactflow`.
- **AI Copilot (Gemma Integration):** An intelligent assistant that provides explanations, hints, and validates user hypotheses.
- **Deterministic Scoring & Reporting:** Generates a professional incident report based on the evidence collected.

## Setup Instructions
```bash
npm install
npm run dev
```

Open `http://localhost:3000` to access the platform.

## Environment Variables
Create a `.env.local` file:
```env
# Optional: Enable real Snowflake analytics (uses mock adapter by default)
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USER=your_user
SNOWFLAKE_PASSWORD=your_password

# Optional: Real Gemma API connection 
GEMMA_API_KEY=your_key
```

## Security Philosophy
This is an educational simulation. No arbitrary code execution occurs. All terminal output and logs are deterministic simulated data, ensuring complete safety.

## Future Roadmap
- Multiplayer investigations (Blue Team vs. Red Team simulation).
- Dynamic attack generation using LLMs.
- Integration with real SIEM platforms for training on live data.
