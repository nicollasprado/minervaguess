import P from "@/components/P";
import { Bet, CurrentGameBet } from "@/interfaces/betInterface";
import getBetsDescriptions from "@/utils/getBetsDescriptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface PastBetCardProps {
  bet: Bet | CurrentGameBet;
}

export default function PastBetCard({ bet }: PastBetCardProps) {
  if (!bet) {
    return <p>as</p>;
  }

  const optionsDescriptions = getBetsDescriptions(bet);

  if ("result" in bet) {
    return (
      <div
        className={`flex flex-col gap-1 text-white bg-black p-2 rounded-md ring-2 ${
          bet.result ? "ring-green-400" : "ring-red-500"
        }`}
      >
        <P className={`${bet.result ? "text-green-400" : "text-red-500"}`}>
          {bet.result ? "VITÓRIA" : "DERROTA"}
        </P>
        <p>{bet.betPoints} pontos apostados</p>
        <p className={`${bet.result ? "text-green-400" : "text-red-500"}`}>
          {bet.result ? "+" : "-"} {bet.receivedPoints} pontos
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex cursor-pointer">
              Detalhes <ChevronDown />
            </AccordionTrigger>
            <ol>
              {optionsDescriptions.map((description) => (
                <li key={description[0]}>
                  <AccordionContent className="text-[.8rem] flex justify-between">
                    <p>{description[0]}</p>
                    <p>{description[1]}x</p>
                  </AccordionContent>
                </li>
              ))}
            </ol>
          </AccordionItem>
        </Accordion>

        <p className="text-[0.7rem] truncate w-60 text-muted-foreground">
          ID: {bet.id}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-1 text-white bg-black p-2 rounded-md ring-2 ring-gray-400`}
    >
      <P className="text-gray-600">EM ANDAMENTO</P>
      <p>{bet.points} pontos apostados</p>
      <p>Multiplicador total:    {bet.totalMultipliers}x</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex cursor-pointer">
            Detalhes <ChevronDown />
          </AccordionTrigger>
          <ol>
            {optionsDescriptions.map((description) => (
              <li key={description[0]}>
                <AccordionContent className="text-[.8rem] flex justify-between">
                  <p>{description[0]}</p>
                  <p>{description[1]}x</p>
                </AccordionContent>
              </li>
            ))}

            <AccordionContent className="text-[.8rem] flex justify-between">
              <p>TOTAL:</p>
              <p>{bet.totalMultipliers}x</p>
            </AccordionContent>
          </ol>
        </AccordionItem>
      </Accordion>

      <p className="text-[0.7rem] truncate w-60 text-muted-foreground">
        ID: {bet.id}
      </p>
    </div>
  );
}
