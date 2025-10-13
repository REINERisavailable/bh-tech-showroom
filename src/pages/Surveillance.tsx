import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import prod1 from "@/assets/prod1.jpg";

const Surveillance = () => {
  const generateProducts = () => {
    const products = [];
    for (let i = 0; i < 25; i++) {
      products.push({
        id: i + 1,
        image: prod1,
        title: "THE IMOU RANGER 2 - Caméra 3K Smart",
        price: "1,299.00 MAD",
        oldPrice: "1,599.00 MAD",
        badge: "-19% OFF",
        stock: "En stock",
      });
    }
    return products;
  };

  const products = generateProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">📽 Caméras de Surveillance</h1>
          <p className="text-muted-foreground">Systèmes de surveillance professionnels pour votre sécurité</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default Surveillance;
