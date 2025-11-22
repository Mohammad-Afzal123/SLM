<<<<<<< HEAD
// generators/voiceTroubleshooting.js
import { faker } from "@faker-js/faker";
import fs from "fs";

export async function generateVoiceTroubleshooting(count = 20000) {
  const file = fs.createWriteStream("dataset/conversations/Voice_Troubleshooting_Dialogs.jsonl");

  for (let i = 0; i < count; i++) {
    const issue = faker.helpers.arrayElement([
      "weak signal", "SIM error", "slow speed", "connection drop", "no internet", "high latency"
    ]);

    const response = faker.helpers.arrayElement([
      "You may experience weak signal indoors. Try moving near a window.",
      "Restarting your SIM services usually helps with registration errors.",
      "This seems like tower congestion. It usually clears up in 10-20 minutes.",
      "Your phone may be switching bands too often. Lock it to LTE/4G temporarily.",
      "I refreshed your profile from my side. Try toggling airplane mode."
    ]);

    file.write(JSON.stringify({
      user_issue: issue,
      assistant_voice_response: response
    }) + "\n");
  }

  file.end();
  console.log("Generated Voice_Troubleshooting_Dialogs.jsonl");
}
=======
// generators/voiceTroubleshooting.js
import { faker } from "@faker-js/faker";
import fs from "fs";

export async function generateVoiceTroubleshooting(count = 20000) {
  const file = fs.createWriteStream("dataset/conversations/Voice_Troubleshooting_Dialogs.jsonl");

  for (let i = 0; i < count; i++) {
    const issue = faker.helpers.arrayElement([
      "weak signal", "SIM error", "slow speed", "connection drop", "no internet", "high latency"
    ]);

    const response = faker.helpers.arrayElement([
      "You may experience weak signal indoors. Try moving near a window.",
      "Restarting your SIM services usually helps with registration errors.",
      "This seems like tower congestion. It usually clears up in 10-20 minutes.",
      "Your phone may be switching bands too often. Lock it to LTE/4G temporarily.",
      "I refreshed your profile from my side. Try toggling airplane mode."
    ]);

    file.write(JSON.stringify({
      user_issue: issue,
      assistant_voice_response: response
    }) + "\n");
  }

  file.end();
  console.log("Generated Voice_Troubleshooting_Dialogs.jsonl");
}
>>>>>>> c8bb3f8d18cd92f188778597717099c1ef9016d5
