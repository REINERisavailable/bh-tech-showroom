import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();
    setProduct(data);
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        image_url: product.image_url || ''
      });
      toast({ title: 'Produit ajouté au panier' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Produit non trouvé</p>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.old_price 
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-yellow-500 text-black font-bold text-lg z-10">
                -{discount}% OFF
              </Badge>
            )}
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.categories?.name && (
              <Badge variant="outline" className="text-sm">
                {product.categories.name}
              </Badge>
            )}
            
            <h1 className="text-4xl font-bold">{product.title}</h1>
            
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  {product.price} MAD
                </span>
                {product.old_price && (
                  <span className="text-2xl text-muted-foreground line-through">
                    {product.old_price} MAD
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-green-600 font-medium">
                  Économisez {(product.old_price - product.price).toFixed(2)} MAD
                </p>
              )}
            </div>

            <div className="py-4 border-y border-border">
              <p className="text-lg">
                <span className="font-semibold">Statut: </span>
                <span className={product.stock_status === 'En stock' ? 'text-green-600' : 'text-red-600'}>
                  {product.stock_status}
                </span>
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full gap-2 text-lg py-6"
              onClick={handleAddToCart}
              disabled={product.stock_status !== 'En stock'}
            >
              <ShoppingCart className="h-5 w-5" />
              Ajouter au panier
            </Button>

            <div className="bg-secondary rounded-lg p-6 space-y-3">
              <h3 className="font-bold text-lg">Informations produit</h3>
              <p className="text-muted-foreground">
                {product.title}
              </p>
              {product.categories?.name && (
                <p className="text-sm">
                  <span className="font-semibold">Catégorie: </span>
                  {product.categories.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
