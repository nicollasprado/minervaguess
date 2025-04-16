"use client";

import { useQuery } from "@tanstack/react-query";
import PointRank from "./components/points-rank";
import axios from "axios";

const getGameData = async () => {
  const data = await axios.get("/api/match");
  console.log(data.data);
};

export default function Home() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["game"],
    queryFn: getGameData,
  });

  return (
    <div className="flex">
      <PointRank />
      <main className="bg-zinc-800 w-[66%]">
        <h1 className="font-extrabold text-white text-4xl text-center my-[1.5dvh]">
          MINERVABET
        </h1>
      </main>
      <PointRank />
    </div>
  );
}
