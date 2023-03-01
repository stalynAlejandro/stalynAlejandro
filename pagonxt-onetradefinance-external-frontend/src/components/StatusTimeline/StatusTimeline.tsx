import React from 'react';
import cx from 'classnames';

import { StStatusTimelineContainer } from './StatusTimelineStyled';
import { formatDate } from '../../utils/dates';
import { Icon } from '../Icon';

interface TimelineStatusProps {
  active?: boolean;
  children?: React.ReactNode;
  datetime?: string;
  metadata?: string | React.ReactNode;
  name: string;
}

interface StatusTimelineProps {
  className?: string;
  statusList: TimelineStatusProps[];
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({
  className,
  statusList,
}) => {
  const activeIndex = statusList.findIndex((status) => !!status.active);

  return (
    <StStatusTimelineContainer
      className={cx({ [className!]: !!className })}
      data-testid="status-timeline"
    >
      <ul className="statusTimeline__list">
        {statusList.map((status, i) => {
          const isActive = i === activeIndex;
          const isCompleted = i < activeIndex;
          const isPending = i > activeIndex;

          return (
            <li
              key={`timeline-status-${status.name}`}
              className={cx({
                statusTimeline__listItem: true,
                'statusTimeline__listItem--active': isActive,
                'statusTimeline__listItem--completed': isCompleted,
                'statusTimeline__listItem--pending': isPending,
              })}
            >
              <div className="statusTimeline__pathContainer">
                <div className="statusTimeline__circle">
                  {isCompleted && <Icon icon="check" />}
                </div>
                <div className="statusTimeline__path" />
              </div>
              <div className="statusTimeline__statusContainer">
                <div className="statusTimeline__title">{status.name}</div>
                <div className="statusTimeline__medatadataContainer">
                  {status.datetime && (
                    <span className="statusTimeline__datetime">
                      {formatDate(new Date(status.datetime), true)}
                    </span>
                  )}
                  {status.datetime && status.metadata && ' - '}
                  {status.metadata && (
                    <span className="statusTimeline__metadata">
                      {status.metadata}
                    </span>
                  )}
                  {status.children ? (
                    <div className="statusTimeline__content">
                      {status.children}
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </StStatusTimelineContainer>
  );
};

StatusTimeline.defaultProps = {
  className: '',
};

export default StatusTimeline;
