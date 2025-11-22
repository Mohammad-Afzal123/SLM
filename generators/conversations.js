<<<<<<< HEAD
// generators/conversations.js
import { faker } from "@faker-js/faker";
import fs from "fs";

function randomIssue() {
  return faker.helpers.arrayElement([
    "slow internet",
    "no signal",
    "SIM not detected",
    "data not working",
    "roaming not activating",
    "billing dispute",
    "unknown charges",
    "plan upgrade",
    "porting issue",
    "Vectone routing failure",
    "VoLTE not supported on Lycamobile"
  ]);
}

function generateDialogue() {
  const issue = randomIssue();

  return [
    { speaker: "user", text: `Hi, I'm facing ${issue} today.` },
    { speaker: "assistant", text: faker.helpers.arrayElement([
        "I understand. Let me check that for you.",
        "Okay, give me a moment to look into this.",
        "Sure, I’ll take a quick look at your connection."
    ])},
    { speaker: "assistant", text: faker.helpers.arrayElement([
        "It seems like your cell tower is congested right now.",
        "I see a temporary outage affecting your area.",
        "Your signal strength looks weak indoors.",
        "Your SIM registration shows a delay in VoLTE activation.",
        "There is a routing issue caused by the original Vectone number prefix."
    ])},
    { speaker: "user", text: "What should I do now?" },
    { speaker: "assistant", text: faker.helpers.arrayElement([
        "Try restarting your device once.",
        "Move near a window for better signal.",
        "I recommend switching to 4G-only mode temporarily.",
        "Give it 10–15 minutes, the network is stabilizing.",
        "I’ll refresh your network registration from my side."
    ])}
  ];
}

export async function generateTelecomConversations(count = 50000) {
  const file = fs.createWriteStream("dataset/conversations/Telecom_Conversations.jsonl");

  for (let i = 0; i < count; i++) {
    const convo = { dialogue: generateDialogue() };
    file.write(JSON.stringify(convo) + "\n");
  }

  file.end();
  console.log("Generated Telecom_Conversations.jsonl");
}
=======
// generators/conversations.js
import { faker } from "@faker-js/faker";
import fs from "fs";

function randomIssue() {
  return faker.helpers.arrayElement([
    "slow internet",
    "no signal",
    "SIM not detected",
    "data not working",
    "roaming not activating",
    "billing dispute",
    "unknown charges",
    "plan upgrade",
    "porting issue",
    "Vectone routing failure",
    "VoLTE not supported on Lycamobile"
  ]);
}

function generateDialogue() {
  const issue = randomIssue();

  return [
    { speaker: "user", text: `Hi, I'm facing ${issue} today.` },
    { speaker: "assistant", text: faker.helpers.arrayElement([
        "I understand. Let me check that for you.",
        "Okay, give me a moment to look into this.",
        "Sure, I’ll take a quick look at your connection."
    ])},
    { speaker: "assistant", text: faker.helpers.arrayElement([
        "It seems like your cell tower is congested right now.",
        "I see a temporary outage affecting your area.",
        "Your signal strength looks weak indoors.",
        "Your SIM registration shows a delay in VoLTE activation.",
        "There is a routing issue caused by the original Vectone number prefix."
    ])},
    { speaker: "user", text: "What should I do now?" },
    { speaker: "assistant", text: faker.helpers.arrayElement([
        "Try restarting your device once.",
        "Move near a window for better signal.",
        "I recommend switching to 4G-only mode temporarily.",
        "Give it 10–15 minutes, the network is stabilizing.",
        "I’ll refresh your network registration from my side."
    ])}
  ];
}

export async function generateTelecomConversations(count = 50000) {
  const file = fs.createWriteStream("dataset/conversations/Telecom_Conversations.jsonl");

  for (let i = 0; i < count; i++) {
    const convo = { dialogue: generateDialogue() };
    file.write(JSON.stringify(convo) + "\n");
  }

  file.end();
  console.log("Generated Telecom_Conversations.jsonl");
}
>>>>>>> c8bb3f8d18cd92f188778597717099c1ef9016d5
