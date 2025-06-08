import { Card, CardContent } from "@/components/ui/card";
import { features } from "../utils/features";

const AboutSection = () => {
  return (
    <section className="from-muted/20 to-muted/40 bg-gradient-to-br py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
            Conheça o{" "}
            <span className="bg-gradient-axel bg-clip-text text-transparent">
              Axel AI
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Sou um assistente virtual desenvolvido para tornar sua vida mais
            fácil e produtiva. Com tecnologia de ponta, posso ajudar você em
            diversas tarefas do dia a dia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-card/70 transform backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="bg-gradient-axel rounded-full p-4 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-axel rounded-2xl p-8 text-white md:p-12">
            <h3 className="mb-6 text-3xl font-bold md:text-4xl">
              Pronto para começar?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
              Experimente agora e descubra como posso transformar sua rotina com
              soluções inteligentes e personalizadas.
            </p>
            <button className="transform rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-colors duration-300 hover:scale-105 hover:bg-gray-100">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
