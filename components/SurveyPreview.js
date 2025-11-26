"use client";

import { useState } from "react";

const SurveyPreview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "If you were a superhero, what would your power be?",
      options: [
        { text: "Invisibility (ninja mode activated)", value: "invisibility" },
        { text: "Flying (bye bye traffic)", value: "flying" },
        { text: "Mind Reading (no more awkward convos)", value: "mindreading" },
        { text: "Time Control (eternal weekend!)", value: "timecontrol" }
      ]
    },
    {
      id: 2,
      question: "What's your go-to comfort food?",
      options: [
        { text: "Pizza (obviously)", value: "pizza" },
        { text: "Ice cream (all flavors welcome)", value: "icecream" },
        { text: "Ramen (slurp slurp)", value: "ramen" },
        { text: "Chocolate (the answer to everything)", value: "chocolate" }
      ]
    },
    {
      id: 3,
      question: "How do you spend your ideal weekend?",
      options: [
        { text: "Netflix marathon", value: "netflix" },
        { text: "Outdoor adventures", value: "outdoor" },
        { text: "Gaming session", value: "gaming" },
        { text: "Sleeping in (the best activity)", value: "sleeping" }
      ]
    },
    {
      id: 4,
      question: "Pick your dream vacation destination:",
      options: [
        { text: "Beach paradise 🏝️", value: "beach" },
        { text: "Mountain retreat ⛰️", value: "mountain" },
        { text: "City exploration 🏙️", value: "city" },
        { text: "Space (why not?) 🚀", value: "space" }
      ]
    },
    {
      id: 5,
      question: "What's your coffee order?",
      options: [
        { text: "Black coffee (hardcore)", value: "black" },
        { text: "Latte (basic but delicious)", value: "latte" },
        { text: "Iced coffee (even in winter)", value: "iced" },
        { text: "Tea (I'm a rebel)", value: "tea" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question - show loading then result
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 2000); // 2 second loading
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  // Loading Screen
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden">
        <div className="p-16 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <h3 className="text-2xl font-bold text-white">Analyzing Your Personality...</h3>
          <p className="text-gray-400 text-center">Our AI is crafting your unique character ✨</p>
        </div>
      </div>
    );
  }

  // Result Screen
  if (showResult) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Your AI Character Reveal! 🎉</h2>
          <p className="text-purple-100">Based on your unique answers</p>
        </div>
        
        <div className="p-8 space-y-6">
          {/* AI Generated Avatar */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl">
                🦸‍♂️
              </div>
            </div>
          </div>

          {/* Character Description */}
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              The Time-Traveling Pizza Ninja
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto">
              You&apos;re a rare blend of adventure and comfort! With the power to freeze time for eternal weekends, 
              you&apos;d spend them mastering the art of invisibility while enjoying the perfect slice of pizza. 
              Your ideal vacation involves city exploration with a side of space travel, all while sipping on 
              iced coffee (even in zero gravity). You&apos;re the friend who brings both excitement and chill vibes 
              to any gathering!
            </p>
          </div>

          {/* Traits */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-white font-semibold">Adventurous</div>
            </div>
            <div className="bg-pink-500/20 border border-pink-500/50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎮</div>
              <div className="text-white font-semibold">Creative</div>
            </div>
            <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🍕</div>
              <div className="text-white font-semibold">Food Lover</div>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-white font-semibold">Unique</div>
            </div>
          </div>

          {/* Restart Button */}
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setShowResult(false);
            }}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          Discover Your Vibe ✨
        </h2>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8 space-y-6">
        <h3 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                answers[currentQuestion] === option.value
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-purple-400 hover:bg-purple-500/10'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-gray-800/50 border-t border-gray-700 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            currentQuestion === 0
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>

        <span className="text-gray-400 font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </span>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            !answers[currentQuestion]
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg hover:shadow-purple-500/50'
          }`}
        >
          {isLastQuestion ? 'See Result' : 'Next'}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SurveyPreview;
