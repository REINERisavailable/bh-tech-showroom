import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  stock: string;
}

const ProductCard = ({ image, title, price, oldPrice, badge, stock }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
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
          <Button size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
