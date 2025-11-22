<<<<<<< HEAD
// generators/knowledge.js
import fs from "fs";

export async function generateKnowledge() {

  //
  // ------------------------------------------------------------
  // 1. Telecom_Knowledge.txt
  // ------------------------------------------------------------
  //
  const telecomKnowledge = `
==============================
TELECOM GENERAL KNOWLEDGE PACK
==============================

This file contains domain-level knowledge used by the AI Communicator model.
It provides high-level understanding of telecom operations, network behaviour,
subscriber concepts, roaming rules, and operator-specific characteristics.

--------------------------------
1. NETWORK & SIGNAL EXPLANATIONS
--------------------------------
RSSI (Received Signal Strength Indicator):
- Represents overall signal power.
- Typical values: -110 dBm (poor) to -45 dBm (excellent).

RSRP (Reference Signal Received Power):
- 4G/5G downlink reference signal strength.
- Values around -120 dBm are weak, -80 dBm is strong.

RSRQ (Reference Signal Received Quality):
- Measures interference and quality.
- Higher values mean cleaner signal.

SINR (Signal to Interference + Noise Ratio):
- Represents signal quality versus interference.
- High SINR = better speed and stability.

Common Network Issues:
- Tower congestion during peak hours.
- Indoor coverage weakness.
- Interference from surrounding buildings.
- Temporary service degradation due to maintenance.

---------------------------------
2. DATA, SPEED & THROUGHPUT NOTES
---------------------------------
Data speed depends on:
- SINR
- RSRP strength
- Cell load
- Backhaul condition
- Device capability (4G, 5G SA/NSA)
- Band availability

4G Typical Speeds (EE Network):
- 47–130 Mbps depending on band and congestion.

5G Typical Speeds:
- 90–200 Mbps under normal coverage.
- Can exceed 400 Mbps in ideal NSA conditions.

-----------------------------------
3. SUBSCRIBER / ACCOUNT CONCEPTS
-----------------------------------
Prepaid:
- Recharge-based, no monthly commitment.

Postpaid:
- Billing cycle, credit limit, invoice generation.

ARPU (Average Revenue Per User):
- Total revenue per customer over time.

Churn Probability:
- Likelihood of a customer leaving the operator.

-------------------------------------------------
4. ROAMING KNOWLEDGE (EU, INDIA, CHINA, OTHERS)
-------------------------------------------------
EU Roaming:
- Treated like home usage under EU FUP (Fair Use Policy).
- Data limits vary between 12–35 GB.

India Roaming:
- Lycamobile UK supports data roaming.
- Calls and SMS are charged separately.

China Roaming:
- Available only on select Lycamobile plans.
- Data caps typically around 1–2 GB.

---------------------------------------
5. BILLING, PLAN & USAGE EXPLANATIONS
---------------------------------------
Plan Types:
- UK plans include Smart 5GB, Super Extra 50GB, Mega Plus 100GB, Unlimited.

Billing Components:
- Base plan charge
- Addons
- Taxes (VAT)
- Roaming charges
- International call rates
- Late fee if applicable

International Calling:
- Lycamobile includes minutes to 40–50 countries.
- Popular destinations: India, Pakistan, US, Poland, Malaysia.

-------------------------------------
6. CALL DETAIL RECORD (CDR) KNOWLEDGE
-------------------------------------
CDR Includes:
- Call duration
- Direction (incoming/outgoing)
- Termination cause (Dropped, Normal, Busy)
- Data usage (MB)
- IMSI/IMEI identifiers
- Tower ID at time of call

Reasons for drops:
- Handover failure
- Coverage gap
- Low SINR
- Tower outage

------------------------------------
7. VECTONE MOBILE (HISTORICAL FACTS)
------------------------------------
Vectone Mobile UK:
- Ceased operations in October 2023.
- Stopped service abruptly: no signal, outage, website non-functional.
- PAC codes were initially not provided.
- Many ex-users face routing issues even today.

Routing Issues:
- Calls and SMS from other networks may not reach Vectone-originated numbers.
- Only solution: change number after porting.

-----------------------------------
8. LYCAMOBILE UK (ACTIVE FACTS)
-----------------------------------
Lycamobile UK:
- Active MVNO running on EE network.
- Switched from O2 to EE in June 2023.
- Supports 4G/5G but NOT WiFi Calling or VoLTE.
- Offers eSIM activation within UK only.

5G Availability:
- Over 1,000 towns and cities covered via EE.

----------------------------------
9. TROUBLESHOOTING KNOWLEDGE BASE
----------------------------------
Common Solutions:
- Restart device to refresh network registration.
- Toggle airplane mode.
- Move to an open area or near a window.
- Lock device to 4G-only mode temporarily.
- Replace SIM if over 4–5 years old.

Slow Internet Causes:
- Tower congestion
- Weak indoor coverage
- Temporary maintenance
- High RLC/TCP retransmissions
- Poor SINR from interference

------------------------------------------
10. CUSTOMER-SERVICE STYLE CONVERSATIONS
------------------------------------------
Good behavior for telecom assistant:
- Empathetic tone
- Short, clear troubleshooting steps
- Provide reassurance:

Example:
"I understand how frustrating that can be. Let me help."

-----------------------------------------
END OF TELECOM GENERAL KNOWLEDGE PACK
-----------------------------------------
`;

  fs.writeFileSync(
    "dataset/knowledge/Telecom_Knowledge.txt",
    telecomKnowledge.trim()
  );



  //
  // ------------------------------------------------------------
  // 2. Operator_Policies.txt
  // ------------------------------------------------------------
  //
  const operatorPolicies = `
==============================
OPERATOR POLICY DEFINITIONS
==============================

----------------------------------------
1. LYCAMOBILE UK — ACTIVE OPERATOR (2025)
----------------------------------------
Network Policy:
- Runs on EE 4G/5G NSA.
- No support for VoLTE or WiFi Calling in the UK.
- eSIM activation supported only within the UK.
- Initial launch lacked Band 20 (800 MHz) coverage.

Roaming Policy:
- EU roaming supported with fair use cap (around 35 GB).
- India roaming: data-only usage allowed.
- China roaming: available only on select premium plans.
- Roaming usage beyond limits incurs additional charges.

International Calling Policy:
- Most UK plans include 100 free international minutes.
- Unlimited minutes available on All in One Plus plans.

Plan Policy:
- Black Friday promotions give 50% discount for first 3 months.
- Price freeze for PAYG & contract bundles until 2026.

----------------------------------------
2. VECTONE MOBILE — CEASED OPERATOR (2023)
----------------------------------------
Network Policy:
- Operated as MVNO on EE network.
- No access to 5G.
- Weak customer support availability historically.
- Outdated backend infrastructure contributed to shutdown.

Collapse Details:
- Full network outage around Oct 23, 2023.
- Services stopped abruptly → no signal, no incoming calls, no SMS.
- Website and customer support went offline.
- PAC codes delayed for several days.

Routing Issues:
- Many numbers originating from Vectone prefixes still have routing failures.
- Calls from networks like Smarty, iD Mobile fail to reach those numbers.
- Only permanent fix: change number after porting.

Customer Service Policy (Historical):
- Free texts to other Vectone users.
- International calling bundles available.
- Basic low-cost plans targeting migrant communities.

----------------------------------------
3. GENERAL TELECOM OPERATOR RULES
----------------------------------------
SIM Policies:
- All SIMs require KYC verification.
- Inactive SIMs >90 days may be deactivated.

Billing Policies:
- Charges are prorated during mid-cycle plan changes.
- VAT of 20% applied on all billable services.

Fair Use Policy:
- Prevents misuse of unlimited plans.
- Applies throttling after high-volume usage.

----------------------------------------
END OF OPERATOR POLICY FILE
----------------------------------------
`;

  fs.writeFileSync(
    "dataset/knowledge/Operator_Policies.txt",
    operatorPolicies.trim()
  );

  console.log("Generated: Telecom_Knowledge.txt & Operator_Policies.txt");
}
=======
// generators/knowledge.js
import fs from "fs";

