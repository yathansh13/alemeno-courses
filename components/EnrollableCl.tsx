import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ViewButton from "./ViewButton";
import EnrollButton from "./EnrollButton";

export default async function EnrollableCourseList() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  const { data: coursesData, error: coursesError } = await supabase
    .from("course")
    .select("*");

  if (coursesError) {
    throw coursesError;
  }

  //   const viewDetails = (courseId: string) => {
  //     // Navigate to course details page
  //     router.push(`/protected/course-deets?id=${courseId}`);
  //   };

  return (
    <main className="flex gap-8 mt-8">
      {coursesData.map((course) => (
        <div
          className="flex flex-col justify-between max-w-sm bg-white rounded-lg shadow-md p-4 mb-4"
          key={course.id}
        >
          <h2 className="text-black text-xl font-semibold">{course.name}</h2>
          <p className="text-gray-700">Instructor: {course.instructor}</p>
          <p className="text-gray-700">Description: {course.description}</p>
          {/* <button
            // onClick={() => viewDetails(course.id)}
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            View Details
          </button> */}
          <ViewButton courseid={course.id} />

          <EnrollButton
            userid={user.id}
            courseid={course.id}
            enrollmentstatus={course.enrollmentstatus}
          />
        </div>
      ))}
    </main>
  );
}
