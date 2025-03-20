import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Cookies from "js-cookie";
import { getQuiz, submitQuiz } from "../api/quizzes";
import Question from "../components/Question";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [formData, setFormData] = useState({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const quizSubmittedFlag = Cookies.get(`quizSubmitted_${id}`);

    if (quizSubmittedFlag) {
      setQuizSubmitted(true);
    } else {
      setQuizSubmitted(false);
    }

    const fetchQuizData = async () => {
      const foundQuiz = await getQuiz(id);
      setQuiz(foundQuiz);
    };

    fetchQuizData();

    const savedData = Cookies.get(`quizData_${id}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    const savedTime = Cookies.get(`quizTime_${id}`);
    setTimeSpent(savedTime ? parseInt(savedTime) : 0);
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!quizSubmitted) {
        setTimeSpent((prev) => {
          const newTime = prev + 1;
          Cookies.set(`quizTime_${id}`, newTime, { expires: 1 });
          return newTime;
        });
      } else clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [id, quizSubmitted]);

  if (!quiz) {
    return <h1>Quiz Not Found</h1>;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let updatedData = { ...formData };

    if (type === "checkbox") {
      const currentValues = updatedData[name] || [];
      if (checked) {
        updatedData[name] = [...currentValues, value];
      } else {
        updatedData[name] = currentValues.filter((v) => v !== value);
      }
    } else if (type === "radio") {
      updatedData[name] = value;
    } else {
      updatedData[name] = value;
    }

    setFormData(updatedData);
    Cookies.set(`quizData_${id}`, JSON.stringify(updatedData), { expires: 1 });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const answers = quiz.questions.map((q) => {
      return {
        questionText: q.questionText,
        response: formData[q.questionText] || [],
        isCorrect: isAnswerCorrect(q, formData[q.questionText]),
      };
    });

    const completionData = await submitQuiz(
      id,
      formData.username,
      answers,
      timeSpent
    );

    const correctAnswersCount = completionData.newCompletion.answers.filter(
      (answer) => answer.isCorrect
    ).length;

    setResults({
      ...completionData,
      correctAnswersCount,
    });
    setQuizSubmitted(true);
    Cookies.remove(`quizTime_${id}`);
    Cookies.remove(`quizData_${id}`);
  };

  const isAnswerCorrect = (question, userAnswer) => {
    const correctAnswer = Array.isArray(question.correctAnswers)
      ? question.correctAnswers
      : [question.correctAnswers];

    const normalizedUserAnswer = Array.isArray(userAnswer)
      ? userAnswer.map((ans) => ans.toLowerCase().trim())
      : [userAnswer.toLowerCase().trim()];

    const normalizedCorrectAnswer = correctAnswer.map((ans) =>
      ans.toLowerCase().trim()
    );
    return (
      JSON.stringify(normalizedUserAnswer.sort()) ===
      JSON.stringify(normalizedCorrectAnswer.sort())
    );
  };

  const handleClear = (event) => {
    event.preventDefault();
    setFormData({});
    Cookies.remove(`quizData_${id}`);
  };

  const renderResults = () => {
    return (
      <div className="results">
        <h3>Results:</h3>
        <p>
          You got {results.correctAnswersCount} / {quiz.questions.length}{" "}
          correct!
        </p>
      </div>
    );
  };

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p className="description">{quiz.description}</p>
      <div className="timer" style={{ color: quizSubmitted ? "red" : "black" }}>
        Time Spent: {String(Math.floor(timeSpent / 60)).padStart(2, "0")}:
        {String(timeSpent % 60).padStart(2, "0")}
      </div>

      {quizSubmitted && renderResults()}

      <div className="questions-block">
        <h3>Questions:</h3>
        <form className="questions-container" method="post">
          <label className="answers">
            Your Name:
            <input
              className="answer"
              name="username"
              type="text"
              required
              onChange={handleChange}
              placeholder="Enter your name"
              value={formData.username || ""}
              disabled={quizSubmitted}
            />
          </label>

          {quiz.questions.map((q, index) => {
            const userAnswer = Array.isArray(formData[q.questionText])
              ? formData[q.questionText]
              : formData[q.questionText]
              ? [formData[q.questionText]]
              : [];
            const correctAnswer = q.correctAnswers;
            const isCorrect = isAnswerCorrect(q, userAnswer);

            return (
              <div key={index} className="question-block">
                <Question
                  index={index + 1}
                  question={q.questionText}
                  type={q.type}
                  answers={q.options}
                  correctAnswer={q.correctAnswers}
                  handleChange={handleChange}
                  chosen={formData[q.questionText]}
                  disabled={quizSubmitted}
                />
                {quizSubmitted && (
                  <div className="answer-feedback">
                    <p style={{ color: isCorrect ? "green" : "red" }}>
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </p>
                    <p>Correct answer: {correctAnswer.join(", ")}</p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="form-buttons">
            <Link className="link" to={'/'}>Back</Link>

            <button
              className="clear-button"
              onClick={handleClear}
              disabled={quizSubmitted}
            >
              Clear
            </button>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={quizSubmitted}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizPage;
