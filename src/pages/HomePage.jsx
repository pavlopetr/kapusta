import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DataHeader } from 'components/DataHeader/DataHeader';
import HomeNavigation from 'components/HomeNavigation/HomeNavigation';
import { useMediaQuery } from 'react-responsive';

import MobileTransactionList from '../components/MobileTransactionList/MobileTransactionList';
import DataPicker from '../components/DatePicker/DatePickerComp';
import MobileFormTransaction from '../components/MobileFormTransaction/MobileFormTransaction';

const HomePage = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' });
  const location = useLocation();
  useEffect(() => {
    if (!isMobile) {
      navigate('expenses');
    }

    // eslint-disable-next-line
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        location.pathname === '/transactions/expenses' ||
        location.pathname === '/transactions/income' ? (
          <MobileFormTransaction />
        ) : (
          <>
            <DataHeader />
            <HomeNavigation />
            <DataPicker />
            <MobileTransactionList />
          </>
        )
      ) : (
        <>
          <DataHeader />
          <HomeNavigation />
          <div className="container_transactions">
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </>
  );
};
export default HomePage;
