import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ApiResponse } from '../../api/types/ApiResponse';
import { RequestDetailsDto } from '../../api/types/RequestDetailsDto';
import useSingleFetch from '../../hooks/useSingleFetch';
import { formatDate } from '../../utils/dates';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Button } from '../Button';
import { CommentsModal } from '../CommentsModal';
import { ContentContainer } from '../ContentContainer';
import { Loader } from '../Loader';
import { Modal } from '../Modal';
import { NotificationCard } from '../NotificationCard';
import { NotificationToast } from '../NotificationToast';
import { PageTitle } from '../PageTitle';
import { StatusTimeline } from '../StatusTimeline';
import { RequestHistoricModal } from '../RequestHistoricModal';
import { TextButton } from '../TextButton';
import {
  StButtonsContainer,
  StContextualContainer,
  StGenericDataContainer,
  StHiddenDataContainer,
  StRequestReference,
  StStepSubtitle,
  StViewDetailsButtonContainer,
  StVisibleDataContainer,
  StWarningNotificationContent,
} from './ViewRequestDetailsStyled';
import { ProductTypes } from '../../enums/productTypes';
import { EventTypes } from '../../enums/eventTypes';
import { getOperationApiUrl } from '../../utils/getOperationApiUrl';
import { getOperationFormUrl } from '../../utils/getOperationFormUrl';
import DetailedViewSwitch from './detailedViews/DetailedViewSwitch';
import { getResponseWarning } from '../../utils/getResponseWarning';
import statusTypes from '../../enums/statusTypes';

interface ViewRequestDetailsProps {
  event: EventTypes;
  onClose?: () => void;
  product: ProductTypes;
  requestId: string;
  type?: 'request' | 'task';
}

