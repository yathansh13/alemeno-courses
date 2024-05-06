"use client";

import { supabase } from "@/app/utils/supabaseClient";
import { redirect } from "next/navigation";

export default function DropButton({
  userid,
  courseid,
}: {
  userid: string;
  courseid: string;
}) {
  const dropCourse = async () => {
    console.log("Dropping course", userid, courseid);
    const { error } = await supabase
      .from("courseenrollment")
      .delete()
      .eq("userid", userid)
      .eq("courseid", courseid);

    if (error) {
      throw error;
    }

    // Reload the dashboard after dropping the course

    location.reload();
    window.alert("Course dropped successfully!");
  };
  return (
    <button
      onClick={() => dropCourse()}
      className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Drop course
    </button>
  );
}
