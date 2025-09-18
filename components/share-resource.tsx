"use client";
import { ShareFileProps, ShareResourceProps } from "@/lib/types";
import { Image, Link, Share } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ShareResource({
  name,
  overview,
  poster_path,
  title,
}: ShareResourceProps) {
  const resourceUrl = window.location.href;
  const [shareFile, setShareFile] = useState<ShareFileProps>();
  const [imageFile, setImageFile] = useState<File>();

  useEffect(() => {
    (async () => {
      try {
        if (!poster_path) {
          throw new Error();
        }
        const getImage = await fetch(
          "https://image.tmdb.org/t/p/w500" + poster_path,
          {
            mode: "cors",
          }
        );
        const imageBlob = await getImage.blob();
        if (!imageBlob.type || !imageBlob.type.startsWith("image/")) {
          throw new Error("Invalid image type");
        }
        const posterTitle = title ?? name ?? "movie";
        const fileExtension = imageBlob.type.split("/")[1] || "jpg";
        const imageFile = new File(
          [imageBlob],
          `${posterTitle}.${fileExtension}`,
          {
            type: imageBlob.type,
          }
        );
        const shareFile = {
          title: posterTitle,
          text: overview,
          url: resourceUrl,
          files: [imageFile],
        };
        setShareFile(shareFile);
        setImageFile(imageFile);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();
  }, [name, overview, poster_path, resourceUrl, title]);

  const handleSharePoster = async () => {
    try {
      if (!shareFile) {
        throw new Error();
      }
      if (!navigator.canShare(shareFile)) {
        throw new Error("Cannot share this content");
      }
      await navigator.share(shareFile);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      toast.error("Sharing Failed", {
        description: error instanceof Error ? error.message : String(error),
        action: {
          label: "Failed!",
          onClick: () => {},
        },
        classNames: { actionButton: "bg-red-700! text-white!" },
      });
    }
  };

  const handleCopyToClipboard = async () => {
    toast.promise(
      navigator.clipboard.writeText(resourceUrl),

      {
        success: {
          message: "",
          description: "Movie link copied to clipboard",
          action: {
            label: "Success!",
            onClick: () => {},
          },
          classNames: { actionButton: "bg-green-700! text-white!" },
        },
        error: {
          message: "Bookmark addition failed",
          description: "Something went wrong",
          action: {
            label: "Failed!",
            onClick: () => {},
          },
          classNames: { actionButton: "bg-red-700! text-white!" },
        },
      }
    );
  };
  return imageFile && navigator.canShare({ files: [imageFile] }) ? (
    <Popover>
      <PopoverTrigger asChild>
        <Share className="hover:text-green-600 hover:scale-110" size={20} />
      </PopoverTrigger>
      <PopoverContent className="flex justify-betwee w-fit gap-x-5 p-1 bg-primary rounded-sm">
        <Link
          onClick={() => {
            handleCopyToClipboard();
          }}
          className="hover:scale-110 transition-all duration-300 ease-in-out"
        />
        <Image
          onClick={() => {
            handleSharePoster();
          }}
          className="hover:scale-110 transition-all duration-300 ease-in-out"
        />
      </PopoverContent>
    </Popover>
  ) : (
    <Share
      className="hover:text-green-600 hover:scale-110"
      size={20}
      onClick={() => {
        handleCopyToClipboard();
      }}
    />
  );
}
