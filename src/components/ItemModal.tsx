import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ShieldCheck, Star, MessageCircle } from "lucide-react";
import type { Item, User } from "@/data/mockData";

interface ItemModalProps {
  item: Item | null;
  owner: User | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestRent: () => void;
  onContactSeller: () => void;
}

const ItemModal = ({ item, owner, isOpen, onClose, onRequestRent, onContactSeller }: ItemModalProps) => {
  if (!item || !owner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={item.type === "Rent" ? "default" : "secondary"} className="text-base px-3 py-1">
              {item.type}
            </Badge>
            <Badge variant="outline" className="text-base px-3 py-1">{item.category}</Badge>
            {item.verified && (
              <Badge variant="outline" className="text-base px-3 py-1">
                <ShieldCheck className="h-4 w-4 mr-1 text-primary" />
                Verified
              </Badge>
            )}
          </div>

          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              ₹{item.price}
              {item.type === "Rent" && <span className="text-lg text-muted-foreground">/day</span>}
            </div>
            <p className="text-sm text-muted-foreground">Condition: {item.condition}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Owner Details</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-12 w-12">
                <AvatarImage src={owner.avatar} alt={owner.name} />
                <AvatarFallback>{owner.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{owner.name}</p>
                  {owner.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{owner.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span className="text-sm font-semibold">{owner.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onRequestRent} className="flex-1">
              {item.type === "Rent" ? "Request Rent" : "Request to Buy"}
            </Button>
            <Button onClick={onContactSeller} variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Seller
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
