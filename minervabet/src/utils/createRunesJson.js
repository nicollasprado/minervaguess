import { writeFile } from "fs/promises";
import path from "path";
import axios from "axios";

async function createRunesJson() {
  let version;
  try {
    const versions = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    version = versions.data[0];
  } catch {
    console.error("Error trying to find the game version");
  }

  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`;
  const filePath = path.resolve("src", "utils", "data", "runes.json");

  const rawData = await axios.get(url);

  let resolvedData = "{\n";
  let firstIter = true;
  Object.values(rawData.data).forEach((data) => {
    if (!firstIter) {
      resolvedData += ",\n";
    }

    resolvedData += `  "${data.id}": "${data.key.toUpperCase()}"`;

    if (firstIter) {
      firstIter = false;
    }
  });
  resolvedData += "\n}";

  await writeFile(filePath, resolvedData);
  console.log("Sucesfully created runes data file");

  // subrunes
  const filePathSubRunes = path.resolve(
    "src",
    "utils",
    "data",
    "subrunes.json"
  );
  resolvedData = "{\n";
  firstIter = true;
  Object.values(rawData.data).forEach((data) => {
    data.slots.forEach((slot) => {
      slot.runes.forEach((rune) => {
        if (!firstIter) {
          resolvedData += ",\n";
        }

        resolvedData += `  "${rune.id}": "${rune.key.toUpperCase()}"`;

        if (firstIter) {
          firstIter = false;
        }
      });
    });
  });
  resolvedData += "\n}";

  await writeFile(filePathSubRunes, resolvedData);
  console.log("Sucesfully created subrunes data file");
}

createRunesJson();
