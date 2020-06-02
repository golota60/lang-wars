import React, { useContext, useState } from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import MainPageWrapper from '../generic/MainPageWrapper';
import Button from '../generic/Button';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import UserContext from '../../contexts/UserContext';
import TitleHeader from '../TitleHeader';
import DuelStatistics from '../DuelStatistics';
import HorizontalLine from '../generic/HorizontalLine';
import TextWrapper from '../generic/TextWrapper';
import germany from '../../assets/germany.svg';
import britain from '../../assets/greatBritain.svg';
import poland from '../../assets/poland.svg';
import italy from '../../assets/italy.svg';
import {
  declineDuel,
  getUser,
  getQuestions,
  resolveDuel,
} from '../../utils/fetches';
import { getLangWarsToken } from '../../utils/session';
import AnswerQuestionPage from './AnswerQuestionPage';
import { Question } from './ChooseLanguagePage';

const HomePage = () => {
  const userContext = useContext(UserContext);

  function returnFlag(language: string) {
    switch (language) {
      case 'german':
        return <img src={germany} />;
      case 'english':
        return <img src={britain} />;
      case 'polish':
        return <img src={poland} />;
      case 'italian':
        return <img src={italy} />;
      default:
        return <img />;
    }
  }

  const [isAnswering, setIsAnswering] = useState(false);
  const [questionArray, setQuestionArray] = useState<Array<any>>();
  const [correctAnswersNumber, setCorrectAnswers] = useState(0);
  const [question, setQuestion] = useState<number>(0);
  const [enemyName, setEnemyName] = useState<string>('');
  const [language, setLanguage] = useState<
    'polish' | 'german' | 'italian' | 'english'
  >('polish');
  async function handleDecline(language: string, enemyName: string) {
    await declineDuel(getLangWarsToken(), enemyName, language);
    const updatedUser = await (await getUser(getLangWarsToken())).json();
    userContext.setUser(updatedUser);
  }

  function handleAnswer() {
    setQuestion(question + 1);
  }

  async function handleAccept(
    enemyName: string,
    language: 'polish' | 'italian' | 'german' | 'english',
  ) {
    setLanguage(language);
    setEnemyName(enemyName);
    setCorrectAnswers(0);
    const questionsToBeParsed = await getQuestions(
      getLangWarsToken(),
      3,
      language,
    );
    const parsedQuestions: Array<Question> = await questionsToBeParsed.json();
    setQuestionArray(Array.from(parsedQuestions));
    setIsAnswering(true);
  }

  if (question === 3) {
    console.log('LAST QUESTION', question, correctAnswersNumber);
    setQuestion(0);
    setIsAnswering(false);
    setLanguage('polish');

    (async () => {
      await resolveDuel(
        getLangWarsToken(),
        enemyName,
        language,
        correctAnswersNumber,
      );
      const updatedUser = await (await getUser(getLangWarsToken())).json();
      userContext.setUser(updatedUser);
    })();
  }

  if (question >= 0 && question < 3 && questionArray && isAnswering) {
    return (
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
    );
  } else {
    return (
      <RestrictedPageWrapper>
        <MainPageWrapper>
          <div className="home-page">
            <div className="title-container">
              <TitleHeader userName={userContext?.user?.name} />
              <div className="button-container">
                <Link to="/language">
                  <Button>Random Duel</Button>
                </Link>
                <Link to="/friends">
                  <Button>Friends</Button>
                </Link>
              </div>
            </div>
            <DuelStatistics />
            <div className="challenges-container">
              <div className="awaiting-duels">
                <div className="table-title-container">
                  <HorizontalLine />
                  <TextWrapper textType="h2" className="table-title__title">
                    Awaiting Duels
                  </TextWrapper>
                  <HorizontalLine />
                </div>
                <div className="content">
                  {userContext?.user?.awaitingDuels?.map(_awaitingDuel => {
                    return (
                      <div
                        className="duel"
                        key={_awaitingDuel.enemyName + _awaitingDuel.language}
                      >
                        <TextWrapper>{_awaitingDuel.enemyName}</TextWrapper>
                        {returnFlag(_awaitingDuel.language)}
                        <TextWrapper
                          color="green"
                          pointer
                          onClick={() =>
                            handleAccept(
                              _awaitingDuel.enemyName,
                              _awaitingDuel.language,
                            )
                          }
                        >
                          Accept
                        </TextWrapper>
                        <TextWrapper
                          color="red"
                          pointer
                          onClick={() =>
                            handleDecline(
                              _awaitingDuel.language,
                              _awaitingDuel.enemyName,
                            )
                          }
                        >
                          Decline
                        </TextWrapper>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="sent-duels">
                <div className="table-title-container">
                  <HorizontalLine />
                  <TextWrapper textType="h2" className="table-title__title">
                    Sent Duels
                  </TextWrapper>
                  <HorizontalLine />
                </div>
                <div className="content">
                  {userContext?.user?.sentDuels?.map((_user: any) => {
                    return (
                      <div
                        className="duel"
                        key={_user.enemyName + _user.language + 'sent'}
                      >
                        <TextWrapper>{_user.enemyName}</TextWrapper>
                        {returnFlag(_user.language)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="duels-container">
              <div className="table-title-container">
                <HorizontalLine />
                <TextWrapper textType="h2" className="table-title__title">
                  History
                </TextWrapper>
                <HorizontalLine />
              </div>
              <div className="content">
                {userContext?.user?.matchHistory?.map(_user => {
                  return (
                    <div
                      className="duel"
                      key={_user.enemyName + _user.language + 'hist'}
                    >
                      <TextWrapper>{_user.enemyName}</TextWrapper>
                      {returnFlag(_user.language)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </MainPageWrapper>
      </RestrictedPageWrapper>
    );
  }
};

export default HomePage;
