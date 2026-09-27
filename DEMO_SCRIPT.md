# ShellSentry - 3 Minute Demo Script

**0:00 - 0:15 (The Hook)**
*Start on the Landing Page.*
"Hello judges, we are the ShellSentry team. Traditional cybersecurity education relies on passive quizzes. We built an AI-powered simulator that drops you directly into the investigation. Let me show you Demo Mode."
*Click 'Explore Demo'*

**0:15 - 1:00 (The Incident & Evidence)**
*Dashboard loads. The Timeline is visible.*
"We immediately see a CRITICAL incident on DEV-042. A phishing attack. 
On the left, we have the Threat Timeline. At 09:41:12, a suspicious email is opened.
Let's look at the Evidence Tab. I can see a Sysmon process creation event and an encoded PowerShell command. I don't know what this Base64 string means, so I'll ask our AI Copilot powered by Gemma."
*Click 'Explain Evidence' in the AI Copilot panel.*
"Gemma instantly decodes the PowerShell and explains that it's attempting to establish a reverse shell."

**1:00 - 2:00 (The Investigation Graph)**
"I'll add this PowerShell execution to my investigation." 
*Click 'Add Evidence'*
"Now, let's switch to the Attack Graph." 
*Switch to Graph Tab.*
"As I connect evidence, ShellSentry visually maps the attacker's path and correlates it automatically to the MITRE ATT&CK framework (T1059.001)."
*Click 'Request Hint' in AI panel.*
"I'm stuck, so I'll ask Gemma for a hint. It suggests I look for outbound network connections shortly after the PowerShell execution."

**2:00 - 3:00 (The Conclusion & Report)**
"I've found the C2 beacon and completed the attack graph. It's time to conclude."
*Click 'Submit Conclusion'*
*Type: "The attacker gained initial access via a malicious PDF, spawned an encoded PowerShell reverse shell, accessed LSASS for credentials, and established C2."*
*Click Submit.*
"The engine validates my hypothesis against the scenario's ground truth, and generates a professional Incident Report. I scored 92/100. It even provides customized learning outcomes based on what I missed.
ShellSentry: Don't just read about attacks, investigate them."
