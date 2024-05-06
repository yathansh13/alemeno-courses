"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../app/utils/supabaseClient";

type Course = {
  id: string;
  name: string;
  instructor: string;
  description: string;
};

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase.from<Course>("course").select("*");
      if (error) {
        throw error;
      }
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  const viewDetails = (courseId: string) => {
    // Navigate to course details page
    router.push(`/course-details?id=${courseId}`);
  };
  return (
    <main className="flex gap-8 mt-8">
      {courses.map((course) => (
        <div
          className="max-w-sm bg-white rounded-lg shadow-md p-4 mb-4"
          key={course.id}
        >
          <h2 className="text-black text-xl font-semibold">{course.name}</h2>
          <p className="text-gray-700">Instructor: {course.instructor}</p>
          <p className="text-gray-700">Description: {course.description}</p>
          <button
            onClick={() => viewDetails(course.id)}
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            View Details
          </button>
          
        </div>
      ))}
    </main>
  );
}
