import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";

const Index = () => {
  // Generate products - duplicating the 2 products multiple times
  const generateProducts = () => {
    const baseProducts = [
      {
        id: 1,
        image: prod1,
        title: "THE IMOU RANGER 2 - Caméra 3K Smart",
        price: "1,299.00 MAD",
        oldPrice: "1,599.00 MAD",
        badge: "-19% OFF",
        stock: "En stock",
        category: "surveillance"
      },
      {
        id: 2,
        image: prod2,
        title: "HP ELITEBOOK 830 G7 X360",
        price: "8,500.00 MAD",
        oldPrice: "10,200.00 MAD",
        badge: "-17% OFF",
        stock: "En stock",
        category: "informatique"
      }
    ];

    const products = [];
    for (let i = 0; i < 50; i++) {
      const baseProduct = baseProducts[i % 2];
      products.push({
        ...baseProduct,
        id: i + 1,
      });
    }
    return products;
  };

  const products = generateProducts();
  const computerProducts = products.filter(p => p.category === "informatique");
  const cameraProducts = products.filter(p => p.category === "surveillance");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        {/* Computer Section */}
        <section id="informatique" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">💻 Matériel Informatique</h2>
            <a href="#informatique" className="text-primary hover:underline">Voir tout</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {computerProducts.map((product) => (
              <ProductCard
                key={product.id}
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

        {/* Camera Section */}
        <section id="surveillance" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">📽 Caméras de Surveillance</h2>
            <a href="#surveillance" className="text-primary hover:underline">Voir tout</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cameraProducts.map((product) => (
              <ProductCard
                key={product.id}
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

        {/* Contact Section */}
        <section id="contact" className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4">Besoin d'aide ?</h2>
          <p className="text-muted-foreground mb-4">
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/212706415836" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Contactez-nous sur WhatsApp
            </a>
            <a 
              href="tel:+212645509962" 
              className="inline-flex items-center justify-center bg-secondary text-secondary-foreground border border-border px-6 py-3 rounded-md font-semibold hover:bg-secondary/80 transition-colors"
            >
              Appelez-nous
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
