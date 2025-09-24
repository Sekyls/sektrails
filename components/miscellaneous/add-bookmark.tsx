"use client";
import { addBookmark } from "@/lib/bookmark";
import { AddBookmark } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bold, BookmarkPlus } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function Bookmark({ user, resource, className }: AddBookmark) {
  const handleAddBookmark = async () => {
    toast.promise(
      (async () => {
        const result = await addBookmark(user, resource);

        if (result === -1) {
          throw new Error("Log in to add a bookmark");
        }
        if (result === 0) {
          throw new Error("Resource not found");
        }
        if (result === false) {
          throw new Error("Server error");
        }

        return "Movie added to bookmarks";
      })(),
      {
        loading: "",
        success: (message) => ({
          message: "Bookmark addition successful",
          description: message,
          action: {
            label: "Success!",
            onClick: () => {},
          },
          classNames: { actionButton: "bg-green-700! text-white!" },
        }),
        error: (err) => ({
          message: "Bookmark addition failed",
          description: err.message,
          action: {
            label: "Failed!",
            onClick: () => {},
          },
          classNames: { actionButton: "bg-red-700! text-white!" },
        }),
      }
    );
  };
  return (
    <>
      <BookmarkPlus
        onClick={() => {
          handleAddBookmark();
        }}
        className={cn(
          "hidden sm:block hover:scale-110 hover:text-green-300",
          className
        )}
      />
      <Button
        onClick={() => {
          handleAddBookmark();
        }}
        size={"icon"}
        className=" sm:hidden size-6 bg-green-500 rounded-sm z-50"
      >
        <Bold className={cn("text-white size-4 z-50", className)} />
      </Button>
    </>
  );
}
