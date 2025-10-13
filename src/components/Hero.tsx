import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <Badge className="bg-yellow-500 text-black mb-4">Nouveautés</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Équipez-vous avec les meilleurs produits technologiques
          </h2>
          <p className="text-lg md:text-xl mb-6 text-primary-foreground/90">
            Matériel informatique de qualité et systèmes de surveillance professionnels
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#informatique" 
              className="inline-flex items-center justify-center bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
            >
              Voir les ordinateurs
            </a>
            <a 
              href="#surveillance" 
              className="inline-flex items-center justify-center bg-primary-foreground/10 border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-foreground/20 transition-colors"
            >
              Caméras de surveillance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
