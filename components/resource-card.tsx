"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookmarkResource } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Bookmark from "./add-bookmark";
import { cn } from "@/lib/utils";
import { Bold, BookCheck } from "lucide-react";
import { toast } from "sonner";
import { deleteBookmark } from "@/lib/bookmark";
import { FirebaseError } from "firebase/app";
import { Button } from "./ui/button";

export default function MovieCard({
  image,
  imgAlt,
  title,
  mediaType,
  resourceID,
  resource,
  user,
  bookmarked,
  setDocs,
}: BookmarkResource) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "max-w-2xs w-fit max-h-[465px] overflow-hidden p-0 sm:p-1.5 rounded-2xl sm:rounded-3xl gap-2 bg-primary text-white sm:border-0 border border-primary sm:outline-0 font-medium relative"
      )}
    >
      <CardContent
        className="p-0 w-full bg-primary sm:bg-transparent"
        onClick={() => {
          router.push(`/previews/${mediaType}/${resourceID}`);
        }}
      >
        <Image
          src={image}
          alt={imgAlt}
          className="rounded-2xl aspect-[2/3] object-cover w-full"
          width={500}
          height={750}
        />
      </CardContent>
      <CardFooter className="absolute top-1.5 -right-1 sm:static flex justify-between px-3 pb-1">
        <p className="truncate w-50 hidden sm:block">{title}</p>
        {!bookmarked && <Bookmark user={user} resource={resource} />}
        {bookmarked && (
          <>
            <BookCheck
              className=" hidden sm:block text-green-500 hover:scale-110 hover:text-white hover:fill-red-500 transition-all duration-300 ease-in-out"
              onClick={() => {
                toast.promise(
                  (async () => {
                    const { id, title } = await deleteBookmark(user, resource);
                    setDocs?.((prev) =>
                      prev.filter((resource) => resource.id !== id)
                    );
                    return title;
                  })(),
                  {
                    loading: "Removing bookmark...",
                    success: (title) => ({
                      message: `${title} removed successfully`,
                      action: {
                        label: "Success!",
                        onClick: () => {},
                      },
                      classNames: { actionButton: "bg-green-700! text-white!" },
                    }),
                    error: (error: FirebaseError | Error) => ({
                      message: error.message,
                      action: {
                        label: "Failed!",
                        onClick: () => {},
                      },
                      classNames: { actionButton: "bg-red-700! text-white!" },
                    }),
                  }
                );
              }}
            />
            <Button
              onClick={() => {
                toast.promise(
                  (async () => {
                    const { id, title } = await deleteBookmark(user, resource);
                    setDocs?.((prev) =>
                      prev.filter((resource) => resource.id !== id)
                    );
                    return title;
                  })(),
                  {
                    loading: "Removing bookmark...",
                    success: (title) => ({
                      message: `${title} removed successfully`,
                      action: {
                        label: "Success!",
                        onClick: () => {},
                      },
                      classNames: { actionButton: "bg-green-700! text-white!" },
                    }),
                    error: (error: FirebaseError | Error) => ({
                      message: error.message,
                      action: {
                        label: "Failed!",
                        onClick: () => {},
                      },
                      classNames: { actionButton: "bg-red-700! text-white!" },
                    }),
                  }
                );
              }}
              size={"icon"}
              className=" sm:hidden size-6 bg-green-500 rounded-sm z-50"
            >
              <Bold className={cn("text-white size-4 z-50")} />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
