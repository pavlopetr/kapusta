import HomePage from '../pages/HomePage';
import MainPage from '../pages/MainPage';

import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout ';

// import ExpensesComponent from './ExpensesComponent/ExpensesComponent';

import IncomeComponent from './IncomeComponent/IncomeComponent';
import AppBar from './AppBar/AppBar'

export const App = () => {
  return (
    <>
       <AppBar />
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<MainPage />} />
        <Route path="expenses" element={<HomePage />} />
        <Route path="income" element={<IncomeComponent />} />
      </Route>
      </Routes>
      </>
  );
};
