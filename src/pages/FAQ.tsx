import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import isepLogo from "@/assets/isep-logo.png";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "¿Cómo accedo al campus virtual?",
      answer: "Puedes acceder al campus virtual desde el módulo 2 de tu proceso de inducción. Allí encontrarás tus credenciales y el enlace directo.",
    },
    {
      question: "¿Cuándo comienzan las clases?",
      answer: "Las fechas de inicio se encuentran en el Calendario Maestro. Consulta la sección de Calendario para más detalles.",
    },
    {
      question: "¿Cómo contacto a mis profesores?",
      answer: "En el módulo 4 de la inducción encontrarás toda la información sobre cómo comunicarte con tus profesores y el horario de consultas.",
    },
    {
      question: "¿Dónde encuentro los materiales del curso?",
      answer: "Todos los materiales están disponibles en el campus virtual. Revisa el módulo 6 para aprender a acceder a ellos.",
    },
    {
      question: "¿Qué hago si tengo problemas técnicos?",
      answer: "Contáctanos a través de soporte@isep.edu o llama al +34 900 000 000. Estamos disponibles de lunes a viernes de 9:00 a 18:00.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="w-full py-6 px-4 bg-card/80 backdrop-blur-sm shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={isepLogo} alt="ISEP Universidad" className="h-12" />
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/onboarding")}>
              Onboarding
            </Button>
            <Button variant="outline" onClick={() => navigate("/calendario")}>
              Calendario
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Inicio
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold">Preguntas Frecuentes</h1>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </main>
    </div>
  );
};

export default FAQ;
