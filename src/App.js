import React from "react";
import { nanoid } from "nanoid";
import Quize from "./components/Quize";
import Answer from "./components/Answer";
export default function App() {
  let [frontpage, setfrontpage] = React.useState(true);
  let [arrayOfQuizes, setarrayOfQuizes] = React.useState([]);
  let [secondPage, setSecondPage] = React.useState(false);
  let [getData, setGetData] = React.useState(true);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      .then((data) => data.json())
      .then((data) =>
        setarrayOfQuizes(data.results.map((e) => ({ ...e, id: nanoid() })))
      );
  }, [getData]);

  function leaveFrontPage() {
    setfrontpage(false);
    setSecondPage(true);
  }
      function pick(e) {
          e.chosen = true
          console.log(e)
    }
    
    let[checkPage,setCheckPage]=React.useState(false)
    function checkAnsewers() {
        setCheckPage(prev => !prev)
        if (checkPage) {
            setGetData(prev=>!prev)
        }
    }
  let quizesElements = arrayOfQuizes.map((e) => {
    let correct = [{ "answer": e.correct_answer, "correct": true ,"chosen":false}];

    let wrongeAnswers = e.incorrect_answers.map((element) => ({
      "answer": element,
        "correct": false,
        "chosen":false
    }));
      let answers=wrongeAnswers.concat(correct)
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
     
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
    
    return (
      <div id="item" key={e.id}>
        <Quize quize={e.question} key={`${e.id}quize`} />
        <Answer
          answers={answers}
                key={`${e.id}`}
                check={checkPage}
              
        />

        <hr />
      </div>
    );
  });

  return (
    <div className="container">
      {frontpage && (
        <>
          <h1>Quizzical</h1>
          <h3>No description needed</h3>
          <button className="start-btn" onClick={leaveFrontPage}>
            Start quiz
          </button>
        </>
      )}
      {!frontpage && secondPage && (
        <>
          {" "}
          <div className="quizesElements">{quizesElements}</div>
          <button className="check-btn" onClick={checkAnsewers} >{checkPage?"Play Again":"Check Answers"}</button>
        </>
      )}

      <div className={`shape-one-${frontpage ? "" : "small"}`}></div>
      <div className={`shape-two-${frontpage ? "" : "small"}`}></div>
    </div>
  );
}
