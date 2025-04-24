import {
  getUserBets,
  getUserTotalBetsQt,
} from "@/app/actions/bets/getUserBets";
import PastBetCard from "./past-bet-card";
import { useEffect, useState } from "react";
import { Bet } from "@/interfaces/betInterface";
import ConfiguredPagination from "./configured-pagination";
import H2 from "@/components/H2";

interface PastBetsProps {
  userId: string;
}

export default function PastBets({ userId }: PastBetsProps) {
  const [page, setPage] = useState<number>(1);
  const [bets, setBets] = useState<Bet[]>([]);
  const [totalPagesQt, setTotalPagesQt] = useState<number>(0);

  useEffect(() => {
    const fetchBets = async () => {
      const bets = await getUserBets(page - 1, userId);
      setBets(bets);

      const totalBetsQt = await getUserTotalBetsQt(userId);
      setTotalPagesQt(Math.ceil(totalBetsQt / 4));
    };

    fetchBets();
  }, [page, userId]);

  if (userId === "") {
    return (
      <aside className="min-w-[15%] bg-zinc-500 flex flex-col justify-between">
        <div className="border-b-[0.1dvw] border-white py-[1.5dvh]">
          <h2 className="text-center text-white font-semibold text-lg">
            HISTÓRICO DE APOSTAS
          </h2>
        </div>

        <H2>Conecte-se para ver suas apostas</H2>
      </aside>
    );
  }

  const handleNextPageClick = () => {
    if (page + 1 <= totalPagesQt) {
      setPage(page + 1);
    }
  };

  const handlePrevPageClick = () => {
    if (page - 1 > 0) {
      setPage(page - 1);
    }
  };

  const handleSpecificPageClick = (page: number) => {
    setPage(page);
  };

  return (
    <aside className="min-w-[15%] bg-zinc-500 flex flex-col justify-between">
      <div className="border-b-[0.1dvw] border-white py-[1.5dvh]">
        <h2 className="text-center text-white font-semibold text-lg">
          HISTÓRICO DE APOSTAS
        </h2>
      </div>

      <ol className="flex flex-col m-auto gap-5">
        {bets.map((bet) => (
          <li key={bet.id}>
            <PastBetCard bet={bet} />
          </li>
        ))}
      </ol>

      <ConfiguredPagination
        page={page}
        totalPagesQt={totalPagesQt}
        handleNextPageClick={handleNextPageClick}
        handlePrevPageClick={handlePrevPageClick}
        handleSpecificPageClick={handleSpecificPageClick}
      />
    </aside>
  );
}
