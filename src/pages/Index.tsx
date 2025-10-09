import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import isepLogo from "@/assets/isep-logo.png";
import directorImage from "@/assets/director.jpeg";
const Index = () => {
  return <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="w-full py-8 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <img src={isepLogo} alt="ISEP Universidad" className="h-16 md:h-20 object-contain animate-fade-in" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Card className="p-8 md:p-12 shadow-card animate-slide-up bg-card/80 backdrop-blur-sm">
          {/* Director Photo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-50"></div>
              <img src={directorImage} alt="Marc Gaja - Director General" className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-glow" />
            </div>
          </div>

          {/* Director Info */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Raimon Gaja</h1>
            <p className="text-muted-foreground text-lg">Director General, iRG</p>
          </div>

          {/* Welcome Message */}
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-lg">
              <strong>Queridas y queridos estudiantes,</strong>
            </p>

            <p>
              Hoy están dando un paso que no cualquiera se atreve a dar. Un paso que representa crecimiento, 
              compromiso y valentía. En nombre de todo el equipo de Universidad ISEP, quiero darles la más 
              cálida bienvenida a esta comunidad académica que, desde ahora, también es suya.
            </p>

            <p>
              Este no es un inicio cualquiera. Es el comienzo de una etapa en la que ustedes serán parte de 
              algo mucho más grande: una universidad que cree en la innovación, en el aprendizaje autónomo, 
              en la tecnología al servicio del ser humano, y en la educación como motor de transformación 
              personal y social.
            </p>

            <p>
              En ISEP nos mueve la idea de hacer las cosas de manera distinta. Somos una institución que no 
              se conforma con lo tradicional, que busca nuevas formas de enseñar, de conectar, de inspirar. 
              Y ustedes están aquí porque comparten esa visión. Porque no se conforman. Porque quieren marcar 
              la diferencia.
            </p>

            <p>
              Hoy quiero felicitarles, sinceramente. Porque decidir formarse no es solo llenar un requisito, 
              es apostar por ustedes mismos, por su propósito, por su futuro. Y hacerlo en una universidad 
              como la nuestra significa que están dispuestos y dispuestas a desafiar lo convencional y 
              construir algo nuevo con su conocimiento, su experiencia y su pasión.
            </p>

            <p>
              Sé que el primer día puede venir con nervios, preguntas o incertidumbre. Pero también viene 
              con fuerza, con ilusión y con la certeza de que están en el lugar correcto. A partir de hoy, 
              cada clase, cada actividad, cada esfuerzo, será parte de una transformación profunda. No están 
              solos ni solas en este proceso: están acompañados y acompañadas por una comunidad que cree en 
              ustedes.
            </p>

            <p>
              Este es su momento. Este es su espacio. Sean curiosos, curiosas, sean constantes, y sobre todo, 
              sean valientes. Porque las personas que cambian el mundo comienzan así: decidiendo dar un primer 
              paso.
            </p>

            <p className="font-semibold">
              Bienvenidos y bienvenidas a Universidad ISEP. Estamos orgullosos y orgullosas de tenerles aquí.
            </p>

            <p className="italic">
              Con admiración y todo mi compromiso,
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-10 flex justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow"
              onClick={() => window.location.href = '/auth'}
            >
              Iniciar mi aventura con ISEP
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