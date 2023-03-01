import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { TestComponent } from '../../components/TestComponent/TestComponent';
import Navigation from '../../constants/navigation';
import FormRoutes from '../../forms/FormRoutes';
import {
  NewRequests,
  PendingTasks,
  QueryOfRequests,
  TaxAndCredit,
} from '../../pages';
import { Help } from '../../pages/Help';
import { ViewRequestDetailsPage } from '../../pages/ViewRequestDetailsPage';
import { ViewTaskDetailsPage } from '../../pages/ViewTaskDetailsPage';

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Main pages */}
    <Route element={<NewRequests />} path={Navigation.newRequests} />
    <Route element={<PendingTasks />} path={Navigation.pendingTasks} />
    <Route element={<QueryOfRequests />} path={Navigation.queryOfRequests} />
    <Route element={<TaxAndCredit />} path={Navigation.taxAndCredit} />
    <Route element={<Help />} path={Navigation.help} />
    {/* Flow pages */}
    <Route
      element={<ViewRequestDetailsPage />}
      path={`${Navigation.requestDetails}/:product/:event/:requestRef`}
    />
    <Route
      element={<ViewTaskDetailsPage />}
      path={`${Navigation.taskDetails}/:product/:event/:taskRef`}
    />
    {/* Forms */}
    {FormRoutes()}
    {/* Testing */}
    {process.env.NODE_ENV === 'development' && (
      <Route element={<TestComponent />} path="/app/test" />
    )}
    {/* Else  */}
    <Route
      element={<Navigate replace to={Navigation.newRequests} />}
      path="*"
    />
  </Routes>
);

export default AppRoutes;
