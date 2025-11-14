import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Wifi,
} from "lucide-react";
import logo from "@/assets/logo1.png";
import anatelLogo from "@/assets/anatel-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [selectedCity, setSelectedCity] = useState<string>("Brejo - MA");

  useEffect(() => {
    // Carrega a cidade do localStorage ou usa a default
    const storedCity = localStorage.getItem("mundialnet-city");
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src={logo} alt="MundialNet" className="h-16" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Internet fibra óptica com qualidade, velocidade e suporte local.
            </p>
            <div className="flex gap-3">
              <a
                target="_blank"
                href="https://www.facebook.com/mundialnetfibra/"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/mundialnetfibra/"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/planos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link
                  to="/cobertura"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cobertura
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Central do Assinante
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Teste de Velocidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="mt-1 text-primary flex-shrink-0" />
                <a
                  href="tel:9821073531"
                  className="hover:text-primary transition-colors"
                >
                  (98) 2107-3531
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="mt-1 text-primary flex-shrink-0" />
                <a
                  href="mailto:contato@mundialnetfibra.com.br"
                  className="hover:text-primary transition-colors"
                >
                  contato@mundialnetfibra.com.br
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-1 text-primary flex-shrink-0" />
                <span>{selectedCity}, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">


            {/* Provedor Autorizado */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">
                  Provedor Autorizado
                </span>
                <img src={anatelLogo} alt="ANATEL" className="h-8 w-auto" />
              </div>
            </div>


            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center lg:text-left">
              © {currentYear} MundialNet. Todos os direitos reservados.
            </p>


            <a href='https://overzone.dev/' target='_blank' className="text-sm text-primary hover:text-black transition-colors text-center lg:text-left">
                Desenvolvido por <span className="font-bold">Overzone</span> &#169; 2025
              </a>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
