import { useState } from "react";
import faqService from "../../../services/faqService";

export default function FAQAddPage() {
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        link: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await faqService.addFAQ(formData);
            console.log("FAQ added successfully:", response);
            alert(`FAQ added successfully! ID: ${response.id}`); // Display the ID of the new FAQ
        } catch (error) {
            console.error("Error adding FAQ:", error.message);
            alert(error.message || "Failed to add FAQ. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Create a new FAQ</h2>
            <p className="text-stone-600 p-2">
                Fill in the data below to create a new FAQ. Once done, click "Create FAQ".
            </p>
            <form
                onSubmit={handleAdd}
                className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
                {/* Question */}
                <div className="flex flex-col">
                    <label htmlFor="question" className="text-sm font-medium text-stone-700 mb-1">
                        Question
                    </label>
                    <input
                        type="text"
                        name="question"
                        id="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Answer */}
                <div className="flex flex-col">
                    <label htmlFor="answer" className="text-sm font-medium text-stone-700 mb-1">
                        Answer
                    </label>
                    <input
                        type="text"
                        name="answer"
                        id="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Website Link */}
                <div className="flex flex-col">
                    <label htmlFor="link" className="text-sm font-medium text-stone-700 mb-1">
                        Link to "More Information" (If Applicable)
                    </label>
                    <input
                        type="url"
                        name="link"
                        id="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
                >
                    Create FAQ
                </button>
            </form>
        </div>
    );
}
