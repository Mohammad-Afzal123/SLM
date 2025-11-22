<<<<<<< HEAD
// utils/setupFolders.js
import fs from "fs-extra";

export async function setupFolders() {
  const folders = [
    "dataset/structured",
    "dataset/conversations",
    "dataset/knowledge",
    "dataset/voice"
  ];

  for (const folder of folders) {
    await fs.ensureDir(folder);
  }
}
=======
// utils/setupFolders.js
import fs from "fs-extra";

export async function setupFolders() {
  const folders = [
    "dataset/structured",
    "dataset/conversations",
    "dataset/knowledge",
    "dataset/voice"
  ];

  for (const folder of folders) {
    await fs.ensureDir(folder);
  }
}
>>>>>>> c8bb3f8d18cd92f188778597717099c1ef9016d5
