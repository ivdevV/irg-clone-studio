import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import isepLogo from "@/assets/isep-logo.png";
import directorImage from "@/assets/director.png";
const Index = () => {
  return <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="w-full py-8 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <img src={isepLogo} alt="Instituto Raimon Gaja" className="h-16 md:h-20 object-contain animate-fade-in" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Card className="p-8 md:p-12 shadow-card animate-slide-up bg-card/80 backdrop-blur-sm">
          {/* Director Photo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-50"></div>
              <img src={directorImage} alt="Dr. Raimon Gaja - Director General" className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-glow" />
            </div>
          </div>

          {/* Director Info */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dr. Raimon Gaja</h1>
            <p className="text-muted-foreground text-lg">Fundador y Director General, Instituto Raimon Gaja</p>
          </div>

          {/* Welcome Message */}
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-lg">
              <strong>Queridas y queridos estudiantes,</strong>
            </p>

            <p>
              Me complace anunciarles que estamos evolucionando nuestra plataforma de aprendizaje e iniciamos la transición de Moodle a Odoo, una solución más innovadora, intuitiva y alineada con las necesidades actuales de la formación superior.
            </p>

            <p>
              Queremos que este cambio sea ágil y sencillo para todos. Para facilitar la adaptación, hemos preparado vídeos formativos que les guiarán paso a paso, asegurando una experiencia sin interrupciones y el aprovechamiento inmediato de todas las nuevas funcionalidades.
            </p>

            <p>
              Esta mejora reafirma nuestro compromiso con la innovación y la excelencia educativa. Les animo a descubrir las nuevas oportunidades que Odoo nos ofrece para avanzar juntos hacia una experiencia de aprendizaje aún más enriquecedora.
            </p>

            <p>
              Demos este paso con confianza y determinación.
            </p>

            <p className="italic">
              Con admiración y compromiso absoluto con su éxito,
            </p>

            <p className="font-semibold mt-4">
              Dr. Raimon Gaja<br />
              Fundador y Director General<br />
              Instituto Raimon Gaja
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-10 flex justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow"
              onClick={() => window.location.href = '/onboarding'}
            >
              Iniciar mi onboarding al nuevo campus iRG
            </Button>
          </div>
        </Card>

        {/* Footer Tagline */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-lg font-medium">Potenciando tu futuro</p>
        </div>
      </main>
    </div>;
};
export default Index;