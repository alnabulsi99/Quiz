import * as QUIZ_CONSTANT from "./constants";

  
  export const selectTopic = (topic) => {
    return {
      type: QUIZ_CONSTANT.SELECT_TOPIC,
      payload: topic,
    };
  };
  
  export const loadQuestions = (questions) => {
    return {
      type: QUIZ_CONSTANT.LOAD_QUESTIONS,
      payload: questions,
    };
  };
  
  export const answerQuestion = (answer) => {
    return {
      type: QUIZ_CONSTANT.ANSWER_QUESTION,
      payload: answer,
    };
  };
  
  export const nextQuestion = () => {
    return {
      type: QUIZ_CONSTANT.NEXT_QUESTION,
    };
  };

  