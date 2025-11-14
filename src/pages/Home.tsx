import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Shield, Clock, Wifi, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlanCard from "@/components/PlanCard";
import mascotHero from "@/assets/mascote/pose8.png";
import mascotBenefits from "@/assets/mascote/8bdfa128-1a30-44a9-8e32-55a705e3ac14.webp";
import heroBg from "@/assets/14842.jpg";

const Home = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Velocidade Real",
      description: "100% fibra óptica com velocidade garantida em contrato",
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Conexão criptografada e proteção contra ameaças",
    },
    {
      icon: Clock,
      title: "Suporte 24/7",
      description: "Equipe técnica disponível todos os dias, o tempo todo",
    },
    {
      icon: Wifi,
      title: "Tecnologia de Ponta",
      description: "Equipamentos modernos e infraestrutura de última geração",
    },
  ];

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Há mais de<br className="lg:hidden" />{" "}
                <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                  10 anos
                </span>
                <br />
                Coectando a nossa gente!
              </h1>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                Fibra óptica de verdade, com velocidade garantida e suporte
                local. Conecte-se ao que realmente importa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gradient-primary hover:opacity-90 shadow-primary text-lg h-14 px-8"
                >
                  <Link to="/planos" className="flex items-center gap-2">
                    Ver Planos
                    <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 h-14 px-8 text-lg hover:border-primary"
                >
                  <Link to="/cobertura">Verificar Cobertura</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={mascotHero}
                  alt="Mascote MundialNet"
                  className=" w-full lg:w-4/5 h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que escolher a{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                MundialNet?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologia, qualidade e atendimento que fazem a diferença
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-primary">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={mascotBenefits}
              alt="Mascote apontando benefícios"
              className="w-full max-w-md h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Plans Preview Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Escolha o{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Plano Ideal
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Planos com velocidade real e suporte completo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} delay={index * 0.1} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/planos">
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:border-primary"
              >
                Ver Todos os Planos
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden gradient-hero p-12 md:p-16 text-center shadow-2xl"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Pronto para navegar mais rápido?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Faça parte da revolução da internet fibra óptica
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg h-14 px-8"
              >
                <Link to="/planos">Assine Agora</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
