import { Route } from 'react-router-dom';

import Navigation from '../constants/navigation';
/* CLE */
import { CreateForm as CleRequestCreateForm } from './cle/request/CreateForm';
import { CreateForm as CleModificationCreateForm } from './cle/modification/CreateForm';
import { CreateForm as CleAdvanceCreateForm } from './cle/advance/CreateForm';
import { CreateForm as CleAdvanceModificationCreateForm } from './cle/advanceModification/CreateForm';
import { CreateForm as CleAdvanceCancellationCreateForm } from './cle/advanceCancellation/CreateForm';
import { CreateForm as CleOtherOperationsCreateForm } from './cle/otherOperations/CreateForm';
import { CompleteInformationForm as CleRequestCompleteInformationForm } from './cle/request/CompleteInformationForm';
import { CompleteInformationForm as CleModificationCompleteInformationForm } from './cle/modification/CompleteInformationForm';
import { CompleteInformationForm as CleAdvanceCompleteInformationForm } from './cle/advance/CompleteInformationForm';
import { CompleteInformationForm as CleAdvanceModificationCompleteInformationForm } from './cle/advanceModification/CompleteInformationForm';
import { CompleteInformationForm as CleAdvanceCancellationCompleteInformationForm } from './cle/advanceCancellation/CompleteInformationForm';
import { CompleteInformationForm as CleOtherOperationsCompleteInformationForm } from './cle/otherOperations/CompleteInformationForm';
/* CLI */
import { CreateForm as CliRequestCreateForm } from './cli/request/CreateForm';
import { CreateForm as CliModificationCreateForm } from './cli/modification/CreateForm';
import { CreateForm as CliOtherOperationsCreateForm } from './cli/otherOperations/CreateForm';
import { CreateForm as CliPaymentChargeCreateForm } from './cli/paymentCharge/CreateForm';
import { CreateForm as CliPaymentAccountlessCreateForm } from './cli/paymentAccountless/CreateForm';
import { CreateForm as CliPaymentFinancingCreateForm } from './cli/paymentFinancing/CreateForm';
import { CreateForm as CliFinancingRequestCreateForm } from './cli/financingRequest/CreateForm';
import { CreateForm as CliFinancingModificationCreateForm } from './cli/financingModification/CreateForm';
import { CreateForm as CliFinancingCancellationCreateForm } from './cli/financingCancellation/CreateForm';
import { CompleteInformationForm as CliRequestCompleteInformationForm } from './cli/request/CompleteInformationForm';
import { CompleteInformationForm as CliModificationCompleteInformationForm } from './cli/modification/CompleteInformationForm';
import { CompleteInformationForm as CliOtherOperationsCompleteInformationForm } from './cli/otherOperations/CompleteInformationForm';
import { CompleteInformationForm as CliPaymentAccountlessCompleteInformationForm } from './cli/paymentAccountless/CompleteInformationForm';
import { CompleteInformationForm as CliPaymentFinancingCompleteInformationForm } from './cli/paymentFinancing/CompleteInformationForm';
import { CompleteInformationForm as CliFinancingModificationCompleteInformationForm } from './cli/financingModification/CompleteInformationForm';
import { CompleteInformationForm as CliFinancingCancellationCompleteInformationForm } from './cli/financingCancellation/CompleteInformationForm';
import { CompleteInformationForm as CliFinancingRequestCompleteInformationForm } from './cli/financingRequest/CompleteInformationForm';

