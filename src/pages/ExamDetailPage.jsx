import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "applicationProcess", label: "Application Process" },
  { key: "syllabus", label: "Syllabus" },
  { key: "preparationTips", label: "Preparation Tips" },
  { key: "results", label: "Results" },
  { key: "questionPapers", label: "Question Papers" },
  { key: "cutoffDetails", label: "Cut Off" },
];

const ExamDetailPage = () => {
  const { slug } = useParams();
  const [exam, setExam] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/exams/${slug}`)
      .then((res) => {
        setExam(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load exam details.");
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="p-6 text-gray-600">Loading exam details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!exam) return <p className="p-6 text-gray-600">No exam found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Exam Header */}
      <div className="flex items-center gap-4 mb-6">
        {exam.logo && (
          <img
            src={exam.logo}
            alt={`${exam.name} Logo`}
            className="w-16 h-16 object-contain"
          />
        )}
        <div>
          <h2 className="text-3xl font-bold">{exam.name}</h2>
          <p className="text-gray-500">{exam.category}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 whitespace-nowrap ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm min-h-[150px]">
        <p className="text-gray-800 whitespace-pre-line">
          {exam.tabs?.[activeTab] || "Content not available."}
        </p>
      </div>
    </div>
  );
};

export default ExamDetailPage;
