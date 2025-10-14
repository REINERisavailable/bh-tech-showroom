import { ShoppingCart, Phone, Search, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.jpeg";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdmin(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();
    setIsAdmin(!!data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const categories = {
    informatique: {
      name: "💻 Vente Matériel Informatique",
      route: "/informatique",
      subcategories: [
        { 
          name: "🖥️ Ordinateurs & PC Portables", 
          items: [
            { name: "PC Portables Gamer", route: "/informatique?cat=pc-portables-gamer" },
            { name: "PC Portables Multimédia", route: "/informatique?cat=pc-portables-multimedia" },
            { name: "PC Gamer Standard", route: "/informatique?cat=pc-gamer-standard" },
            { name: "PC Gamer Avancé", route: "/informatique?cat=pc-gamer-avance" },
            { name: "PC Gamer Ultra", route: "/informatique?cat=pc-gamer-ultra" },
            { name: "Powered by MSI", route: "/informatique?cat=msi" }
          ] 
        },
        { 
          name: "Apple", 
          items: [
            { name: "MacBook Air", route: "/informatique?cat=macbook-air" },
            { name: "MacBook Pro", route: "/informatique?cat=macbook-pro" },
            { name: "iMac / iMac Pro", route: "/informatique?cat=imac" },
            { name: "Mac Pro", route: "/informatique?cat=mac-pro" },
            { name: "iPad", route: "/informatique?cat=ipad" }
          ] 
        },
        { 
          name: "🖥️ Écrans & Moniteurs", 
          items: [
            { name: "Moniteurs Gamer", route: "/informatique?cat=moniteurs-gamer" },
            { name: "Moniteurs Professionnels", route: "/informatique?cat=moniteurs-pro" },
            { name: "Moniteurs Portables", route: "/informatique?cat=moniteurs-portables" },
            { name: "Supports & Bras", route: "/informatique?cat=supports" }
          ] 
        },
        { 
          name: "🖨️ Imprimantes & Scanners", 
          items: [
            { name: "Imprimantes", route: "/informatique?cat=imprimantes" },
            { name: "Scanners", route: "/informatique?cat=scanners" },
            { name: "Cartouches & Toners", route: "/informatique?cat=cartouches" }
          ] 
        },
        { 
          name: "🌐 Réseau & Internet", 
          items: [
            { name: "Modems & Routeurs", route: "/informatique?cat=modems" },
            { name: "Répéteurs Wi-Fi", route: "/informatique?cat=repeteurs" },
            { name: "Points d'accès WiFi", route: "/informatique?cat=points-acces" },
            { name: "Switch", route: "/informatique?cat=switch" },
            { name: "Serveurs NAS", route: "/informatique?cat=nas" }
          ] 
        },
        { 
          name: "🔌 Connectique", 
          items: [
            { name: "Connectique PC", route: "/informatique?cat=connectique-pc" },
            { name: "Connectique Réseau", route: "/informatique?cat=connectique-reseau" },
            { name: "Cartes Son", route: "/informatique?cat=cartes-son" },
            { name: "Power Banks", route: "/informatique?cat=power-banks" },
            { name: "Clés USB", route: "/informatique?cat=cles-usb" },
            { name: "Cartes Mémoires", route: "/informatique?cat=cartes-memoires" }
          ] 
        },
        { 
          name: "🧩 Composants PC", 
          items: [
            { name: "Processeurs", route: "/informatique?cat=processeurs" },
            { name: "Cartes Mères", route: "/informatique?cat=cartes-meres" },
            { name: "Cartes Graphiques", route: "/informatique?cat=gpu" },
            { name: "Mémoire Vive", route: "/informatique?cat=ram" },
            { name: "SSD / HDD", route: "/informatique?cat=stockage" },
            { name: "Refroidissement", route: "/informatique?cat=refroidissement" },
            { name: "Boîtiers PC", route: "/informatique?cat=boitiers" },
            { name: "Alimentations", route: "/informatique?cat=alimentations" }
          ] 
        },
        { 
          name: "🎧 Périphériques & Audio", 
          items: [
            { name: "Claviers", route: "/informatique?cat=claviers" },
            { name: "Souris", route: "/informatique?cat=souris" },
            { name: "Casques", route: "/informatique?cat=casques" },
            { name: "Microphones", route: "/informatique?cat=microphones" },
            { name: "Tapis de Souris", route: "/informatique?cat=tapis" },
            { name: "Webcams", route: "/informatique?cat=webcams" },
            { name: "Enceintes PC", route: "/informatique?cat=enceintes" }
          ] 
        }
      ]
    },
    surveillance: {
      name: "📽 Caméras de Surveillance",
      route: "/surveillance",
      subcategories: [
        { 
          name: "Systèmes de Surveillance", 
          items: [
            { name: "Caméras IP", route: "/surveillance?cat=cameras-ip" },
            { name: "Kits de Vidéosurveillance", route: "/surveillance?cat=kits" },
            { name: "Stockage pour Caméras", route: "/surveillance?cat=stockage" },
            { name: "Accessoires Sécurité", route: "/surveillance?cat=accessoires" }
          ] 
        }
      ]
    },
    gaming: {
      name: "🎮 Gaming & Accessoires",
      route: "/informatique?filter=gaming",
      subcategories: [
        { 
          name: "Accessoires Gamer", 
          items: [
            { name: "Volants / Joysticks", route: "/informatique?cat=volants" },
            { name: "Lunettes Anti-Fatigue", route: "/informatique?cat=lunettes" },
            { name: "Accessoires Streaming", route: "/informatique?cat=streaming" }
          ] 
        },
        { 
          name: "Mobilier Gaming", 
          items: [
            { name: "Chaises Gamer", route: "/informatique?cat=chaises-gamer" },
            { name: "Chaises Ergonomiques", route: "/informatique?cat=chaises-ergo" },
            { name: "Bureaux Gamer", route: "/informatique?cat=bureaux-gamer" },
            { name: "Bureaux Motorisés", route: "/informatique?cat=bureaux-motorises" },
            { name: "Tapis de Sol", route: "/informatique?cat=tapis-sol" }
          ] 
        },
        { 
          name: "Consoles", 
          items: [
            { name: "PlayStation 5", route: "/informatique?cat=ps5" },
            { name: "Xbox Series", route: "/informatique?cat=xbox" },
            { name: "Nintendo Switch", route: "/informatique?cat=switch" },
            { name: "Consoles Portables", route: "/informatique?cat=consoles-portables" },
            { name: "Accessoires Consoles", route: "/informatique?cat=accessoires-consoles" }
          ] 
        }
      ]
    },
    autres: {
      name: "🧰 Autres Produits",
      route: "/informatique?filter=autres",
      subcategories: [
        { 
          name: "Divers", 
          items: [
            { name: "Tablettes", route: "/informatique?cat=tablettes" },
            { name: "Onduleurs", route: "/informatique?cat=onduleurs" },
            { name: "Compresseur d'air Portable", route: "/informatique?cat=compresseur" }
          ] 
        }
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

          <div className="flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="outline" size="sm" asChild className="hidden md:flex">
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Se déconnecter">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" asChild title="Se connecter">
                <Link to="/auth">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button variant="default" className="gap-2 relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden md:inline">Panier</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-secondary border-t border-border relative z-40">
        <div className="container mx-auto px-4">
          <ul className="flex gap-6 overflow-x-auto text-sm font-medium">
            <li className="py-3">
              <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap">
                Accueil
              </Link>
            </li>
            
            {/* Mega Menu Items */}
            {Object.entries(categories).map(([key, category]) => (
              <li 
                key={key}
                className="relative py-3"
                onMouseEnter={() => setOpenDropdown(key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link 
                  to={category.route} 
                  className="hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  {category.name}
                  <ChevronDown className="h-3 w-3" />
                </Link>
                
                {/* Mega Menu Dropdown */}
                {openDropdown === key && (
                  <div 
                    className="fixed left-0 right-0 top-[180px] z-[100] px-4"
                    onMouseEnter={() => setOpenDropdown(key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="container mx-auto">
                      <div className="bg-card border border-border rounded-lg shadow-2xl p-8 max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                          {category.subcategories.map((subcat) => (
                            <div key={subcat.name} className="space-y-3">
                              <h4 className="font-bold text-sm text-foreground border-b-2 border-primary pb-2">
                                {subcat.name}
                              </h4>
                              <ul className="space-y-2">
                                {subcat.items.map((item) => (
                                  <li key={item.name}>
                                    <Link 
                                      to={item.route} 
                                      className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1 hover:translate-x-1 transform duration-150"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}

            <li className="py-3">
              <Link to="/promotions" className="hover:text-primary transition-colors whitespace-nowrap">
                Promotions
              </Link>
            </li>
            <li className="py-3">
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
