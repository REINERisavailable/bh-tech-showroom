import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";

const Index = () => {
  // Generate popular products - mix of both products sorted by popularity
  const generatePopularProducts = () => {
    const baseProducts = [
      {
        id: 1,
        image: prod1,
        title: "THE IMOU RANGER 2 - Caméra 3K Smart",
        price: "1,299.00 MAD",
        oldPrice: "1,599.00 MAD",
        badge: "-19% OFF",
        stock: "En stock",
        popularity: 95
      },
      {
        id: 2,
        image: prod2,
        title: "HP ELITEBOOK 830 G7 X360",
        price: "8,500.00 MAD",
        oldPrice: "10,200.00 MAD",
        badge: "-17% OFF",
        stock: "En stock",
        popularity: 92
      }
    ];

    const products = [];
    for (let i = 0; i < 16; i++) {
      const baseProduct = baseProducts[i % 2];
      products.push({
        ...baseProduct,
        id: i + 1,
      });
    }
    return products;
  };

  const popularProducts = generatePopularProducts();

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
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={String(product.id)}
                image={product.image}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                badge={product.badge}
                stock={product.stock}
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
