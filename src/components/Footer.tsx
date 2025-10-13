import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="BH Technologie" className="h-12 w-12 object-contain" />
              <h3 className="text-xl font-bold">BH Technologie</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Votre destination de confiance pour le matériel informatique et les systèmes de surveillance de qualité.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contactez-nous</h4>
            <div className="space-y-3">
              <a href="tel:+212645509962" className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div>+212 645 509 962</div>
                  <div>0645-509962</div>
                </div>
              </a>
              <a href="https://wa.me/212706415836" className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>WhatsApp: +212 706 415836</span>
              </a>
              <a href="mailto:benhassn.technologie@gmail.com" className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>benhassn.technologie@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Notre Adresse</h4>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <address className="not-italic">
                سوق الحرية<br />
                رقم المحل 43/44<br />
                المدخل أو الباب رقم 1<br />
                إنزكان
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 BH Technologie. Tous droits réservés. | CEO: @reda8aouzal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