const ViewRequestDetails: React.FC<ViewRequestDetailsProps> = ({
  event,
  onClose,
  product,
  requestId,
  type,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getDetailsURL = () =>
    type === 'request'
      ? getOperationApiUrl(product, event, 'details')?.(requestId)
      : getOperationApiUrl(product, event, 'completeInformation')?.get(
          requestId,
        );

  const getCancelURL = () =>
    getOperationApiUrl(product, event, 'completeInformation')?.cancel(
      requestId,
    );

  // Get request details fetch
  const { data, fetchData, isLoading } = useSingleFetch<
    ApiResponse<RequestDetailsDto<any>>
  >(getDetailsURL() || '');

  // Cancel request fetch
  const { fetchData: fetchCancellation } = useSingleFetch<ApiResponse<string>>(
    getCancelURL() || '',
  );
  const [fetchCancellationIsLoading, setFetchCancellationIsLoading] =
    useState<boolean>(false);
  const [cancellationWarningShown, setCancellationWarningShown] =
    useState<boolean>(false);

  // Detailed information
  const [detailsCollapsed, setDetailsCollapsed] = useState(type !== 'request');

  // Comments
  const [commentsShown, setCommentsShown] = useState(false);

  // Historic
  const [historicShown, setHistoricShown] = useState(false);

  const requestDetails = data?.entity || {};

  const completeRequestInformation = () => {
    navigate(
      `${getOperationFormUrl(
        product,
        event,
        'completeInformation',
      )}/${requestId}`,
    );
  };

  const requestCancellation = async (confirm: boolean = false) => {
    const showError = (err: any) => {
      setFetchCancellationIsLoading(false);
      NotificationToast.error(getErrorMessage(err), {
        toastId: 'cancellation-error',
      });
    };

    if (confirm) {
      try {
        setFetchCancellationIsLoading(true);
        const response = await fetchCancellation({ method: 'put' });

        if (response?.entity) {
          // Give time to the DB to update its data so that Pending Tasks Table show synced data
          setTimeout(() => {
            setFetchCancellationIsLoading(false);
            NotificationToast.success(t('requestCancelledSuccessfully'), {
              toastId: 'cancellation-success',
            });
            onClose?.();
          }, 800);
        } else {
          showError({});
        }
      } catch (err) {
        showError(err);
      }
    } else {
      setCancellationWarningShown(true);
    }
  };

  useEffect(() => {
    const performFetch = async () => {
      try {
        await fetchData();
      } catch (err) {
        NotificationToast.error(t('errors.requests.noDataAvailable'), {
          toastId: 'no-data',
        });

        onClose?.();
      }
    };

    performFetch();
  }, [requestId]);

  useEffect(() => {
    const warning = getResponseWarning(data);

    if (warning) {
      NotificationToast.warning(t(`warnings.completeInformation.${warning}`), {
        toastId: 'edited-task-warning',
      });
    }
  }, [data]);

  return (
    <>
      {(isLoading || fetchCancellationIsLoading) && <Loader />}
      <PageTitle
        backButton={
          onClose && {
            icon: 'chevron-left-bold',
            label: t('back'),
            onClick: onClose,
          }
        }
        contextualNode={
          <StContextualContainer>
            <TextButton
              icon="chat"
              label={t('comments')}
              onClick={() => setCommentsShown(true)}
            />
            <TextButton
              icon="clipboard"
              label={t('historic')}
              onClick={() => setHistoricShown(true)}
            />
          </StContextualContainer>
        }
        title={t('requestDetails')}
      />
      <ContentContainer data-testid="view-request-details">
        <div>
          <StGenericDataContainer>
            <StRequestReference>
              {t('requestRef')} {requestDetails.request?.code}
            </StRequestReference>
            {requestDetails.request?.contractReference && (
              <div>
                {t('contractReference')}{' '}
                {requestDetails.request.contractReference}
              </div>
            )}
            <StVisibleDataContainer>
              <div className="viewRequestDetails__dataContent">
                <div>
                  <span>{t('client')}</span>
                  <span className="bold">
                    {requestDetails.request?.customer?.name}
                  </span>
                </div>
                <div>
                  <span>{t('service')}</span>
                  <span className="bold">
                    {t(`productTypes.${product.toLowerCase()}`)}
                  </span>
                </div>
                <div>
                  <span>{t('event')}</span>
                  <span className="bold">
                    {t(`eventTypes.${event.toLowerCase()}`)}
                  </span>
                </div>
                <div>
                  <span>{t('priority')}</span>
                  <span className="bold">
                    {t(
                      requestDetails.request?.documentation?.priority ||
                        'normal',
                    )}
                    {requestDetails.request?.slaEnd &&
                      `, ${formatDate(
                        new Date(requestDetails.request.slaEnd),
                        true,
                      )}`}
                  </span>
                </div>
              </div>
            </StVisibleDataContainer>
            {!detailsCollapsed && requestDetails?.request && (
              <StHiddenDataContainer>
                <DetailedViewSwitch
                  event={event}
                  product={product}
                  requestDetails={requestDetails}
                />
              </StHiddenDataContainer>
            )}
            <StViewDetailsButtonContainer>
              <TextButton
                icon={
                  detailsCollapsed ? 'chevron-down-bold' : 'chevron-up-bold'
                }
                iconPosition="right"
                label={t(detailsCollapsed ? 'seeDetails' : 'hideDetails')}
                onClick={() => setDetailsCollapsed((current) => !current)}
              />
            </StViewDetailsButtonContainer>
          </StGenericDataContainer>
          {type === 'task' && (
            <>
              <StButtonsContainer>
                <Button
                  label={t('completeInformation')}
                  onClick={completeRequestInformation}
                />
                <Button
                  inverse
                  label={t('requestCancellation')}
                  onClick={() => requestCancellation(false)}
                />
              </StButtonsContainer>
              <StStepSubtitle subtitle={t('requestStatus')} />
              <StatusTimeline
                statusList={[
                  {
                    datetime: requestDetails.requestCreationTime,
                    metadata: (
                      <span>
                        {t('requestCreatedBy')}{' '}
                        <span className="bold">
                          {requestDetails.requestCreatorName}
                        </span>
                      </span>
                    ),
                    name: t('creation'),
                  },
                  {
                    name: t('statuses.in_progress'),
                  },
                  {
                    active: true,
                    children:
                      (requestDetails.returnReason && (
                        <NotificationCard
                          description={t(
                            'mandatoryInformationNeededToContinueRequest',
                          )}
                          title={t('completeInformation')}
                          type="warning"
                        >
                          <StWarningNotificationContent>
                            <div>
                              <span className="bold">
                                {t('returnReasonShort')}:
                              </span>
                              <span>
                                {t(
                                  `returnReasons.${requestDetails.returnReason}`,
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="bold">{t('comments')}:</span>
                              <span>{requestDetails.returnComment}</span>
                            </div>
                          </StWarningNotificationContent>
                        </NotificationCard>
                      )) ||
                      null,
                    name: t('instructions'),
                  },
                  {
                    name: t('issuance'),
                  },
                ]}
              />
            </>
          )}
          {type === 'request' && requestDetails?.request?.displayedStatus && (
            <>
              <StStepSubtitle subtitle={t('requestStatus')} />
              <StatusTimeline
                statusList={[
                  {
                    active:
                      requestDetails.request.displayedStatus ===
                      statusTypes.DRAFT,
                    name: t('creation'),
                  },
                  {
                    active:
                      requestDetails.request.displayedStatus ===
                      statusTypes.IN_PROGRESS,
                    name: t('statuses.in_progress'),
                  },
                  {
                    active:
                      requestDetails.request.displayedStatus ===
                      statusTypes.ISSUED,
                    name: t('issuance'),
                  },
                ]}
              />
            </>
          )}
        </div>
      </ContentContainer>
      <Modal
        acceptButton={{
          label: t('confirm'),
          onClick: () => requestCancellation(true),
        }}
        cancelButton={{ label: t('close'), onClick: () => null }}
        isOpen={cancellationWarningShown}
        title={t('requestCancellation')}
        onClose={() => setCancellationWarningShown(false)}
      >
        {t('requestCancellationPromptMessage')}
      </Modal>
      {commentsShown && (
        <CommentsModal
          requestId={requestDetails.request?.code || requestId}
          onClose={() => setCommentsShown(false)}
        />
      )}
      {historicShown && (
        <RequestHistoricModal
          requestId={requestDetails.request?.code || requestId}
          onClose={() => setHistoricShown(false)}
        />
      )}
    </>
  );
};

ViewRequestDetails.defaultProps = {
  onClose: undefined,
  type: 'task',
};

export default ViewRequestDetails;
