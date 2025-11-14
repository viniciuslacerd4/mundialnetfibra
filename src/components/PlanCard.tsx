import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PlanCardProps {
  name: string;
  speed: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  delay?: number;
}

const PlanCard = ({
  name,
  speed,
  price,
  features,
  highlighted = false,
  delay = 0,
}: PlanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`relative rounded-2xl p-8 bg-card border-2 transition-all duration-300 h-full flex flex-col ${
        highlighted
          ? "border-primary shadow-primary scale-105"
          : "border-border hover:border-primary/50 hover:shadow-lg"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-xs font-semibold text-primary-foreground shadow-primary">
          MAIS POPULAR
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-dark bg-clip-text text-transparent mb-1">
          {speed}
        </div>
        <p className="text-sm text-muted-foreground">Mega</p>
      </div>

      <div className="text-center mb-6 pb-6 border-b border-border">
        <div className="flex items-end justify-center gap-1">
          <span className="text-2xl font-semibold">R$</span>
          <span className="text-5xl font-bold">{price}</span>
          <span className="text-muted-foreground mb-2">/mês</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={14} className="text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          asChild
          className={`w-full ${
            highlighted
              ? "gradient-primary hover:opacity-90 shadow-primary"
              : "bg-secondary hover:bg-secondary/90 shadow-secondary"
          } transition-all duration-300`}
        >
          <Link
            to="/contratar"
            state={{
              plan: {
                name,
                speed,
                price,
              },
            }}
          >
            Assinar Agora
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default PlanCard;
