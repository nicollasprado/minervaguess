import champions from "./data/champions.json";

const data: Record<number, string> = champions;

export const getChampionIcon = (championId: number) => {
  let championName = data[championId];
  championName = championName.toUpperCase().replace(" ", "").replace("'", "");
  return `/champions_icons/${championName}.png`;
};
