import axios from "axios";
import { writeFile } from "fs/promises";
import path from "path";

async function saveChampionsIcons() {
  var version;
  try {
    const versions = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    version = versions.data[0];
  } catch {
    console.error("Error trying to find the game version");
  }

  let champions;
  try {
    const championsReq = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );
    champions = championsReq.data.data;
  } catch {
    console.error("Error trying to fetch champions list.");
  }

  await Promise.all(
    Object.keys(champions).map(async (key) => {
      let filePath = path.resolve("public", "champions_icons", `${key}.png`);

      const championImg = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${key}.png`,
        {
          responseType: "arraybuffer",
        }
      );

      await writeFile(filePath, championImg.data);
    })
  );

  console.log("Successfully saved champions icons");
}

saveChampionsIcons();
