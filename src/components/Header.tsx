import { Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Header = ({ onSearch, searchQuery = "" }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/home" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center text-white font-bold">
            N
          </div>
          <span className="hidden sm:inline">NITJ Exchange</span>
        </Link>

        <div className="flex-1 max-w-md hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
        >
          <User className="h-5 w-5" />
          <span className="hidden sm:inline text-sm">Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
