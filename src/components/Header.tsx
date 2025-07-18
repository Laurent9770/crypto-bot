import { useState } from "react";
import { Menu, X, LogIn, UserPlus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              CryptoBot Pro
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Button asChild variant="premium" size="sm">
              <Link to="/premium">Premium</Link>
            </Button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild variant="trading" size="sm">
              <Link to="/register">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Home</Link>
              <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Features</Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Pricing</Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Support</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>About</Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Dashboard</Link>
              <Button asChild variant="premium" size="sm" className="justify-start">
                <Link to="/premium" onClick={toggleMenu}>Premium</Link>
              </Button>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button asChild variant="ghost" size="sm" className="justify-start">
                  <Link to="/login" onClick={toggleMenu}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild variant="trading" size="sm" className="justify-start">
                  <Link to="/register" onClick={toggleMenu}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};