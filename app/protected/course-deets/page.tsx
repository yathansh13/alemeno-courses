"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";

type Course = {
  id: string;
  name: string;
  instructor: string;
  description: string;
};

const CourseDeets = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  useEffect(() => {
    console.log("id", courseId);
  }, [courseId]);

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, [courseId]);

  const fetchCourse = async (courseId: string) => {
    try {
      const { data, error } = await supabase
        .from<Course>("course")
        .select("*")
        .eq("id", courseId);
      if (error) {
        throw error;
      }
      setCourse(data && data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error fetching course:", error.message);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      {" "}
      <h1 className="text-3xl font-semibold mb-4">{course.name}</h1>{" "}
      <p className="text-gray-100 mb-2">Instructor: {course.instructor}</p>{" "}
      <p className="text-gray-100 mb-2">Description: {course.description}</p>{" "}
      <p className="text-gray-100 mb-2">Duration: {course.duration}</p>{" "}
      <p className="text-gray-100 mb-2">Schedule: {course.schedule}</p>{" "}
      <p className="text-gray-100 mb-2">Location: {course.location}</p>{" "}
      <p className="text-gray-100 mb-2">Syllabus: {course.syllabus}</p>{" "}
      <p className="text-gray-100 mb-2">
        Pre-requisites: {course.prerequisites}{" "}
      </p>{" "}
      <a className="underline text-indigo-400" href="/protected/course-list">
        Go back
      </a>
    </div>
  );
};

export default CourseDeets;
