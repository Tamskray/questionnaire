import React, { useState } from "react";
import { useNavigate } from "react-router";
//import { createQuiz } from "../api/quizzes";
import "./CreatePage.css";

const CreatePage = () => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, type: "text", question: "", options: [], correctAnswer: [] },
    { id: 2, type: "text", question: "", options: [], correctAnswer: [] },
  ]);
  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    const correctAnswers = updatedQuestions[index].correctAnswer || [];

    if (correctAnswers.includes(optionIndex)) {
      updatedQuestions[index].correctAnswer = correctAnswers.filter(
        (i) => i !== optionIndex
      );
    } else {
      updatedQuestions[index].correctAnswer = [...correctAnswers, optionIndex];
    }

    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const options = updatedQuestions[questionIndex].options;
    const correctAnswers = updatedQuestions[questionIndex].correctAnswer;

    updatedQuestions[questionIndex].options = options.filter(
      (_, i) => i !== optionIndex
    );

    updatedQuestions[questionIndex].correctAnswer = correctAnswers.filter(
      (i) => i !== optionIndex
    );

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "text",
      question: "",
      options: [],
      correctAnswer: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 2) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quizData = {
      name: quizName,
      questions: questions.map((q) => ({
        question: q.question,
        type: q.type,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
    };

    // createQuiz(quizData).then((response) => {
    //     navigate("/");
    // });
  };

  return (
    <div>
      <h1>Create New Quiz</h1>
      <form onSubmit={handleSubmit} className="questions-block">
        <div className="input-container">
          <label>Quiz Name</label>
          <input
            type="text"
            value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      placeholder="Enter quiz name"
            required
          />
        </div>

        <div className="questions-container">
          {questions.map((question, index) => (
              <div key={question.id} className="question">
                  
              <div className="question-header">
                <label>Question {index + 1}</label>
                {questions.length > 2 && (
                  <button type="button" onClick={() => removeQuestion(index)}>
                    Remove Question
                  </button>
                )}
              </div>

              <div className="field-container">
                <label>Question Text</label>
                <input
                  className=""
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  placeholder="Enter question"
                  required
                />
                <label>Question Type</label>
                <select
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(index, "type", e.target.value)
                  }
                >
                  <option value="text">Text</option>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choices</option>
                </select>

                {question.type !== "text" && (
                  <div className="options-container">
                    <label>Options</label>
                    {question.options.length < 2 && (
                      <p>Please provide at least two options.</p>
                    )}
                    {question.options.map((option, i) => (
                      <div key={i} className="option">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, i, e.target.value)
                          }
                          placeholder={`Option ${i + 1}`}
                          required
                        />
                        <label>
                          {question.type === "multiple" ? (
                            <input
                              type="checkbox"
                              checked={question.correctAnswer.includes(i)}
                              onChange={() =>
                                handleCorrectAnswerChange(index, i)
                              }
                            />
                          ) : (
                            <input
                              type="radio"
                              name={`question_${index}`}
                              checked={question.correctAnswer === i}
                              onChange={() =>
                                handleQuestionChange(index, "correctAnswer", i)
                              }
                            />
                          )}
                          Correct
                        </label>
                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index, i)}
                          >
                            Remove Option
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-option"
                      onClick={() => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].options.push("");
                        setQuestions(updatedQuestions);
                      }}
                    >
                      Add Option
                    </button>
                  </div>
                )}

                {question.type === "text" && (
                  <div className="correct-answer-container">
                    <label>Correct Answer</label>
                    <input
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                      placeholder="Enter the correct answer"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="create-buttons">
        <button type="button" className="add-question" onClick={addQuestion}>
          Add Question
        </button>

          <button type="submit" className="submit-button">
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
