import { Bet, BetProperties } from "@/interfaces/betInterface";

export default function getBetsDescriptions(
  bet: Pick<Bet, "killBet" | "assistBet" | "deathBet" | "resultBet">
): [string, number][] {
  const killsAVG = BetProperties.kills.average;
  const assistsAVG = BetProperties.assists.average;
  const deathsAVG = BetProperties.deaths.average;
  const descriptions: [string, number][] = [];

  if (bet.killBet === "HIGH") {
    descriptions.push([
      `Mais de ${killsAVG} eliminações`,
      BetProperties.kills.highMultiplier,
    ]);
  } else if (bet.killBet === "LOW") {
    descriptions.push([
      `Menos de ${killsAVG} eliminações`,
      BetProperties.kills.lowMultiplier,
    ]);
  } else if (
    bet.killBet !== "NOT" &&
    bet.killBet !== "HIGH" &&
    bet.killBet !== "LOW"
  ) {
    descriptions.push([
      `Exatamente ${Number(bet.killBet)} ${
        Number(bet.killBet) > 1 ? "eliminações" : "eliminação"
      }`,
      BetProperties.exactMultiplier,
    ]);
  }

  if (bet.assistBet === "HIGH") {
    descriptions.push([
      `Mais de ${assistsAVG} assistências`,
      BetProperties.assists.highMultiplier,
    ]);
  } else if (bet.assistBet === "LOW") {
    descriptions.push([
      `Menos de ${assistsAVG} assistências`,
      BetProperties.assists.lowMultiplier,
    ]);
  } else if (
    bet.assistBet !== "NOT" &&
    bet.assistBet !== "HIGH" &&
    bet.assistBet !== "LOW"
  ) {
    descriptions.push([
      `Exatamente ${bet.assistBet} assistência${
        Number(bet.assistBet) > 1 ? "s" : ""
      }`,
      BetProperties.exactMultiplier,
    ]);
  }

  if (bet.deathBet === "HIGH") {
    descriptions.push([
      `Mais de ${deathsAVG} mortes`,
      BetProperties.deaths.highMultiplier,
    ]);
  } else if (bet.deathBet === "LOW") {
    descriptions.push([
      `Menos de ${deathsAVG} mortes`,
      BetProperties.deaths.lowMultiplier,
    ]);
  } else if (
    bet.deathBet !== "NOT" &&
    bet.deathBet !== "HIGH" &&
    bet.deathBet !== "LOW"
  ) {
    descriptions.push([
      `Exatamente ${bet.deathBet} morte${Number(bet.deathBet) > 1 ? "s" : ""}`,
      BetProperties.exactMultiplier,
    ]);
  }

  if (bet.resultBet === "WIN") {
    descriptions.push(["Minerva ganha o jogo", BetProperties.exactMultiplier]);
  } else if (bet.resultBet === "LOSE") {
    descriptions.push(["Minerva perde o jogo", BetProperties.exactMultiplier]);
  }

  return descriptions;
}
