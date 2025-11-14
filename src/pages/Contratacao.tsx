import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import mascotHero from "@/assets/mascote/pose8.webp";

const Contratacao = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dados do plano vindo da navegação
  const planData = location.state?.plan || {
    name: "Master",
    speed: "600",
    price: "129,90",
  };

  const [selectedCity, setSelectedCity] = useState<string>("Brejo - MA");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    // Carrega a cidade do localStorage
    const storedCity = localStorage.getItem("mundialnet-city");
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulação de envio
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Solicitação enviada!",
        description:
          "Entraremos em contato em breve para finalizar a contratação.",
      });
      navigate("/planos");
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header do Plano */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-secondary">
              <span>PLANO {planData.name.toUpperCase()}</span>
              <span>•</span>
              <span>{selectedCity}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Antes de fechar o plano nos informe{" "}
              <span className="bg-gradient-to-r from-secondary to-orange-dark bg-clip-text text-transparent">
                alguns dados
              </span>
            </h1>

            <div className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold shadow-primary">
              <span>{planData.speed} MEGAS</span>
              <span>•</span>
              <span>R$ {planData.price}</span>
            </div>
          </motion.div>

          {/* Formulário */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Mascote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <img
                  src={mascotHero}
                  alt="Mascote MundialNet"
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
            </motion.div>

            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-border">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Dados para Contratação
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Nome *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-2"
                    >
                      Endereço *
                    </label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Rua, número, bairro"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Telefone *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(98) 99999-9999"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12"
                      required
                    />
                  </div>

                  {/* reCAPTCHA Placeholder */}
                  <div className="bg-muted/50 rounded-lg p-4 border-2 border-dashed border-muted-foreground/30">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-muted-foreground rounded"></div>
                      <span className="text-sm text-muted-foreground">
                        Não sou um robô
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      reCAPTCHA -{" "}
                      <a href="#" className="text-primary hover:underline">
                        Termos
                      </a>{" "}
                      •{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacidade
                      </a>
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg gradient-secondary hover:opacity-90 shadow-secondary"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  * Consulte as condições
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contratacao;
