import React, { useEffect, useState } from "react";
import "./Quize.css";
// import { quiz } from "../../data/quiz";
import ReactPlayer from "react-player";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

const Quize = () => {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [swtchVideoToQuiz, setSwitchVideoToQuiz] = useState(true);

  const UUU = useSelector((state) => state.authReducer.authData);

  const navigate = useNavigate();

  const questions = [
    {
      text: "What is the capital of America?",
      options: [
        { id: 0, text: "New York City", isCorrect: false },
        { id: 1, text: "Boston", isCorrect: false },
        { id: 2, text: "Santa Fe", isCorrect: false },
        { id: 3, text: "Washington DC", isCorrect: true },
      ],
    },
    {
      text: "What year was the Constitution of America written?",
      options: [
        { id: 0, text: "1787", isCorrect: true },
        { id: 1, text: "1776", isCorrect: false },
        { id: 2, text: "1774", isCorrect: false },
        { id: 3, text: "1826", isCorrect: false },
      ],
    },
    {
      text: "Who was the second president of the US?",
      options: [
        { id: 0, text: "John Adams", isCorrect: true },
        { id: 1, text: "Paul Revere", isCorrect: false },
        { id: 2, text: "Thomas Jefferson", isCorrect: false },
        { id: 3, text: "Benjamin Franklin", isCorrect: false },
      ],
    },
    {
      text: "What is the largest state in the US?",
      options: [
        { id: 0, text: "California", isCorrect: false },
        { id: 1, text: "Alaska", isCorrect: true },
        { id: 2, text: "Texas", isCorrect: false },
        { id: 3, text: "Montana", isCorrect: false },
      ],
    },
    {
      text: "Which of the following countries DO NOT border the US?",
      options: [
        { id: 0, text: "Canada", isCorrect: false },
        { id: 1, text: "Russia", isCorrect: true },
        { id: 2, text: "Cuba", isCorrect: false },
        { id: 3, text: "Mexico", isCorrect: false },
      ],
    },
  ];

  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const onSwitchVideoToQuizStart = () => {
    setSwitchVideoToQuiz(false);
  };

  const onBackToVideo = () => {
    setSwitchVideoToQuiz(true);
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const API = axios.create({
    baseURL: "http://localhost:5002",
  });

  useEffect(() => {
    if (showResults) {
      API.put(
        `/update-score/${UUU[0]?.id}`,
        { score: score },
        {
          headers: headers,
        }
      )
        .then((res) => {
          //   console.log(res.data);
          if (score >= 4) {
            navigate("/task", { replace: true });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      API.put(
        `/update-score/${UUU[0]?.id}`,
        { score: score },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [showResults]);

  return (
    <div className="quiz__main">
      {swtchVideoToQuiz ? (
        <div className="quiz__video__card">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            width="100%"
          />
          <div className="quiz__star__button__card">
            <button onClick={onSwitchVideoToQuizStart}>Start Quiz</button>
          </div>
        </div>
      ) : (
        <div className="quiz__main__card">
          <h2 style={{ textAlign: "center", margin: "0px" }}>Score: {score}</h2>

          {showResults ? (
            <div className="final-results">
              <h1>Final Results</h1>
              <h2>
                {score} out of {questions.length} correct - (
                {(score / questions.length) * 100}%)
              </h2>
              <div className="restart__or__back_Video_card">
                <button className="button" onClick={() => restartGame()}>
                  Restart Quiz
                </button>
                <button onClick={onBackToVideo}>Back to Video</button>
              </div>
            </div>
          ) : (
            <div className="question-card">
              <h2>
                Question: {currentQuestion + 1} out of {questions.length}
              </h2>
              <h3 className="question-text">
                {questions[currentQuestion].text}
              </h3>
              <ul className="ul">
                {questions[currentQuestion].options.map((option) => {
                  return (
                    <li
                      className="li"
                      key={option.id}
                      onClick={() => optionClicked(option.isCorrect)}
                    >
                      {option.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quize;
