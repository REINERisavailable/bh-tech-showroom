import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  stock: string;
}

const ProductCard = ({ id, image, title, price, oldPrice, badge, stock }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price: parseFloat(price.replace(/[^0-9.]/g, '')),
      image_url: image
    });
    toast({ title: 'Produit ajouté au panier' });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <div className="relative mb-4">
            {badge && (
              <Badge className="absolute top-2 left-2 bg-yellow-500 text-black font-bold z-10">
                {badge}
              </Badge>
            )}
            <div className="aspect-square overflow-hidden rounded-md bg-secondary">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[2.5rem]">{title}</h3>
        </Link>
        
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">{price}</span>
            {oldPrice && (
              <span className="text-sm text-muted-foreground line-through">{oldPrice}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">{stock}</span>
          <Button size="sm" className="gap-2" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
