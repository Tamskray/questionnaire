function Question({
  index,
  question,
  type,
  answers,
  correctAnswer,
  handleChange,
  chosen
}) {
  var questionStyle = null;
  switch (type) {
    case "single":
      questionStyle = (
        <div>
          <p>{question}</p>
          <div className="answers">
            {answers.map((answer, i) => (
              <div className="answer" key={i}>
                <input
                  type="radio"
                  name={question}
                  required
                  onChange={handleChange}
                  value={answer}
                  checked={chosen || false}
                />
                <label>{answer}</label>
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case "multiple":
      questionStyle = (
        <div>
          <p>{question}</p>
          <div className="answers">
            {answers.map((answer, i) => (
              <div className="answer" key={i}>
                <input
                  type="checkbox"
                  name={question}
                  required
                  onChange={handleChange}
                  value={answer}
                  checked={chosen?.includes(answer) || false}
                />
                <label>{answer}</label>
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case "text":
      questionStyle = (
        <div>
          <p>{question}</p>
          <div className="answers">
            <input
              className="answer"
              name={question}
              type="text"
              required
              onChange={handleChange}
              value={chosen || ""}
            />
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="question-container">
      <div className="question-number">{index}</div>
      {questionStyle}
    </div>
  );
}

export default Question;
