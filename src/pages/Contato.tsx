import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import mascotSupport from "@/assets/mascote/dd216db7-04d1-4589-b1b0-72bda57d405e.webp";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("Brejo - MA");
  const { toast } = useToast();

  useEffect(() => {
    // Carrega a cidade do localStorage ou usa a default
    const storedCity = localStorage.getItem("mundialnet-city");
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulação de envio (substituir por API real)
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado!",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  const contactInfo = useMemo(
    () => [
      {
        icon: Phone,
        title: "Telefone",
        lines: ["(98) 2107-3531"],
      },
      {
        icon: Mail,
        title: "E-mail",
        lines: ["contato@mundialnetfibra.com.br"],
      },
      {
        icon: MapPin,
        title: "Endereço",
        lines: ["Rua Exemplo, 123", selectedCity],
      },
      {
        icon: Clock,
        title: "Horário",
        lines: ["Segunda a Sexta: 8h às 20h", "Sábado: 9h às 14h"],
      },
    ],
    [selectedCity]
  );

  return (
    <div className="min-h-screen pt-20 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-4 mb-12 sm:mb-16 md:mb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Entre em{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Contato
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2">
              Estamos prontos para atender você. Tire suas dúvidas ou solicite
              mais informações sobre nossos serviços.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className=" mb-12 sm:mb-16 md:mb-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-border shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium mb-2"
                    >
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-11 sm:h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium mb-2"
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
                      className="h-11 sm:h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs sm:text-sm font-medium mb-2"
                    >
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-11 sm:h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-sm font-medium mb-2"
                    >
                      Mensagem *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Como podemos ajudar você?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      className="min-h-[120px] sm:min-h-[140px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg gradient-primary hover:opacity-90 shadow-primary"
                  >
                    {loading ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="ml-2" size={20} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-primary">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{info.title}</h3>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-muted-foreground text-sm sm:text-base break-words">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8"
              >
                <img
                  src={mascotSupport}
                  alt="Mascote de suporte"
                  className="w-full max-w-sm mx-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
