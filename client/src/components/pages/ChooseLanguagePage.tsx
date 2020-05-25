import React, { useState } from 'react';
import './ChooseLanguagePage.scss';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import MainPageWrapper from '../generic/MainPageWrapper';
import TextWrapper from '../generic/TextWrapper';
import germany from '../../assets/germany.svg';
import britain from '../../assets/greatBritain.svg';
import poland from '../../assets/poland.svg';
import italy from '../../assets/italy.svg';
import { getQuestions } from '../../utils/fetches';
import { getLangWarsToken } from '../../utils/session';
import AnswerQuestionPage from './AnswerQuestionPage';

interface Question {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  correctAnswer: string;
}

interface Answer {

}

const ChooseLangugagePage = () => {
  const [questionArray, setQuestionArray] = useState<Array<any>>();
  const [question, setQuestion] = useState<number>(0);
  const [answerArray, setAnswerArray] = useState('');

  const handleFlagClick = async (
    language: 'german' | 'italian' | 'polish' | 'english',
  ) => {
    //TODO fetch
    const questions = await getQuestions(getLangWarsToken(), 3, language);
    const questionsJson: Array<Question> = await questions.json();
    console.log(questionsJson);
    setQuestionArray(Array.from(questionsJson));
    setQuestion(question + 1);
  };

  {
    return question && question > 0 && question <= 3 && questionArray ? (
      <>
        <AnswerQuestionPage
          question={questionArray[question].question}
          A={questionArray[question].A}
          B={questionArray[question].B}
          C={questionArray[question].C}
          D={questionArray[question].D}
          correctAnswer={questionArray[question].correctAnswer}
        />
      </>
    ) : (
      <RestrictedPageWrapper>
        <MainPageWrapper>
          <div className="language-page">
            <div className="language-page__chooser">
              <TextWrapper className="title" textType="h1">
                Choose Language
              </TextWrapper>
              <div className="flags-list">
                <img
                  className="flag"
                  onClick={() => handleFlagClick('german')}
                  src={germany}
                />
                <img
                  className="flag"
                  onClick={() => handleFlagClick('english')}
                  src={britain}
                />
                <img
                  className="flag"
                  onClick={() => handleFlagClick('italian')}
                  src={italy}
                />
                <img
                  className="flag"
                  onClick={() => handleFlagClick('polish')}
                  src={poland}
                />
              </div>
            </div>
          </div>
        </MainPageWrapper>
      </RestrictedPageWrapper>
    );
  }
};

export default ChooseLangugagePage;
