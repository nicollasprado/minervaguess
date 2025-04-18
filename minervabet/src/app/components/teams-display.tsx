"use client";

import { gameData, gameParticipant } from "@/utils/gameDataInterface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TeamPlayerCard from "./team-player-card";

const minervaPuuid = process.env.NEXT_PUBLIC_MINERVA_PUUID;

function GetTeams(data: gameData) {
  const participants = data.participants;

  const minervaTeam: gameParticipant[] = [];
  const enemyTeam: gameParticipant[] = [];

  const minerva = participants.find(
    (participant) => participant.puuid === minervaPuuid
  );
  const minervaTeamId = minerva?.teamId;

  participants.forEach((participant) => {
    if (participant.teamId === minervaTeamId) {
      minervaTeam.push(participant);
    } else {
      enemyTeam.push(participant);
    }
  });

  return [minervaTeam, enemyTeam];
}

const GetGameData = async () => {
  const response = await axios.get<gameData>("/api/match");
  return response.data;
};

export default function TeamsDisplay() {
  const { data, isLoading } = useQuery({
    queryKey: ["game"],
    queryFn: GetGameData,
  });

  if (isLoading) {
    return (
      <div>
        <h1>Fetching game data...</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1>Error fetching game data</h1>
      </div>
    );
  } else {
    const teams = GetTeams(data);

    return (
      <div className="flex justify-evenly border-b-2 border-white mx-5 pb-10">
        <section className="flex flex-col gap-5">
          <h2 className="text-yellow-300 text-center font-bold text-3xl">
            TIME MINERVA
          </h2>
          <ol className="flex gap-4 flex-wrap">
            {teams[0].map((participant) => (
              <li key={participant.puuid}>
                <TeamPlayerCard participant={participant} />
              </li>
            ))}
          </ol>
        </section>

        <div className="border border-white"></div>

        <section className="flex flex-col gap-5">
          <h2 className="text-red-500 text-center font-bold text-3xl">
            TIME OPONENTE
          </h2>
          <ol className="flex gap-4 flex-wrap">
            {teams[1].map((participant) => (
              <li key={participant.puuid}>
                <TeamPlayerCard participant={participant} />
              </li>
            ))}
          </ol>
        </section>
      </div>
    );
  }
}
