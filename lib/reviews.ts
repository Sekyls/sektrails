import { addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { FetchedReviewData, ReviewFormData } from "./types";

export async function addReview({
  resourceID,
  mediaType,
  ...data
}: ReviewFormData) {
  try {
    if (!data) {
      return;
    }

    const reviewsRef = collection(
      db,
      "reviews",
      `${mediaType}_${resourceID}`,
      "userReviews"
    );

    await addDoc(reviewsRef, {
      ...data,
      addedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error adding review:", error);
    return false;
  }
}

export function getReviews(
  mediaType: string,
  resourceID: string,
  setReviews: (reviews: FetchedReviewData[]) => void
) {
  const reviewsRef = collection(
    db,
    "reviews",
    `${mediaType}_${resourceID}`,
    "userReviews"
  );

  const q = query(reviewsRef, orderBy("addedAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const reviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        addedAt: data.addedAt?.toDate?.(),
      } as FetchedReviewData;
    });
    setReviews(reviews);
  });
  return unsubscribe;
}
