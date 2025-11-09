import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import type { Item } from "@/data/mockData";

interface ItemCardProps {
  item: Item;
  onClick: () => void;
}

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant={item.type === "Rent" ? "default" : "secondary"} className="font-semibold">
            {item.type}
          </Badge>
          {item.verified && (
            <Badge variant="outline" className="bg-card/90 backdrop-blur">
              <ShieldCheck className="h-3 w-3 mr-1 text-primary" />
              Verified
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{item.condition}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₹{item.price}</span>
            {item.type === "Rent" && <span className="text-sm text-muted-foreground">/day</span>}
          </div>
          <Badge variant="outline">{item.category}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
