"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./utils/supabaseClient";

type Course = {
  id: string;
  name: string;
  instructor: string;
  description: string;
};

const CourseListingPage = () => {
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
    <div className="container mx-auto">
      <header className="bg-gray-800 text-white py-4 text-center">
        <h1 className="text-2xl font-semibold">Course Listing</h1>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 mt-2 w-full max-w-md mx-auto"
        />
      </header>
      <main className="mt-8">
        {courses.map((course) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 mb-4"
            key={course.id}
          >
            <h2 className="text-xl font-semibold">{course.name}</h2>
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
    </div>
  );
};

export default CourseListingPage;
