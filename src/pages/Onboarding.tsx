import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import isepLogo from "@/assets/isep-logo.png";
import directorImage from "@/assets/director.png";
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
  Heart,
  GraduationCap
} from "lucide-react";

const onboardingSteps = [
  { icon: Video, title: "Video de Bienvenida", color: "text-white" },
  { icon: LayoutGrid, title: "Ingresa a tu campus", color: "text-white" },
  { icon: FileText, title: "Plan Docente", color: "text-white" },
  { icon: Phone, title: "Contacto Docente", color: "text-white" },
  { icon: BookOpen, title: "Contenidos", color: "text-white" },
  { icon: Link2, title: "Enlaces de Interés", color: "text-white" },
  { icon: Award, title: "Encuesta y Certificado", color: "text-white" },
  { icon: CreditCard, title: "Módulo de Facturación", color: "text-white" },
];

const Onboarding = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const navigate = useNavigate();

  const progressPercentage = (completedSteps.length / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-8 px-4 border-b">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <img src={isepLogo} alt="Instituto Raimon Gaja" className="h-16" />
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-50"></div>
              <img 
                src={directorImage} 
                alt="Dr. Raimon Gaja - Director General" 
                className="relative w-24 h-24 rounded-full object-cover border-4 border-primary shadow-glow" 
              />
            </div>
            <h2 className="text-xl font-bold text-foreground">Dr. Raimon Gaja</h2>
            <p className="text-muted-foreground">Fundador y Director General</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Tu Progreso de Incorporación</h2>
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-right">
              <span className="text-primary font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-gradient-primary p-12 rounded-3xl mb-16 relative overflow-hidden">
          {/* Icon decoration */}
          <div className="absolute left-12 top-12">
            <GraduationCap className="w-12 h-12 text-white/20" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Completa tu Onboarding</h1>
              <p className="text-white/90 text-lg">
                Tu viaje hacia el éxito profesional comienza hoy. Completa los siguientes pasos para empezar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {onboardingSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = completedSteps.includes(index);
                
                return (
                  <button
                    key={index}
                    onClick={() => setOpenDialog(index)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center transition-all border border-white/20 group"
                  >
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${step.color} group-hover:scale-110 transition-transform`} />
                    <p className="text-white text-sm font-medium">{step.title}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Video Dialog */}
        <Dialog open={openDialog === 0} onOpenChange={(open) => !open && setOpenDialog(null)}>
          <DialogContent className="max-w-3xl bg-gradient-primary border-none">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white text-center mb-2">
                Tu Aventura Comienza Ahora
              </DialogTitle>
              <p className="text-white/90 text-center text-lg">
                Este video es el punto de partida de un viaje increíble. ¡Estamos emocionados de tenerte y no podemos esperar a ver todo lo que lograrás!
              </p>
            </DialogHeader>
            <div className="mt-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://drive.google.com/file/d/1mRI80KIqlaae2EG5l4sD3CYZcxGm5dEG/preview"
                  title="Video de Bienvenida"
                  frameBorder="0"
                  allow="autoplay"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-primary px-8 py-6 text-lg rounded-full font-semibold"
                onClick={() => {
                  setOpenDialog(null);
                  if (!completedSteps.includes(0)) {
                    setCompletedSteps([...completedSteps, 0]);
                  }
                }}
              >
                ¡Entendido, a empezar!
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Campus Dialog */}
        <Dialog open={openDialog === 1} onOpenChange={(open) => !open && setOpenDialog(null)}>
          <DialogContent className="max-w-3xl bg-gradient-primary border-none">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white text-center mb-2">
                Ingresa a tu Campus
              </DialogTitle>
              <p className="text-white/90 text-center text-lg">
                Descubre todo lo que tu campus tiene para ofrecerte.
              </p>
            </DialogHeader>
            <div className="mt-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/KMrJYaOLhsw"
                  title="Ingresa a tu Campus"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-primary px-8 py-6 text-lg rounded-full font-semibold"
                onClick={() => {
                  setOpenDialog(null);
                  if (!completedSteps.includes(1)) {
                    setCompletedSteps([...completedSteps, 1]);
                  }
                }}
              >
                ¡Entendido!
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Preguntas Frecuentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="text-left">¿Dónde puedo ver la información de masterclass, talleres y grabaciones?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                Toda la información sobre masterclass, talleres y grabaciones está disponible en tu campus virtual. 
                Accede a través del módulo correspondiente para encontrar el calendario completo y los enlaces de acceso.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card">
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

            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card">
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

            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card">
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

            <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card">
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

            <AccordionItem value="item-6" className="border rounded-lg px-6 bg-card">
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

            <AccordionItem value="item-7" className="border rounded-lg px-6 bg-card">
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
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default Onboarding;
