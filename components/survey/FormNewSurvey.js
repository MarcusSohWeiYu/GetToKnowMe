"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//Helps to refresh view data when new data is added
import { useRouter } from "next/navigation";

const FormNewSurvey = () => {
  const router = useRouter();

  //To store the name of the survey
  const [name, setName] = useState("");
  //Store the description of the survey
  const [description, setDescription] = useState("");
  //To store the AI instructions
  const [aiInstructions, setAiInstructions] = useState("");
  // To store the status of the survey
  const [status, setStatus] = useState("active");
  //To store loading state
  const [isLoading, setIsLoading] = useState(false);
  // To store survey questions
  const [questions, setQuestions] = useState([
    { id: 1, question: "", type: "multiple-choice", options: [""] }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), question: "", type: "multiple-choice", options: [""] }
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q
      )
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const handleSubmit = async (event) => {
    //Prevent the default behaviour of reloading the page on submit
    event.preventDefault();

    //Prevent user from making 2 API calls when they accidentally press submit twice
    if (isLoading) return;

    setIsLoading(true);

    try {
      //1. Call to API to create a new survey
      await axios.post("/survey", {
        name,
        description,
        aiInstructions,
        status,
      });

      //2. Reset the state of the form
      setName("");
      setDescription("");
      setAiInstructions("");
      setStatus("");
      toast.success("Survey created successfully!");

      //3. Redirect back to dashboard and force refresh
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      const errorMessage =
        e.response?.data?.error || e.message || "Something went wrong";
      toast.error(errorMessage);
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        className="bg-base-100 rounded-3xl shadow-xl overflow-hidden"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-8 text-white">
          <h1 className="font-extrabold text-3xl md:text-4xl mb-2">Create Your Survey</h1>
          <p className="text-white/90 text-lg">Build an engaging survey with AI-powered character rewards</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Survey Details Section */}
          <div className="space-y-6">
            <h2 className="font-bold text-2xl text-base-content flex items-center gap-2">
              <span className="text-3xl">📋</span>
              Survey Details
            </h2>
            
            <div className="space-y-4">
              <fieldset className="space-y-2">
                <label className="font-semibold text-base-content">Survey Name</label>
                <input
                  required
                  type="text"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="e.g., What's Your Personality Type?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </fieldset>

              <fieldset className="space-y-2">
                <label className="font-semibold text-base-content">Description</label>
                <textarea
                  required
                  className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Brief description of your survey..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </fieldset>

              <fieldset className="space-y-2">
                <label className="font-semibold text-base-content flex items-center gap-2">
                  <span>AI Avatar Instructions</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">AI Powered</span>
                </label>
                <textarea
                  required
                  className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Describe how the AI should generate character avatars based on responses..."
                  value={aiInstructions}
                  onChange={(event) => setAiInstructions(event.target.value)}
                />
              </fieldset>
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Questions Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="font-bold text-2xl text-base-content flex items-center gap-2">
                <span className="text-3xl">❓</span>
                Survey Questions
              </h2>
              
              {/* AI Generate Button */}
              <button
                type="button"
                onClick={() => {
                  // TODO: Implement AI question generation
                  toast.info("AI question generation coming soon!");
                }}
                className="btn btn-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:rotate-12 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Generate with AI
              </button>
            </div>

            {/* Helper text for AI generation */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-1">
                    💡 Pro Tip: Let AI do the work!
                  </p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Click &ldquo;Generate with AI&rdquo; to automatically create relevant questions based on your survey name and description. You can always edit them afterwards!
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((q, qIndex) => (
                <div key={q.id}>
                  <div className="bg-base-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="badge badge-lg bg-purple-600 text-white font-bold">Q{qIndex + 1}</span>
                        </div>
                        
                        <input
                          type="text"
                          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                          placeholder="Type your question here..."
                          value={q.question}
                          onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                        />

                        <select
                          className="select select-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                          value={q.type}
                          onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
                        >
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="text">Text Answer</option>
                          <option value="rating">Rating Scale</option>
                        </select>
                      </div>

                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(q.id)}
                          className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Options for Multiple Choice */}
                    {q.type === "multiple-choice" && (
                      <div className="space-y-3 pl-4 border-l-2 border-purple-300">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold text-base-content/70">Answer Options</label>
                          <button
                            type="button"
                            onClick={() => addOption(q.id)}
                            className="btn btn-xs btn-ghost text-purple-600 hover:bg-purple-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Option
                          </button>
                        </div>
                        
                        {q.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <span className="text-base-content/50 font-medium min-w-[2rem]">{String.fromCharCode(65 + optIndex)}.</span>
                            <input
                              type="text"
                              className="input input-sm input-bordered flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                              placeholder={`Option ${optIndex + 1}`}
                              value={option}
                              onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                            />
                            {q.options.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeOption(q.id, optIndex)}
                                className="btn btn-xs btn-ghost text-error hover:bg-error/10"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Question Button - appears after each question */}
                  {qIndex === questions.length - 1 && (
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="mt-4 w-full btn btn-outline btn-primary hover:scale-105 transition-all duration-300 border-2 border-dashed hover:border-solid group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Another Question
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              className="btn btn-lg w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white border-0 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-lg" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  Creating Survey...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  Create Survey
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormNewSurvey;
