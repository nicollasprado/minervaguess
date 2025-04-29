import Image from "next/image";
import H3 from "../../components/H3";
import P from "../../components/P";

interface ViewerCardProps {
  iconUrl?: string;
  username: string;
  points: number;
  bets: number;
}

export default function ViewerCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  iconUrl,
  username,
  points,
  bets,
}: ViewerCardProps) {
  return (
    <div className="flex gap-[.5dvw] items-center">
      <div className="relative w-[3.13rem] h-[3.13rem]">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/29.png`}
          alt={"Icone helmetbro"}
          fill
          className="object-cover"
        />
      </div>
      <section>
        <H3>{username}</H3>
        <P>
          {points} pontos em {bets} palpite{bets > 1 ? "s" : ""}
        </P>
      </section>
    </div>
  );
}
