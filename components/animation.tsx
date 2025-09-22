import "@/styles/animations.css";
import Link from "next/link";

export default function Animation() {
  return (
    <section className="flex flex-col items-center justify-center h-full text-center gap-5 sm:gap-20 relative">
      {/* Lightning + Boom Effects */}
      <div className="relative mx-auto flex items-center justify-center">
        {/* Lightning */}
        <div className="absolute top-1/2 -left-30 min-[900px]:-left-50 min-[1220px]:-left-70 min-[1678px]:-left-96 flex -translate-y-1/2">
          <div className="absolute block h-3 w-3 rounded-full origin-[6px_6px] animate-woosh bg-primary shadow-[0_50px_50px_rgba(255,255,255,0.3)]"></div>
          <div className="absolute block h-3 w-3 rounded-full origin-[6px_6px] animate-woosh animation-delay-[0.2s] bg-green-700 shadow-[0_50px_50px_rgba(252,113,113,0.3)]"></div>
        </div>

        {/* Boom 1 */}
        <div className="absolute flex w-20 h-20 text-center items-center -translate-y-1/2 -left-30 min-[900px]:-left-50 min-[1220px]:-left-70 min-[1678px]:-left-96 top-1/2">
          <div className="relative inline-block opacity-0 origin-center animate-boom-circle w-10 h-10 border-2 border-primary rounded-full"></div>
          <div className="relative inline-block opacity-0 origin-center animate-boom-circle animation-delay-[0.6s] w-5 h-5 border border-primary rounded-full -ml-[30px]"></div>
          <div className="relative inline-block opacity-0 origin-[50%_80%] animate-boom-triangle-big border-x-[5px] border-b-[10px] border-transparent border-b-primary -ml-[25px]"></div>
          <div className="relative inline-block opacity-0 origin-center animate-boom-disc w-2 h-2 rounded-full bg-[#d15ff4]"></div>
          <div className="relative inline-block opacity-0 origin-[50%_80%] animate-boom-triangle border-x-[2.5px] border-b-[5px] border-transparent border-b-[#42e599] -ml-[15px]"></div>
        </div>

        {/* Boom 2 */}
        <div className="absolute flex w-20 h-20 text-center items-center -translate-y-1/2 top-1/2 left-136 min-[900px]:left-116 min-[1220px]:left-96 min-[1678px]:left-76">
          <div className="relative inline-block opacity-0 origin-center animate-boom-circle animation-delay-[1.9s] w-10 h-10 border-2 border-primary rounded-full"></div>
          <div className="relative inline-block opacity-0 origin-center animate-boom-circle animation-delay-[2.15s] w-5 h-5 border border-primary rounded-full -ml-[30px]"></div>
          <div className="relative inline-block opacity-0 origin-center animate-boom-disc animation-delay-[1.9s] w-2 h-2 rounded-full bg-[#d15ff4]"></div>
          <div className="relative inline-block opacity-0 origin-[50%_80%] animate-boom-triangle animation-delay-[1.9s] border-x-[2.5px] border-b-[5px] border-transparent border-b-[#42e599] -ml-[15px]"></div>
        </div>
      </div>

      {/* Box Pushing Loader */}
      <div className="relative size-25">
        <div
          id="box"
          className="absolute -left-6 bottom-11 size-4 bg-purple-700 rounded-[15%] animate-push"
        />
        <div
          id="hill"
          className="absolute -left-5 size-40 border-l-8  min-[300px]:border-t-8 rounded-2xl border-primary rotate-45"
        />
      </div>

      {/* Flipping Text */}
      <div
        id="container"
        className="text-[36px] font-bold uppercase text-[#999]"
      >
        <Link
          href={"/"}
          className="font-dancingScript! max-[500px]:text-4xl min-[501px]:text-7xl block hover:cursor-pointer"
        >
          SEKTRAILS
        </Link>
        <div
          id="flip"
          className="h-[50px] overflow-hidden inline-block align-middle"
        >
          {/* animate-show*/}
          <div className="animate-show flex flex-col gap-[45px] items-center justify-center font-Bebas-Neue tracking-widest max-[500px]:text-2xl">
            <div className="bg-black/70 text-white flex items-center px-3 rounded-md h-12">
              MOVIES
            </div>
            <div className="bg-green-700 text-white flex items-center px-3 rounded-md h-12">
              TV SHOWS
            </div>
            <div className="bg-[#DC143C] text-white flex items-center px-3 rounded-md h-12">
              TRAILERS
            </div>
            <div className="bg-[#8b5cf6] text-white flex items-center px-3 rounded-md h-12">
              PREVIEWS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
