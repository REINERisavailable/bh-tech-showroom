import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">📞 Contactez-nous</h1>
          <p className="text-muted-foreground">Notre équipe est à votre disposition pour répondre à toutes vos questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Informations de contact</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+212645509962" className="text-muted-foreground hover:text-primary transition-colors block">
                      +212 645 509 962
                    </a>
                    <a href="tel:+212645509962" className="text-muted-foreground hover:text-primary transition-colors block">
                      0645-509962
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a href="https://wa.me/212706415836" className="text-muted-foreground hover:text-primary transition-colors">
                      +212 706 415836
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:benhassn.technologie@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      benhassn.technologie@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <address className="text-muted-foreground not-italic">
                      سوق الحرية<br />
                      رقم المحل 43/44<br />
                      المدخل أو الباب رقم 1<br />
                      إنزكان
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Horaires d'ouverture</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Lundi - Samedi: 9h00 - 19h00</p>
                <p>Dimanche: 10h00 - 17h00</p>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Besoin d'aide ?</h2>
              <p className="text-muted-foreground mb-6">
                N'hésitez pas à nous contacter par WhatsApp ou par téléphone. Notre équipe est prête à vous assister.
              </p>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="https://wa.me/212706415836" 
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-4 rounded-md font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contactez-nous sur WhatsApp
                </a>
                <a 
                  href="tel:+212645509962" 
                  className="inline-flex items-center justify-center bg-secondary text-secondary-foreground border border-border px-6 py-4 rounded-md font-semibold hover:bg-secondary/80 transition-colors"
                >
                  Appelez-nous maintenant
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">CEO: @reda8aouzal</h3>
              <p className="text-primary-foreground/90">
                Pour toute demande spéciale ou partenariat, contactez directement notre CEO.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
