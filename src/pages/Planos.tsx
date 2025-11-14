import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import PlanCard from "@/components/PlanCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gauge } from "lucide-react";

interface Activity {
  id: string;
  label: string;
  mbpsPerDevice: number;
}

interface SpeedCalculatorProps {
  plans: Array<{
    name: string;
    speed: string;
    price: string;
    features: string[];
    highlighted?: boolean;
  }>;
}

const SpeedCalculator = ({ plans }: SpeedCalculatorProps) => {
  const [devices, setDevices] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const activities: Activity[] = [
    {
      id: "internet",
      label: "Navegar na internet e redes sociais",
      mbpsPerDevice: 100,
    },
    {
      id: "streaming",
      label: "Ver filmes, séries outros conteúdos",
      mbpsPerDevice: 150,
    },
    {
      id: "homeoffice",
      label: "Trabalho Home Office e Aulas online",
      mbpsPerDevice: 200,
    },
    { id: "gaming", label: "Jogos Online", mbpsPerDevice: 250 },
  ];

  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const calculateRequiredSpeed = () => {
    if (selectedActivities.length === 0) return 0;

    // Base speed: soma das atividades selecionadas (valor base sem multiplicar)
    const baseSpeed = selectedActivities.reduce((total, activityId) => {
      const activity = activities.find((a) => a.id === activityId);
      return total + (activity ? activity.mbpsPerDevice : 0);
    }, 0);

    // Incremento por dispositivos adicionais (25 Mbps por dispositivo extra)
    const deviceIncrement = (devices - 1) * 25;

    // Speed total limitado a 1000 Mbps
    const totalMbps = Math.min(baseSpeed + deviceIncrement, 1000);
    
    return Math.round(totalMbps);
  };

  const getRecommendedPlan = () => {
    const requiredSpeed = calculateRequiredSpeed();
    const sortedPlans = [...plans].sort(
      (a, b) => parseInt(a.speed) - parseInt(b.speed)
    );

    for (const plan of sortedPlans) {
      if (parseInt(plan.speed) >= requiredSpeed) {
        return plan;
      }
    }
    return sortedPlans[sortedPlans.length - 1];
  };

  const requiredSpeed = calculateRequiredSpeed();
  const recommendedPlan = getRecommendedPlan();

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 w-full">
      {/* Calculator Section */}
      <div className="text-white min-w-0">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <Gauge className="w-24 h-24 sm:w-32 sm:h-32 mb-4 md:mb-6" strokeWidth={1.5} />
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
            {requiredSpeed > 0 ? requiredSpeed : "70"}MEGA
          </div>
          <p className="text-white/80 text-base md:text-lg">Velocidade recomendada</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
          <div className="space-y-4">
            {activities.map((activity) => (
              <label
                key={activity.id}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedActivities.includes(activity.id)}
                    onChange={() => toggleActivity(activity.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-7 rounded-full transition-colors flex items-center ${
                      selectedActivities.includes(activity.id)
                        ? "bg-white"
                        : "bg-white/30"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-primary transition-transform duration-200 ${
                        selectedActivities.includes(activity.id)
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
                <span className="text-white text-sm sm:text-base md:text-lg flex-1">
                  {activity.label}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
            <label className="text-white text-sm sm:text-base md:text-lg mb-2 sm:mb-3 block">
              Quantidade de Dispositivos: {devices}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={devices}
              onChange={(e) => setDevices(parseInt(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      </div>

      {/* Recommended Plan Section */}
      <div className="flex items-center justify-center min-w-0">
        {requiredSpeed > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center w-full h-full flex flex-col justify-center min-w-0"
          >
            <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
              Plano recomendado para você:
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
              {recommendedPlan.name}
            </h3>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-1 sm:mb-2">
              {recommendedPlan.speed} MEGA
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4 sm:mb-6">
              R$ {recommendedPlan.price}
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">/mês</span>
            </p>

            {/* Features List */}
            <div className="mb-4 sm:mb-6 text-left space-y-2 sm:space-y-3 max-w-md mx-auto">
              {recommendedPlan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-xs sm:text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="gradient-primary hover:opacity-90 shadow-primary w-full text-sm sm:text-base md:text-lg h-12 sm:h-14"
            >
              Assinar Este Plano
            </Button>
          </motion.div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 text-center text-white">
            <p className="text-sm sm:text-base md:text-lg">
              Selecione suas atividades e quantidade de dispositivos para ver o
              plano ideal para você
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Planos = () => {
  const plans = [
    {
      name: "Universitário",
      speed: "500",
      price: "110,00",
      features: [
        "Conexão Fibra Óptica",
        "Tráfego Ilimitado",
        "500 Mega Download",
        "Suporte de Seg. a Sábado",
        "Com Fidelidade 12 meses",
        "Roteador em comodato",
        "Wi-fi 5",
        "Mundial TV***",
      ],
    },
    {
      name: "Básico",
      speed: "750",
      price: "130,00",
      features: [
        "Conexão Fibra Óptica",
        "Tráfego Ilimitado",
        "750 Mega Download",
        "Suporte de Seg. a Sábado",
        "Com Fidelidade",
        "Roteador comodato",
        "Wi-fi 6",
        "Mundial TV***",
      ],
      highlighted: true,
    },
    {
      name: "Família",
      speed: "900",
      price: "160,00",
      features: [
        "Conexão Fibra Óptica",
        "Tráfego Ilimitado",
        "900 Mega Download",
        "Suporte de Seg. a Sábado",
        "Com Fidelidade",
        "Roteador comodato",
        "Wi-fi 6",
        "Mundial TV***",
      ],
    },
    {
      name: "Casa Conectada",
      speed: "1000",
      price: "200,00",
      features: [
        "Conexão Fibra Óptica",
        "Tráfego Ilimitado",
        "1000 Mega Download",
        "Suporte de Seg. a Sábado",
        "Com Fidelidade",
        "Roteador comodato",
        "Wi-fi 6",
        "Mundial TV Incluso",
      ],
    },
  ];

  const comparisonFeatures = [
    {
      feature: "Velocidade",
      plus: "500 Mbps",
      premium: "750 Mbps",
      master: "900 Mbps",
      casaConectada: "1000 Mbps",
    },
    {
      feature: "Fibra Ótica",
      plus: true,
      premium: true,
      master: true,
      casaConectada: true,
    },
    {
      feature: "Wi-Fi 5",
      plus: true,
      premium: true,
      master: true,
      casaConectada: true,
    },
    {
      feature: "Wi-Fi 6",
      plus: false,
      premium: true,
      master: true,
      casaConectada: true,
    },
    {
      feature: "Tráfego Ilimitado",
      plus: true,
      premium: true,
      master: true,
      casaConectada: true,
    },
    {
      feature: "Suporte de Seg. a Sábado",
      plus: true,
      premium: true,
      master: true,
      casaConectada: true,
    },
    {
      feature: "Fidelidade",
      plus: "12 meses",
      premium: "Sim",
      master: "Sim",
      casaConectada: "Sim",
    },
    {
      feature: "Roteador em comodato",
      plus: true,
      premium: true,
      master: true,
      casaConectada: true,
    },
    {
      feature: "Mundial TV",
      plus: "***",
      premium: "***",
      master: "***",
      casaConectada: "Incluso",
    },
  ];

  const faqs = [
    {
      question: "Como funciona a instalação?",
      answer:
        "Nossa equipe técnica agenda a instalação em até 48 horas após a contratação. O processo é rápido e não gera custos adicionais. Nosso técnico instala toda a infraestrutura necessária e configura os equipamentos.",
    },
    {
      question: "Posso mudar de plano depois?",
      answer:
        "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do nosso app ou entrando em contato com o suporte. Mudanças de plano são processadas em até 24 horas.",
    },
    {
      question: "Qual a fidelidade do contrato?",
      answer:
        "Nossos planos não possuem fidelidade obrigatória. Você pode cancelar quando quiser sem multas. Oferecemos descontos especiais para contratos de 12 meses.",
    },
    {
      question: "A velocidade é garantida?",
      answer:
        "Sim! Nossa conexão via fibra óptica garante 100% da velocidade contratada. Diferente de outras tecnologias, a fibra não sofre variação e mantém a velocidade estável o tempo todo.",
    },
    {
      question: "O que está incluído no Wi-Fi gratuito?",
      answer:
        "Todos os planos incluem um roteador Wi-Fi moderno sem custo adicional. Os modelos variam de acordo com o plano contratado (Wi-Fi 5, Wi-Fi 6 ou Wi-Fi 6E). Planos Ultra e Giga incluem roteadores mesh para melhor cobertura.",
    },
  ];

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
              Planos para{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Todos os Perfis
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Escolha o plano ideal para sua casa ou empresa. Todos com fibra
              óptica, velocidade real e suporte completo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="mb-12 sm:mb-16 md:mb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto items-stretch">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 mb-12 sm:mb-16 md:mb-20 bg-muted/50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Compare os{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Planos
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Veja lado a lado o que cada plano oferece
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto -mx-4 px-4"
          >
            <table className="w-full bg-card rounded-2xl border border-border overflow-hidden min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-2 sm:p-3 md:p-4 font-bold text-xs sm:text-sm md:text-base">Recurso</th>
                  <th className="text-center p-2 sm:p-3 md:p-4 font-bold text-xs sm:text-sm md:text-base">Universitário</th>
                  <th className="text-center p-2 sm:p-3 md:p-4 font-bold text-xs sm:text-sm md:text-base">Básico</th>
                  <th className="text-center p-2 sm:p-3 md:p-4 font-bold text-xs sm:text-sm md:text-base">Família</th>
                  <th className="text-center p-2 sm:p-3 md:p-4 font-bold text-xs sm:text-sm md:text-base">Casa Conectada</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-2 sm:p-3 md:p-4 font-medium text-xs sm:text-sm md:text-base">{row.feature}</td>
                    <td className="p-2 sm:p-3 md:p-4 text-center">
                      {typeof row.plus === "boolean" ? (
                        row.plus ? (
                          <Check className="inline text-primary" size={16} />
                        ) : (
                          <X
                            className="inline text-muted-foreground"
                            size={16}
                          />
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs sm:text-sm">
                          {row.plus}
                        </span>
                      )}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-center">
                      {typeof row.premium === "boolean" ? (
                        row.premium ? (
                          <Check className="inline text-primary" size={16} />
                        ) : (
                          <X
                            className="inline text-muted-foreground"
                            size={16}
                          />
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs sm:text-sm">
                          {row.premium}
                        </span>
                      )}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-center">
                      {typeof row.master === "boolean" ? (
                        row.master ? (
                          <Check className="inline text-primary" size={16} />
                        ) : (
                          <X
                            className="inline text-muted-foreground"
                            size={16}
                          />
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs sm:text-sm">
                          {row.master}
                        </span>
                      )}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-center">
                      {typeof row.casaConectada === "boolean" ? (
                        row.casaConectada ? (
                          <Check className="inline text-primary" size={16} />
                        ) : (
                          <X
                            className="inline text-muted-foreground"
                            size={16}
                          />
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs sm:text-sm">
                          {row.casaConectada}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
      {/* Speed Calculator Section */}
      <section className="px-4 mb-12 sm:mb-16 md:mb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
              Descubra a{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Velocidade Ideal
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Aqui, você poderá descobrir a velocidade ideal para garantir que
              sua conexão atenda perfeitamente às atividades do seu dia a dia
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-blue-dark rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl"
          >
            <SpeedCalculator plans={plans} />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Perguntas{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Frequentes
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Planos;
