import * as QUIZ_CONSTANT from "./constants";

const initialState = {
  selectedTopic: null,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
};

const QuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_CONSTANT.SELECT_TOPIC:
      return {
        ...state,
        selectedTopic: action.payload,
      };
      case QUIZ_CONSTANT.LOAD_QUESTIONS:
        const questions = action.payload.map((question) => ({
          ...question,
       
        }));
        return {
          ...state,
          questions,
        };
      
    case QUIZ_CONSTANT.ANSWER_QUESTION:
      const { questionIndex, value } = action.payload;
      console.log(action.payload)
      const correctOption = state.questions[questionIndex].isCorrect;
      console.log({correctOption,test:state.questions[questionIndex].options[correctOption]})
      const isCorrect = value === state.questions[questionIndex].options[correctOption];
console.log(isCorrect)
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        questions: state.questions.map((question, index) => {
          if (index !== questionIndex) {
            return question;
          }

          return {
            ...question,
            value,
            correctOption,
          };
        }),
      };
    case QUIZ_CONSTANT.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    default:
      return state;
  }
};

export default QuizReducer;
