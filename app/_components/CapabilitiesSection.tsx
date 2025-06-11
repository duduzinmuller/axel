import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capabilities } from "../_data/capabilities";

const CapabilitiesSection = () => {
  return (
    <section
      id="capacidade"
      className="from-muted/20 to-muted/40 bg-gradient-to-br py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
            O que posso fazer por{" "}
            <span className="bg-gradient-axel bg-clip-text text-transparent">
              você?
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Minhas capacidades são vastas e estão em constante evolução. Aqui
            estão algumas das principais áreas onde posso te ajudar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <Card
              key={index}
              className="group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="pb-4 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-gradient-axel rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                    <capability.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <CardTitle className="text-foreground text-xl font-bold">
                  {capability.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {capability.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-muted-foreground flex items-start"
                    >
                      <div className="bg-gradient-axel mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8 text-lg">
            E isso é só o começo! Posso me adaptar às suas necessidades
            específicas.
          </p>
          <button className="bg-gradient-axel transform cursor-pointer rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90">
            Vamos Conversar
          </button>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
