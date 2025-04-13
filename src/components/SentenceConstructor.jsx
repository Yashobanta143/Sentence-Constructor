import React, { useState, useEffect } from "react";

const SentenceConstructor = ({ questionData, questionNumber, totalQuestions, onNext }) => {
  // Split the sentence by the blank placeholder "___________"
  const parts = questionData.question.split("___________");
  // Number of blanks is number of splits minus one
  const blanksCount = parts.length - 1;

  const [selected, setSelected] = useState(Array(blanksCount).fill(null));
  const [available, setAvailable] = useState(questionData.options);
  const [timer, setTimer] = useState(30);

  // Reset states when a new question is loaded.
  useEffect(() => {
    setSelected(Array(blanksCount).fill(null));
    setAvailable(questionData.options);
    setTimer(30);
  }, [questionData, blanksCount]);

  // Set up the 30-second countdown timer.
  useEffect(() => {
    if (timer <= 0) {
      // Auto-submit when the timer ends.
      handleNext();
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOptionClick = (option) => {
    // Find the first empty blank.
    const firstEmptyIndex = selected.findIndex(item => item === null);
    if (firstEmptyIndex === -1) return; // All blanks are filled.
    const newSelected = [...selected];
    newSelected[firstEmptyIndex] = option;
    setSelected(newSelected);
    // Remove this option from the available list.
    setAvailable(available.filter(item => item !== option));
  };

  const handleBlankClick = (index) => {
    if (selected[index] !== null) {
      // Return the option from the blank to the available options.
      setAvailable([...available, selected[index]]);
      const newSelected = [...selected];
      newSelected[index] = null;
      setSelected(newSelected);
    }
  };

  // Trigger the parent's onNext callback.
  const handleNext = () => {
    onNext(selected);
  };

  // Enable the Next button only if all blanks are filled.
  const isNextEnabled = selected.every(item => item !== null);

  return (
    <div className="space-y-4">
      {/* Header with question count and timer */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold">Question {questionNumber} / {totalQuestions}</span>
        </div>
        <div className="text-red-500 font-bold">
          Time Left: {timer}s
        </div>
      </div>

      {/* The sentence with clickable blank spans */}
      <div className="text-lg">
        {parts.map((part, index) => (
          <span key={index} className="inline">
            {part}
            {index < blanksCount && (
              <span
                onClick={() => handleBlankClick(index)}
                className={`inline-block px-2 py-1 mx-1 border rounded cursor-pointer 
                  ${selected[index] ? "bg-green-200 border-green-500" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}`}>
                {selected[index] || "_____"}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Available options */}
      <div className="mt-4">
        <div className="mb-2 font-semibold">Options:</div>
        <div className="flex flex-wrap gap-2">
          {available.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Next button */}
      <div className="mt-6 flex justify-end">
        <button id="nextbutton"
          onClick={handleNext}
          disabled={!isNextEnabled}
          className={`px-4 py-2 rounded text-white ${isNextEnabled ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"}`}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SentenceConstructor;
