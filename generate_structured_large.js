<<<<<<< HEAD
// generate_structured_large.js
// Node 18+ required
import fs from "fs";
import fse from "fs-extra";
import { faker } from "@faker-js/faker";

faker.seed(12345); // deterministic but optional — remove or change for more randomness

// ---------- CONFIG ----------
const OUT_DIR = "dataset/structured";
const COMPANIES_JSON = "dataset/structured/Companies.json";

const SIZES = {
  subscribers: 250_000,
  network: 100_000,
  cdr: 1_000_000,
  billing: 500_000,
  crm: 300_000,
  iot: 200_000,
  compliance: 300_000
};

// ---------- UTIL ----------
// CSV escape for values (wrap in double quotes, escape embedded quotes)
function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  // if contains newline, quote, or comma, wrap in quotes and escape inner quotes
  if (/[,"\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

// Write header line
function writeHeader(stream, keys) {
  stream.write(keys.map(csvEscape).join(",") + "\n");
}

// Async-safe write with backpressure handling
async function safeWrite(stream, text) {
  if (!stream.write(text)) {
    await new Promise((res) => stream.once("drain", res));
  }
}

// ---------- COMPANY META ----------
function writeCompanies() {
  const companies = [
    {
      operator_name: "Lycamobile UK",
      status: "Active",
      director: "Aiadurai Sivasamy Premananthan",
      company_number: "05903820",
      registered_address: "3rd Floor Walbrook Building, 195 Marsh Wall, London, E14 9SG",
      notes: "MVNO on EE since June 2023 — 4G/5G access, eSIM available, WiFi calling/VoLTE not supported (Nov 2025)."
    },
    {
      operator_name: "Vectone Mobile",
      status: "Ceased",
      director: "Baskaran Allirajah",
      company_number: "04553934",
      registered_address: "Level 18, 40 Bank Street, London, E14 5NR",
      notes: "Ceased UK operations Oct 2023; legacy routing issues for some ported numbers."
    }
  ];
  fse.ensureDirSync(OUT_DIR);
  fs.writeFileSync(COMPANIES_JSON, JSON.stringify(companies, null, 2), "utf8");
  console.log("Wrote Companies.json");
}

// ---------- RECORD GENERATORS ----------
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
const rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rndFloat = (min, max, d = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(d));

// Subscribers record
function genSubscriber(idx) {
  // bias: 93% Lycamobile, 7% Vectone (historical)
  const isVectone = Math.random() < 0.07;
  const operator = isVectone ? "Vectone Mobile" : "Lycamobile UK";
  const activation = faker.date.past({ years: 5 }).toISOString();

  return {
    customer_id: faker.string.uuid(),
    account_number: faker.finance.accountNumber(),
    operator_name: operator,
    operator_status: isVectone ? "Ceased" : "Active",
    operator_director: isVectone ? "Baskaran Allirajah" : "Aiadurai Sivasamy Premananthan",
    operator_company_number: isVectone ? "04553934" : "05903820",
    operator_registered_address: isVectone ? "Level 18, 40 Bank Street, London, E14 5NR" : "3rd Floor Walbrook Building, 195 Marsh Wall, London, E14 9SG",
    subscriber_type: pick(["Prepaid","Postpaid"]),
    plan_name: pick(["UK Plan Smart 5GB","National Plus 30GB","UK Plan Super Extra 50GB","UK Plan Mega Plus 100GB","UK Plan Unlimited"]),
    data_balance_gb: rndInt(0, 500),
    talktime_balance_min: rndInt(0, 3000),
    arpu: rndFloat(2, 60),
    churn_probability: rndFloat(0,1,4),
    complaint_count: rndInt(0,10),
    last_recharge: faker.date.recent({ days: 120 }).toISOString(),
    recharge_freq_per_month: rndInt(0, 20),
    payment_method: pick(["Card","PayPal","Direct Debit","Voucher"]),
    clv: rndFloat(5, 4000),
    credit_limit: rndInt(0, 1000),
    sim_activation_date: activation,
    kyc_verified: pick(["Yes","No"]),
    location_city: faker.location.city(),
    tower_id: rndInt(1000,9999),
    roaming_status: pick(["Home","EU Roaming","India Roaming","China Roaming"]),
    call_drop_rate_pct: rndFloat(0, 12),
    avg_call_duration_sec: rndInt(10, 1200),
    data_usage_gb_per_day: rndFloat(0, 30),
    ott_usage: pick(["YouTube","Netflix","WhatsApp","None","Facebook"]),
    devices_linked: rndInt(1,6),
    handset_model: pick(["Samsung A52","iPhone 13","OnePlus 9","Pixel 6","Samsung S22"]),
    sim_slot: pick(["SIM1","SIM2"]),
    network_pref: pick(["4G","5G","Auto"]),
    age_group: pick(["18-25","26-35","36-50","50+"]),
    gender: pick(["M","F","O"]),
    language_pref: pick(["English","Hindi","Polish","Urdu"]),
    sentiment_score: rndInt(-10,10),
    interaction_channel: pick(["IVR","Chat","App","Store"]),
    vectone_routing_issue: isVectone && Math.random() < 0.3 ? "Yes" : "No",
    vectone_historical_origin: isVectone ? "Yes" : "No"
  };
}

// Network record
function genNetwork(idx) {
  return {
    cell_id: 10000 + idx,
    enodeb_id: rndInt(1000,9999),
    sector_id: rndInt(1,3),
    rssi_dbm: rndInt(-110,-45),
    rsrp_dbm: rndInt(-120,-70),
    rsrq_db: rndInt(-20,-3),
    sinr_db: rndFloat(-10,35),
    uplink_mbps: rndFloat(0.1,200),
    downlink_mbps: rndFloat(0.5,1000),
    cssr_pct: rndInt(50,100),
    hosr_pct: rndInt(50,100),
    packet_loss_pct: rndFloat(0,10),
    latency_ms: rndInt(5,400),
    cqi: rndInt(1,15),
    prb_util_pct: rndInt(1,100),
    mcs_index_dl: rndInt(0,28),
    mcs_index_ul: rndInt(0,28),
    snr_db: rndFloat(-10,30),
    tx_power_dbm: rndInt(5,45),
    band: pick(["700MHz","800MHz","1800MHz","2100MHz","2600MHz"]),
    carrier_agg_count: rndInt(1,5),
    mode: pick(["4G","5G NSA","5G SA"]),
    neighbor_cell_count: rndInt(1,20),
    interference_level: rndInt(0,10),
    cell_load_pct: rndInt(1,100),
    backhaul_usage_pct: rndInt(0,100)
  };
}

// CDR record (lighter text fields)
function genCdr(customer_id, tower_id) {
  const start = faker.date.recent({ days: 30 });
  const dur = rndInt(0, 3600);
  const callType = pick(["Voice","SMS","Data"]);
  return {
    call_id: faker.string.uuid(),
    customer_id,
    calling_number: faker.phone.number("+44##########"),
    called_number: faker.phone.number("+44##########"),
    start_time: start.toISOString(),
    end_time: new Date(start.getTime() + dur*1000).toISOString(),
    call_duration_sec: dur,
    call_type: callType,
    direction: pick(["Incoming","Outgoing"]),
    imei: faker.phone.imei(),
    imsi: "234" + String(rndInt(1e9, 9e9)).slice(0,10),
    cell_tower_id: tower_id,
    termination_cause: pick(["Normal","Dropped","Busy","Failed"]),
    roaming_flag: pick(["Yes","No"]),
    data_volume_mb: callType === "Data" ? rndFloat(0.1,4000) : 0,
    protocol: pick(["TCP","UDP"]),
    app_category: pick(["Social","Video","Messaging","Gaming","Browser"]),
    vectone_routing_issue: pick(["Yes","No"])
  };
}

// Billing record
function genBilling(customer_id) {
  const start = faker.date.past({ years: 1 });
  const base = rndFloat(3,50);
  const addons = rndFloat(0,40);
  const tax = parseFloat(((base + addons) * 0.20).toFixed(2));
  const total = parseFloat((base + addons + tax).toFixed(2));
  return {
    invoice_id: faker.string.uuid(),
    customer_id,
    billing_cycle_start: start.toISOString(),
    billing_cycle_end: new Date(start.getTime() + 30*24*3600*1000).toISOString(),
    base_plan_charge: base,
    addons,
    tax_amount: tax,
    payment_status: pick(["Paid","Pending"]),
    payment_channel: pick(["Card","Direct Debit","Voucher"]),
    late_fee: rndFloat(0,30),
    total_amount: total,
    discounts: rndFloat(0,25),
    usage_charges: rndFloat(0,100),
    roaming_charges: rndFloat(0,200),
    refunds: rndFloat(0,200),
    pending_dues: rndFloat(0,500)
  };
}

// CRM ticket
function genCrm(customer_id) {
  const created = faker.date.recent({ days: 180 });
  const closed = new Date(created.getTime() + rndInt(1,30)*24*3600*1000);
  return {
    ticket_id: faker.string.uuid(),
    customer_id,
    issue_category: pick(["Network","Billing","SIM","Plan","Routing"]),
    priority: pick(["High","Medium","Low"]),
    sla_time_hours: rndInt(1,72),
    ticket_created: created.toISOString(),
    ticket_closed: closed.toISOString(),
    first_response_min: rndInt(1,720),
    resolution_time_hours: rndInt(1,168),
    agent_id: rndInt(1000,9999),
    csat_score: rndInt(1,5),
    escalation_count: rndInt(0,4),
    ticket_sentiment_score: rndInt(-10,10)
  };
}

// IoT device record
function genIot(customer_id) {
  return {
    device_id: faker.string.uuid(),
    customer_id,
    device_type: pick(["Router","Modem","IoT Sensor","Wearable"]),
    imei: faker.phone.imei(),
    firmware_version: `v${rndInt(1,10)}.${rndInt(0,9)}`,
    battery_status_pct: rndInt(0,100),
    device_location: faker.location.city(),
    data_sent_mb: rndFloat(0,4000),
    data_received_mb: rndFloat(0,6000),
    connection_status: pick(["Online","Offline"]),
    firmware_update_time: faker.date.recent({ days: 120 }).toISOString()
  };
}

// Compliance record
function genCompliance(customer_id, kyc) {
  return {
    compliance_id: faker.string.uuid(),
    customer_id,
    kyc_verified: kyc,
    lawful_intercept_flag: pick(["Yes","No"]),
    privacy_consent: pick(["Yes","No"]),
    dnd_status: pick(["Yes","No"]),
    fraud_score: rndInt(0,100),
    blacklist_flag: pick(["Yes","No"]),
    policy_violations_count: rndInt(0,10)
  };
}

// ---------- STREAM-WRITING LOGIC ----------
async function generateCsvStream(filePath, keys, recordGenerator, count, options = {}) {
  const stream = fs.createWriteStream(filePath, { encoding: "utf8" });
  writeHeader(stream, keys);
  for (let i = 0; i < count; i++) {
    const rec = recordGenerator(i);
    const line = keys.map(k => csvEscape(rec[k])).join(",") + "\n";
    await safeWrite(stream, line);
    if ((i+1) % 100000 === 0) {
      console.log(`${filePath}: ${i+1} rows written`);
    }
  }
  stream.end();
  await new Promise((res) => stream.on("finish", res));
  console.log(`Completed ${filePath} (${count} rows)`);
}

// ---------- DRIVER ----------
async function main() {
  console.log("Preparing output folder...");
  fse.ensureDirSync(OUT_DIR);
  writeCompanies();

  // 1) Subscribers: we need to keep generated customer_ids in memory to generate other files
  const subscribersFile = `${OUT_DIR}/Subscribers.csv`;
  const subKeys = Object.keys(genSubscriber(0));
  console.log("Generating subscribers (large)...");
  // We'll stream subscribers and *also* keep sample of customer_id -> tower_id -> kyc for relational joins.
  const subsStream = fs.createWriteStream(subscribersFile, { encoding: "utf8" });
  writeHeader(subsStream, subKeys);
  const idIndex = []; // keep pairs of [customer_id, tower_id, kyc]
  for (let i = 0; i < SIZES.subscribers; i++) {
    const rec = genSubscriber(i);
    const line = subKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!subsStream.write(line)) await new Promise(r => subsStream.once("drain", r));
    // store necessary linking info
    idIndex.push({ customer_id: rec.customer_id, tower_id: rec.tower_id, kyc_verified: rec.kyc_verified });
    if ((i+1) % 50000 === 0) console.log(`Subscribers: ${i+1}/${SIZES.subscribers}`);
  }
  subsStream.end();
  await new Promise(res => subsStream.on("finish", res));
  console.log("Subscribers generation complete.");

  // 2) Network (independent)
  await generateCsvStream(`${OUT_DIR}/Network.csv`, Object.keys(genNetwork(0)), (i)=>genNetwork(i), SIZES.network);

  // 3) CDR: for each customer generate a number of CDRs until we reach the target count.
  console.log("Generating CDRs (streaming)...");
  const cdrFile = `${OUT_DIR}/CDR.csv`;
  const cdrKeys = Object.keys(genCdr("cust", 1000));
  const cdrStream = fs.createWriteStream(cdrFile, { encoding: "utf8" });
  writeHeader(cdrStream, cdrKeys);

  let generatedCdrs = 0;
  // iterate customers repeatedly to create fair distribution
  let custIdx = 0;
  while (generatedCdrs < SIZES.cdr) {
    const idx = custIdx % idIndex.length;
    const cust = idIndex[idx];
    const rec = genCdr(cust.customer_id, cust.tower_id);
    const line = cdrKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!cdrStream.write(line)) await new Promise(r => cdrStream.once("drain", r));
    generatedCdrs++;
    custIdx++;
    if (generatedCdrs % 100000 === 0) console.log(`CDR rows written: ${generatedCdrs}/${SIZES.cdr}`);
  }

  cdrStream.end();
  await new Promise(res => cdrStream.on("finish", res));
  console.log("CDR generation complete.");

  // 4) Billing: generate roughly SIZES.billing invoices across customers
  console.log("Generating Billing records...");
  const billingFile = `${OUT_DIR}/Billing.csv`;
  const billKeys = Object.keys(genBilling("cust"));
  const billStream = fs.createWriteStream(billingFile, { encoding: "utf8" });
  writeHeader(billStream, billKeys);

  for (let i = 0; i < SIZES.billing; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genBilling(cust.customer_id);
    const line = billKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!billStream.write(line)) await new Promise(r => billStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`Billing rows written: ${i+1}/${SIZES.billing}`);
  }
  billStream.end();
  await new Promise(res => billStream.on("finish", res));
  console.log("Billing generation complete.");

  // 5) CRM tickets
  console.log("Generating CRM tickets...");
  const crmFile = `${OUT_DIR}/CRM.csv`;
  const crmKeys = Object.keys(genCrm("cust"));
  const crmStream = fs.createWriteStream(crmFile, { encoding: "utf8" });
  writeHeader(crmStream, crmKeys);
  for (let i = 0; i < SIZES.crm; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genCrm(cust.customer_id);
    const line = crmKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!crmStream.write(line)) await new Promise(r => crmStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`CRM rows written: ${i+1}/${SIZES.crm}`);
  }
  crmStream.end();
  await new Promise(res => crmStream.on("finish", res));
  console.log("CRM generation complete.");

  // 6) IoT
  console.log("Generating IoT devices...");
  const iotFile = `${OUT_DIR}/IoT.csv`;
  const iotKeys = Object.keys(genIot("cust"));
  const iotStream = fs.createWriteStream(iotFile, { encoding: "utf8" });
  writeHeader(iotStream, iotKeys);
  for (let i = 0; i < SIZES.iot; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genIot(cust.customer_id);
    const line = iotKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!iotStream.write(line)) await new Promise(r => iotStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`IoT rows written: ${i+1}/${SIZES.iot}`);
  }
  iotStream.end();
  await new Promise(res => iotStream.on("finish", res));
  console.log("IoT generation complete.");

  // 7) Compliance
  console.log("Generating Compliance records...");
  const compFile = `${OUT_DIR}/Compliance.csv`;
  const compKeys = Object.keys(genCompliance("cust", "Yes"));
  const compStream = fs.createWriteStream(compFile, { encoding: "utf8" });
  writeHeader(compStream, compKeys);
  for (let i = 0; i < SIZES.compliance; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genCompliance(cust.customer_id, cust.kyc_verified);
    const line = compKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!compStream.write(line)) await new Promise(r => compStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`Compliance rows written: ${i+1}/${SIZES.compliance}`);
  }
  compStream.end();
  await new Promise(res => compStream.on("finish", res));
  console.log("Compliance generation complete.");

  console.log("All structured CSVs generated in:", OUT_DIR);
}

