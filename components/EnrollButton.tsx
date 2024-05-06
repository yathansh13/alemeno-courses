"use client";

import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function EnrollButton({
  userid,
  courseid,
  enrollmentstatus,
}: {
  userid: string;
  courseid: string;
  enrollmentstatus: string;
}) {
  const router = useRouter();

  const enrollCourse = async () => {
    const { error } = await supabase
      .from("courseenrollment")
      .insert([{ courseid: courseid, userid: userid, progress: 0 }])
      .select();

    if (error) {
      throw error;
    }

    // Reload the dashboard after enrolling in the course
    router.push("/protected");
  };

  const isEnrollmentOpen = enrollmentstatus === "Open";

  return (
    <button
      onClick={isEnrollmentOpen ? () => enrollCourse() : undefined}
      className={`mt-2 inline-block ${
        isEnrollmentOpen
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-400 pointer-events-none"
      } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
      disabled={!isEnrollmentOpen}
    >
      {isEnrollmentOpen ? "Enroll" : "Enrollment closed"}
    </button>
  );
}
