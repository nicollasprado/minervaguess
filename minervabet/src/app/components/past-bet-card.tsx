import { Bet } from "@/interfaces/betInterface";
import copyToClipboard from "@/utils/copyToClipboard";
import getBetsDescriptions from "@/utils/getBetsDescriptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface PastBetCardProps {
  bet: Bet;
}

export default function PastBetCard({ bet }: PastBetCardProps) {
  if (!bet) {
    return;
  }

  const optionsDescriptions = getBetsDescriptions(bet);

  const cardTitle = () => {
    switch (bet.result) {
      case null:
        return "ATIVA";
      case true:
        return "VITÓRIA";
      case false:
        return "DERROTA";
    }
  };

  const cardTextColor = () => {
    switch (bet.result) {
      case null:
        return "text-yellow-500";
      case true:
        return "text-green-400";
      case false:
        return "text-red-500";
    }
  };

  const cardRingColor = () => {
    switch (bet.result) {
      case null:
        return "ring-yellow-500";
      case true:
        return "ring-green-400";
      case false:
        return "ring-red-500";
    }
  };

  return (
    <div
      className={`flex flex-col max-w-[12dvw] gap-1 text-white bg-black p-2 rounded-md ring-2 ${cardRingColor()}`}
    >
      <div className="flex justify-between items-center">
        <p className={`font-normal text-sm ${cardTextColor()}`}>
          {cardTitle().toString()}
        </p>
        <p className="text-[.7rem]">
          {bet.createdAt.toLocaleTimeString("pt-BR").substring(0, 5)} -{" "}
          {bet.createdAt.toLocaleDateString("pt-BR")}
        </p>
      </div>
      <p className="text-sm">{bet.betPoints} pontos apostados</p>

      {bet.result === null ? (
        <p className="text-sm">Multiplicador total: {bet.totalMultipliers}x</p>
      ) : (
        <p className={`${cardTextColor()} text-sm`}>
          {bet.result ? "+" : "-"} {bet.receivedPoints} pontos
        </p>
      )}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex cursor-pointer">
            Detalhes <ChevronDown />
          </AccordionTrigger>
          <ol>
            {optionsDescriptions.map((description) => (
              <li key={description[0]}>
                <AccordionContent className="text-[.7rem] flex justify-between">
                  <p>{description[0]}</p>
                  <p>{description[1]}x</p>
                </AccordionContent>
              </li>
            ))}
          </ol>
        </AccordionItem>
      </Accordion>

      <div>
        <p
          className="text-[0.7rem] truncate w-[100%] text-muted-foreground cursor-copy"
          onClick={() => copyToClipboard(bet.id)}
        >
          ID: {bet.id}
        </p>
        <p
          className="text-[0.7rem] truncate w-[100%] text-muted-foreground cursor-copy"
          onClick={() => copyToClipboard(bet.gameId)}
        >
          MatchId: {bet.gameId}
        </p>
      </div>
    </div>
  );
}
