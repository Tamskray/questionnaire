import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { createQuiz, updateQuiz, getQuiz } from "../api/quizzes";
import "./CreatePage.css";

const CreatePage = () => {
  const { id } = useParams();
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, type: "text", questionText: "", options: [], correctAnswers: [] },
    { id: 2, type: "text", questionText: "", options: [], correctAnswers: [] },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchQuiz = async () => {
        const quiz = await getQuiz(id);
        if (quiz) {
          setQuizName(quiz.name);
          setQuizDescription(quiz.description);
          setQuestions(quiz.questions);
        }
      };
      fetchQuiz();
    }
  }, [id]);

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

  const handleCorrectAnswerChange = (index, optionText) => {
    const updatedQuestions = [...questions];
    const correctAnswers = updatedQuestions[index].correctAnswers || [];

    if (updatedQuestions[index].type === "single") {
      updatedQuestions[index].correctAnswers = [optionText]; // Only one correct answer for single choice
    } else {
      // Multiple answers allowed for multiple choice
      if (correctAnswers.includes(optionText)) {
        updatedQuestions[index].correctAnswers = correctAnswers.filter(
          (answer) => answer !== optionText
        );
      } else {
        updatedQuestions[index].correctAnswers = [
          ...correctAnswers,
          optionText,
        ];
      }
    }

    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const options = updatedQuestions[questionIndex].options;
    const correctAnswers = updatedQuestions[questionIndex].correctAnswers;

    updatedQuestions[questionIndex].options = options.filter(
      (_, i) => i !== optionIndex
    );

    updatedQuestions[questionIndex].correctAnswers = correctAnswers.filter(
      (answer) => answer !== options[optionIndex]
    );

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "text",
      questionText: "",
      options: [],
      correctAnswers: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 2) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    }
  };

  const validateQuiz = () => {
    // Check if each question has at least two options for single/multiple choice
    for (const question of questions) {
      if (question.type !== "text" && question.options.length < 2) {
        return "Each single or multiple choice question must have at least two options.";
      }
      if (
        question.correctAnswers.length === 0 ||
        (question.type === "single" && question.correctAnswers.length > 1)
      ) {
        return "Each question must have a valid correct answer.";
      }
    }
    return null; // Validation passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation before submitting
    const validationError = validateQuiz();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Ensure correct answers are in the options array and remove any invalid ones
    const updatedQuestions = questions.map((question) => {
      if (question.type !== "text") {
        // Filter correct answers that are not in options
        const validCorrectAnswers = question.correctAnswers.filter(
          (correctAnswer) => question.options.includes(correctAnswer)
        );

        // Update the question with only valid correct answers
        return { ...question, correctAnswers: validCorrectAnswers };
      }
      return question;
    });

    const quizData = {
      name: quizName,
      description: quizDescription,
      questions: updatedQuestions.map((q) => ({
        questionText: q.questionText,
        type: q.type,
        options: q.options,
        correctAnswers: q.correctAnswers,
      })),
    };

    try {
      if (id) {
        const updatedQuiz = await updateQuiz(id, quizData);
        alert("Quiz updated successfully:", updatedQuiz);
      } else {
        const createdQuiz = await createQuiz(quizData);
        alert("Quiz created successfully:", createdQuiz);
      }
      navigate("/");
    } catch (error) {
      alert("Quiz creation/update failed:", error);
    }
  };

  return (
    <div>
      <h1>{id ? "Edit Quiz" : "Create New Quiz"}</h1>
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

        <div className="input-container">
          <label>Quiz Description</label>
          <input
            className="quiz-description"
            type="text"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            placeholder="Enter quiz description"
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
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionText", e.target.value)
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
                              checked={question.correctAnswers.includes(option)}
                              onChange={() =>
                                handleCorrectAnswerChange(index, option)
                              }
                            />
                          ) : (
                            <input
                              type="radio"
                              name={`question_${index}`}
                              checked={question.correctAnswers.includes(option)}
                              onChange={() =>
                                handleCorrectAnswerChange(index, option)
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
                      value={question.correctAnswers}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "correctAnswers",
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
          <div>
            <Link className="link" to={"/"}>
              Back
            </Link>
            <button type="submit" className="submit-button">
              {id ? "Update Quiz" : "Submit Quiz"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
