import H3 from "@/components/H3";
import P from "@/components/P";
import UserDropdownDefault from "./user-dropdown-default";
import { User } from "@/interfaces/userInterface";

interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex gap-10 items-center">
      <h1 className="m-auto font-extrabold text-white text-4xl my-[1.5dvh]">
        MINERVAGUESS
      </h1>

      <div className="flex gap-2 items-center absolute right-[25dvw]">
        <div className="text-right">
          <H3>{user ? user.username : "desconectado"}</H3>
          <P>{user ? user.points.toString() : "0"}</P>
        </div>
        <UserDropdownDefault />
      </div>
    </header>
  );
}
