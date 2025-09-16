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
        "max-w-2xs max-h-[465px] overflow-hidden p-1.5 rounded-3xl gap-2 bg-primary text-white border-0 outline-0 font-medium"
      )}
    >
      <CardContent
        className="p-0"
        onClick={() => {
          router.push(`/previews/${mediaType}/${resourceID}`);
        }}
      >
        <Image
          src={image}
          alt={imgAlt}
          className="rounded-2xl aspect-[2/3]"
          width={500}
          height={750}
        />
      </CardContent>
      <CardFooter className="flex justify-between px-3 pb-1">
        <p className="truncate w-50">{title}</p>
        {!bookmarked && <Bookmark user={user} resource={resource} />}
        {bookmarked && <BookCheck />}
      </CardFooter>
    </Card>
  );
}
