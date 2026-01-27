import { Search } from "lucide-react";

const StudentToolbar = ({
  search,
  setSearch,
  course,
  setCourse,
  batch,
  setBatch,
  isExStudent,
  setIsExStudent,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5 transition-all duration-300">

      {/* 🔍 Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
        />
      </div>

      {/* Filters + Buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-between">

        <div className="flex flex-wrap gap-3">
          {/* Course */}
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
            <option value="">Select Course</option>
            <option value="mern">MERN</option>
            <option value="python">Python</option>
          </select>

          {/* Batch */}
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
            <option value="">Select Batch</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>

          {/* Ex Student */}
          <button
            onClick={() => setIsExStudent(!isExStudent)}
            className={`px-6 py-2 rounded-lg text-white font-medium shadow-md transition ${
              isExStudent ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Ex-Student
          </button>
        </div>

        <div className="flex gap-3">
          {/* Add Excel */}
          <button className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition">
            + Add Excel
          </button>

          {/* Add Student */}
          <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition">
            + Add Student
          </button>
        </div>

      </div>
    </div>
  );
};

export default StudentToolbar;
