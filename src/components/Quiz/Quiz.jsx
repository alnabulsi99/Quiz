import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import {
  selectTopic,
  loadQuestions,
  answerQuestion,
  nextQuestion,
} from '../../redux/actions';
import ScoreScreen from '../ScoreScreen/ScoreScreen ';

const Quiz = () => {
  const dispatch = useDispatch();
  const selectedTopic = useSelector(state => state.quiz.selectedTopic);
  const questions = useSelector(state => state.quiz.questions);
  const currentQuestionIndex = useSelector(state => state.quiz.currentQuestionIndex);
  const score = useSelector(state => state.quiz.score);

  useEffect(() => {
    // Load questions from a JSON file based on the selected topic
    if (selectedTopic) {
      fetch(`questions-${selectedTopic}.json`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(loadQuestions(data));
        });
    }
  }, [selectedTopic, dispatch]);

  const handleTopicSelection = (event) => {
    dispatch(selectTopic(event.target.value));
  };

  const handleAnswerSelection = (event,questionIndex) => {
    dispatch(answerQuestion({ questionIndex, value:event.target.value }));
  };

  const handleNextQuestion = (e) => {
    console.log(e)
    e.preventDefault();
    e.target.reset()
    dispatch(nextQuestion());
  };


  const topics = ['GEOGRAPHY', 'MATH', 'GENERAL', 'SPORTS', 'GAMING'];

  if (!selectedTopic) {
    return (
      <div className={styles.quiz}>
        <div className={styles.animatecharcter}> ESTARTA QUIZ </div>

        <h2>Select a topic to start the quiz</h2>
        <ul className={styles.container}>
          {topics.map((topic) => (
            <li key={topic}>
              <button onClick={handleTopicSelection} value={topic}>
                {topic}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (questions.length === 0) {
    return <h2>Loading questions...</h2>;
  }

  if (currentQuestionIndex === questions.length) {
    // Calculate the score
//     const correctAnswers = answers?.filter((answer) => answer.isCorrect);
//     const score = (correctAnswers?.length / answers?.length) * 100;
// console.log(answers)
    return (
      <ScoreScreen
        score={score}
      />
    );
  }

  const { question, options } = questions[currentQuestionIndex];

  return (
    <form onSubmit={(e)=>handleNextQuestion(e)}>
      <h2>Topic: {selectedTopic}</h2>
      <h3>Question {currentQuestionIndex + 1}</h3>
      <p>{question}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio" required
                name={currentQuestionIndex}
                value={option}
                onClick={(event)=>handleAnswerSelection(event,currentQuestionIndex)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button type='submit' >Next Question</button>
    </form>
  );
};

export default Quiz;
