import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StCollapsibleTextContainer,
  StCollapsibleText,
  StTextButton,
} from './CollapsibleTextStyled';

interface CollapsibleTextProps {
  align?: 'left' | 'right';
  collapsedByDefault?: boolean;
  text: string | React.ReactNode;
}

const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  align,
  collapsedByDefault,
  text,
}) => {
  const { t } = useTranslation();
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(!!collapsedByDefault);
  const [isButtonShown, setIsButtonShown] = useState<boolean>(false);

  const isEllpsisApplied = (el: HTMLElement) => el.offsetWidth < el.scrollWidth;

  const checkButtonIsDisplayed = (el?: HTMLDivElement | null) => {
    const target = el || textRef.current;
    if (target) {
      setIsButtonShown(isEllpsisApplied(target));
    }
  };

  useEffect(() => {
    const checkButtonEv = () => {
      checkButtonIsDisplayed();
    };

    checkButtonEv();
    window.addEventListener('resize', checkButtonEv);

    return () => {
      window.removeEventListener('resize', checkButtonEv);
    };
  }, []);

  return (
    <StCollapsibleTextContainer align={align!} data-testid="collapsible-text">
      <StCollapsibleText isCollapsed={isCollapsed}>
        <div ref={textRef}>{text}</div>
      </StCollapsibleText>
      {isButtonShown && (
        <StTextButton
          icon={isCollapsed ? 'chevron-down-bold' : 'chevron-up-bold'}
          iconPosition="right"
          label={isCollapsed ? t('seeMore') : t('seeLess')}
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}
    </StCollapsibleTextContainer>
  );
};

CollapsibleText.defaultProps = {
  align: 'left',
  collapsedByDefault: true,
};

export default CollapsibleText;
