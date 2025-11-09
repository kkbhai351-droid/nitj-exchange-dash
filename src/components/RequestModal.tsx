import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ShieldCheck, Star, MessageCircle, Clock } from "lucide-react";
import type { Request, User } from "@/data/mockData";

interface RequestModalProps {
  request: Request | null;
  requester: User | null;
  isOpen: boolean;
  onClose: () => void;
  onRespond: () => void;
  onContact: () => void;
}

const RequestModal = ({ request, requester, isOpen, onClose, onRespond, onContact }: RequestModalProps) => {
  if (!request || !requester) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{request.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant={request.type === "Rent" ? "default" : "secondary"} className="text-base px-3 py-1">
              {request.type}
            </Badge>
            <Badge variant="outline" className="text-base px-3 py-1">{request.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
              <Clock className="h-4 w-4" />
              Posted {request.createdAt}
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              ₹{request.maxPrice}
              <span className="text-lg text-muted-foreground ml-2">maximum budget</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">What they're looking for</h3>
            <p className="text-muted-foreground">{request.description}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Requested by</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-12 w-12">
                <AvatarImage src={requester.avatar} alt={requester.name} />
                <AvatarFallback>{requester.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{requester.name}</p>
                  {requester.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{requester.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span className="text-sm font-semibold">{requester.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onRespond} className="flex-1">
              I Have This Item
            </Button>
            <Button onClick={onContact} variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
