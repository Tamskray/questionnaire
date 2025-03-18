function Question({ index, question, type, answers, correctAnswer }) {
  var questionStyle = null;
  switch (type) {
    case "single":
      questionStyle = (
        <div>
          <p>{question}</p>
          <div className="answers">
            {answers.map((answer, i) => (
              <div className="answer" key={i}>
                <input type="radio" name={question} />
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
                <input type="checkbox" name={question} />
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
            <input className="answer" type="text" />
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="question-container">
      <div>{index}</div>
      {questionStyle}
    </div>
  );
}

export default Question;
