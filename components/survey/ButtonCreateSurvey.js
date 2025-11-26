"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ButtonCreateSurvey = ({ surveyData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        
        if (isLoading) return;
        
        setIsLoading(true);
        
        try {
            const response = await axios.post('/survey', surveyData);
            const newSurveyId = response.data.surveyId;
            toast.success("Survey created successfully");
            router.push(`/dashboard`);
            router.refresh();
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Failed to create survey";
            toast.error(errorMessage);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-6">
            <button 
              className="btn btn-lg w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-bold text-lg" 
              type="submit"
              onClick={handleCreate}
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
    );
};

export default ButtonCreateSurvey;