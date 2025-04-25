"use client";

import { useEffect, useState } from "react";
import getMinervaGames from "../actions/minervaGames/getMinervaGames";
import { MinervaGame } from "@/interfaces/minervaGameInterface";
import PastGameCard from "./past-game-card";

export default function PastGames() {
  const [games, setGames] = useState<MinervaGame[]>();

  useEffect(() => {
    const fetchMinervaGames = async () => {
      const pastGames = await getMinervaGames();
      setGames(pastGames);
    };

    fetchMinervaGames();
  }, []);

  return (
    <aside className="min-w-[15%] h-full bg-mypurple2 flex flex-col justify-between">
      <div className="border-b-[0.1dvw] border-white py-[1.5dvh]">
        <h2 className="text-center text-white font-semibold text-lg">
          ÚLTIMOS JOGOS
        </h2>
      </div>

      <ol className="flex flex-col m-auto gap-5">
        {games?.map((game) => (
          <li key={game.gameId}>
            <PastGameCard data={game} />
          </li>
        ))}
      </ol>
    </aside>
  );
}
