import axios from "axios";
import { writeFile } from "fs/promises";
import path from "path";

async function saveRunesIcons() {
  var version;
  try {
    const versions = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    version = versions.data[0];
  } catch {
    console.error("Error trying to find the game version");
  }

  let runes;
  try {
    const runesReq = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
    );
    runes = runesReq.data;
  } catch {
    console.error("Error trying to fetch runes list.");
  }

  await Promise.all(
    runes.map(async (runepath) => {
      const filePath = path.resolve(
        "public",
        "runes_icons",
        runepath.key.toUpperCase(),
        `${runepath.key.toUpperCase()}.png`
      );

      const runeImg = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/img/${runepath.icon}`,
        {
          responseType: "arraybuffer",
        }
      );

      await writeFile(filePath, runeImg.data);

      // subrunes
      runepath.slots.forEach((slot) => {
        slot.runes.forEach(async (rune) => {
          const filePath = path.resolve(
            "public",
            "runes_icons",
            runepath.key.toUpperCase(),
            `${rune.key.toUpperCase()}.png`
          );

          const runeImg = await axios.get(
            `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`,
            {
              responseType: "arraybuffer",
            }
          );

          await writeFile(filePath, runeImg.data);
        });
      });
    })
  );

  console.log("Successfully saved champions icons");
}

saveRunesIcons();
