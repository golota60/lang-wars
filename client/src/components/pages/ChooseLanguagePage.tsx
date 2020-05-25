import React, { useState, useEffect } from 'react';
import './ChooseLanguagePage.scss';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import MainPageWrapper from '../generic/MainPageWrapper';
import TextWrapper from '../generic/TextWrapper';
import germany from '../../assets/germany.svg';
import britain from '../../assets/greatBritain.svg';
import poland from '../../assets/poland.svg';
import italy from '../../assets/italy.svg';
import { getQuestions, sendDuel } from '../../utils/fetches';
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

const ChooseLangugagePage = () => {
  const [questionArray, setQuestionArray] = useState<Array<any>>();
  const [question, setQuestion] = useState<number>(0);
  const [correctAnswersNumber, setCorrectAnswers] = useState(0);
  const [isAnswered, setAnswered] = useState(false);
  const [isInMatch, setIsInMatch] = useState(false);
  const [language, setLanguage] = useState<
    'polish' | 'german' | 'italian' | 'english'
  >('polish');

  function handleAnswer() {
    setQuestion(question + 1);
    setAnswered(false);
  }

  async function postMatch() {
    await sendDuel(
      getLangWarsToken(),
      '',
      language,
      correctAnswersNumber,
      true,
    );
  }

  const handleFlagClick = async (
    language: 'german' | 'italian' | 'polish' | 'english',
  ) => {
    //TODO fetch
    const questions = await getQuestions(getLangWarsToken(), 3, language);
    const questionsJson: Array<Question> = await questions.json();
    console.log(questionsJson);
    setLanguage(language);
    setQuestionArray(Array.from(questionsJson));
    setIsInMatch(true);
  };

  if (question === 3) {
    console.log('LAST QUESTION', question, correctAnswersNumber);
    setQuestion(0);
    setIsInMatch(false);
    setLanguage('polish');
    postMatch();
  }

  {
    return question >= 0 && question < 3 && questionArray && isInMatch ? (
      <>
        {console.log(questionArray, question)}
        <AnswerQuestionPage
          question={questionArray[question].question}
          A={questionArray[question].A}
          B={questionArray[question].B}
          C={questionArray[question].C}
          D={questionArray[question].D}
          correctAnswer={questionArray[question].correctAnswer}
          correctAnswersNumber={correctAnswersNumber}
          answerHandler={setCorrectAnswers}
          setAnswered={handleAnswer}
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
