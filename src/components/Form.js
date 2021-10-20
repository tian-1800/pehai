import React, { useState } from "react";
import dummyData from "../dummy/data";

const Form = () => {
  const totalQuestion = dummyData.length;

  /* States Start */
  const [answers, setAnswers] = useState(() =>
    dummyData.map((question) => new Array(question.options.length).fill(false))
  );
  const [enableInput, setEnableInput] = useState(
    new Array(totalQuestion).fill(true)
  );
  const [questionIndex, setquestionIndex] = useState(0);
  const [checked, setChecked] = useState(answers[0]);
  /* States End */

  /* Handlers Start */
  const handleCheck = (e) => {
    const index = parseInt(e.target.name.split("").pop(), 10);

    const tempState = [...checked];
    tempState[index] = e.target.checked;
    setChecked(tempState);
  };

  const handleNext = () => {
    if (checked.includes(true)) {
      if (enableInput[questionIndex]) {
        const tempAnswers = [...answers];
        tempAnswers[questionIndex] = checked;
        setAnswers(tempAnswers);

        // Disable future input change
        const tempEnableInput = [...enableInput];
        tempEnableInput[questionIndex] = false;
        setEnableInput(tempEnableInput);
      }

      // Check if it's last question
      if (questionIndex !== totalQuestion - 1) {
        setChecked(answers[questionIndex + 1]);
        setquestionIndex(questionIndex + 1);
      }
    }
  };

  const handlePrev = () => {
    setChecked(answers[questionIndex - 1]);
    setquestionIndex(questionIndex - 1);
  };
  /* Handlers End */

  return (
    <div className="main">
      <p className="main__subtitle">{dummyData[questionIndex].question}</p>
      <form
        className={
          enableInput[questionIndex]
            ? "main__form form"
            : "main__form form--inactive"
        }
      >
        {dummyData[questionIndex].options.map((option, i) => (
          <label htmlFor={`option${i}`} className="form__label">
            <input
              type="checkbox"
              id={`option${i}`}
              className="form__input"
              name={`option${i}`}
              checked={checked[i]}
              onChange={handleCheck}
              disabled={!enableInput[questionIndex]}
            />
            <span className="form__label-text">{option}</span>
          </label>
        ))}
      </form>
      <div className="main__btns btns">
        <button
          type="button"
          className="btns__btn"
          onClick={handlePrev}
          style={
            questionIndex === 0
              ? { visibility: "hidden" }
              : { visibility: "initial" }
          }
        >
          Prev
        </button>
        <button
          type="button"
          className="btns__btn"
          id="next"
          onClick={handleNext}
        >
          {questionIndex === totalQuestion - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Form;
