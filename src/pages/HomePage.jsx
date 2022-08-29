import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DataHeader } from 'components/DataHeader/DataHeader';
import HomeNavigation from 'components/HomeNavigation/HomeNavigation';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('expenses');
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DataHeader />
      <HomeNavigation />
      <div className="container_transactions">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
export default HomePage;
