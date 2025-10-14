import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";

const Promotions = () => {
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
      },
      {
        id: 2,
        image: prod2,
        title: "HP ELITEBOOK 830 G7 X360",
        price: "8,500.00 MAD",
        oldPrice: "10,200.00 MAD",
        badge: "-17% OFF",
        stock: "En stock",
      }
    ];

    const products = [];
    for (let i = 0; i < 20; i++) {
      const baseProduct = baseProducts[i % 2];
      products.push({
        ...baseProduct,
        id: i + 1,
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
          <h1 className="text-4xl font-bold mb-2">🎉 Promotions</h1>
          <p className="text-muted-foreground">Profitez de nos offres spéciales et réductions exceptionnelles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default Promotions;
