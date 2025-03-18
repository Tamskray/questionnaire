import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { getQuiz } from "../api/quizzes";
import Question from "../components/Question";
import "./QuizPage.css";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const foundQuiz = getQuiz(id);
    setQuiz(foundQuiz);

    const savedData = Cookies.get("quizData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  if (!quiz) {
    return <h1>Quiz Not Found</h1>;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    let updatedData = { ...formData };
      console.log(updatedData);

    if (type === "checkbox") {
      const currentValues = formData[name] || [];
      if (checked) {
        updatedData[name] = [...currentValues, value];
      } else {
        updatedData[name] = currentValues.filter((v) => v !== value);
      }
    } else {
      updatedData[name] = value;
    }
    setFormData(updatedData);
      console.log(updatedData);
    Cookies.set("quizData", JSON.stringify(updatedData), { expires: 1 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setFormData({});
    Cookies.remove("quizData");
  };

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p className="description">{quiz.description}</p>
      <div className="questions-block">
        <h3>Questions:</h3>
        <form className="questions-container" method="post">
          {quiz.questions.map((q, index) => (
            <Question
              key={index}
              index={index + 1}
              question={q.question}
              type={q.type}
              answers={q.answers}
              correctAnswer={q.correctAnswer}
              handleChange={handleChange}
              chosen={formData[q.question]}
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