export async function generateKnowledge() {

  //
  // ------------------------------------------------------------
  // 1. Telecom_Knowledge.txt
  // ------------------------------------------------------------
  //
  const telecomKnowledge = `
==============================
TELECOM GENERAL KNOWLEDGE PACK
==============================

This file contains domain-level knowledge used by the AI Communicator model.
It provides high-level understanding of telecom operations, network behaviour,
subscriber concepts, roaming rules, and operator-specific characteristics.

--------------------------------
1. NETWORK & SIGNAL EXPLANATIONS
--------------------------------
RSSI (Received Signal Strength Indicator):
- Represents overall signal power.
- Typical values: -110 dBm (poor) to -45 dBm (excellent).

RSRP (Reference Signal Received Power):
- 4G/5G downlink reference signal strength.
- Values around -120 dBm are weak, -80 dBm is strong.

RSRQ (Reference Signal Received Quality):
- Measures interference and quality.
- Higher values mean cleaner signal.

SINR (Signal to Interference + Noise Ratio):
- Represents signal quality versus interference.
- High SINR = better speed and stability.

Common Network Issues:
- Tower congestion during peak hours.
- Indoor coverage weakness.
- Interference from surrounding buildings.
- Temporary service degradation due to maintenance.

---------------------------------
2. DATA, SPEED & THROUGHPUT NOTES
---------------------------------
Data speed depends on:
- SINR
- RSRP strength
- Cell load
- Backhaul condition
- Device capability (4G, 5G SA/NSA)
- Band availability

4G Typical Speeds (EE Network):
- 47–130 Mbps depending on band and congestion.

5G Typical Speeds:
- 90–200 Mbps under normal coverage.
- Can exceed 400 Mbps in ideal NSA conditions.

-----------------------------------
3. SUBSCRIBER / ACCOUNT CONCEPTS
-----------------------------------
Prepaid:
- Recharge-based, no monthly commitment.

Postpaid:
- Billing cycle, credit limit, invoice generation.

ARPU (Average Revenue Per User):
- Total revenue per customer over time.

Churn Probability:
- Likelihood of a customer leaving the operator.

-------------------------------------------------
4. ROAMING KNOWLEDGE (EU, INDIA, CHINA, OTHERS)
-------------------------------------------------
EU Roaming:
- Treated like home usage under EU FUP (Fair Use Policy).
- Data limits vary between 12–35 GB.

India Roaming:
- Lycamobile UK supports data roaming.
- Calls and SMS are charged separately.

China Roaming:
- Available only on select Lycamobile plans.
- Data caps typically around 1–2 GB.

---------------------------------------
5. BILLING, PLAN & USAGE EXPLANATIONS
---------------------------------------
Plan Types:
- UK plans include Smart 5GB, Super Extra 50GB, Mega Plus 100GB, Unlimited.

Billing Components:
- Base plan charge
- Addons
- Taxes (VAT)
- Roaming charges
- International call rates
- Late fee if applicable

International Calling:
- Lycamobile includes minutes to 40–50 countries.
- Popular destinations: India, Pakistan, US, Poland, Malaysia.

-------------------------------------
6. CALL DETAIL RECORD (CDR) KNOWLEDGE
-------------------------------------
CDR Includes:
- Call duration
- Direction (incoming/outgoing)
- Termination cause (Dropped, Normal, Busy)
- Data usage (MB)
- IMSI/IMEI identifiers
- Tower ID at time of call

Reasons for drops:
- Handover failure
- Coverage gap
- Low SINR
- Tower outage

------------------------------------
7. VECTONE MOBILE (HISTORICAL FACTS)
------------------------------------
Vectone Mobile UK:
- Ceased operations in October 2023.
- Stopped service abruptly: no signal, outage, website non-functional.
- PAC codes were initially not provided.
- Many ex-users face routing issues even today.

Routing Issues:
- Calls and SMS from other networks may not reach Vectone-originated numbers.
- Only solution: change number after porting.

-----------------------------------
8. LYCAMOBILE UK (ACTIVE FACTS)
-----------------------------------
Lycamobile UK:
- Active MVNO running on EE network.
- Switched from O2 to EE in June 2023.
- Supports 4G/5G but NOT WiFi Calling or VoLTE.
- Offers eSIM activation within UK only.

5G Availability:
- Over 1,000 towns and cities covered via EE.

----------------------------------
9. TROUBLESHOOTING KNOWLEDGE BASE
----------------------------------
Common Solutions:
- Restart device to refresh network registration.
- Toggle airplane mode.
- Move to an open area or near a window.
- Lock device to 4G-only mode temporarily.
- Replace SIM if over 4–5 years old.

Slow Internet Causes:
- Tower congestion
- Weak indoor coverage
- Temporary maintenance
- High RLC/TCP retransmissions
- Poor SINR from interference

------------------------------------------
10. CUSTOMER-SERVICE STYLE CONVERSATIONS
------------------------------------------
Good behavior for telecom assistant:
- Empathetic tone
- Short, clear troubleshooting steps
- Provide reassurance:

Example:
"I understand how frustrating that can be. Let me help."

-----------------------------------------
END OF TELECOM GENERAL KNOWLEDGE PACK
-----------------------------------------
`;

  fs.writeFileSync(
    "dataset/knowledge/Telecom_Knowledge.txt",
    telecomKnowledge.trim()
  );



  //
  // ------------------------------------------------------------
  // 2. Operator_Policies.txt
  // ------------------------------------------------------------
  //
  const operatorPolicies = `
==============================
OPERATOR POLICY DEFINITIONS
==============================

----------------------------------------
1. LYCAMOBILE UK — ACTIVE OPERATOR (2025)
----------------------------------------
Network Policy:
- Runs on EE 4G/5G NSA.
- No support for VoLTE or WiFi Calling in the UK.
- eSIM activation supported only within the UK.
- Initial launch lacked Band 20 (800 MHz) coverage.

Roaming Policy:
- EU roaming supported with fair use cap (around 35 GB).
- India roaming: data-only usage allowed.
- China roaming: available only on select premium plans.
- Roaming usage beyond limits incurs additional charges.

International Calling Policy:
- Most UK plans include 100 free international minutes.
- Unlimited minutes available on All in One Plus plans.

Plan Policy:
- Black Friday promotions give 50% discount for first 3 months.
- Price freeze for PAYG & contract bundles until 2026.

----------------------------------------
2. VECTONE MOBILE — CEASED OPERATOR (2023)
----------------------------------------
Network Policy:
- Operated as MVNO on EE network.
- No access to 5G.
- Weak customer support availability historically.
- Outdated backend infrastructure contributed to shutdown.

Collapse Details:
- Full network outage around Oct 23, 2023.
- Services stopped abruptly → no signal, no incoming calls, no SMS.
- Website and customer support went offline.
- PAC codes delayed for several days.

Routing Issues:
- Many numbers originating from Vectone prefixes still have routing failures.
- Calls from networks like Smarty, iD Mobile fail to reach those numbers.
- Only permanent fix: change number after porting.

Customer Service Policy (Historical):
- Free texts to other Vectone users.
- International calling bundles available.
- Basic low-cost plans targeting migrant communities.

----------------------------------------
3. GENERAL TELECOM OPERATOR RULES
----------------------------------------
SIM Policies:
- All SIMs require KYC verification.
- Inactive SIMs >90 days may be deactivated.

Billing Policies:
- Charges are prorated during mid-cycle plan changes.
- VAT of 20% applied on all billable services.

Fair Use Policy:
- Prevents misuse of unlimited plans.
- Applies throttling after high-volume usage.

----------------------------------------
END OF OPERATOR POLICY FILE
----------------------------------------
`;

  fs.writeFileSync(
    "dataset/knowledge/Operator_Policies.txt",
    operatorPolicies.trim()
  );

  console.log("Generated: Telecom_Knowledge.txt & Operator_Policies.txt");
}
>>>>>>> c8bb3f8d18cd92f188778597717099c1ef9016d5
