import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurUser } from 'redux/auth/authOperations';
import { getMustCurUser } from 'redux/auth/AuthSelector';
import SharedLayout from './SharedLayout/SharedLayout ';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

const MainPage = lazy(() => import('../pages/MainPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const ReportsPage = lazy(() => import('../pages/ReportsPage'));
const ExpensesComponent = lazy(() =>
  import('./ExpensesComponent/ExpensesComponent')
);
const IncomeComponent = lazy(() => import('./IncomeComponent/IncomeComponent'));

export const App = () => {
  const dispatch = useDispatch();
  const mustCurUser = useSelector(getMustCurUser);

  useEffect(() => {
    mustCurUser && dispatch(getCurUser());
  }, [dispatch, mustCurUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={<PublicRoute restricted component={MainPage} />}
          />
          <Route
            path="transactions"
            element={<PrivateRoute component={HomePage} />}
          >
            <Route
              path="expenses"
              element={<PrivateRoute component={ExpensesComponent} />}
            />
            <Route
              path="income"
              element={<PrivateRoute component={IncomeComponent} />}
            />
          </Route>
          <Route
            path="reports"
            element={<PrivateRoute component={ReportsPage} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
