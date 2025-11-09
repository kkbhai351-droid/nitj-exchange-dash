import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, ShieldCheck } from "lucide-react";
import type { Request, User } from "@/data/mockData";

interface RequestCardProps {
  request: Request;
  requester: User;
  onClick: () => void;
}

const RequestCard = ({ request, requester, onClick }: RequestCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:-translate-y-1 border"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{request.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={requester.avatar} alt={requester.name} />
              <AvatarFallback className="text-xs">{requester.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{requester.name}</span>
            {requester.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
          </div>
        </div>
        <Badge variant={request.type === "Rent" ? "default" : "secondary"}>
          {request.type}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request.description}</p>

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xl font-bold text-primary">₹{request.maxPrice}</span>
            <span className="text-xs text-muted-foreground ml-1">max</span>
          </div>
          <Badge variant="outline">{request.category}</Badge>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {request.createdAt}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
