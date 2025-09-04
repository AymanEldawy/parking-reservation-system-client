
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const Gates = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>
        <TabsContent value="visitors">
          Visitors
        </TabsContent>
        <TabsContent value="subscribers">
          Subscribers
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Gates
