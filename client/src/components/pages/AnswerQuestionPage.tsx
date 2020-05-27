import React, { useState } from 'react';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import MainPageWrapper from '../generic/MainPageWrapper';
import './AnswerQuestionPage.scss';
import TextWrapper from '../generic/TextWrapper';
import Button from '../generic/Button';
import Message from '../generic/Message';

interface Question {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  correctAnswer: string;
  answerHandler: Function;
  correctAnswersNumber: number;
  setAnswered: Function;
}

const AnswerQuestionPage = ({
  question,
  A,
  B,
  C,
  D,
  correctAnswer,
  answerHandler,
  correctAnswersNumber,
  setAnswered,
}: Question) => {
  const [answerState, setAnswerState] = useState('');
  const [answerColors] = useState({
    A: '',
    B: '',
    C: '',
    D: '',
  });

  const handleAnswerClick = (answer: string) => {
    if (answer === correctAnswer) {
      setAnswerState('correct');
      setAnswered(true);
      // answer === 'A' &&
      //   setAnswerColors({
      //     A: 'green-button',
      //     B: 'red-button',
      //     C: 'red-button',
      //     D: 'red-button',
      //   });
      // answer === 'B' &&
      //   setAnswerColors({
      //     A: 'red-button',
      //     B: 'green-button',
      //     C: 'red-button',
      //     D: 'red-button',
      //   });
      // answer === 'C' &&
      //   setAnswerColors({
      //     A: 'red-button',
      //     B: 'red-button',
      //     C: 'green-button',
      //     D: 'red-button',
      //   });
      // answer === 'D' &&
      //   setAnswerColors({
      //     A: 'red-button',
      //     B: 'red-button',
      //     C: 'red-button',
      //     D: 'green-button',
      //   });
      answerHandler(correctAnswersNumber + 1);
    } else {
      setAnswerState('incorrect');
      setAnswered(true);
      // setAnswerColors({
      //   A: 'red-button',
      //   B: 'red-button',
      //   C: 'red-button',
      //   D: 'red-button',
      // });
    }
  };

  return (
    <>
      <RestrictedPageWrapper>
        <MainPageWrapper>
          <div className="answer-page">
            <TextWrapper textType="h1">Your Question:</TextWrapper>
            <TextWrapper textType="h1">{question}</TextWrapper>
            <div className="question-answers">
              <Button
                className="answer"
                outline
                outlineColor={answerColors.A}
                onClick={() => handleAnswerClick('A')}
              >
                {A}
              </Button>
              <Button
                className="answer"
                outline
                outlineColor={answerColors.B}
                onClick={() => handleAnswerClick('B')}
              >
                {B}
              </Button>
              <Button
                className="answer"
                outline
                outlineColor={answerColors.C}
                onClick={() => handleAnswerClick('C')}
              >
                {C}
              </Button>
              <Button
                className="answer"
                outline
                outlineColor={answerColors.D}
                onClick={() => handleAnswerClick('D')}
              >
                {D}
              </Button>
              {answerState === 'correct' ? (
                <Message message={'Good job!'} color={'green'}></Message>
              ) : answerState === 'incorrect' ? (
                <Message message={'Wrong answer'} color={'red'}></Message>
              ) : (
                <></>
              )}
              {correctAnswersNumber}
            </div>
          </div>
        </MainPageWrapper>
      </RestrictedPageWrapper>
    </>
  );
};

export default AnswerQuestionPage;
