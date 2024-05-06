import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DropButton from "./DropButton";

export default async function UserDashboard(userid: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: courseenrollment, error } = await supabase
    .from("courseenrollment")
    .select("*")

    // Filters
    .eq("userid", user.id);

  const courseIds = courseenrollment.map((item) => item.courseid);

  const { data: coursesData, error: coursesError } = await supabase
    .from("course")
    .select("*")
    .in("id", courseIds);
  if (coursesError) {
    throw coursesError;
  }

  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <main>
        <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
        <ul>
          {coursesData.map((course) => (
            <div className="flex flex-col justify-between max-w-sm bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-black text-xl font-semibold">
                {course.name}
              </h2>
              <p className="text-gray-700">Instructor: {course.instructor}</p>
              <p className="text-gray-700">Description: {course.description}</p>
              <DropButton userid={user.id} courseid={course.id} />
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
