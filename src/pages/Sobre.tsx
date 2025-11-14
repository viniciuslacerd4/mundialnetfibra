import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";

const Sobre = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Conectar pessoas e empresas através de internet de alta qualidade, promovendo desenvolvimento e transformação digital.",
    },
    {
      icon: Eye,
      title: "Visão",
      description:
        "Ser referência em conectividade e inovação tecnológica, expandindo nossa cobertura e melhorando continuamente nossos serviços.",
    },
    {
      icon: Heart,
      title: "Valores",
      description:
        "Compromisso com a excelência, transparência, atendimento humanizado e desenvolvimento sustentável da comunidade.",
    },
  ];

  const stats = [
    { icon: Users, value: "50mil+", label: "Clientes Conectados" },
    { icon: Award, value: "15+", label: "Anos de Experiência" },
    { icon: TrendingUp, value: "98%", label: "Satisfação dos Clientes" },
  ];

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
              Sobre a{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                MundialNet
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Somos uma empresa de telecomunicações comprometida em levar
              internet de qualidade para lares e empresas, sempre com tecnologia
              de ponta e atendimento humanizado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 mb-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-3xl p-8 md:p-12 border border-border"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Fundada há mais de 10 anos, a MundialNet nasceu do sonho de
                  democratizar o acesso à internet de alta qualidade. Começamos
                  como um pequeno provedor local e hoje atendemos milhares de
                  clientes em toda a região.
                </p>
                <p>
                  Nossa trajetória é marcada pela constante inovação tecnológica
                  e pelo compromisso inabalável com a satisfação dos nossos
                  clientes. Investimos continuamente em infraestrutura de fibra
                  óptica, garantindo velocidade real e estabilidade.
                </p>
                <p>
                  Além de conectar pessoas, somos parte ativa da comunidade,
                  apoiando iniciativas sociais e promovendo a inclusão digital.
                  Nosso time é formado por profissionais qualificados que
                  compartilham a paixão por tecnologia e atendimento de
                  excelência.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 mb-20 bg-muted/50 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Missão, Visão e{" "}
              <span className="bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent">
                Valores
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-primary">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center p-8 bg-card rounded-2xl border border-border"
                >
                  <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-primary">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
