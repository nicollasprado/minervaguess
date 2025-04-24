"use client";

import ViewerCard from "../components/viewer-card";
import { useEffect, useState } from "react";
import getUsersPointRank from "../actions/users/getUsersPointRank";
import { User } from "@/interfaces/userInterface";

export default function PointsRank() {
  const [rank, setRank] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRank = await getUsersPointRank();
      setRank(usersRank);
    };

    fetchUsers();
  }, []);

  return (
    <aside className="min-w-[15%] bg-mypurple2 flex flex-col justify-between">
      <div className="border-b-[0.1dvw] border-white py-[1.5dvh]">
        <h2 className="text-center text-white font-semibold text-lg">
          VIEWERS COM MAIS PONTOS
        </h2>
      </div>

      <ol className="flex flex-col m-auto gap-5">
        {rank?.map((user) => (
          <li key={user.username}>
            <ViewerCard
              username={user.username}
              bets={user.bets.length}
              points={user.points}
            />
          </li>
        ))}
      </ol>
    </aside>
  );
}