main().catch(err => {
  console.error("Error during generation:", err);
  process.exit(1);
});
=======
// generate_structured_large.js
// Node 18+ required
import fs from "fs";
import fse from "fs-extra";
import { faker } from "@faker-js/faker";

faker.seed(12345); // deterministic but optional — remove or change for more randomness

// ---------- CONFIG ----------
const OUT_DIR = "dataset/structured";
const COMPANIES_JSON = "dataset/structured/Companies.json";

const SIZES = {
  subscribers: 250_000,
  network: 100_000,
  cdr: 1_000_000,
  billing: 500_000,
  crm: 300_000,
  iot: 200_000,
  compliance: 300_000
};

// ---------- UTIL ----------
// CSV escape for values (wrap in double quotes, escape embedded quotes)
function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  // if contains newline, quote, or comma, wrap in quotes and escape inner quotes
  if (/[,"\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

// Write header line
function writeHeader(stream, keys) {
  stream.write(keys.map(csvEscape).join(",") + "\n");
}

// Async-safe write with backpressure handling
async function safeWrite(stream, text) {
  if (!stream.write(text)) {
    await new Promise((res) => stream.once("drain", res));
  }
}

// ---------- COMPANY META ----------
function writeCompanies() {
  const companies = [
    {
      operator_name: "Lycamobile UK",
      status: "Active",
      director: "Aiadurai Sivasamy Premananthan",
      company_number: "05903820",
      registered_address: "3rd Floor Walbrook Building, 195 Marsh Wall, London, E14 9SG",
      notes: "MVNO on EE since June 2023 — 4G/5G access, eSIM available, WiFi calling/VoLTE not supported (Nov 2025)."
    },
    {
      operator_name: "Vectone Mobile",
      status: "Ceased",
      director: "Baskaran Allirajah",
      company_number: "04553934",
      registered_address: "Level 18, 40 Bank Street, London, E14 5NR",
      notes: "Ceased UK operations Oct 2023; legacy routing issues for some ported numbers."
    }
  ];
  fse.ensureDirSync(OUT_DIR);
  fs.writeFileSync(COMPANIES_JSON, JSON.stringify(companies, null, 2), "utf8");
  console.log("Wrote Companies.json");
}

// ---------- RECORD GENERATORS ----------
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
const rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rndFloat = (min, max, d = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(d));

// Subscribers record
function genSubscriber(idx) {
  // bias: 93% Lycamobile, 7% Vectone (historical)
  const isVectone = Math.random() < 0.07;
  const operator = isVectone ? "Vectone Mobile" : "Lycamobile UK";
  const activation = faker.date.past({ years: 5 }).toISOString();

  return {
    customer_id: faker.string.uuid(),
    account_number: faker.finance.accountNumber(),
    operator_name: operator,
    operator_status: isVectone ? "Ceased" : "Active",
    operator_director: isVectone ? "Baskaran Allirajah" : "Aiadurai Sivasamy Premananthan",
    operator_company_number: isVectone ? "04553934" : "05903820",
    operator_registered_address: isVectone ? "Level 18, 40 Bank Street, London, E14 5NR" : "3rd Floor Walbrook Building, 195 Marsh Wall, London, E14 9SG",
    subscriber_type: pick(["Prepaid","Postpaid"]),
    plan_name: pick(["UK Plan Smart 5GB","National Plus 30GB","UK Plan Super Extra 50GB","UK Plan Mega Plus 100GB","UK Plan Unlimited"]),
    data_balance_gb: rndInt(0, 500),
    talktime_balance_min: rndInt(0, 3000),
    arpu: rndFloat(2, 60),
    churn_probability: rndFloat(0,1,4),
    complaint_count: rndInt(0,10),
    last_recharge: faker.date.recent({ days: 120 }).toISOString(),
    recharge_freq_per_month: rndInt(0, 20),
    payment_method: pick(["Card","PayPal","Direct Debit","Voucher"]),
    clv: rndFloat(5, 4000),
    credit_limit: rndInt(0, 1000),
    sim_activation_date: activation,
    kyc_verified: pick(["Yes","No"]),
    location_city: faker.location.city(),
    tower_id: rndInt(1000,9999),
    roaming_status: pick(["Home","EU Roaming","India Roaming","China Roaming"]),
    call_drop_rate_pct: rndFloat(0, 12),
    avg_call_duration_sec: rndInt(10, 1200),
    data_usage_gb_per_day: rndFloat(0, 30),
    ott_usage: pick(["YouTube","Netflix","WhatsApp","None","Facebook"]),
    devices_linked: rndInt(1,6),
    handset_model: pick(["Samsung A52","iPhone 13","OnePlus 9","Pixel 6","Samsung S22"]),
    sim_slot: pick(["SIM1","SIM2"]),
    network_pref: pick(["4G","5G","Auto"]),
    age_group: pick(["18-25","26-35","36-50","50+"]),
    gender: pick(["M","F","O"]),
    language_pref: pick(["English","Hindi","Polish","Urdu"]),
    sentiment_score: rndInt(-10,10),
    interaction_channel: pick(["IVR","Chat","App","Store"]),
    vectone_routing_issue: isVectone && Math.random() < 0.3 ? "Yes" : "No",
    vectone_historical_origin: isVectone ? "Yes" : "No"
  };
}

// Network record
function genNetwork(idx) {
  return {
    cell_id: 10000 + idx,
    enodeb_id: rndInt(1000,9999),
    sector_id: rndInt(1,3),
    rssi_dbm: rndInt(-110,-45),
    rsrp_dbm: rndInt(-120,-70),
    rsrq_db: rndInt(-20,-3),
    sinr_db: rndFloat(-10,35),
    uplink_mbps: rndFloat(0.1,200),
    downlink_mbps: rndFloat(0.5,1000),
    cssr_pct: rndInt(50,100),
    hosr_pct: rndInt(50,100),
    packet_loss_pct: rndFloat(0,10),
    latency_ms: rndInt(5,400),
    cqi: rndInt(1,15),
    prb_util_pct: rndInt(1,100),
    mcs_index_dl: rndInt(0,28),
    mcs_index_ul: rndInt(0,28),
    snr_db: rndFloat(-10,30),
    tx_power_dbm: rndInt(5,45),
    band: pick(["700MHz","800MHz","1800MHz","2100MHz","2600MHz"]),
    carrier_agg_count: rndInt(1,5),
    mode: pick(["4G","5G NSA","5G SA"]),
    neighbor_cell_count: rndInt(1,20),
    interference_level: rndInt(0,10),
    cell_load_pct: rndInt(1,100),
    backhaul_usage_pct: rndInt(0,100)
  };
}

// CDR record (lighter text fields)
function genCdr(customer_id, tower_id) {
  const start = faker.date.recent({ days: 30 });
  const dur = rndInt(0, 3600);
  const callType = pick(["Voice","SMS","Data"]);
  return {
    call_id: faker.string.uuid(),
    customer_id,
    calling_number: faker.phone.number("+44##########"),
    called_number: faker.phone.number("+44##########"),
    start_time: start.toISOString(),
    end_time: new Date(start.getTime() + dur*1000).toISOString(),
    call_duration_sec: dur,
    call_type: callType,
    direction: pick(["Incoming","Outgoing"]),
    imei: faker.phone.imei(),
    imsi: "234" + String(rndInt(1e9, 9e9)).slice(0,10),
    cell_tower_id: tower_id,
    termination_cause: pick(["Normal","Dropped","Busy","Failed"]),
    roaming_flag: pick(["Yes","No"]),
    data_volume_mb: callType === "Data" ? rndFloat(0.1,4000) : 0,
    protocol: pick(["TCP","UDP"]),
    app_category: pick(["Social","Video","Messaging","Gaming","Browser"]),
    vectone_routing_issue: pick(["Yes","No"])
  };
}

// Billing record
function genBilling(customer_id) {
  const start = faker.date.past({ years: 1 });
  const base = rndFloat(3,50);
  const addons = rndFloat(0,40);
  const tax = parseFloat(((base + addons) * 0.20).toFixed(2));
  const total = parseFloat((base + addons + tax).toFixed(2));
  return {
    invoice_id: faker.string.uuid(),
    customer_id,
    billing_cycle_start: start.toISOString(),
    billing_cycle_end: new Date(start.getTime() + 30*24*3600*1000).toISOString(),
    base_plan_charge: base,
    addons,
    tax_amount: tax,
    payment_status: pick(["Paid","Pending"]),
    payment_channel: pick(["Card","Direct Debit","Voucher"]),
    late_fee: rndFloat(0,30),
    total_amount: total,
    discounts: rndFloat(0,25),
    usage_charges: rndFloat(0,100),
    roaming_charges: rndFloat(0,200),
    refunds: rndFloat(0,200),
    pending_dues: rndFloat(0,500)
  };
}

// CRM ticket
function genCrm(customer_id) {
  const created = faker.date.recent({ days: 180 });
  const closed = new Date(created.getTime() + rndInt(1,30)*24*3600*1000);
  return {
    ticket_id: faker.string.uuid(),
    customer_id,
    issue_category: pick(["Network","Billing","SIM","Plan","Routing"]),
    priority: pick(["High","Medium","Low"]),
    sla_time_hours: rndInt(1,72),
    ticket_created: created.toISOString(),
    ticket_closed: closed.toISOString(),
    first_response_min: rndInt(1,720),
    resolution_time_hours: rndInt(1,168),
    agent_id: rndInt(1000,9999),
    csat_score: rndInt(1,5),
    escalation_count: rndInt(0,4),
    ticket_sentiment_score: rndInt(-10,10)
  };
}

// IoT device record
function genIot(customer_id) {
  return {
    device_id: faker.string.uuid(),
    customer_id,
    device_type: pick(["Router","Modem","IoT Sensor","Wearable"]),
    imei: faker.phone.imei(),
    firmware_version: `v${rndInt(1,10)}.${rndInt(0,9)}`,
    battery_status_pct: rndInt(0,100),
    device_location: faker.location.city(),
    data_sent_mb: rndFloat(0,4000),
    data_received_mb: rndFloat(0,6000),
    connection_status: pick(["Online","Offline"]),
    firmware_update_time: faker.date.recent({ days: 120 }).toISOString()
  };
}

// Compliance record
function genCompliance(customer_id, kyc) {
  return {
    compliance_id: faker.string.uuid(),
    customer_id,
    kyc_verified: kyc,
    lawful_intercept_flag: pick(["Yes","No"]),
    privacy_consent: pick(["Yes","No"]),
    dnd_status: pick(["Yes","No"]),
    fraud_score: rndInt(0,100),
    blacklist_flag: pick(["Yes","No"]),
    policy_violations_count: rndInt(0,10)
  };
}

// ---------- STREAM-WRITING LOGIC ----------
async function generateCsvStream(filePath, keys, recordGenerator, count, options = {}) {
  const stream = fs.createWriteStream(filePath, { encoding: "utf8" });
  writeHeader(stream, keys);
  for (let i = 0; i < count; i++) {
    const rec = recordGenerator(i);
    const line = keys.map(k => csvEscape(rec[k])).join(",") + "\n";
    await safeWrite(stream, line);
    if ((i+1) % 100000 === 0) {
      console.log(`${filePath}: ${i+1} rows written`);
    }
  }
  stream.end();
  await new Promise((res) => stream.on("finish", res));
  console.log(`Completed ${filePath} (${count} rows)`);
}

// ---------- DRIVER ----------
async function main() {
  console.log("Preparing output folder...");
  fse.ensureDirSync(OUT_DIR);
  writeCompanies();

  // 1) Subscribers: we need to keep generated customer_ids in memory to generate other files
  const subscribersFile = `${OUT_DIR}/Subscribers.csv`;
  const subKeys = Object.keys(genSubscriber(0));
  console.log("Generating subscribers (large)...");
  // We'll stream subscribers and *also* keep sample of customer_id -> tower_id -> kyc for relational joins.
  const subsStream = fs.createWriteStream(subscribersFile, { encoding: "utf8" });
  writeHeader(subsStream, subKeys);
  const idIndex = []; // keep pairs of [customer_id, tower_id, kyc]
  for (let i = 0; i < SIZES.subscribers; i++) {
    const rec = genSubscriber(i);
    const line = subKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!subsStream.write(line)) await new Promise(r => subsStream.once("drain", r));
    // store necessary linking info
    idIndex.push({ customer_id: rec.customer_id, tower_id: rec.tower_id, kyc_verified: rec.kyc_verified });
    if ((i+1) % 50000 === 0) console.log(`Subscribers: ${i+1}/${SIZES.subscribers}`);
  }
  subsStream.end();
  await new Promise(res => subsStream.on("finish", res));
  console.log("Subscribers generation complete.");

  // 2) Network (independent)
  await generateCsvStream(`${OUT_DIR}/Network.csv`, Object.keys(genNetwork(0)), (i)=>genNetwork(i), SIZES.network);

  // 3) CDR: for each customer generate a number of CDRs until we reach the target count.
  console.log("Generating CDRs (streaming)...");
  const cdrFile = `${OUT_DIR}/CDR.csv`;
  const cdrKeys = Object.keys(genCdr("cust", 1000));
  const cdrStream = fs.createWriteStream(cdrFile, { encoding: "utf8" });
  writeHeader(cdrStream, cdrKeys);

  let generatedCdrs = 0;
  // iterate customers repeatedly to create fair distribution
  let custIdx = 0;
  while (generatedCdrs < SIZES.cdr) {
    const idx = custIdx % idIndex.length;
    const cust = idIndex[idx];
    const rec = genCdr(cust.customer_id, cust.tower_id);
    const line = cdrKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!cdrStream.write(line)) await new Promise(r => cdrStream.once("drain", r));
    generatedCdrs++;
    custIdx++;
    if (generatedCdrs % 100000 === 0) console.log(`CDR rows written: ${generatedCdrs}/${SIZES.cdr}`);
  }

  cdrStream.end();
  await new Promise(res => cdrStream.on("finish", res));
  console.log("CDR generation complete.");

  // 4) Billing: generate roughly SIZES.billing invoices across customers
  console.log("Generating Billing records...");
  const billingFile = `${OUT_DIR}/Billing.csv`;
  const billKeys = Object.keys(genBilling("cust"));
  const billStream = fs.createWriteStream(billingFile, { encoding: "utf8" });
  writeHeader(billStream, billKeys);

  for (let i = 0; i < SIZES.billing; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genBilling(cust.customer_id);
    const line = billKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!billStream.write(line)) await new Promise(r => billStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`Billing rows written: ${i+1}/${SIZES.billing}`);
  }
  billStream.end();
  await new Promise(res => billStream.on("finish", res));
  console.log("Billing generation complete.");

  // 5) CRM tickets
  console.log("Generating CRM tickets...");
  const crmFile = `${OUT_DIR}/CRM.csv`;
  const crmKeys = Object.keys(genCrm("cust"));
  const crmStream = fs.createWriteStream(crmFile, { encoding: "utf8" });
  writeHeader(crmStream, crmKeys);
  for (let i = 0; i < SIZES.crm; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genCrm(cust.customer_id);
    const line = crmKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!crmStream.write(line)) await new Promise(r => crmStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`CRM rows written: ${i+1}/${SIZES.crm}`);
  }
  crmStream.end();
  await new Promise(res => crmStream.on("finish", res));
  console.log("CRM generation complete.");

  // 6) IoT
  console.log("Generating IoT devices...");
  const iotFile = `${OUT_DIR}/IoT.csv`;
  const iotKeys = Object.keys(genIot("cust"));
  const iotStream = fs.createWriteStream(iotFile, { encoding: "utf8" });
  writeHeader(iotStream, iotKeys);
  for (let i = 0; i < SIZES.iot; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genIot(cust.customer_id);
    const line = iotKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!iotStream.write(line)) await new Promise(r => iotStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`IoT rows written: ${i+1}/${SIZES.iot}`);
  }
  iotStream.end();
  await new Promise(res => iotStream.on("finish", res));
  console.log("IoT generation complete.");

  // 7) Compliance
  console.log("Generating Compliance records...");
  const compFile = `${OUT_DIR}/Compliance.csv`;
  const compKeys = Object.keys(genCompliance("cust", "Yes"));
  const compStream = fs.createWriteStream(compFile, { encoding: "utf8" });
  writeHeader(compStream, compKeys);
  for (let i = 0; i < SIZES.compliance; i++) {
    const cust = idIndex[i % idIndex.length];
    const rec = genCompliance(cust.customer_id, cust.kyc_verified);
    const line = compKeys.map(k => csvEscape(rec[k])).join(",") + "\n";
    if (!compStream.write(line)) await new Promise(r => compStream.once("drain", r));
    if ((i+1) % 100000 === 0) console.log(`Compliance rows written: ${i+1}/${SIZES.compliance}`);
  }
  compStream.end();
  await new Promise(res => compStream.on("finish", res));
  console.log("Compliance generation complete.");

  console.log("All structured CSVs generated in:", OUT_DIR);
}

main().catch(err => {
  console.error("Error during generation:", err);
  process.exit(1);
});
>>>>>>> c8bb3f8d18cd92f188778597717099c1ef9016d5
