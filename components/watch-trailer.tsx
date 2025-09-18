import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function WatchTrailer({
  name,
  videoKey,
}: {
  name: string | undefined;
  videoKey: string | undefined;
}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-3xl px-2 font-dancingScript font-bold text-white h-auto py-2"
          size="lg"
        >
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl! aspect-video p-0.5 border-primary/30">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          title={name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-md"
        />
      </DialogContent>
    </Dialog>
  );
}
