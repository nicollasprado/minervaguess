import { gameData, gameParticipant } from "@/utils/gameDataInterface";
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

interface TeamsDisplayProps {
  data: gameData;
}

export default function TeamsDisplay({ data }: TeamsDisplayProps) {
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
