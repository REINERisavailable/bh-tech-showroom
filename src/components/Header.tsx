import { ShoppingCart, Phone, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const categories = {
    informatique: {
      name: "Matériel Informatique",
      subcategories: [
        { name: "Ordinateurs portables", items: ["HP", "Dell", "Lenovo", "Asus"] },
        { name: "Ordinateurs de bureau", items: ["Gaming PC", "PC Pro", "PC Standard"] },
        { name: "Composants", items: ["Processeurs", "Cartes mères", "RAM", "Disques durs"] },
        { name: "Périphériques", items: ["Claviers", "Souris", "Moniteurs", "Webcams"] },
      ]
    },
    surveillance: {
      name: "Caméras Surveillance",
      subcategories: [
        { name: "Caméras IP", items: ["Intérieur", "Extérieur", "PTZ"] },
        { name: "Kits surveillance", items: ["2 caméras", "4 caméras", "8 caméras"] },
        { name: "Accessoires", items: ["Câbles", "Supports", "DVR/NVR"] },
      ]
    }
  };

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
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BH Technologie" className="h-12 w-12 object-contain" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">BH Technologie</h1>
              <p className="text-xs text-muted-foreground">Votre partenaire technologique</p>
            </div>
          </Link>

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
            <li>
              <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap">
                Accueil
              </Link>
            </li>
            
            {/* Informatique Dropdown */}
            <li 
              className="relative"
              onMouseEnter={() => setOpenDropdown('informatique')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link 
                to="/informatique" 
                className="hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
              >
                Matériel Informatique
                <ChevronDown className="h-3 w-3" />
              </Link>
              
              {openDropdown === 'informatique' && (
                <div className="absolute top-full left-0 mt-0 bg-card border border-border rounded-lg shadow-lg p-6 min-w-[600px] z-50">
                  <div className="grid grid-cols-2 gap-6">
                    {categories.informatique.subcategories.map((subcat) => (
                      <div key={subcat.name}>
                        <h4 className="font-semibold mb-2 text-foreground">{subcat.name}</h4>
                        <ul className="space-y-1">
                          {subcat.items.map((item) => (
                            <li key={item}>
                              <a 
                                href={`/informatique?filter=${item}`} 
                                className="text-muted-foreground hover:text-primary transition-colors text-sm block"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Surveillance Dropdown */}
            <li 
              className="relative"
              onMouseEnter={() => setOpenDropdown('surveillance')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link 
                to="/surveillance" 
                className="hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
              >
                Caméras Surveillance
                <ChevronDown className="h-3 w-3" />
              </Link>
              
              {openDropdown === 'surveillance' && (
                <div className="absolute top-full left-0 mt-0 bg-card border border-border rounded-lg shadow-lg p-6 min-w-[400px] z-50">
                  <div className="grid grid-cols-1 gap-4">
                    {categories.surveillance.subcategories.map((subcat) => (
                      <div key={subcat.name}>
                        <h4 className="font-semibold mb-2 text-foreground">{subcat.name}</h4>
                        <ul className="space-y-1">
                          {subcat.items.map((item) => (
                            <li key={item}>
                              <a 
                                href={`/surveillance?filter=${item}`} 
                                className="text-muted-foreground hover:text-primary transition-colors text-sm block"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link to="/promotions" className="hover:text-primary transition-colors whitespace-nowrap">
                Promotions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors whitespace-nowrap">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