const FormRoutes = () => (
  <>
    {/* --- CLE ---*/}
    {/* Create forms */}
    <Route path={Navigation.forms.cle.request.create}>
      <Route element={<CleRequestCreateForm />} path=":collectionRef" />
      <Route element={<CleRequestCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cle.modification.create}>
      <Route element={<CleModificationCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cle.advance.create}>
      <Route element={<CleAdvanceCreateForm />} path=":advanceCollectionRef" />
      <Route element={<CleAdvanceCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cle.advanceModification.create}>
      <Route element={<CleAdvanceModificationCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cle.advanceCancellation.create}>
      <Route element={<CleAdvanceCancellationCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cle.otherOperations.create}>
      <Route element={<CleOtherOperationsCreateForm />} path="" />
    </Route>
    {/* Complete Information forms */}
    <Route
      element={<CleRequestCompleteInformationForm />}
      path={`${Navigation.forms.cle.request.completeInformation}/:taskId`}
    />
    <Route
      element={<CleModificationCompleteInformationForm />}
      path={`${Navigation.forms.cle.modification.completeInformation}/:taskId`}
    />
    <Route
      element={<CleAdvanceCompleteInformationForm />}
      path={`${Navigation.forms.cle.advance.completeInformation}/:taskId`}
    />
    <Route
      element={<CleAdvanceModificationCompleteInformationForm />}
      path={`${Navigation.forms.cle.advanceModification.completeInformation}/:taskId`}
    />
    <Route
      element={<CleAdvanceCancellationCompleteInformationForm />}
      path={`${Navigation.forms.cle.advanceCancellation.completeInformation}/:taskId`}
    />
    <Route
      element={<CleOtherOperationsCompleteInformationForm />}
      path={`${Navigation.forms.cle.otherOperations.completeInformation}/:taskId`}
    />

    {/* --- CLI ---*/}
    {/* Create forms */}
    <Route path={Navigation.forms.cli.request.create}>
      <Route element={<CliRequestCreateForm />} path=":collectionRef" />
      <Route element={<CliRequestCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.modification.create}>
      <Route element={<CliModificationCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.otherOperations.create}>
      <Route element={<CliOtherOperationsCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.paymentCharge.create}>
      <Route element={<CliPaymentChargeCreateForm />} path=":collectionRef" />
      <Route element={<CliPaymentChargeCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.paymentAccountless.create}>
      <Route
        element={<CliPaymentAccountlessCreateForm />}
        path=":collectionRef"
      />
      <Route element={<CliPaymentAccountlessCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.financingRequest.create}>
      <Route element={<CliFinancingRequestCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.paymentFinancing.create}>
      <Route
        element={<CliPaymentFinancingCreateForm />}
        path=":collectionRef"
      />
      <Route element={<CliPaymentFinancingCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.financingModification.create}>
      <Route element={<CliFinancingModificationCreateForm />} path="" />
    </Route>
    <Route path={Navigation.forms.cli.financingCancellation.create}>
      <Route element={<CliFinancingCancellationCreateForm />} path="" />
    </Route>
    {/* Complete Information forms */}
    <Route
      element={<CliRequestCompleteInformationForm />}
      path={`${Navigation.forms.cli.request.completeInformation}/:taskId`}
    />
    <Route
      element={<CliModificationCompleteInformationForm />}
      path={`${Navigation.forms.cli.modification.completeInformation}/:taskId`}
    />
    <Route
      element={<CliOtherOperationsCompleteInformationForm />}
      path={`${Navigation.forms.cli.otherOperations.completeInformation}/:taskId`}
    />
    <Route
      element={<CliPaymentAccountlessCompleteInformationForm />}
      path={`${Navigation.forms.cli.paymentAccountless.completeInformation}/:taskId`}
    />
    <Route
      element={<CliPaymentFinancingCompleteInformationForm />}
      path={`${Navigation.forms.cli.paymentFinancing.completeInformation}/:taskId`}
    />
    <Route
      element={<CliFinancingModificationCompleteInformationForm />}
      path={`${Navigation.forms.cli.financingModification.completeInformation}/:taskId`}
    />
    <Route
      element={<CliFinancingCancellationCompleteInformationForm />}
      path={`${Navigation.forms.cli.financingCancellation.completeInformation}/:taskId`}
    />
    <Route
      element={<CliFinancingRequestCompleteInformationForm />}
      path={`${Navigation.forms.cli.financingRequest.completeInformation}/:taskId`}
    />
  </>
);

export default FormRoutes;
