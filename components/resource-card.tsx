"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookmarkResource } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Bookmark from "./add-bookmark";
import { cn } from "@/lib/utils";
import { BookCheck } from "lucide-react";

export default function MovieCard({
  image,
  imgAlt,
  title,
  mediaType,
  resourceID,
  resource,
  user,
  bookmarked,
}: BookmarkResource) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "max-w-2xs w-fit max-h-[465px] overflow-hidden p-0 sm:p-1.5 rounded-2xl sm:rounded-3xl gap-2 bg-primary text-white sm:border-0 border border-primary sm:outline-0 font-medium"
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
      <CardFooter className="sm:flex justify-between px-3 pb-1 hidden">
        <p className="truncate w-50">{title}</p>
        {!bookmarked && <Bookmark user={user} resource={resource} />}
        {bookmarked && <BookCheck />}
      </CardFooter>
    </Card>
  );
}
