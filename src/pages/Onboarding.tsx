import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session.user);
    await loadProgress(session.user.id);
    setLoading(false);
  };

  const loadProgress = async (userId: string) => {
    const { data, error } = await supabase
      .from("module_progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading progress:", error);
      return;
    }
    setProgress(data || []);
  };

  const markModuleComplete = async (moduleNumber: number) => {
    if (!user) return;

    const { error } = await supabase
      .from("module_progress")
      .upsert({
        user_id: user.id,
        module_number: moduleNumber,
        completed: true,
        completed_at: new Date().toISOString(),
      });

    if (error) {
      toast.error("Error al guardar el progreso");
      return;
    }

    await loadProgress(user.id);
    toast.success("¡Módulo completado!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const completedModules = progress.filter((p) => p.completed).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

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
            <Button variant="ghost" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Tu Proceso de Inducción</h1>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso: {completedModules} de {modules.length} módulos</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const moduleProgress = progress.find((p) => p.module_number === module.number);
            return (
              <VideoModule
                key={module.number}
                module={module}
                isCompleted={moduleProgress?.completed || false}
                onComplete={() => markModuleComplete(module.number)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
