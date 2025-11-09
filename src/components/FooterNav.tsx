import { Home, Package, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const FooterNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t md:hidden">
      <div className="container mx-auto px-4 h-16 flex items-center justify-around">
        <NavLink
          to="/home"
          className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/my-listings"
          className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          <Package className="h-5 w-5" />
          <span className="text-xs">My Listings</span>
        </NavLink>

        <NavLink
          to="/profile"
          className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default FooterNav;
