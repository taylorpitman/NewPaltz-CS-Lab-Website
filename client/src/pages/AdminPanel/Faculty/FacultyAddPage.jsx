import { useState } from "react";
import facultyService from "../../../services/facultyService";

export default function FacultyAddPage() {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        website: "",
        office_hours: "",
        phone_number: "",
        office_location: "",
        img: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await facultyService.addFaculty(formData);
            alert(`Faculty added successfully! ID: ${response.id}`); // Display the ID of the new faculty
            window.location.href = "/admin-panel";
        } catch (error) {
            console.error("Error adding Faculty:", error.message);
            alert(error.message || "Failed to add Faculty. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Create a new faculty</h2>
            <p className="text-stone-600 p-2">
                Fill in the data below to create a new faculty. Once done, click "Create Faculty".
            </p>
            <form
                onSubmit={handleAdd}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Name */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-stone-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Role */}
                <div className="flex flex-col">
                    <label htmlFor="role" className="text-sm font-medium text-stone-700 mb-1">
                        Role
                    </label>
                    <input
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-stone-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Office Hours */}
                <div className="flex flex-col">
                    <label htmlFor="office_hours" className="text-sm font-medium text-stone-700 mb-1">
                        Office Hours(If Applicable)
                    </label>
                    <input
                        type="text"
                        name="office_hours"
                        id="office_hours"
                        value={formData.office_house}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Office Location */}
                <div className="flex flex-col">
                    <label htmlFor="office_location" className="text-sm font-medium text-stone-700 mb-1">
                        Office Location (If Applicable)
                    </label>
                    <input
                        type="text"
                        name="office_location"
                        id="office_location"
                        value={formData.office_location}
                        onChange={handleChange}
                        
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                    <label htmlFor="office_hours" className="text-sm font-medium text-stone-700 mb-1">
                        Phone Number (If Applicable)
                    </label>
                    <input
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Website Link */}
                <div className="flex flex-col">
                    <label htmlFor="website" className="text-sm font-medium text-stone-700 mb-1">
                        Link to Website (If Applicable)
                    </label>
                    <input
                        type="url"
                        name="website"
                        id="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                <label htmlFor="img" className="text-sm font-medium text-stone-700 mb-1">
                    Faculty Headshot
                </label>
                <input
                    type="file"
                    name="img"
                    id="img"
                    accept="image/*"
                    value={formData.img.name}
                    onChange={handleChange}
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                {formData.img && (
                    <p className="text-xs text-stone-600 mt-1">
                    Selected: {formData.img.name}
                    </p>
                )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Create Faculty
                </button>
            </form>
        </div>
    );
}
