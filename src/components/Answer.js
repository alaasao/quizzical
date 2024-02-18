import React from "react";
export default function Answer(props) {
  let [answers, setanswers] = React.useState(props.answers);
  let [bool, setbool] = React.useState(false);
  function pick(e) {
    e.chosen = true;

    setanswers(
      answers.map((element) => {
        return e !== element
          ? { ...element, chosen: false }
          : { ...element, chosen: true };
      })
    );

    setbool((prev) => !prev);
  }
  let [check, setcheck] = React.useState(props.check);
  React.useEffect(() => {
    setcheck(props.check);
  }, [props.check]);
  React.useEffect(() => {
    setarr(
      answers.map((e) => {
        return (
          <div
            className={`answer ${
              e.chosen && !check
                ? "blue"
                : check
                ? e.correct && e.chosen
                  ? "green"
                  : !e.correct && e.chosen
                  ? "red"
                  : e.correct
                  ? "green"
                  : ""
                : ""
            }`}
            onClick={() => pick(e)}
          >
            {e.answer}
          </div>
        );
      })
    );
  }, [bool, check]);

  let [arr, setarr] = React.useState(
    answers.map((e) => {
      console.log(check);
      return (
        <div
          className={`answer ${
            e.chosen && !check
              ? "blue"
              : check
              ? e.correct && e.chosen
                ? "green"
                : !e.correct && e.chosen
                ? "red"
                : ""
              : ""
          }`}
          onClick={() => pick(e)}
        >
          {e.answer}
        </div>
      );
    })
  );

  return <div className="answers">{arr}</div>;
}
