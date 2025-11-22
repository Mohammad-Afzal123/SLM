<<<<<<< HEAD
// generators/voiceStyles.js
import fs from "fs";

export async function generateVoiceFiles() {
  const tone = {
    speaking_style: {
      tone: "calm, natural, human-like",
      pace: "medium",
      emphasis: "soft, not robotic"
    },
    allowed_phrases: [
      "Let me check that for you.",
      "One moment please.",
      "Thanks for waiting.",
      "I understand."
    ]
  };

  const styles = {
    empathy: [
      "I know that can be frustrating.",
      "I understand how you feel.",
      "Let’s fix this together."
    ],
    confirmations: [
      "Alright.",
      "Sure thing.",
      "Got it."
    ]
  };

  fs.writeFileSync("dataset/voice/Voice_Tone_Guide.json", JSON.stringify(tone, null, 2));
  fs.writeFileSync("dataset/voice/Response_Styles.json", JSON.stringify(styles, null, 2));
}
=======
// generators/voiceStyles.js
import fs from "fs";

export async function generateVoiceFiles() {
  const tone = {
    speaking_style: {
      tone: "calm, natural, human-like",
      pace: "medium",
      emphasis: "soft, not robotic"
    },
    allowed_phrases: [
      "Let me check that for you.",
      "One moment please.",
      "Thanks for waiting.",
      "I understand."
    ]
  };

  const styles = {
    empathy: [
      "I know that can be frustrating.",
      "I understand how you feel.",
      "Let’s fix this together."
    ],
    confirmations: [
      "Alright.",
      "Sure thing.",
      "Got it."
    ]
  };

  fs.writeFileSync("dataset/voice/Voice_Tone_Guide.json", JSON.stringify(tone, null, 2));
  fs.writeFileSync("dataset/voice/Response_Styles.json", JSON.stringify(styles, null, 2));
}
>>>>>>> c8bb3f8d18cd92f188778597717099c1ef9016d5
