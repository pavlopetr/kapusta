import HomePage from '../pages/HomePage';
import MainPage from '../pages/MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout ';

import IncomeComponent from './IncomeComponent/IncomeComponent';
import { getCurUser } from 'redux/auth/authOperations';
import { getMustCurUser } from 'redux/auth/AuthSelector';

export const App = () => {
  const dispatch = useDispatch();
  const mustCurUser = useSelector(getMustCurUser);

  useEffect(() => {
    mustCurUser && dispatch(getCurUser());
  }, [dispatch, mustCurUser]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<MainPage />} />
        <Route path="expenses" element={<HomePage />} />
        <Route path="income" element={<IncomeComponent />} />
      </Route>
    </Routes>
  );
};
