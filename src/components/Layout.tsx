
import Header from "@/components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-6">{children}</main>
      <footer className="py-4 border-t">
        <div className="container text-center text-muted-foreground text-sm">
          <p>Mindful Journal • Keep track of your emotional well-being</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
