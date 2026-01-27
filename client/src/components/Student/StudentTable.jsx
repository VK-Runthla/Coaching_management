const StudentTable = ({ students }) => {
    return (
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Enrollment ID</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
  
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3 font-medium">{s.id}</td>
                <td className="px-4 py-3">{s.enrollmentId}</td>
  
                {/* Image */}
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">
                      {s.name.charAt(0)}
                    </span>
                  </div>
                </td>
  
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">{s.batch}</td>
                <td className="px-4 py-3">{s.course}</td>
                <td className="px-4 py-3">{s.duration}</td>
  
                {/* Fees */}
                <td className="px-4 py-3">
                  {s.fees ? `₹${s.fees}` : "N/A"}
                </td>
  
                {/* Payment */}
                <td className="px-4 py-3">
                  {s.paymentStatus === "paid" ? (
                    <span className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                      Paid
                    </span>
                  ) : (
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                      Add Payment
                    </button>
                  )}
                </td>
  
                {/* Action */}
                <td className="px-4 py-3 text-xl cursor-pointer">⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default StudentTable;
  