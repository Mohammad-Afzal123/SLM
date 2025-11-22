<<<<<<< HEAD
// generate_full_dataset.js

import { setupFolders } from "./utils/setupFolders.js";
import { generateCompanies } from "./generators/companies.js";
import { generateTelecomConversations } from "./generators/conversations.js";
import { generateVoiceTroubleshooting } from "./generators/voiceTroubleshooting.js";
import { generateKnowledge } from "./generators/knowledge.js";
import { generateVoiceFiles } from "./generators/voiceStyles.js";

import fs from "fs";

async function main() {
  await setupFolders();

  fs.writeFileSync("dataset/structured/Companies.json", JSON.stringify(generateCompanies(), null, 2));

  await generateKnowledge();
  await generateVoiceFiles();
  await generateTelecomConversations(50000);
  await generateVoiceTroubleshooting(20000);

  console.log("Full dataset generated successfully.");
}

main();
=======
// generate_full_dataset.js

import { setupFolders } from "./utils/setupFolders.js";
import { generateCompanies } from "./generators/companies.js";
import { generateTelecomConversations } from "./generators/conversations.js";
import { generateVoiceTroubleshooting } from "./generators/voiceTroubleshooting.js";
import { generateKnowledge } from "./generators/knowledge.js";
import { generateVoiceFiles } from "./generators/voiceStyles.js";

import fs from "fs";

async function main() {
  await setupFolders();

  fs.writeFileSync("dataset/structured/Companies.json", JSON.stringify(generateCompanies(), null, 2));

  await generateKnowledge();
  await generateVoiceFiles();
  await generateTelecomConversations(50000);
  await generateVoiceTroubleshooting(20000);

  console.log("Full dataset generated successfully.");
}

main();
>>>>>>> c8bb3f8d18cd92f188778597717099c1ef9016d5
