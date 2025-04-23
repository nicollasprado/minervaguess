import { User } from "@/interfaces/userInterface";
import PastBetCard from "./past-bet-card";

interface PastBetsProps {
  user?: Pick<User, "bets" | "currentGameBets">;
}

export default function PastBets({ user }: PastBetsProps) {
  return (
    <aside className="min-w-[15%] bg-zinc-500 flex flex-col justify-between">
      <div className="border-b-[0.1dvw] border-white py-[1.5dvh]">
        <h2 className="text-center text-white font-semibold text-lg">
          HISTÓRICO DE APOSTAS
        </h2>
      </div>

      <ol className="flex flex-col m-auto gap-5">
        {user?.currentGameBets.map((bet) => (
          <li key={bet.id}>
            <PastBetCard bet={bet} />
          </li>
        ))}

        {user?.bets.map((bet) => (
          <li key={bet.id}>
            <PastBetCard bet={bet} />
          </li>
        ))}
      </ol>
    </aside>
  );
}
