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
        <Button className="w-full sm:w-fit text-xl sm:text-3xl p-5 rounded-sm font-dancingScript font-bold text-white">
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl! aspect-video p-0.5 border-primary/30">
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
