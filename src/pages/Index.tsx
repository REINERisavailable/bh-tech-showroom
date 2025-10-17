import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('popularity', { ascending: false })
      .limit(16);
    if (data) setProducts(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        {/* Popular Products Section */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-2">🔥 Produits Populaires</h2>
            <p className="text-muted-foreground">Découvrez nos produits les plus demandés</p>
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
        </section>

        {/* Quick Categories */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <a 
            href="/informatique" 
            className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-lg hover:shadow-lg transition-shadow group"
          >
            <h3 className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform">💻 Matériel Informatique</h3>
            <p className="text-primary-foreground/90">Ordinateurs, composants et accessoires</p>
          </a>
          <a 
            href="/surveillance" 
            className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground p-8 rounded-lg hover:shadow-lg transition-shadow group border border-border"
          >
            <h3 className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform">📽 Caméras de Surveillance</h3>
            <p className="text-muted-foreground">Systèmes de sécurité professionnels</p>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
