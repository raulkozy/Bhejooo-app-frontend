import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const CreateOrders = lazy(() => import('./orders/CreateOrders'));
const ManageOrders = lazy(() => import('./orders/ManageOrders'));
const Address = lazy(() => import('./orders/Address'));
const KYC = lazy(() => import('./KYC/Kyc'));
const Calculator = lazy(() => import('./finances/Calculator'));
const TransactionsSummary = lazy(() => import('./finances/TransactionsSummary'));
const Priorirty = lazy(()=> import('./tools/Priority')); 
const Channel = lazy(()=> import('./settings/Channel'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/orders/create-order" component={CreateOrders} />
          <Route exact path="/orders/manage-order" component={ManageOrders} />
          <Route exact path="/address" component={Address} />
          <Route exact path="/address/:id" component={Address} />
          <Route exact path="/kyc" component={KYC} />
          <Route exact path="/finances/calculator" component={Calculator} />
          <Route exact path="/finances/transactions-summary" component={TransactionsSummary} />
          <Route exact path="/tools/priority" component={Priorirty} />
          <Route exact path="/tools/customize" component={Customize} />
          <Route exact path="/settings/channel" component={Channel} />
          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />

          <Route path="/form-Elements/basic-elements" component={BasicElements} />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/icons/mdi" component={Mdi} />

          <Route path="/charts/chart-js" component={ChartJs} />


          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />


          <Redirect to="/user-pages/login-1" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;