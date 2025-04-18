import H3 from "@/components/H3";
import P from "@/components/P";
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex  justify-center gap-10 items-center">
      <h1 className="font-extrabold text-white text-4xl text-center my-[1.5dvh]">
        MINERVABET
      </h1>

      <div className="flex gap-2 items-center">
        <div className="text-right">
          <H3>nicollasmp</H3>
          <P>1231234 pontos</P>
        </div>
        <User size={38} className="text-white" />
      </div>
    </header>
  );
}
