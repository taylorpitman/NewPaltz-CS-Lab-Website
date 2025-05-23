import { useState, useEffect } from "react";
import ResourceCard from "../StudentResources/ResourceCard.jsx";
import SearchBar from "../StudentResources/SearchBar.jsx";
import resourceService from "../../services/resourceService";
import { Link } from "react-router-dom";

/**
 * StudentResourceSection component displays a list of student resources with
 * features like filtering, searching, pagination, and resource management (add, edit, delete).
 */
export default function StudentResourceSection() {
    // State variables for managing resources, loading state, errors, filters, and pagination
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6; // Number of resource cards displayed per page

    // Fetch resources from the API when the component mounts
    useEffect(() => {
        const loadResources = async () => {
            try {
                setIsLoading(true); // Set loading state to true
                const data = await resourceService.getAllResources(); // Fetch resources
                setResources(data); // Update resources state
            } catch (err) {
                console.error("Error loading resources:", err); // Log error
                setError(err.message); // Set error message
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        loadResources();
    }, []);

    // Define available categories for filtering
    const categories = ['all', 'programming', 'web development', 'cybersecurity', 'artificial intelligence', 'Technical Interviews'];

    // Filter resources based on selected category and search query
    const filteredResources = resources
        .filter((resource) =>
            selectedCategory === "all" ? true : resource.category === selectedCategory
        )
        .filter((resource) =>
            searchQuery
                ? resource.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true
        );

    // Calculate indices for pagination
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentResources = filteredResources.slice(indexOfFirstCard, indexOfLastCard);

    // Handle pagination navigation
    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < Math.ceil(filteredResources.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1); // Go to the next page
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1); // Go to the previous page
        }
    };

    // Handle resource deletion
    const handleDelete = async (resourceId) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            try {
                await resourceService.deleteResource(resourceId); // Delete resource via API
                setResources((prevResources) =>
                    prevResources.filter((resource) => resource.id !== resourceId)
                ); // Remove deleted resource from state
                alert("Resource deleted successfully.");
            } catch (err) {
                console.error("Error deleting resource:", err); // Log error
                alert("Failed to delete resource. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-5">
            {/* Header section with Add Resource button and filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <Link to="/create-student-resource"
                    className="px-4 py-2 bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
                >
                    Add Student Resource
                </Link>

                {/* Filters: Category dropdown and search bar */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-stone-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>

                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
            </div>

            {/* Display loading or error messages */}
            {isLoading && (
                <p className="text-stone-600 text-sm mb-6">Loading resources...</p>
            )}
            {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

            {/* Display resource cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentResources.map((resource, index) => (
                    <div className="flex-col items-center" key={resource.id}>
                        <ResourceCard
                            key={resource.id}
                            studentResource={resource}
                            index={index}
                        />
                        {/* Edit and Delete buttons */}
                        <div className="flex py-1 gap-2">
                            <Link
                                to={`student-resources/edit/${resource.id}`}
                                className="px-4 py-2 bg-green-300 rounded-md hover:bg-green-400 transition"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(resource.id)}
                                className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-stone-300 rounded enabled:hover:scale-110 transition-all-ease duration-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={indexOfLastCard >= filteredResources.length}
                    className="px-4 py-2 mx-2 bg-stone-300 enabled:hover:scale-110 transition-all-ease duration-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Message when no resources are found */}
            {!isLoading && filteredResources.length === 0 && (
                <p className="text-stone-500 text-center mt-10">No resources found.</p>
            )}
        </div>
    );
}
