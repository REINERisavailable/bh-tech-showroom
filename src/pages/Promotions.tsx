import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Promotions = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .not('old_price', 'is', null)
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🎉 Promotions</h1>
          <p className="text-muted-foreground">Profitez de nos offres spéciales et réductions exceptionnelles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image_url || '/placeholder.svg'}
              title={product.title}
              price={`${product.price} MAD`}
              oldPrice={product.old_price ? `${product.old_price} MAD` : undefined}
              badge={product.old_price ? `-${Math.round(((product.old_price - product.price) / product.old_price) * 100)}% OFF` : undefined}
              stock={product.stock_status}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Promotions;
