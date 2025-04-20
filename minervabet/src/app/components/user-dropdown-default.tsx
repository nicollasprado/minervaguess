import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function UserDropdownDefault() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User size={38} className="text-white cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-black">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="login"
              className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Conectar
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Registrar
            </TabsTrigger>
          </TabsList>

          <div>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </div>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
