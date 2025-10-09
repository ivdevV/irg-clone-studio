import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import isepLogo from "@/assets/isep-logo.png";
import { Calendar as CalendarIcon } from "lucide-react";

const Calendario = () => {
  const navigate = useNavigate();

  const events = [
    { date: "15 Oct 2025", title: "Inicio de Clases", description: "Comienza el primer trimestre" },
    { date: "20 Nov 2025", title: "Exámenes Parciales", description: "Evaluaciones del primer periodo" },
    { date: "15 Dic 2025", title: "Vacaciones de Invierno", description: "Receso académico" },
    { date: "10 Ene 2026", title: "Inicio Segundo Trimestre", description: "Retorno a clases" },
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
            <Button variant="outline" onClick={() => navigate("/faq")}>
              FAQ
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Inicio
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-card/80 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <CalendarIcon className="w-8 h-8 text-primary" />
              Calendario Maestro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {events.map((event, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2">
                <div className="text-sm text-muted-foreground">{event.date}</div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Calendario;
