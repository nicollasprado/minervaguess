import H1 from "../../components/H1";
import H2 from "../../components/H2";
import ViewerCard from "../components/viewer-card";

export default function PointsRank() {
  return (
    <aside className="h-[100dvh] w-[17%] bg-zinc-500 flex flex-col justify-between">
      <div className="border-b-[0.1dvw] border-white py-[1.5dvh]">
        <H1 className="text-center">VIEWERS COM MAIS PONTOS</H1>
      </div>
      <div className="flex flex-col items-center gap-5 justify-center">
        <ViewerCard
          championName="Ahri"
          username="nicollasmp"
          bets={12}
          points={293871}
        />
        <ViewerCard
          championName="Akali"
          username="carlos"
          bets={3}
          points={920}
        />
      </div>
      <div className="border-t-[0.1dvw] border-white py-[1.5dvh]">
        <H2 className="text-center">EU:</H2>
      </div>
    </aside>
  );
}
