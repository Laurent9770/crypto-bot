import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">CryptoBot</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/dashboard">Dashboard</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                Trading <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild><Link to="/trading">Main</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/futures">Futures</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/margin">Margin</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/spot">Spot</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/options-signals">Options</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/pricing">Pricing</Link>
            <Link to="/copy-trading">Copy Trading</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                Resources <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild><Link to="/features">Features</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/news">News</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/sentiment">Sentiment</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/docs">Docs</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/support">Support</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/about">About</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/contact">Contact</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}