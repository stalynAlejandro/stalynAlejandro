import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { CollapsibleText } from '../CollapsibleText';
import { Icon } from '../Icon';
import {
  StSummaryCardActionItem,
  StSummaryCardContainer,
  StSummaryCardSubtitle,
} from './SummaryCardStyled';

export interface SummaryCardProps {
  collapsible?: boolean;
  direction?: 'vertical' | 'horizontal';
  sections: {
    fields: {
      collapsible?: boolean;
      label: string;
      value: string | React.ReactNode;
    }[];
    key: string;
    onEdit?: () => void;
    title?: string;
  }[];
  title?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  collapsible,
  direction,
  sections,
  title,
}) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(collapsible);

  return (
    <StSummaryCardContainer
      className={cx({
        'summary-card': true,
        'summaryCard--horizontal': direction === 'horizontal',
        'summaryCard--vertical': direction === 'vertical',
      })}
      data-testid="summary-card"
    >
      {title && (
        <div className="summaryCard__titleContainer">
          <h2 className="summaryCard__title">{title}</h2>
          {collapsible && (
            <Icon
              className="summaryCard__collapsibleArrow"
              data-testid="collapsible-trigger"
              icon={isCollapsed ? 'chevron-down-bold' : 'chevron-up-bold'}
              onClick={() => setIsCollapsed((current) => !current)}
            />
          )}
        </div>
      )}
      {!isCollapsed && (
        <ul className="summaryCard__list">
          {sections?.map(({ fields, key, onEdit, title: sectionTitle }) => (
            <li
              key={`summary-card-section-${key}`}
              className="summaryCard__listItem"
              data-testid={`summary-card-section-${key}`}
            >
              {sectionTitle && (
                <StSummaryCardSubtitle
                  className="summaryCard__sectionTitle"
                  subtitle={t(sectionTitle)}
                />
              )}
              {onEdit && (
                <StSummaryCardActionItem
                  className={cx({
                    summaryCard__editIcon: true,
                    'summaryCard__editIcon--withTitle': !!sectionTitle,
                  })}
                  icon="edit"
                  label={t('edit')}
                  onClick={onEdit}
                />
              )}
              <div className="summaryCard__infoContainer">
                {fields.length > 0 &&
                  fields.map(
                    ({ collapsible: fieldCollapsible, label, value }) => (
                      <div
                        key={`summary-card-${key}-value-${label}`}
                        className={cx({
                          summaryCard__infoField: true,
                          'summaryCard__infoField--collapsible':
                            direction === 'horizontal' && !!fieldCollapsible,
                        })}
                        data-testid={`summary-card-${key}-value-${label}`}
                      >
                        <div className="summaryCard__fieldName">{t(label)}</div>
                        <div
                          className={cx({
                            summaryCard__fieldValue: true,
                            'summaryCard__fieldValue--shortened':
                              direction === 'vertical' && !!fieldCollapsible,
                          })}
                        >
                          {fieldCollapsible && (
                            <CollapsibleText
                              align={
                                direction === 'horizontal' ? 'left' : 'right'
                              }
                              text={value}
                            />
                          )}
                          {!fieldCollapsible && value}
                        </div>
                      </div>
                    ),
                  )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </StSummaryCardContainer>
  );
};

SummaryCard.defaultProps = {
  collapsible: false,
  direction: 'horizontal',
  title: '',
};

export default SummaryCard;
