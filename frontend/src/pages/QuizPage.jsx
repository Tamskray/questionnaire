import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { getQuiz } from "../api/quizzes";
import Question from "../components/Question";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [formData, setFormData] = useState({});
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
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

    const timer = setInterval(() => {
      setTimeSpent((prev) => {
        const newTime = prev + 1;
        Cookies.set(`quizTime_${id}`, newTime, { expires: 1 });
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setFormData({});
    Cookies.remove(`quizData_${id}`);
    console.log(formData);
  };

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p className="description">{quiz.description}</p>
      <div className="timer">
        Time Spent: {String(Math.floor(timeSpent / 60)).padStart(2, "0")}:
        {String(timeSpent % 60).padStart(2, "0")}
      </div>
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
            />
          </label>
          {quiz.questions.map((q, index) => (
            <Question
              key={index}
              index={index + 1}
              question={q.questionText}
              type={q.type}
              answers={q.options}
              correctAnswer={q.correctAnswers}
              handleChange={handleChange}
              chosen={formData[q.questionText]}
            />
          ))}
          <div className="form-buttons">
            <button className="clear-button" onClick={handleClear}>
              Clear
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizPage;
