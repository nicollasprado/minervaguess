import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PastGames from "./past-games";
import PointsRank from "./points-rank";

export default function RankGamesAside() {
  return (
    <Tabs defaultValue="rank" className="min-w-[15%] h-full bg-mypurple2">
      <TabsList className="grid w-full grid-cols-2 bg-white rounded-none rounded-b-md">
        <TabsTrigger
          value="rank"
          className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white"
        >
          RANK
        </TabsTrigger>
        <TabsTrigger
          value="games"
          className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white"
        >
          JOGOS
        </TabsTrigger>
      </TabsList>

      <TabsContent value="rank">
        <PointsRank />
      </TabsContent>
      <TabsContent value="games">
        <PastGames />
      </TabsContent>
    </Tabs>
  );
}
