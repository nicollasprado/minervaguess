import { gameParticipant } from "@/utils/gameDataInterface";
import { getChampionIcon, getRuneIcon } from "@/utils/fetchDataJsons";
import Image from "next/image";

const minervaPuuid = process.env.NEXT_PUBLIC_MINERVA_PUUID;

interface TeamPlayerCardProps {
  participant: gameParticipant;
}

export default function TeamPlayerCard({ participant }: TeamPlayerCardProps) {
  const [name, tag] = participant.riotId.split("#");
  const opggUrl = `https://op.gg/summoners/br/${name}-${tag}`;
  const nameColor =
    participant.puuid === minervaPuuid ? "text-yellow-300" : "text-white";

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Image
          src={getChampionIcon(participant.championId)}
          alt="foto do campeao"
          width={64}
          height={64}
        />

        <div className="flex flex-col items-center">
          <Image
            src={getRuneIcon(
              participant.perks.perkStyle,
              participant.perks.perkIds[0]
            )}
            alt="runa principal"
            width={32}
            height={32}
          />

          <Image
            src={getRuneIcon(participant.perks.perkSubStyle)}
            alt="runa secundaria"
            width={20}
            height={20}
          />
        </div>
      </div>

      <a
        href={opggUrl}
        target="_blank"
        className={`${nameColor} truncate max-w-[100px]`}
      >
        {name}
      </a>
    </div>
  );
}
