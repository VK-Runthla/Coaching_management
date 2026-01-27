import { useState, useMemo } from "react";
import StudentToolbar from "./StudentToolbar";
import StudentTable from "./StudentTable";
const dummyStudents = [
  {
    id: 1,
    enrollmentId: "1234017",
    image: "",
    name: "ABC",
    batch: "BCA1",
    course: "BCA",
    duration: "6 months",
    fees: null, 
    paymentStatus: "pending",
  },
  {
    id: 2,
    enrollmentId: "1234015",
    image: "",
    name: "XYZ",
    batch: "BTech2",
    course: "BTech",
    duration: "6 months",
    fees: 10000,
    paymentStatus: "paid",
  },
  {
    id: 3,
    enrollmentId: "1234014",
    image: "",
    name: "RAM",
    batch: "BCS1",
    course: "BCS",
    duration: "6 months",
    fees: null,
    paymentStatus: "pending",
  },
  {
    id: 4,
    enrollmentId: "1234012",
    image: "",
    name: "RAM",
    batch: "MCA4",
    course: "MCA",
    duration: "12 months",
    fees: null,
    paymentStatus: "pending",
  },
  {
    id: 5,
    enrollmentId: "1234010",
    image: "",
    name: "Jenny",
    batch: "BCA",
    course: "BCS",
    duration: "6 months",
    fees: 10000,
    paymentStatus: "paid",
  },
];

const Student = () => {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [isExStudent, setIsExStudent] = useState(false);

  const filteredStudents = useMemo(() => {
    return dummyStudents.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchCourse = course ? s.course === course : true;
      const matchBatch = batch ? s.batch === batch : true;
      const matchEx = isExStudent ? s.isExStudent === true : true;
      return matchSearch && matchCourse && matchBatch && matchEx;
    });
  }, [search, course, batch, isExStudent]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Management</h1>
      <StudentToolbar
        search={search}
        setSearch={setSearch}
        course={course}
        setCourse={setCourse}
        batch={batch}
        setBatch={setBatch}
        isExStudent={isExStudent}
        setIsExStudent={setIsExStudent}
      />

      <StudentTable students={filteredStudents} />
    </div>
  );
};

export default Student;
