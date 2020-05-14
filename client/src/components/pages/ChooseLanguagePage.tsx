import React from 'react';
import './ChooseLanguagePage.scss';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import MainPageWrapper from '../generic/MainPageWrapper';
import TextWrapper from '../generic/TextWrapper';
import germany from '../../assets/germany.svg';
import britain from '../../assets/greatBritain.svg';
import poland from '../../assets/poland.svg';
import italy from '../../assets/italy.svg';

const ChooseLangugagePage = () => {
  return (
    <RestrictedPageWrapper>
      <MainPageWrapper>
        <div className="language-page">
          <div className="language-page__chooser">
            <TextWrapper className="title" textType="h1">
              Choose Language
            </TextWrapper>
            <div className="flags-list">
              <img className="flag" src={germany} />
              <img className="flag" src={britain} />
              <img className="flag" src={italy} />
              <img className="flag" src={poland} />
            </div>
          </div>
        </div>
      </MainPageWrapper>
    </RestrictedPageWrapper>
  );
};

export default ChooseLangugagePage;
