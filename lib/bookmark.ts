"use client";
import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { User } from "firebase/auth";
import {
  TMDBGroupResourceListItem,
  TMDBRecommendation,
  TMDBResourceWithExtras,
} from "@/lib/types";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

export async function addBookmark(
  user: User | null,
  resource:
    | TMDBGroupResourceListItem
    | TMDBResourceWithExtras
    | TMDBRecommendation
) {
  try {
    if (user === null) {
      return -1;
    }

    if (!resource) {
      return 0;
    }

    const { id, poster_path, name, title } = resource;
    const media_type = title ? "movie" : "tv";

    const ref = doc(db, "users", user.uid, "bookmarks", id.toString());

    await setDoc(ref, {
      id,
      title: name ?? title,
      poster_path,
      media_type,
      addedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error adding bookmark:", error);

    return false;
  }
}

export async function getPagedBookmarks(
  user: User,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) {
  const ref = collection(db, "users", user.uid, "bookmarks");
  let q = query(ref, orderBy("addedAt", "desc"), limit(10));

  if (lastDoc) {
    q = query(ref, orderBy("addedAt", "desc"), startAfter(lastDoc), limit(10));
  }

  const snapshot = await getDocs(q);

  return {
    docs: snapshot.docs.map((doc) => doc.data() as TMDBGroupResourceListItem),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
  };
}
