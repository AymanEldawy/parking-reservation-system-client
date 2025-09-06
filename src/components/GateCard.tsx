import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import type { GateType } from "@/types/gate.type"

const GateCard = ({ gate }: { gate: GateType }) => {
  return (
    <Card className="bg-white w-full max-w-sm p-4 duration-200 border-none shadow hover:shadow-md hover:-translate-y-1 hover:bg-gray-100">
      <CardHeader className="flex-container p-0">
        <CardTitle>{gate.name}</CardTitle>
        <CardDescription>
          {gate.location}
        </CardDescription>
      </CardHeader>
      <Button variant="link" asChild className="btn btn-primary">
        <Link to={`/gates/${gate.id}`}>Open gate</Link>
      </Button>
    </Card>
  )
}

export default GateCard