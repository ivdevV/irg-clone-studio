import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import isepLogo from "@/assets/isep-logo.png";
import directorImage from "@/assets/director.jpeg";
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
              Hoy comienzan algo extraordinario. En nombre de todo el equipo del Instituto Raimon Gaja, les doy la más cálida bienvenida a esta comunidad de transformadores de vidas. Están aquí porque no se conforman con ser psicólogos del montón, sino especialistas de excelencia preparados para resolver los casos más complejos. Esa determinación merece mi más profunda admiración.
            </p>

            <p>
              En el Instituto Raimon Gaja creemos en una psicología práctica que se aprende haciendo. Les enseñaremos a curar con las técnicas más avanzadas de Europa, de la mano de profesionales con décadas de experiencia real. Aprenderán lo que realmente necesitan: cómo conducir esa primera sesión, manejar una crisis, transformar el sufrimiento en esperanza. Y no estarán solos: cuentan con mentores de prestigio internacional y una comunidad que cree profundamente en su potencial.
            </p>

            <p>
              Este es su momento de transformación: de la inseguridad a la maestría, de la teoría a la práctica real, de ser uno más a ser el especialista de referencia en su ciudad. Sé que pueden sentir nervios, pero el simple hecho de estar aquí demuestra que están listos. Bienvenidos al Instituto Raimon Gaja. Estamos profundamente orgullosos de tenerlos en esta familia.
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
              Iniciar mi aventura con el Instituto Raimon Gaja
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