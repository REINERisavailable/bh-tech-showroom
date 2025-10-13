import { ShoppingCart, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.jpeg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+212645509962" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span>0645-509962</span>
            </a>
            <a href="https://wa.me/212706415836" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span>WhatsApp: 0706-415836</span>
            </a>
          </div>
          <div className="hidden md:block">
            <span>CEO: @reda8aouzal</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="BH Technologie" className="h-12 w-12 object-contain" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">BH Technologie</h1>
              <p className="text-xs text-muted-foreground">Votre partenaire technologique</p>
            </div>
          </a>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Rechercher des produits..." 
                className="w-full pr-10"
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button variant="default" className="gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline">Panier</span>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex gap-6 overflow-x-auto py-3 text-sm font-medium">
            <li><a href="#" className="hover:text-primary transition-colors whitespace-nowrap">Accueil</a></li>
            <li><a href="#informatique" className="hover:text-primary transition-colors whitespace-nowrap">Matériel Informatique</a></li>
            <li><a href="#surveillance" className="hover:text-primary transition-colors whitespace-nowrap">Caméras Surveillance</a></li>
            <li><a href="#promotions" className="hover:text-primary transition-colors whitespace-nowrap">Promotions</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors whitespace-nowrap">Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
