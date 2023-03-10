import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { useFetchComments } from '../../hooks/fetchDataHooks';
import { CommentsList } from '../CommentsList';
import { StCommentsModalContainer } from './CommentsModalStyled';
import { CommentDto } from '../../api/types/CommentDto';
import { NotificationToast } from '../NotificationToast';

interface CommentsModalProps {
  className?: string;
  comments?: CommentDto[];
  onClose: () => void;
  requestId?: string;
  title?: string;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  className,
  comments,
  onClose,
  requestId,
  title,
}) => {
  const { t } = useTranslation('comments');

  const {
    comments: fetchedComments,
    fetchComments,
    isLoading,
  } = useFetchComments(requestId!, { autofetch: false });
  const [commentsList, setCommentsList] = useState(comments || []);

  // Fetch comments if they are not provided as a prop
  useEffect(() => {
    const hydrateComments = async () => {
      if (!comments?.length && requestId) {
        try {
          await fetchComments();
        } catch (err) {
          NotificationToast.error(t('errors.couldNotRetrieveComments'), {
            toastId: 'comments-error',
          });
          onClose();
        }
      } else {
        setCommentsList(comments || []);
      }
    };

    hydrateComments();
  }, [comments, requestId]);

  // Whenever new comments are fetched, update the comments list
  useEffect(() => {
    if (fetchedComments) {
      setCommentsList(fetchedComments);
    }
  }, [fetchedComments]);

  return (
    <StCommentsModalContainer
      className={cx({ [className!]: !!className })}
      data-testid="comments-modal"
      isLoading={isLoading}
      title={title || t('comments')}
      onClose={onClose}
    >
      <div>
        {!!commentsList?.length && <CommentsList comments={commentsList} />}
      </div>
    </StCommentsModalContainer>
  );
};

CommentsModal.defaultProps = {
  className: '',
  comments: undefined,
  requestId: '',
  title: '',
};

export default CommentsModal;
