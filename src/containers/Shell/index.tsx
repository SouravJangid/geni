import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Routes, ROUTES_ENUM } from 'constants/routes';
import ShellStyles from './Shell.module.scss';
import Layout from 'components/Layout';
import Doctors from 'containers/Doctors';
import Queries from 'containers/Queries';
import Help from 'containers/Help';
import Settings from 'containers/Settings';
import Reports from 'containers/Reports';
import Patients from 'containers/Patients';
import Dashboard from 'containers/Dashboard';
import Chat from 'containers/Chat/index';
import UploadFiles from 'containers/UploadFiles';
import Educational from 'containers/Educational';
import EmptyLayout from 'components/EmptyLayout';
import SignUp from 'containers/SignUp';
const SetPassword = React.lazy(() => import('containers/SetPassword'));
const ResetPassword = React.lazy(() => import('containers/ResetPassword'));
const Login = React.lazy(() => import('containers/Login'));

const Shell: React.FC = () => {
  return (
    <div className={ShellStyles['shell']}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter forceRefresh>
          <Switch>
            <Route path={Routes[ROUTES_ENUM.LOGIN]} exact>
              <EmptyLayout>
                <Login />
              </EmptyLayout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.SIGNUP]} exact>
              <EmptyLayout>
                <SignUp />
              </EmptyLayout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.RESET_PASSWORD]} exact>
              <EmptyLayout>
                <ResetPassword />
              </EmptyLayout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.SET_PASSWORD]} exact>
              <EmptyLayout>
                <SetPassword />
              </EmptyLayout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.DOCTORS]} exact>
              <Layout>
                <Doctors />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.PATIENTS]} exact>
              <Layout>
                <Patients />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.SETTINGS]} exact>
              <Layout>
                <Settings />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.HELP]} exact>
              <Layout>
                <Help />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.QUERIES]} exact>
              <Layout>
                <Queries />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.REPORTS]} exact>
              <Layout>
                <Reports />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.DASHBOARD]} exact>
              <Layout>
                <Dashboard />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.CHAT]} exact>
              <Layout>
                <Chat />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.SHAREDFILES]} exact>
              <Layout>
                <UploadFiles />
              </Layout>
            </Route>
            <Route path={Routes[ROUTES_ENUM.EDUCATIONAL]} exact>
              <Layout>
                <Educational />
              </Layout>
            </Route>
            <Redirect from='/' to={Routes[ROUTES_ENUM.DASHBOARD]} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};

export default React.memo(Shell);
