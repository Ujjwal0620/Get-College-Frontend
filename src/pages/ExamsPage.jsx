import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Management");

  const categories = [
    "Management",
    "Engineering",
    "Medical",
    "Science",
    "Arts",
    "Commerce",
    "Education",
    "Pharmacy",
    "Paramedical",
    "Law",
    "Design",
    "Agriculture",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exams")
      .then((res) => setExams(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 m-9">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Top Exams</h2>
          <p className="text-gray-500 text-sm">Exams cherry picked for you</p>
        </div>
        <button className="border px-4 py-1 rounded hover:bg-gray-100">
          View All
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded border ${
              selectedCategory === cat
                ? "bg-gray-200 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            ● {cat}
          </button>
        ))}
      </div>

      {/* Exams Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {exams
          .filter((exam) => exam.category === selectedCategory)
          .map((exam) => (
            <div
              key={exam._id}
              className="bg-white border rounded-lg shadow-sm flex flex-col justify-between"
            >
              {/* Exam Header */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  {exam.logo && (
                    <img
                      src={exam.logo}
                      alt={exam.name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <h3 className="text-lg font-semibold">{exam.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {exam.description.substring(0, 120)}...
                </p>
              </div>

              {/* Bottom Section */}
              <div className="border-t px-4 py-3 flex items-center justify-between">
                <div className="text-blue-600 text-sm flex gap-3">
                  {exam.cutoff && <span>● Cutoff</span>}
                  {exam.answerKey && <span>● Answer Key</span>}
                </div>
                <Link
                  to={`/exams/${exam.slug}`}
                  className="bg-blue-500 text-white px-4 py-1 rounded text-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExamsPage;
