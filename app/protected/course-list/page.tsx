import CourseList from "@/components/CourseList";
import EnrollableCourseList from "@/components/EnrollableCl";
import AuthButton from "@/components/AuthButton";
import "./courselist.css";

const CourseListingPage = () => {
  return (
    <div className="container mx-auto">
      <header className="clhead flex bg-gray-800 text-white py-4 text-center md:flex-col">
        <h1 className="text-2xl font-semibold">Course Listing</h1>
        <input
          type="text"
          placeholder="Search..."
          className="text-black p-2 mt-2 w-full max-w-md mx-auto"
        />
        <AuthButton />
      </header>
      <EnrollableCourseList />
    </div>
  );
};

export default CourseListingPage;
