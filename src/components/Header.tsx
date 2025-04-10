
import { Button } from "@/components/ui/button";
import { BookText, PlusCircle, BarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookText className="h-6 w-6 text-mindful" />
          <h1 className="text-xl font-semibold text-mindful-dark">Mindful Journal</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button
            variant={location.pathname === "/" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center gap-1">
              <BookText className="h-4 w-4" />
              <span>Entries</span>
            </Link>
          </Button>
          <Button
            variant={location.pathname === "/insights" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/insights" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Insights</span>
            </Link>
          </Button>
          <Button size="sm" className="ml-2" asChild>
            <Link to="/new-entry" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>New Entry</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
