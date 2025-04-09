import PointRank from "../components/general/points-rank";

export default function Home() {
  return (
    <main className="flex">
      <PointRank />
      <div className="bg-zinc-800 w-[60%]">
        <h1 className="font-extrabold text-white text-[1.6dvw]">MINERVABET</h1>
      </div>
      <PointRank />
    </main>
  );
}
