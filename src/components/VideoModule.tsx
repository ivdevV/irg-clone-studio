import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VideoModuleProps {
  module: {
    number: number;
    title: string;
    videoUrl: string;
  };
  isCompleted: boolean;
  onComplete: () => void;
}

const VideoModule = ({ module, isCompleted, onComplete }: VideoModuleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className={`relative ${isCompleted ? "border-primary" : ""}`}>
        {isCompleted && (
          <div className="absolute top-4 right-4 text-primary">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{module.number}</span>
            <span>{module.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant={isCompleted ? "secondary" : "default"}
            className="w-full"
            onClick={() => setIsOpen(true)}
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            {isCompleted ? "Ver de nuevo" : "Ver módulo"}
          </Button>
          {!isCompleted && (
            <Button variant="outline" className="w-full" onClick={onComplete}>
              Marcar como completado
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Módulo {module.number}: {module.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={module.videoUrl}
              title={module.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {!isCompleted && (
            <Button onClick={onComplete} className="w-full">
              Marcar como completado
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoModule;
