import React from 'react';
import { useSelector } from 'react-redux';

const ScoreScreen = () => {
  const {questions,score} = useSelector(state => state.quiz);
  const totalQuestions = questions.length;
  const scorex = Math.round((score / totalQuestions)* 100);

  return (
    <div>
      <h2>Your Score</h2>
      <p>You got {scorex} out of 100 correct!</p>
      <p>Score: {scorex}%</p>
    </div>
  );
};

export default ScoreScreen;
