
import { useState, useEffect } from "react";
import { MapPin, Facebook, Instagram, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FirstAccessModal } from "./FirstAccessModal";

const CITIES = [
  "Brejo - MA",
  "Anapurus - MA",
  "Magalhães de Almeida - MA",
  "Santa Quitéria do Maranhão - MA",
  "São Bernardo - MA",
  "Mata Roma - MA",
  "Milagres - MA",
];

const DEFAULT_CITY = "Brejo - MA";


const Topbar = () => {
  const [selectedCity, setSelectedCity] = useState<string>(DEFAULT_CITY);
  const [isOpen, setIsOpen] = useState(false);
  const [showFirstAccess, setShowFirstAccess] = useState(false);
  const [firstAccessChecked, setFirstAccessChecked] = useState(false);

  useEffect(() => {
    // Checa se já foi feito o fluxo de primeiro acesso
    const firstAccess = localStorage.getItem("mundialnet-first-access");
    if (!firstAccess) {
      setShowFirstAccess(true);
    }
    // Carrega a cidade do localStorage ou usa a default
    const storedCity = localStorage.getItem("mundialnet-city");
    if (storedCity && CITIES.includes(storedCity)) {
      setSelectedCity(storedCity);
    } else {
      localStorage.setItem("mundialnet-city", DEFAULT_CITY);
    }
    setFirstAccessChecked(true);
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem("mundialnet-city", city);
    setIsOpen(false);
  };

  const handleFirstAccessClose = () => {
    setShowFirstAccess(false);
    localStorage.setItem("mundialnet-first-access", "true");
  };

  const handleFirstAccessClient = () => {
    setShowFirstAccess(false);
    localStorage.setItem("mundialnet-first-access", "true");
    setIsOpen(true); // Abre o modal de cidade
  };

  return (
    <>
      {/* Modal de primeiro acesso */}
      {showFirstAccess && firstAccessChecked && (
        <FirstAccessModal
          open={showFirstAccess}
          onClose={handleFirstAccessClose}
          onClient={handleFirstAccessClient}
        />
      )}
      <div className="z-50 bg-blue-dark text-white py-2 lg:px-4 border-b border-white/10">
        <div className="container mx-auto px-0  flex items-center justify-between">
          {/* Botão de Seleção de Cidade */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-white gap-2 px-2 h-8"
              >
                <MapPin size={16} />
                <span className="text-sm">{selectedCity}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Selecione sua Cidade
                </DialogTitle>
                <DialogDescription>
                  Escolha a cidade onde você está localizado para ver os serviços
                  disponíveis.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                {CITIES.map((city) => (
                  <Button
                    key={city}
                    variant={selectedCity === city ? "default" : "outline"}
                    className={`justify-start h-12 ${
                      selectedCity === city
                        ? "gradient-primary"
                        : "hover:border-primary"
                    }`}
                    onClick={() => handleCitySelect(city)}
                  >
                    <MapPin size={16} className="mr-2" />
                    {city}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Ícones Sociais */}
          <div className="flex items-center gap-4 px-2">
            <a
              href="https://www.facebook.com/mundialnetfibra/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/mundialnetfibra/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="tel:9821073531"
              className="hover:text-primary transition-colors flex items-center gap-1"
              aria-label="Telefone"
            >
              <Phone size={18} />
              <span className="text-sm hidden sm:inline">(98) 2107-3531</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
