import { writeFile } from "fs/promises";
import path from "path";
import axios from "axios";

async function createChampionJson() {
  var version;
  try {
    const versions = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    version = versions.data[0];
  } catch {
    console.error("Error trying to find the game version");
  }

  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
  const filePath = path.resolve("src", "utils", "data", "champions.json");

  try {
    const rawData = await axios.get(url);

    let resolvedData = "{\n";
    let firstIter = true;
    Object.values(rawData.data.data).forEach((data) => {
      if (!firstIter) {
        resolvedData += ",\n";
      }

      console.log(data.name);
      resolvedData += `  "${data.key}": "${data.name}"`;

      if (firstIter) {
        firstIter = false;
      }
    });
    resolvedData += "\n}";

    await writeFile(filePath, resolvedData);
    console.log("Sucesfully created champions data file");
  } catch {}
}

createChampionJson();
