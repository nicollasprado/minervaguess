import champions from "./data/champions.json";
import runes from "./data/runes.json";
import subrunes from "./data/subrunes.json";

const championsData: Record<number, string> = champions;
const runesData: Record<number, string> = runes;
const subrunesData: Record<number, string> = subrunes;

export const getChampionIcon = (championId: number) => {
  let championName = championsData[championId];
  championName = championName.toUpperCase().replace(" ", "").replace("'", "");

  switch (championName) {
    case "RENATAGLASC":
      championName = "RENATA";
      break;
    case "WUKONG":
      championName = "MONKEYKING";
      break;
  }

  return `/champions_icons/${championName}.png`;
};

export const getRuneIcon = (runeId: number, subruneId?: number) => {
  let runeName = runesData[runeId];
  runeName = runeName.toUpperCase().replace(" ", "").replace("'", "");

  if (subruneId) {
    let subruneName = subrunesData[subruneId];
    subruneName = subruneName.toUpperCase().replace(" ", "").replace("'", "");
    return `/runes_icons/${runeName}/${subruneName}.png`;
  } else {
    return `/runes_icons/${runeName}/${runeName}.png`;
  }
};
