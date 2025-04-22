"use client";

import PointRank from "./components/points-rank";
import TeamsDisplay from "./components/teams-display";
import { GameData } from "@/interfaces/gameDataInterface";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "./components/header";
import BetForm from "./components/bet-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/userInterface";

const GetGameData = async () => {
  const response = await axios.get<GameData>("/api/match");
  return response.data;
};

export default function Home() {
  const { data: gameData, isLoading } = useQuery({
    queryKey: ["game"],
    queryFn: GetGameData,
  });

  const { data: session } = useSession();
  const username = session?.user?.name ? session?.user?.name : "";

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (username !== "") {
          const response = await axios.get(`/api/user/${username}`);

          if (response) {
            setUser(response.data);
          }
        }
      } catch {}
    };

    fetchUser();
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex w-screen h-[100dvh]">
        <PointRank />
        <main className="min-w-[70dvw] bg-zinc-800 flex flex-col gap-50">
          <Header user={user} />

          <h2 className="text-gray-400 text-center font-bold text-3xl">
            Obtendo dados da partida...
          </h2>
        </main>
        <PointRank />
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="flex w-screen h-[100dvh]">
        <PointRank />
        <main className="min-w-[70dvw] bg-zinc-800 flex flex-col gap-50">
          <Header user={user} />

          <h2 className="text-red-400 text-center font-bold text-3xl">
            Partida não encontrada
          </h2>
        </main>
        <PointRank />
      </div>
    );
  }

  return (
    <div className="flex w-screen h-[100dvh]">
      <PointRank />
      <main className="min-w-[70dvw] bg-zinc-800 flex flex-col justify-around">
        <Header user={user} />

        <TeamsDisplay data={gameData} />

        <BetForm />
      </main>
      <PointRank />
    </div>
  );
}
