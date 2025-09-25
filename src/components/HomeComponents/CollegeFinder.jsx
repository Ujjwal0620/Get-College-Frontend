import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CollegeFinder = () => {
  const [allColleges, setAllColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // number of colleges visible
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedOwnership, setSelectedOwnership] = useState("all");
  const [feeMin, setFeeMin] = useState(0);
  const [feeMax, setFeeMax] = useState(500000);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const categories = [
    "all","Engineering","Management","Commerce & Banking","Medical",
    "Sciences","Hotel Management","Information Technology","Arts & Humanities",
    "Mass Communication","Nursing","Agriculture","Design","Law","Pharmacy",
    "Para Medical","Dental","Performing Arts","Education"
  ];

  const ownershipOptions = ["all","Government","Private","Deemed"];

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/colleges");
        setAllColleges(data.data || []);
        const uniqueLocations = Array.from(new Set(
          data.data.map(c => c.location?.city).filter(Boolean)
        ));
        setLocations(["all", ...uniqueLocations]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  // Apply filters and handle visible count
  useEffect(() => {
    let filtered = allColleges;

    // Only apply filters if any filter is set or searchTerm exists
    if (
      searchTerm ||
      selectedCategory !== "all" ||
      selectedLocation !== "all" ||
      selectedOwnership !== "all" ||
      feeMin !== 0 ||
      feeMax !== 500000
    ) {
      if (searchTerm) {
        filtered = filtered.filter(c =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (selectedCategory !== "all") {
        filtered = filtered.filter(c => c.category === selectedCategory);
      }
      if (selectedLocation !== "all") {
        filtered = filtered.filter(c => c.location?.city === selectedLocation);
      }
      if (selectedOwnership !== "all") {
        filtered = filtered.filter(c => c.ownership === selectedOwnership);
      }
      filtered = filtered.filter(c =>
        (c.feeRange?.min || 0) >= feeMin && (c.feeRange?.max || 500000) <= feeMax
      );
    }

    setFilteredColleges(filtered.slice(0, visibleCount));
  }, [
    allColleges,
    searchTerm,
    selectedCategory,
    selectedLocation,
    selectedOwnership,
    feeMin,
    feeMax,
    visibleCount
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedOwnership("all");
    setFeeMin(0);
    setFeeMax(500000);
    setVisibleCount(10); // reset visible count
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === "all" ? "All Categories" : c}
                </option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {locations.map(l => (
                <option key={l} value={l}>
                  {l === "all" ? "All Locations" : l}
                </option>
              ))}
            </select>
            <select
              value={selectedOwnership}
              onChange={e => setSelectedOwnership(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {ownershipOptions.map(o => (
                <option key={o} value={o}>
                  {o === "all" ? "All Ownerships" : o}
                </option>
              ))}
            </select>
            <button
              onClick={handleClearFilters}
              className="px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* College Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-gray-500">Loading colleges...</p>
          ) : filteredColleges.length > 0 ? (
            filteredColleges.map(c => (
              <div
                key={c._id}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transform transition-all duration-200"
                onClick={() => navigate(`/colleges/${c._id}`)}
              >
                <div className="h-40 w-full relative">
                  <img
                    src={c.image || "https://via.placeholder.com/400x200?text=College+Image"}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-bold text-lg">{c.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 mb-1">{c.category} | {c.location?.city}, {c.location?.state}</p>
                  <p className="text-gray-700 font-medium mb-1">
                    ₹{(c.feeRange?.min || 0).toLocaleString()} - ₹{(c.feeRange?.max || 0).toLocaleString()}
                  </p>
                  <p className="text-gray-600 mb-2">{c.ownership}</p>
                  <button
                    onClick={() => navigate(`/colleges/${c._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No colleges found for the selected filters.</p>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < allColleges.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeFinder;
