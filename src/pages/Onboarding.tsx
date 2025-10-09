import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import isepLogo from "@/assets/isep-logo.png";
import VideoModule from "@/components/VideoModule";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Video, 
  LayoutGrid, 
  FileText, 
  Phone, 
  BookOpen, 
  Link2, 
  Award, 
  CreditCard,
  Key,
  Users,
  Target,
  BarChart3,
  BadgeCheck,
  Heart
} from "lucide-react";

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

        {/* FAQ Section */}
        <section className="mt-16 bg-card/80 backdrop-blur-sm rounded-lg p-8 shadow-card">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Preguntas Frecuentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-primary" />
                  <span className="text-left">¿Dónde puedo ver la información de masterclass, talleres y grabaciones?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Toda la información sobre masterclass, talleres y grabaciones está disponible en tu campus virtual. 
                Accede a través del módulo 2 para encontrar el calendario completo y los enlaces de acceso.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-left">¿Cómo puedo resolver mis dudas académicas?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Puedes contactar directamente con tus profesores a través del campus virtual. 
                También puedes solicitar tutorías personalizadas en los horarios establecidos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-primary" />
                  <span className="text-left">Problemas de acceso a la plataforma, restablecer contraseña</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Si tienes problemas para acceder, utiliza la opción "Olvidé mi contraseña" en la página de login. 
                Si persiste el problema, contacta con soporte técnico.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-left">¿Cómo ingresar a Microsoft Teams?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Recibirás las credenciales de Microsoft Teams en tu correo institucional. 
                Descarga la aplicación o accede desde el navegador con tus credenciales.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-left">Solicita tus constancias y certificados de forma fácil, directa y sin complicaciones</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Puedes solicitar constancias y certificados desde tu perfil en el campus virtual. 
                El proceso es 100% digital y recibirás tus documentos en un plazo máximo de 48 horas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-left">Evaluación clara, justa y pensada para tu aprendizaje</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Nuestro sistema de evaluación es transparente y diseñado para medir tu progreso real. 
                Encontrarás las rúbricas y criterios de evaluación en cada módulo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="text-left">Tus contenidos siempre organizados y accesibles</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Todo tu material de estudio está organizado por módulos y temas en el campus virtual. 
                Tendrás acceso permanente a todos los recursos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  <span className="text-left">¿Quieres hacer tus prácticas en una empresa o institución de tu interés? ¡En ISEP te apoyamos para lograrlo!</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Contamos con un departamento de prácticas que te ayudará a encontrar oportunidades. 
                También puedes proponer empresas de tu interés y te apoyamos en el proceso.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  <span className="text-left">Tu credencial ISEP: más que un documento, una llave de acceso a beneficios</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Tu credencial digital te dará acceso a descuentos en servicios, bibliotecas y eventos académicos. 
                La recibirás automáticamente al completar tu inscripción.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-left">Beneficio exclusivo: Accede a atención psicológica gratuita con ISEP CLINIC</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Todos nuestros estudiantes tienen acceso gratuito a sesiones de apoyo psicológico con profesionales certificados. 
                Agenda tu cita desde el campus virtual.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default Onboarding;
