"use client";
import { addBookmark } from "@/lib/bookmark";
import { AddBookmark } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BookmarkPlus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

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
    <BookmarkPlus
      onClick={() => {
        handleAddBookmark();
      }}
      className={cn("hover:scale-110 hover:text-green-300", className)}
    />
  );
}
