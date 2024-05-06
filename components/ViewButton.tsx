"use client";

import { supabase } from "@/app/utils/supabaseClient";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ViewButton({ courseid }: { courseid: string }) {
  const router = useRouter();
  const viewDetails = () => {
    // Navigate to course details page
    router.push(`/protected/course-deets?id=${courseid}`);
  };

  return (
    <button
      onClick={() => viewDetails()}
      className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
    >
      View details
    </button>
  );
}
