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
import PastBets from "./components/past-bets";
import getUser from "./actions/users/getUser";
import { GithubIcon } from "lucide-react";
import P from "@/components/P";

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
          const user = await getUser(username);

          if (user) {
            setUser(user);
          }
        }
      } catch {}
    };

    fetchUser();
  }, [username]);

  if (window.innerWidth < 1366 || window.innerHeight < 768) {
    return (
      <div className="flex justify-center my-[45dvh]">
        <p className="text-2xl">
          Tamanho de tela <b>ainda</b> não suportado pelo site, desculpa pelo
          inconveniente!
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-screen h-[100dvh]">
        <PointRank />
        <main className="min-w-[70dvw] bg-mypurple flex flex-col gap-50">
          <Header user={user} />

          <h2 className="text-gray-400 text-center font-bold text-3xl">
            Obtendo dados da partida...
          </h2>
        </main>

        <PastBets userId={user ? user.id : ""} />
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="flex w-screen h-[100dvh]">
        <PointRank />
        <main className="min-w-[70dvw] bg-mypurple flex flex-col gap-50">
          <Header user={user} />

          <h2 className="text-red-400 text-center font-bold text-3xl">
            Partida não encontrada
          </h2>
        </main>
        <PastBets userId={user ? user.id : ""} />
      </div>
    );
  }

  return (
    <div className="flex w-screen h-[100dvh]">
      <PointRank />
      <main className="min-w-[70dvw] bg-mypurple flex flex-col justify-around">
        <Header user={user} />

        <TeamsDisplay data={gameData} />

        {gameData.gameLength > 150 ? (
          <section className="flex flex-col justify-center items-center">
            <h2 className="text-red-400 text-center font-bold text-3xl">
              Partida em andamento.
            </h2>
            <P>Aguarde até a próxima partida para fazer um palpite</P>
          </section>
        ) : (
          <BetForm user={user} game={gameData} />
        )}

        <footer>
          <a
            href="https://github.com/nicollasprado"
            target="_blank"
            className="flex justify-center items-center gap-2 cursor-pointer text-sm text-muted-foreground"
          >
            <GithubIcon />
            <p>made by Nicollas Prado</p>
          </a>
        </footer>
      </main>
      <PastBets userId={user ? user.id : ""} />
    </div>
  );
}
