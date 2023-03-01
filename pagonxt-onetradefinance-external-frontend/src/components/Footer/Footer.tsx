import React from 'react';
import { useTranslation } from 'react-i18next';

import { StFooterContainer, StFooter, StLogo, StLinks } from './FooterStyled';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <StFooterContainer data-testid="page-footer">
      <StFooter>
        <StLogo alt="Banco Santander" src="/images/SantanderLogo.png" />
        <StLinks>
          <li>
            <a href="#asd">{t('legalInformation')}</a>
          </li>
          <li>
            <a href="#asd">{t('privacy')}</a>
          </li>
          <li>
            <a href="#asd">{t('termsAndConditions')}</a>
          </li>
        </StLinks>
      </StFooter>
    </StFooterContainer>
  );
};

export default Footer;
