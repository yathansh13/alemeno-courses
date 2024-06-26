import CourseList from "@/components/CourseList";
import AuthButton from "@/components/AuthButton";

const CourseListingPage = () => {
  return (
    <div className="container mx-auto">
      <header className="flex bg-gray-800 text-white py-4 text-center">
        <h1 className="text-2xl font-semibold">Course Listing</h1>
        {/* <input
          type="text"
          placeholder="Search..."
          className="text-black p-2 mt-2 w-full max-w-md mx-auto"
          value={searchTerm}
          onChange={handleSearch}
        /> */}
        <AuthButton />
      </header>
      <CourseList />
    </div>
  );
};

export default CourseListingPage;
