import React, { useState } from 'react';
import './App.css'
import SentenceConstructor from './components/SentenceConstructor';


const jsonData = {
  "status": "SUCCESS",
  "data": {
    "testId": "oihq2eo9h1029921-210-20112",
    "questions": [
      {
        "questionId": "b28af948-db8b-465e-92e6-3d42534c4533",
        "question": "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
        "correctAnswer": ["User-centric", "Incorporated", "Enhancing", "Cultivating"]
      },
      {
        "questionId": "6e6534ea-260a-4c26-96fd-f830b27601fb",
        "question": "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Captivating", "Eclectic", "Garnering", "Blended"],
        "correctAnswer": ["Eclectic", "Blended", "Captivating", "Garnering"]
      },
      {
        "questionId": "7186e3da-0384-460a-af19-5a3984758e78",
        "question": "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Pioneering", "Paving", "Overcoming", "Opened up"],
        "correctAnswer": ["Pioneering", "Opened up", "Overcoming", "Paving"]
      },
      {
        "questionId": "10cbe3c2-13bb-4973-a794-18bf309b0791",
        "question": "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Improving", "Reducing", "Enabled", "Revolutionary"],
        "correctAnswer": ["Revolutionary", "Enabled", "Improving", "Reducing"]
      },
      {
        "questionId": "71ffe41e-8732-48e6-87f2-f84ea07eb060",
        "question": "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Raising", "Massive", "Prompting", "Compromised"],
        "correctAnswer": ["Massive", "Compromised", "Raising", "Prompting"]
      },
      {
        "questionId": "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
        "question": "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
        "correctAnswer": ["Comprehensive", "Implemented", "Promoting", "Enhancing"]
      },
      {
        "questionId": "ed5e6e2d-8408-406e-be32-777ac26460e2",
        "question": "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Implemented", "Setting", "Unwavering", "Reducing"],
        "correctAnswer": ["Unwavering", "Implemented", "Reducing", "Setting"]
      },
      {
        "questionId": "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
        "question": "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Opening", "Improved", "Gradual", "Reducing"],
        "correctAnswer": ["Gradual", "Improved", "Reducing", "Opening"]
      },
      {
        "questionId": "d78effdf-88ab-4667-8115-3bfb2baa0a24",
        "question": "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Providing", "Brought together", "Promoting", "International"],
        "correctAnswer": ["International", "Brought together", "Promoting", "Providing"]
      },
      {
        "questionId": "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
        "question": "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Enhancing", "Improved", "Providing", "Widespread"],
        "correctAnswer": ["Widespread", "Improved", "Enhancing", "Providing"]
      }
    ]
  },
  "message": "Questions fetched successfully",
  "activity": {
    "id": "3c576049-9ea9-4b5c-9fb7-4b316adaaaa0",
    "userId": "c6ad08a5-67ac-4a4d-aa3a-16d7fe91d51c",
    "type": "VERSANT_CATEGORY_TEST",
    "coinType": "DEDUCTED",
    "coins": 20,
    "description": "Used Versant Category Test",
    "createdAt": "2025-04-10T06:42:21.041Z"
  }
}

function App() {
  const questions = jsonData.data.questions;
  const totalQuestions = questions.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);

  const handleNextQuestion = (submittedAnswer) => {
    // Save the answer for the current question using its questionId as key.
    const currentQuestionId = questions[currentIndex].questionId;
    setAnswers((prev) => ({ ...prev, [currentQuestionId]: submittedAnswer }));

    // Move to the next question or mark test as complete.
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };

  // Restart test: reset current question, answers, and completion flag.
  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setTestCompleted(false);
  };

  // If test is complete, compute and show the result summary.
  if (testCompleted) {
    let correctCount = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q.questionId];
      // Check if the submitted answer array exactly matches the correctAnswer array.
      if (
        userAnswer &&
        userAnswer.length === q.correctAnswer.length &&
        userAnswer.every((ans, idx) => ans === q.correctAnswer[idx])
      ) {
        correctCount++;
      }
    });
    const incorrectCount = totalQuestions - correctCount;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Test Results</h2>
          <p className="text-lg mb-2">Correct Answers: {correctCount}</p>
          <p className="text-lg mb-4">Incorrect Answers: {incorrectCount}</p>
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            Restart Test
          </button>
        </div>
      </div>
    );
  }

  // Render the question component if test is still in progress.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Sentence Constructor Test</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded p-6">
        <SentenceConstructor
          questionData={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          onNext={handleNextQuestion}
        />
      </div>
    </div>
  );
}

export default App;
