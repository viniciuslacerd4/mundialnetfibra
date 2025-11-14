import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Cobertura = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Brejo - MA");
  const { toast } = useToast();

  useEffect(() => {
    // Carrega a cidade do localStorage
    const storedCity = localStorage.getItem("mundialnet-city");
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

  // Bairros por cidade
  const cityNeighborhoods: { [key: string]: string[] } = {
    "Brejo - MA": [
      "Centro",
      "São José",
      "Santa Luzia",
      "Boa Vista",
      "Nova Esperança",
      "Jardim Primavera",
      "Vila Nova",
      "Conjunto Habitacional",
    ],
    "Anapurus - MA": [
      "Centro",
      "São Francisco",
      "Nossa Senhora de Fátima",
      "Vila Nova",
      "Jardim São Paulo",
      "Boa Vista",
    ],
    "Magalhães de Almeida - MA": [
      "Centro",
      "São João",
      "Santa Maria",
      "Vila Progresso",
      "Jardim das Flores",
    ],
    "Santa Quitéria do Maranhão - MA": [
      "Centro",
      "São José",
      "Santa Luzia",
      "Vila Nova",
      "Jardim Esperança",
    ],
    "São Bernardo - MA": [
      "Centro",
      "São Francisco",
      "Nossa Senhora Aparecida",
      "Vila São Bernardo",
      "Conjunto Habitacional",
    ],
    "Mata Roma - MA": [
      "Centro",
      "São João",
      "Santa Maria",
      "Vila Nova",
      "Jardim Primavera",
    ],
    "Milagres - MA": [
      "Centro",
      "São José",
      "Nossa Senhora dos Milagres",
      "Vila Progresso",
      "Jardim das Flores",
    ],
  };

  const coverageAreas =
    cityNeighborhoods[selectedCity] || cityNeighborhoods["Brejo - MA"];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="px-4 mb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              A Melhor{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Internet da Região
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Internet de fibra óptica com a melhor cobertura e qualidade em {selectedCity} e região.
            </p>
          </motion.div>
        </div>
      </section>

      {/* City Info Section */}
      <section className="   mb-20">
        <div className="container mx-auto p-2 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-lg text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-primary flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">
                Líder em {selectedCity}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              A MundialNet é a provedora de internet com a{" "}
              <strong>maior cobertura e melhor qualidade</strong> de {selectedCity}.{" "}
              Há mais de 10 anos conectando famílias e empresas com internet de fibra óptica de alta velocidade e estabilidade.
            </p>

            <Button
              asChild
              className="gradient-primary hover:opacity-90 shadow-primary h-12 px-8"
            >
              <a href="tel:9821073531" className="flex items-center gap-2">
                <Phone size={20} />
                (98) 2107-3531
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Cobertura;
