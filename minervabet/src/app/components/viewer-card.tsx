import Image from "next/image";
import H3 from "../../components/H3";
import P from "../../components/P";

interface ViewerCardProps {
  championName: string;
  username: string;
  points: number;
  bets: number;
}

export default function ViewerCard({
  championName,
  username,
  points,
  bets,
}: ViewerCardProps) {
  return (
    <div className="flex gap-[.5dvw] items-center">
      <div className="relative w-[3.13rem] h-[3.13rem]">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${championName}.png`}
          alt={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${championName}.png`}
          fill
          className="object-cover"
        />
      </div>
      <section>
        <H3>{username}</H3>
        <P>
          {points} pontos em {bets} bets
        </P>
      </section>
    </div>
  );
}
