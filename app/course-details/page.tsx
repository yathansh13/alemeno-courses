"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../utils/supabaseClient";

type Course = {
  id: string;
  name: string;
  instructor: string;
  description: string;
};

const CourseDetailsPage = () => {
  // const router = useRouter();

  // let id = useParams();
  // console.log("params", id);
  const courseId = 1;

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
      <p className="text-gray-700 mb-2">Instructor: {course.instructor}</p>{" "}
      <p className="text-gray-700 mb-2">Description: {course.description}</p>{" "}
    </div>
  );
};

export default CourseDetailsPage;
