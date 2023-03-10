import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Avatar from 'react-avatar';

import { CommentDto } from '../../api/types/CommentDto';
import { formatDate } from '../../utils/dates';
import { StCommentsListContainer } from './CommentsListStyled';

interface CommentsListProps {
  className?: string;
  comments: CommentDto[];
}

const CommentsList: React.FC<CommentsListProps> = ({ className, comments }) => {
  const { t } = useTranslation('comments');

  return (
    <StCommentsListContainer
      className={cx({ [className!]: !!className })}
      data-testid="comments-list"
    >
      <ul className="commentsList__list">
        {comments?.map(
          ({ content, taskName, timestamp, userDisplayedName }) => (
            <li
              key={`comment-list-item-${taskName}-${userDisplayedName}-${timestamp}`}
              className="commentsList__listItem"
            >
              <div className="commentsList__commentHeader">
                <div className="commentsList__authorAvatar">
                  <Avatar
                    name={userDisplayedName}
                    round
                    size="100%"
                    textMarginRatio={0.2}
                  />
                </div>
                <div className="commentsList__metadata">
                  <div
                    className="commentsList__commentTitle"
                    dangerouslySetInnerHTML={{
                      __html: t('commentAuthorInTask', {
                        author: userDisplayedName,
                        task: taskName,
                      }),
                    }}
                  />
                  <div className="commentsList__commentDate">
                    {t('publishedAt', {
                      date: formatDate(
                        new Date(timestamp || ''),
                        false,
                        'dd/MM/yyyy, HH:mm',
                      ),
                    })}
                  </div>
                </div>
              </div>
              <div className="commentsList__commentContent">{content}</div>
            </li>
          ),
        )}
      </ul>
    </StCommentsListContainer>
  );
};

CommentsList.defaultProps = {
  className: '',
};

export default CommentsList;
