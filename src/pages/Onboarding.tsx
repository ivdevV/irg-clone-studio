import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import isepLogo from "@/assets/isep-logo.png";
import VideoModule from "@/components/VideoModule";

const modules = [
  { number: 1, title: "Bienvenida", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { number: 2, title: "Campus Virtual", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { number: 3, title: "Plan Docente", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { number: 4, title: "Contacto con Profesores", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { number: 5, title: "Contenidos", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { number: 6, title: "Enlaces y Materiales", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { number: 7, title: "Encuesta y Certificado", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { number: 8, title: "Facturación", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

const Onboarding = () => {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const navigate = useNavigate();

  const markModuleComplete = (moduleNumber: number) => {
    if (!completedModules.includes(moduleNumber)) {
      setCompletedModules([...completedModules, moduleNumber]);
      toast.success("¡Módulo completado!");
    }
  };

  const progressPercentage = (completedModules.length / modules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="w-full py-6 px-4 bg-card/80 backdrop-blur-sm shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={isepLogo} alt="ISEP Universidad" className="h-12" />
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/calendario")}>
              Calendario
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Tu Proceso de Inducción</h1>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso: {completedModules.length} de {modules.length} módulos</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <VideoModule
              key={module.number}
              module={module}
              isCompleted={completedModules.includes(module.number)}
              onComplete={() => markModuleComplete(module.number)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
