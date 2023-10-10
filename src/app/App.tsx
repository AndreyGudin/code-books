import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import './styles/index.scss';
import { getUserMounted, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const mounted = useSelector(getUserMounted);
  useEffect(() => {
    dispatch(initAuthData()).catch((e) => {
      console.log(e);
    });
  }, [dispatch]);

  if (!mounted) return <PageLoader />;

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          {mounted !== undefined && mounted ? <AppRouter /> : null}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
