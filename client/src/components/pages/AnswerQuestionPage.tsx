import React from 'react';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import MainPageWrapper from '../generic/MainPageWrapper';
import './AnswerQuestionPage.scss';
import TextWrapper from '../generic/TextWrapper';
import Button from '../generic/Button';

interface Question {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  correctAnswer: string;
}

const AnswerQuestionPage = ({
  question,
  A,
  B,
  C,
  D,
  correctAnswer,
}: Question) => {
  return (
    <>
      <RestrictedPageWrapper>
        <MainPageWrapper>
          <div className="answer-page">
            <TextWrapper textType="h1">Your Question:</TextWrapper>
            <TextWrapper textType="h1">{question}</TextWrapper>
            <div className="question-answers">
              <Button className="answer" outline>
                {A}
              </Button>
              <Button className="answer" outline>
                {B}
              </Button>
              <Button className="answer" outline>
                {C}
              </Button>
              <Button className="answer" outline>
                {D}
              </Button>
            </div>
          </div>
        </MainPageWrapper>
      </RestrictedPageWrapper>
    </>
  );
};

export default AnswerQuestionPage;
