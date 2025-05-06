import { MinervaGame } from "@/interfaces/minervaGameInterface";
import Image from "next/image";

interface PastGameCardProps {
  data: MinervaGame;
}

export default function PastGameCard({ data }: PastGameCardProps) {
  const highestKillstreakText = () => {
    switch (data.highestKillStreak) {
      case 2:
        return "DOUBLE KILL";
      case 3:
        return "TRIPLE KILL";
      case 4:
        return "QUADRA KILL";
      case 5:
        return "PENTA KILL";
    }
  };

  const highestKillStreakColor = () => {
    switch (data.highestKillStreak) {
      case 2:
        return "bg-blue-300";
      case 3:
        return "bg-yellow-300";
      case 4:
        return "bg-orange-300";
      case 5:
        return "bg-red-300";
    }
  };

  return (
    <a
      href={`https://www.leagueofgraphs.com/pt/match/br/${data.gameId}#participant2`}
      target="_blank"
      className={`flex gap-2 text-white items-center ring-2 rounded-md p-2 ${
        data.result ? "ring-green-400" : "ring-red-400"
      } `}
    >
      <div className="relative w-[3.13rem] h-[3.13rem]">
        <Image
          src={`/champions_icons/${data.championName.toUpperCase()}.png`}
          alt={"Icone helmetbro"}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col w-[7.5dvw] text-sm">
        <div className="flex justify-between">
          <p>
            {data.kills}/{data.deaths}/{data.assists}
          </p>
          <p>-</p>
          <p>{data.kda} kda</p>
        </div>
        <div className="flex justify-center gap-2">
          <p
            className={`${
              data.result ? "bg-green-400" : "bg-red-400"
            } text-black p-1 rounded-md text-[.7rem] h-fit font-semibold`}
          >
            {data.result ? "VITÓRIA" : "DERROTA"}
          </p>
          <p
            className={`${highestKillStreakColor()} text-black p-1 rounded-md text-[.7rem] h-fit font-semibold`}
          >
            {highestKillstreakText()}
          </p>
        </div>
      </div>
    </a>
  );
}
